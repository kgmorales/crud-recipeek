const PAPRIKA_V1_BASEURL = 'https://www.paprikaapp.com/api/v1';

export interface v1Creds {
  user: string;
  pass: string;
}

export const resource = async (
  creds: v1Creds,
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: Body,
) => {
  const url = `${PAPRIKA_V1_BASEURL}/sync/${endpoint}`;
  const headers = new Headers();

  // Basic Authentication
  const base64Credentials = Buffer.from(`${creds.user}:${creds.pass}`).toString(
    'base64',
  );
  headers.set('Authorization', `Basic ${base64Credentials}`);
  headers.set('Content-Type', 'application/json');

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch resource from ${endpoint}. Status: ${response.status}`,
    );
  }

  const data = await response.json();
  return data.result;
};

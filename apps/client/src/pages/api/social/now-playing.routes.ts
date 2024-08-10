export async function fetchSpotify(): Promise<any> {
  try {
    const response = await fetch(
      'https://localhost:8080/api/social/spotify/now-playing',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: any = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching spotify:', error);
    throw new Error('Error fetching spotify: ' + error.message);
  }
}

export default fetchSpotify;

import { Status } from '@prisma/client';

export async function fetchHome(): Promise<Status> {
  try {
    const response = await fetch('localhost:8080/api/page/home');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data: Status = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchHome;

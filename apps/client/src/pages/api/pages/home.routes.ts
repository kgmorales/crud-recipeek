import { Home } from '@types';

async function fetchHome(): Promise<Home> {
  try {
    const response = await fetch('http://localhost:8080/api/page/home');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data: Home = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchHome;

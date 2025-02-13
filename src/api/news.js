const API_URL = process.env.REACT_APP_API_URL;

export const fetchNews = async () => {
  try {
    const response = await fetch(`${API_URL}/api/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return []; // Return an empty array if there's an error
  }
};

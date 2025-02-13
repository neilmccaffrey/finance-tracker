const API_URL = process.env.API_URL;

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
  }
};

fetchNews();

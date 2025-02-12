const API_URL = 'http://localhost:5151/api/news';

export const fetchNews = async () => {
  try {
    const response = await fetch(API_URL);
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

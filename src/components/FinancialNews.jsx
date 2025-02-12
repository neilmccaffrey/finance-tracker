import { useEffect, useState } from 'react';
import { fetchNews } from '../api/news';

const FinancialNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    getNews();
  }, []);
  if (!articles.length) return null; // If no articles, return nothing
  return (
    <div className="flex flex-col dark:bg-gray-500 p-2 rounded shadow-md mt-2">
      {articles.map((article) => (
        <div key={article.id} className="p-2 border-b border-gray-300">
          <h3 className="font-semibold text-sm">{article.webTitle}</h3>
          <a
            href={article.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default FinancialNews;

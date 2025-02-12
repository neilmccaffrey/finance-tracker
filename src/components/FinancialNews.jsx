import mockNews from './mockNews.json';

const FinancialNews = () => {
  const articles = mockNews[0]?.response?.results || []; // Ensure safe access

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

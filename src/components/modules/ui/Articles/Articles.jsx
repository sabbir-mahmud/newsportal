const Articles = ({ articlesData }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {articlesData.results.map((article) => (
                    <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        {article.url_to_image ? (
                            <img
                                src={article.url_to_image}
                                alt={article.title}
                                className="h-40 w-full object-cover"
                            />
                        ) : (
                            <div className="h-40 w-full bg-gray-300 flex items-center justify-center text-gray-600">
                                No Image
                            </div>
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="font-semibold text-lg mb-2 flex-grow">
                                {article.title}
                            </h2>
                            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                                {article.description}
                            </p>
                            <div className="text-xs text-gray-500 mt-auto flex justify-between items-center">
                                <span>
                                    {new Date(
                                        article.published_at
                                    ).toLocaleDateString()}
                                </span>
                                <span className="italic text-gray-600">
                                    {article.source?.name || "Unknown Source"}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Articles;

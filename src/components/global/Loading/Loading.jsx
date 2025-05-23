const Loading = () => {
    return (
        <div className="flex items-center justify-center bg-white">
            <div className="flex items-center space-x-6 p-6 text-gray-700 rounded-md shadow-md">
                <div className="w-6 h-6 bg-gray-500 rounded-full animate-ping"></div>
                <div className="text-xl font-semibold animate-pulse">
                    Loading...
                </div>
            </div>
        </div>
    );
};

export default Loading;

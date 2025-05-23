const Paginator = ({ page, setPage, count, length }) => {
    const totalPages = Math.ceil(count / length);

    const getPaginationRange = () => {
        const range = [];
        const siblingsCount = window.innerWidth < 640 ? 0 : 1;
        // If screen < 640px (sm breakpoint), show fewer siblings, else normal

        const totalPageNumbers = siblingsCount * 2 + 5;

        if (totalPages <= totalPageNumbers) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
        } else {
            range.push(1);

            const leftSiblingIndex = Math.max(page - siblingsCount, 2);
            const rightSiblingIndex = Math.min(
                page + siblingsCount,
                totalPages - 1
            );

            if (leftSiblingIndex > 2) {
                range.push("left-ellipsis");
            } else {
                for (let i = 2; i < leftSiblingIndex; i++) {
                    range.push(i);
                }
            }

            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                range.push(i);
            }

            if (rightSiblingIndex < totalPages - 1) {
                range.push("right-ellipsis");
            } else {
                for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
                    range.push(i);
                }
            }

            range.push(totalPages);
        }

        return [...new Set(range)];
    };

    const paginationRange = getPaginationRange();

    return (
        <div>
            <div className="flex justify-center items-center space-x-1 mt-8 select-none flex-wrap sm:flex-nowrap">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className={`px-2 py-1 rounded-md border text-sm sm:text-base ${
                        page === 1
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-200"
                    }`}
                >
                    Prev
                </button>

                {/* On mobile (smaller than 640px), show only Prev, current page, Next */}
                <div className="hidden sm:flex space-x-1">
                    {paginationRange.map((p, idx) => {
                        if (p === "left-ellipsis" || p === "right-ellipsis") {
                            return (
                                <span
                                    key={p + idx}
                                    className="px-2 py-1 text-gray-500 text-sm"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1 rounded-md border text-sm ${
                                    p === page
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "hover:bg-gray-200 border-gray-300"
                                }`}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>

                {/* On mobile, show just current page number */}
                <span className="sm:hidden px-3 py-1 rounded-md border bg-blue-600 text-white text-sm">
                    {page}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className={`px-2 py-1 rounded-md border text-sm sm:text-base ${
                        page === totalPages
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-200"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Paginator;

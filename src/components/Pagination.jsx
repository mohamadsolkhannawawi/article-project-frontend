import React from "react";

function Pagination({ total, limit, offset, onPageChange }) {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    const handlePageClick = (page) => {
        const newOffset = (page - 1) * limit;
        onPageChange(newOffset);
    };

    return (
        <nav className="mt-8 flex justify-center" aria-label="Pagination">
            <ul className="inline-flex items-center -space-x-px">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Previous
                    </button>
                </li>

                {/* Page Numbers (Simple version) */}
                {/* A more complex version would handle "..." for many pages */}
                {[...Array(totalPages).keys()].map((num) => {
                    const page = num + 1;
                    const isCurrent = page === currentPage;
                    return (
                        <li key={page}>
                            <button
                                onClick={() => handlePageClick(page)}
                                className={`px-3 py-2 leading-tight ${
                                    isCurrent
                                        ? "text-blue-600 bg-blue-50 border border-blue-300"
                                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;

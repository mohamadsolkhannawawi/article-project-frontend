import React from "react";
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";

function Pagination({ total, limit, offset, onPageChange }) {
    const totalPages = Math.ceil(total / limit);
    const currentPage = offset / limit + 1;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(offset - limit);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(offset + limit);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5; // Max number of page buttons to show

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(
                1,
                currentPage - Math.floor(maxPageButtons / 2)
            );
            let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

            if (endPage - startPage + 1 < maxPageButtons) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push("...");
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    if (totalPages <= 1) return null; // Don't show pagination if only one page

    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            >
                <SquareArrowLeft size={20} />
            </button>

            {getPageNumbers().map((pageNumber, index) => (
                <React.Fragment key={index}>
                    {pageNumber === "..." ? (
                        <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                        <button
                            onClick={() =>
                                onPageChange((pageNumber - 1) * limit)
                            }
                            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                                currentPage === pageNumber
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            >
                <SquareArrowRight size={20} />
            </button>
        </div>
    );
}

export default Pagination;

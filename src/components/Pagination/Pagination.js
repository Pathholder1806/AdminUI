import React from "react";
import "./Pagination.css";

const Pagination = ({
    totalUsers,
    userPerPage,
    currentPage,
    setCurrentPage,
}) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
        pages.push(i);
    }

    const firstPageHandler = () => {
        setCurrentPage(1);
    };

    const lastPageHandler = () => {
        setCurrentPage(pages.length);
    };

    const nextPageHandler = () => {
        const newPage =
            currentPage + 1 <= pages.length ? currentPage + 1 : pages.length;
        setCurrentPage(newPage);
    };

    const prevPageHandler = () => {
        const newPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;
        setCurrentPage(newPage);
    };

    return (
        <div className='pagination'>
            <ul className='pagination-list'>
                <li className='pagination-item'>
                    <button
                        onClick={firstPageHandler}
                        className='pagination-btn'
                    >
                        First
                    </button>
                </li>
                <li className='pagination-item'>
                    <button
                        onClick={prevPageHandler}
                        className='pagination-btn'
                    >
                        Prev
                    </button>
                </li>
                {pages.map((page) => {
                    return (
                        <li key={page} className='pagination-item'>
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`
                                pagination-btn 
                                ${
                                    currentPage === page
                                        ? "pagination-btn-selected"
                                        : ""
                                }
                                `}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}
                <li className='pagination-item'>
                    <button
                        onClick={nextPageHandler}
                        className='pagination-btn'
                    >
                        Next
                    </button>
                </li>
                <li className='pagination-item'>
                    <button
                        onClick={lastPageHandler}
                        className='pagination-btn'
                    >
                        Last
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;

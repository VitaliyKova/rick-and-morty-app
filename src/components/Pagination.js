import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);   
    }

    return (
        <nav className="nav">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'active' : null}>
                        <button className="pagination__button" onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
import React from 'react';

export default function Pagination({ currentPage, handlePageChange }) {
  const handlePaginationChange = (page) => {
    handlePageChange(page);
  };

  return (
    <div className="pagination-container">
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePaginationChange(currentPage - 1)}>Previous</button>
          </li>
          <li className="page-item"><button className={`page-link ${currentPage === 1 ? 'active' : ''}`} onClick={() => handlePaginationChange(1)}>1</button></li>
          <li className="page-item"><button className={`page-link ${currentPage === 2 ? 'active' : ''}`} onClick={() => handlePaginationChange(2)}>2</button></li>
          <li className="page-item"><button className={`page-link ${currentPage === 3 ? 'active' : ''}`} onClick={() => handlePaginationChange(3)}>3</button></li>
          <li className="page-item">
            <button className="page-link" onClick={() => handlePaginationChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

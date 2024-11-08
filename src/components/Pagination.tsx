import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

/**
 * Pagination component for navigating through pages of items.
 *
 * @param {number} totalItems - The total number of items.
 * @param {number} itemsPerPage - The number of items per page.
 * @param {number} currentPage - The current active page.
 * @param {(page: number) => void} paginate - Function to call when changing pages.
 *
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    paginate(Number(e.target.value));
  };

  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
        <li>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt; Prev
          </button>
        </li>
        <li>
          <select value={currentPage} onChange={handleSelectChange}>
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </li>
        <li>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </li>
      </ul>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;
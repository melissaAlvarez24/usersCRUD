import React from 'react'
import { TPagination } from './types'
import './styles.css'
export const Pagination = ({
    currentPage,
    totalPages,
    handlePageChange
}: TPagination) => {
  return (
    <div className='boxEnd'>
      <nav aria-label="Page navigation">
          <ul className="pagination pagination-lg">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Anterior</a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</a>
            </li>
          </ul>
      </nav>
    </div>
  )
}

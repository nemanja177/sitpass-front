import React from 'react';

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div style={{ marginTop: 20 }}>
      <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>Prethodna</button>
      <span style={{ margin: '0 10px' }}>Stranica {page + 1} od {totalPages}</span>
      <button disabled={page + 1 >= totalPages} onClick={() => onPageChange(page + 1)}>Sledeća</button>
    </div>
  );
}

export default Pagination;
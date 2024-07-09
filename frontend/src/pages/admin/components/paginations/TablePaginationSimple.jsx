import React, { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const TablePaginationSimple = ({ totalCount, page, onPageChange, rowsPerPage, onRowsPerPageChange }) => {

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0); // Reset page to 0 when rows per page changes
  };

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TablePaginationSimple;

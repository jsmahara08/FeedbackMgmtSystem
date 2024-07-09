import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  Typography,
  Modal,
  CircularProgress,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TablePaginationSimple from '../paginations/TablePaginationSimple';
import SearchBar from '../searchBar/SearchBar';

const DataTable = ({
  isLoading,
  datas,
  tableHeaders,
  tableName,
  handleDelete,
  handleEdit,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage
}) => {
  // Modal state
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Open delete confirmation modal
  const handleOpen = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  // Close delete confirmation modal
  const handleClose = () => {
    setConfirmDeleteOpen(false);
    setDeleteId(null);
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId);
      handleClose();
    }
  };

  const [searchText, setSearchText] = useState('');
  const [filteredDatas, setFilteredDatas] = useState(datas); // Initially set to all data
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page
  const [totalCount, setTotalCount] = useState(datas.length); // Total count of items

  // Update filteredDatas and totalCount when datas change
  useEffect(() => {
    setFilteredDatas(datas);
    setTotalCount(datas.length);
  }, [datas]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);

    // Filter datas based on search text
    const filtered = datas.filter((data) =>
      Object.values(data).some(
        (val) =>
          typeof val === 'string' &&
          val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredDatas(filtered);
    setTotalCount(filtered.length); // Update total count based on filtered data
    setPage(0); // Reset page to 0 when search text changes
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ width: 'auto', mt: 2, padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        {tableName}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, float: 'right' }}>
        <SearchBar searchEvent={handleSearchChange} />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDatas
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic for displaying rows
            .map((data) => (
              <TableRow key={data._id}>
                {Object.keys(data).map((key) => {
                  if (
                    key !== '_id' &&
                    key !== 'createdAt' &&
                    key !== 'updatedAt' &&
                    key !== '__v'
                  ) {
                    return (
                      <TableCell key={key} sx={{ padding: '10px 16px' }}>
                        {typeof data[key] === 'object' ? data[key].name : data[key]}
                      </TableCell>
                    );
                  }
                  return null;
                })}
                <TableCell sx={{ padding: '10px 16px' }}>
                   <Stack direction="row" alignItems="center" spacing={2}>
                      <IconButton aria-label="edit" size="small" color='primary' onClick={() => handleEdit(data)} >
                        <EditIcon fontSize="small"/>
                      </IconButton>
                      <IconButton aria-label="delete" size="small" color='error' onClick={() => handleOpen(data._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                   </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePaginationSimple
        totalCount={totalCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      {/* Confirm Delete Modal */}
      <Modal
        open={confirmDeleteOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 130,
          bgcolor: 'background.paper',
          border: '2px solid gray',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="p">
            Are you sure that you want to delete?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={handleClose} variant="text">Cancel</Button>
            <Button onClick={handleConfirmDelete} variant="outlined">Confirm</Button>
          </Box>
        </Box>
      </Modal>
      {/* Snackbar for success and error messages */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={5000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default DataTable;

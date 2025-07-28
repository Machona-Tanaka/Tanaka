import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Checkbox
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const Table = ({ columns, data, onRowClick }) => {
  // State management
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState([]);

  // Sorting handler
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // More robust search and filter
  const filteredData = data.filter(row => {
    if (!searchText) return true; // Return all rows if no search text
    
    return columns.some(column => {
      const cellValue = row[column.id];
      if (cellValue === undefined || cellValue === null) return false;
      
      return String(cellValue).toLowerCase().includes(searchText.toLowerCase());
    });
  });
  // Sorting logic
  const sortedData = filteredData.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination slicing
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Selection handlers
  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? paginatedData.map(row => row.id) : []);
  };

  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      {/* Table Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        <div>
          <Tooltip title="Filter">
            <IconButton>
              <FilterIcon />
            </IconButton>
          </Tooltip>
          {selected.length > 0 && (
            <Tooltip title="Delete selected">
              <IconButton onClick={() => console.log('Delete:', selected)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < paginatedData.length}
                  checked={paginatedData.length > 0 && selected.length === paginatedData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{ fontWeight: 'bold' }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                hover
                key={row.id}
                onClick={() => onRowClick && onRowClick(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    {column.format ? column.format(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit:', row.id);
                  }}>
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import { descendingComparator, getComparator, stableSort } from '../../utils';
import EditDeleteTransaction from './EditDeleteTransaction.js';
import { TransactionCurrency } from '../../constants';

const TransactionTable = (props) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const mapProperties = (orderBy) => {
    switch (orderBy) {
      case 'date':
        return 'valueDate';
      case 'partner':
        return 'transactionPartnerName';
      case 'reference':
        return 'remittanceInformation';
      default:
        return orderBy;
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === mapProperties(property) && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(mapProperties(property));
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (date) => selected.indexOf(date) !== -1;

  const changeVerified = (row) => {
    props.updateTransaction({ ...row, verified: !row.verified });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - props.transactions.length)
      : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.transactions.length}
            />
            <TableBody>
              {stableSort(props.transactions, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const date = new Date(row.valueDate);
                  const month = date.getMonth() + 1;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {date.getDate() +
                          '.' +
                          month +
                          '.' +
                          date.getFullYear()}
                      </TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.account}</TableCell>
                      <TableCell align="left">
                        {row.transactionPartnerName &&
                        row.transactionPartnerName != 'Unknown'
                          ? row.transactionPartnerName
                          : '-'}
                      </TableCell>
                      <TableCell padding="none">{row.type}</TableCell>
                      <TableCell align="left">
                        {row.remittanceInformation}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={
                          row.transactionAmount < 0
                            ? { color: 'red' }
                            : { color: 'green' }
                        }
                      >
                        {row.transactionAmount +
                          (row.transactionCurrency[0] == TransactionCurrency.EUR
                            ? '€'
                            : '$')}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={row.verified}
                          onChange={() => {
                            changeVerified(row);
                          }}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell padding="none" sx={{ minWidth: 100 }}>
                        <EditDeleteTransaction transaction={row} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TransactionTable;

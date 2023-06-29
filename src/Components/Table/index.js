import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Box, Collapse, IconButton, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

function Row(props) {
    const { isExtractable, row } = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {isExtractable && <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>}
                <TableCell component="th" align="center" scope="row">{row._id.bill_no}</TableCell>
                <TableCell align="center">{row._id.party_name}</TableCell>
                <TableCell align="center">"row._id.date_created.split('T')[0]"</TableCell>
                <TableCell align="center">{row._id.gst}</TableCell>
                <TableCell align="center">{row._id.sgst}</TableCell>
                <TableCell align="center">{row._id.billTotalAmount}</TableCell>
                <TableCell align="center">
                    <Link to={`/generate-invoice-pdf/${row._id._id}`}>
                        <Button variant="outlined" color="info" startIcon={<VisibilityIcon />}>
                            View PDF
                        </Button>
                    </Link>
                </TableCell>
            </TableRow>
            {isExtractable && <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, justifyContent: 'center' }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Bill Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            ['Ch No.', 'Description', 'Pcs', 'Mtr', 'Rate', 'Total Amount'].map((item, index) => (
                                                <TableCell
                                                    key={index}
                                                    align='center'
                                                    sx={{ color: 'text.normal', backgroundColor: 'background.ternory', border: '1px solid #d6d6d7', fontSize: 16, fontWeight: 400 }}
                                                >
                                                    {item}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.billItems.map((historyRow) => (
                                        <TableRow key={historyRow._id}>
                                            <TableCell align="center">{historyRow.partyChNo}</TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {historyRow.products[0].name}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.pcs}</TableCell>
                                            <TableCell align="center">{historyRow.mtr}</TableCell>
                                            <TableCell align="center">{historyRow.products[0].rate}</TableCell>
                                            <TableCell align="center">{historyRow.item_amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            }
        </React.Fragment>
    );
}

function TableComponent({ isExtractable, invoiceList, isPaginationAllowed }) {
    console.log("invoiceList :- ",invoiceList);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='mt-4'>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    {
                                        (isExtractable ?
                                            ['', 'Bill No', 'Party Name', 'Date', 'GST', 'SGST', 'Total Amount', 'Download PDF']
                                            :
                                            ['Bill No', 'Party Name', 'Date', 'GST', 'SGST', 'Total Amount', 'Download PDF'])
                                            .map((item, index) => (
                                                <TableCell
                                                    key={index}
                                                    sx={{ color: 'text.normal', backgroundColor: 'background.primary', border: '1px solid #d6d6d7', fontSize: 16, fontWeight: 400 }}
                                                    align="center"
                                                >
                                                    {item}
                                                </TableCell>
                                            ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoiceList && invoiceList.length > 0 && invoiceList?.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <Row key={row._id} row={row} isExtractable={isExtractable} />
                                    ))
                                }

                                {/* {invoiceList && <Row row={invoiceList} isExtractable={isExtractable} />} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isPaginationAllowed && invoiceList[0]?.billItems && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={invoiceList?.length > 0 ? invoiceList?.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
                </Paper>
            </Box>
        </div>
    )
}

export default TableComponent
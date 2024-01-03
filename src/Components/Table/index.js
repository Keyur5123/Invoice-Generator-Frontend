import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Box, Collapse, IconButton, Typography, TableSortLabel, Tooltip, Switch, FormControlLabel, Checkbox, Modal } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import Constants from "../../Utilities/Constants/responseConstants";
import { daysDifference, curr_date } from '../../Utilities/date_funcs';
import { updateInvoiceIsPaidStatusApi, deleteInvoiceApi } from "../../ApiController/InvoiceApis";
import { useInvoiceContext } from "../../Context/InvoiceContext";

function Row(props) {
    let {
        isExtractable,
        row,
        contextSnackbar,
        setContextSnackbar,
        isExpandFlag,
        invoiceIdList,
        setInvoiceIdList,
        openModel,
        setOpenModel
    } = props;
    let { userData, token, dispatch } = useInvoiceContext();

    const [open, setOpen] = useState(false);
    let [is_paidFlag, setIs_paidFlag] = useState(row?._id?.is_paid);

    let bill_date = row?._id?.date_created.split('T')[0]
    let formated_bill_date = bill_date.split('-').reverse().join('-');
    let formated_curr_date = curr_date.split('-').reverse().join('-');

    let days_diff = daysDifference(formated_bill_date, formated_curr_date);

    let setAllInvoiceIdsToBeUpdated = (id) => {
        setIs_paidFlag(!is_paidFlag);

        if (isExpandFlag) {
            setInvoiceIdList(invoiceList => [...invoiceList, { invoice_id: id, is_paid: !is_paidFlag }]);
        } else {
            setInvoiceIdList([{ invoice_id: id, is_paid: !is_paidFlag }])
            setOpenModel(!openModel)
        }
    }

    let deleteInvoice = (invoice_id) => {
        dispatch({ type: 'SET_LOADING' })
        deleteInvoiceApi(userData.userId, userData.roleId, invoice_id, token)
            .then(data => {
                dispatch({ type: 'SET_LOADING_OFF' })
                setContextSnackbar({ ...contextSnackbar, status: true, message: Constants.INVOICE_DELTED_SUCCESSFULLY, severity: Constants.SUCCESS });
                data && dispatch({ type: 'SET_INVOICE_LIST', payload: data })
            })
            .catch(err => {
                dispatch({ type: 'SET_LOADING_OFF' })
                setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message ?? err ? err.toString() : 'API ERROR', severity: Constants.ERROR })
            })
    }

    return (
        <React.Fragment>
            <TableRow sx={{ backgroundColor: days_diff > 90 ? '#ff110087' : days_diff > 60 ? '#fdfd2eab' : '' }} hover>
                {isExtractable && <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>}
                <TableCell component="th" align="center" scope="row">{row?._id?.bill_no}</TableCell>
                <TableCell align="center">{row?._id?.party_name}</TableCell>
                <TableCell align="center">{bill_date}</TableCell>
                <TableCell align="center">{row?._id?.paymentEntryStatus == 'in' ? days_diff : '-'}</TableCell>
                <TableCell align="center">{row?._id?.paymentEntryStatus == 'out' ? days_diff : '-'}</TableCell>
                <TableCell align="center">{row?._id?.sgst}</TableCell>
                <TableCell align="center">{row?._id?.cgst}</TableCell>
                <TableCell align="center">{row?._id?.billTotalAmount}</TableCell>
                <TableCell align="center">
                    <Switch
                        checked={is_paidFlag}
                        onChange={() => setAllInvoiceIdsToBeUpdated(row?._id?._id)}
                        inputProps={{ 'aria-label': 'is_paidFlag_switch' }}
                    />
                </TableCell>
                <TableCell align="center">
                    <Link to={`/update-invoice/${row?._id?._id}`}>
                        <Button variant="outlined" color="success" startIcon={<EditIcon />}>
                            Edit
                        </Button>
                    </Link> &nbsp;
                    <Link to={`/generate-invoice-pdf/${row?._id?._id}`}>
                        <Button variant="outlined" color="info" startIcon={<VisibilityIcon />}>
                            View
                        </Button>
                    </Link> &nbsp;
                    <Tooltip title="Delete">
                        <Button onClick={() => deleteInvoice(row?._id?._id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Tooltip>
                </TableCell>
            </TableRow>

            {
                isExtractable && <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: !open && 'none' }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, justifyContent: 'center' }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Bill Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow hover>
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
                                        {row && row?.billItems?.map(historyRow => {
                                            return (
                                                <TableRow hover key={historyRow._id}>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center">{historyRow.partyChNo}</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center" component="th" scope="row">
                                                        {historyRow?.products[0]?.name}
                                                    </TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center">{historyRow.pcs}</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center">{historyRow.mtr}</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center">{historyRow.products[0].rate}</TableCell>
                                                    <TableCell sx={{ borderBottom: 'none' }} align="center">{historyRow.item_amount}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment >
    );
}


function TableComponent({
    isExtractable,
    searchData,
    invoiceList,
    isPaginationAllowed,
    contextSnackbar,
    setContextSnackbar,
    is_paidStatusUpdated,
    setIs_paidStatusUpdated
}) {

    let { token, dispatch } = useInvoiceContext();
    let [page, setPage] = useState(0);
    let [rowsPerPage, setRowsPerPage] = useState(5);

    let [isExpandFlag, setIsExpandFlag] = useState(false);
    let [invoiceIdList, setInvoiceIdList] = useState([]);

    let [orderby, setOrderby] = useState('date');
    let [order, setOrder] = useState('asc');
    let [outOrder, setOutOrder] = useState('asc');
    let [dateOrder, setDateOrder] = useState('asc');

    let [openModel, setOpenModel] = useState(false);

    let handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let handleRequestSort = (field_name) => {
        setOrderby(field_name);
        if (field_name == 'in') {
            const isAsc = orderby === field_name && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
        }
        else if (field_name == 'out') {
            const isOutAsc = orderby === field_name && outOrder === 'asc';
            setOutOrder(isOutAsc ? 'desc' : 'asc');
        }
        else if (field_name == 'date') {
            const isdateAsc = orderby === field_name && dateOrder === 'asc';
            setDateOrder(isdateAsc ? 'desc' : 'asc');
        }
    };

    let sortDataByDate = (arr) => {
        // Create a new array to store the sorted objects
        const sortedArr = [];

        // Iterate over the original array
        for (let i = 0; i < arr.length; i++) {
            // Get the date from the current object
            const date = arr[i]._id.date_created;

            // Split the date into day, month, and year components
            const dateComponents = date.split('-');

            // Convert the day, month, and year components to integers
            const day = parseInt(dateComponents[0]);
            const month = parseInt(dateComponents[1]);
            const year = parseInt(dateComponents[2]);

            // Calculate the date in milliseconds since January 1, 1970
            const dateInMillis = new Date(year, month - 1, day).getTime();

            // Add the current object to the sorted array, along with its date in milliseconds
            sortedArr.push({ ...arr[i], dateInMillis });
        }

        // Sort the sorted array by date in ascending order
        sortedArr.sort((a, b) => a.dateInMillis - b.dateInMillis);

        // Return the sorted array
        return sortedArr;
    };

    let visibleRows = useMemo(() => {
        if (orderby !== 'date') {
            let primary_arr = [];   // data collected in this arr which have primartEntryStatus == orderby
            let secondary_arr = [];   // data collected in this arr which have primartEntrtStatus != orderby

            invoiceList.forEach(obj => {
                if (obj?._id?.paymentEntryStatus == orderby) { primary_arr.push(obj) }
                else { secondary_arr.push(obj) }
            });

            let final_arr = stableSort(primary_arr, getComparator(orderby == 'out' ? outOrder : order, orderby)).slice()
            return [...final_arr, ...secondary_arr]
        }

        let sorted_data_by_date = stableSort(invoiceList, sortDataByDate(invoiceList)).slice()
        return (dateOrder == 'asc' ? sorted_data_by_date : sorted_data_by_date.reverse());
    },
        [order, outOrder, dateOrder, orderby, invoiceList]
    );

    function getComparator(order, orderby) {
        if (orderby == 'in') {
            return order === 'desc'
                ? (a, b) => descendingComparator(a, b, orderby)
                : (a, b) => -descendingComparator(a, b, orderby);
        }
        else {
            return outOrder === 'desc'
                ? (a, b) => descendingComparator(a, b, orderby)
                : (a, b) => -descendingComparator(a, b, orderby);
        }
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = orderby != 'date' && comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderby) {
        let a_bill_date = a?._id?.date_created.split('T')[0].split('-').reverse().join('-');
        let b_bill_date = b?._id?.date_created.split('T')[0].split('-').reverse().join('-');
        let formated_curr_date = curr_date.split('-').reverse().join('-');

        if (daysDifference(b_bill_date, formated_curr_date) < daysDifference(a_bill_date, formated_curr_date)) {
            return -1;
        }
        else if (daysDifference(b_bill_date, formated_curr_date) > daysDifference(a_bill_date, formated_curr_date)) {
            return 1;
        }
        return 0;
    }

    let handleChangePaidStatus = () => {
        dispatch({ type: 'SET_LOADING' });

        let ModifiedArr = [];
        let removedObj = invoiceIdList.shift();
        ModifiedArr.push(removedObj);
        invoiceIdList.forEach(invoiceIdObj => {
            let isObjAvailInModifiedArr = true;
            ModifiedArr.forEach(ModifiedArrObj => {
                if (ModifiedArrObj.invoice_id == invoiceIdObj.invoice_id) {
                    isObjAvailInModifiedArr = true;
                    ModifiedArrObj.is_paid = invoiceIdObj.is_paid;
                } else {
                    isObjAvailInModifiedArr = false;
                }
            });
            isObjAvailInModifiedArr == false && ModifiedArr.push(invoiceIdObj);
        });

        updateInvoiceIsPaidStatusApi(ModifiedArr, token)
            .then(data => {
                dispatch({ type: 'SET_LOADING_OFF' });
                setIs_paidStatusUpdated(!is_paidStatusUpdated);
                setContextSnackbar(
                    {
                        ...contextSnackbar,
                        status: true,
                        message: invoiceIdList.length > 1 ?
                            Constants.INVOICES_UPDATED_SUCCESSFULLY
                            :
                            Constants.INVOICE_UPDATED_SUCCESSFULLY,
                        severity: Constants.SUCCESS
                    });
                dispatch({ type: 'SET_INVOICE_LIST', payload: data });
            })
            .catch(err => {
                dispatch({ type: 'SET_LOADING_OFF' })
                setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message ?? err ? err.toString() : 'API ERROR', severity: Constants.ERROR })
            });
    }


    let handleClose = () => {
        // invoiceList.forEach(invoiceObj => {   // logic is working perfectly but need to reload <Row /> 
        //     invoiceIdList.forEach(updatedObjByMistake => {
        //         if (updatedObjByMistake.invoice_id == invoiceObj._id._id) {
        //             invoiceObj._id.is_paid = !updatedObjByMistake.is_paid;
        //         }
        //     });
        // });
        setIs_paidStatusUpdated(!is_paidStatusUpdated);
        setOpenModel(false);
        window.location.reload(true);
    }

    let rejectBulkPaidSwitchUpdation = () => {
        setIs_paidStatusUpdated(!is_paidStatusUpdated);
        setInvoiceIdList([]);
        window.location.reload(true);
    }

    return (
        <div className='mt-4 w-full max-[500px]:w-[330px]'>
            <Modal
                open={openModel}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you want to make this Invoice <br />
                        <center>{invoiceIdList[0]?.is_paid == true ? '" paid "' : ' " unpaid "'}.</center>
                    </Typography>
                    <div className='mt-4 flex justify-center'>
                        <Button className='p-0' onClick={handleChangePaidStatus} variant="outlined" color="success">
                            <CheckIcon />
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={handleClose} variant="outlined" color="error">
                            <CloseIcon />
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Box>
                <Paper sx={{ mb: 2 }}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    {
                                        (isExtractable ?
                                            ['', 'Bill No', 'Party Name']
                                            :
                                            ['Bill No', 'Party Name'])
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
                                    {['date', 'in', 'out'].map(field_name => (
                                        <TableCell
                                            sx={{ color: 'text.normal', backgroundColor: 'background.primary', border: '1px solid #d6d6d7', fontSize: 16, fontWeight: 400 }}
                                            align="center"
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={field_name == 'date' ? dateOrder : field_name == 'in' ? order : outOrder}
                                                orderby={orderby === field_name == 'date' ? dateOrder : (field_name == 'in' ? order : (field_name == 'out' ? outOrder : 'asc'))}
                                                onClick={() => handleRequestSort(field_name)}
                                            >
                                                <p className='text-[#fff]'>{field_name[0].toUpperCase() + field_name.slice(1)}</p>
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    {
                                        ['SGST', 'CGST', 'Total Amount', 'Is_Paid', 'Edit / View / Delete PDF']
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
                                {invoiceList && visibleRows.length > 0 && visibleRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .filter(obj => searchData ?
                                        obj?.billItems[0]?.partyChNo?.includes(searchData) /* checking is user searching data by ch no or go for party name */
                                            ? obj?.billItems[0]?.partyChNo?.includes(searchData) /* search by ch no */
                                            : obj?._id?.party_name?.toLowerCase().includes(searchData.toLowerCase()) /* checking is user searching data by party name or go for bill no */
                                                ? obj?._id?.party_name?.toLowerCase().includes(searchData.toLowerCase()) /* search by ch party name */
                                                : obj?._id?.bill_no?.includes(searchData) /* search by bill no */
                                        : obj
                                    )
                                    .map((row, index) => (
                                        <Row
                                            key={index}
                                            row={row}
                                            isExtractable={isExtractable}
                                            contextSnackbar={contextSnackbar}
                                            setContextSnackbar={setContextSnackbar}
                                            isExpandFlag={isExpandFlag}
                                            invoiceIdList={invoiceIdList}
                                            setInvoiceIdList={setInvoiceIdList}
                                            openModel={openModel}
                                            setOpenModel={setOpenModel}
                                        />
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {isPaginationAllowed && invoiceList[0]?.billItems && (
                        <div className='px-6 flex justify-end'>
                            <FormControlLabel onChange={() => setIsExpandFlag(!isExpandFlag)} control={<Checkbox />} label="Bulk Paid Action" />
                            {isExpandFlag && invoiceIdList.length >= 1 && <div className='mt-2'>
                                <Button className='p-0' onClick={handleChangePaidStatus} variant="outlined" color="success">
                                    <CheckIcon />
                                </Button>&nbsp;&nbsp;
                                <Button onClick={() => rejectBulkPaidSwitchUpdation()} variant="outlined" color="error">
                                    <CloseIcon />
                                </Button>
                            </div>}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={invoiceList?.length > 0 ? invoiceList?.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </div>
                    )}
                </Paper>
            </Box>
        </div >
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default TableComponent
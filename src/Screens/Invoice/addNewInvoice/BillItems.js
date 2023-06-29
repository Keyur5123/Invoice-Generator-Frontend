import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import SubCategory from "./SubCategory"
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';

import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Constants from "../../../Utilities/Constants/responseConstants";

const tableHeader = [
    {
        id: '1',
        label: 'PartyChNo',
        minWidth: 170,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '2',
        label: 'Description',
        minWidth: 170,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '3',
        label: 'Pcs',
        minWidth: 50,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '4',
        label: 'Mtr',
        minWidth: 50,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '5',
        label: 'Rate',
        minWidth: 170,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '6',
        label: 'Amount',
        minWidth: 100,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: '7',
        label: 'Delete',
        minWidth: 50,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },

];

export default function BillItems({ billHeaders, validate, snackbar, setSnackbar }) {
    const { dispatch } = useInvoiceContext();

    const [billItems, setBillItems] = useState([
        {
            partyChNo: '',
            description: '',
            pcs: '',
            mtr: '',
            rate: '',
            item_amount: ''
        }
    ])

    const [billSubTotalAmount, setBillSubTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [gst, setGst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [tds, setTds] = useState(0); // Not used in total amount formula
    const [billTotalAmount, setBillTotalAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [itemValidationError, setItemValidationError] = useState([]);

    const saveInvoice = async () => {
        if (validate() == true) {
            var obj = {
                party_name: billHeaders.partyName,
                address: billHeaders.address,
                bill_no: billHeaders.billNo,
                billItems: billItems,
                discount: discount,
                gst: gst,
                sgst: sgst,
                cgst: cgst,
                tds: tds,
                billTotalAmount: billTotalAmount
            }

            dispatch({ type: 'SET_LOADING' })
            await fetch('http://localhost:4000/darshan-creation/save/newInvoice/6418a3a460d617f446e86e52/v1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ obj })
            })
                .then(data => data.json())
                .then(data => {
                    dispatch({ type: 'ADD_NEW_INVOICE', payload: obj })
                    setSnackbar({ ...snackbar, status: true, message: 'Invoice saved successfully', severity: Constants.SUCCESS })
                })
                .catch(err => {
                    setSnackbar({ ...snackbar, status: true, message: err.message, severity: Constants.ERROR })
                })
        }
        else {
            console.log(">>>> NoT Validated <<<<<<");
        }
    }

    let subTotal = billItems.reduce((prev, curr) => {
        if (curr.item_amount.trim().length > 0) {
            return prev + Number(curr.item_amount)
        }
        else return prev
    }, 0)

    useEffect(() => {
        setBillSubTotalAmount(subTotal)
    }, [toggle])

    let checkTableItemValues = (Item) => {
        let temp = {}
        temp.partyChNo = Item.partyChNo ? '' : Constants.FIELD_REQUIRED
        temp.description = Item.description ? '' : Constants.FIELD_REQUIRED
        temp.pcs = Item.pcs ? '' : Constants.FIELD_REQUIRED
        temp.mtr = Item.mtr ? '' : Constants.FIELD_REQUIRED
        temp.rate = Item.rate ? '' : Constants.FIELD_REQUIRED
        setItemValidationError(itemValidationError => ([...itemValidationError, temp]))
        return Object.values(temp).every(val => val == '')
    }

    const addNewItem = () => {
        let validateUserFilledData = checkTableItemValues(billItems[billItems.length - 1])
        if (validateUserFilledData && billItems.length < 13) {
            const items = [...billItems, {
                partyChNo: '',
                description: '',
                pcs: '',
                mtr: '',
                rate: '',
                item_amount: ''
            }]
            setBillItems(items)
        }
        else if (validateUserFilledData == false) {
            setSnackbar({ ...snackbar, status: true, message: Constants.ALL_FIELD_REQUIRED, severity: Constants.ERROR });
        }
        else {
            setSnackbar({ ...snackbar, status: true, message: Constants.MAX_LIMIT_EXCEED, severity: Constants.ERROR });
        }
    }

    const handleChange = (e, index) => {
        e.preventDefault();
        let allObj = [...billItems]
        allObj[index][e.target.name] = e.target.value;

        if (allObj[index]['rate'] && allObj[index]['pcs']) {
            setToggle(!toggle)
            allObj[index]['item_amount'] = String(Number(allObj[index]['rate']) * Number(allObj[index]['pcs']))
        }
    }

    const handleDiscount = (e) => {
        setDiscount(Math.abs(e.target.value))
    }

    const handleGst = (e) => {
        setGst(Math.abs(e.target.value))
    }
    const handleSgst = (e) => {
        setGst(Math.abs(e.target.value))
    }
    const handleCgst = (e) => {
        setCgst(Math.abs(e.target.value))
    }
    const handleTds = (e) => {
        setTds(Math.abs(e.target.value))
    }
    const getTotalAmount = () => {
        let total = billSubTotalAmount
            - ((billSubTotalAmount * (discount)) / 100)
            - ((billSubTotalAmount * (tds)) / 100)
            + ((billSubTotalAmount * (gst)) / 100)
            + ((billSubTotalAmount * (sgst)) / 100)
            + ((billSubTotalAmount * (cgst)) / 100)
        setBillTotalAmount(total)
        return total
    }

    const removeItem = (id) => {
        if (id == 0 && billItems[id].item_amount == 0) {
            alert("Can't Remove first item")
        }
        else {
            const remainedItems = billItems.slice().filter((item, index) => id !== index)
            setBillItems(remainedItems)
            getTotalAmount()
        }
    }

    return (
        <>
            <Paper sx={{ width: '100%' }} className='mt-5'>
                <TableContainer sx={{ maxHeight: 440 }}>
                    {/* // , maxWidth : 300,, minHeight: 200 */}
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableHeader.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{ color: 'text.normal', backgroundColor: 'background.primary', border: '1px solid #d6d6d7', fontSize: 16, fontWeight: 400 }}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {billItems
                                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((bill, id) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                                            {Object.keys(bill).map((item, index) => {
                                                let value = bill[item];
                                                return (
                                                    <TableCell key={index} align='center'>
                                                        {item != 'description' && item != 'item_amount' ?
                                                            item != 'description' && <TextField
                                                                required
                                                                defaultValue={value}
                                                                name={item}
                                                                onChange={(e) => { handleChange(e, id) }}
                                                                placeholder={item}
                                                                size='small'
                                                                variant="outlined"
                                                                {...(itemValidationError[index] && ({ error: true, helperText: itemValidationError[index][item] }))}
                                                            />
                                                            :
                                                            item != 'description' && <TextField
                                                                value={value}
                                                                name={item}
                                                                onChange={(e) => { handleChange(e, id) }}
                                                                placeholder={item}
                                                                size='small'
                                                                variant="outlined" />
                                                            // <p className='bg-slate-500 p-2'>{value ? value : 0}</p>
                                                            // <Button color="success" variant="outlined">{value ? value : 0}</Button>
                                                        }
                                                        {item == 'description' &&
                                                            <React.Fragment>
                                                                <TextField
                                                                    value={value}
                                                                    name={item}
                                                                    onChange={(e) => { handleChange(e, id) }}
                                                                    placeholder={item}
                                                                    size='small'
                                                                    variant="outlined" />
                                                                {/* <div className='w-full bg-slate-200 mt-1 overflow-hidden '>
                                                                {['1','3'].map(ele => <p>dfdsfdf</p>)}
                                                            </div> */}
                                                            </React.Fragment>
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <div className='p-1 text-center bg-pink-100'>
                                                    <IconButton variant="filledTonal" color='error' onClick={() => removeItem(id)} aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <SubCategory
                    addNewItem={addNewItem}
                    billSubTotalAmount={billSubTotalAmount}
                    handleDiscount={handleDiscount}
                    handleGst={handleGst}
                    handleSgst={handleSgst}
                    handleCgst={handleCgst}
                    handleTds={handleTds}
                    getTotalAmount={getTotalAmount}
                />
            </Paper>
            <div className='mt-5 flex justify-center'>
                <div className='container grid md:grid-cols-3 gap-4 xs:grid-rows-1'>
                    <Button className='m-5 w-100' color="secondary" variant="outlined" startIcon={<VisibilityIcon />}>
                        View Mode
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<CloseSharpIcon />}>
                        Cancel Bill
                    </Button>
                    <Button variant="outlined" color="success" onClick={saveInvoice} startIcon={<PaidSharpIcon />}>
                        Save As Paid
                    </Button>
                </div>
            </div>
        </>
    );
}
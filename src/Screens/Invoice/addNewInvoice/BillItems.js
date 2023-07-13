import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import SubCategory from "./SubCategory"
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import { useNavigate } from "react-router-dom";

import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Constants from "../../../Utilities/Constants/responseConstants";
import SelectCompo from "../../../Components/Select";

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

export default function BillItems({ billHeaders, setBillHeaders, formatedDate, validate, snackbar, setSnackbar }) {
    const navigate = useNavigate();
    const { dispatch, state, userData } = useInvoiceContext();
    let { invoiceList, isUserAuthorized } = state;

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

    const [allProductsNameWithPrice, setAllProductsNameWithPrice] = useState([]);

    useEffect(() => {
        setBillSubTotalAmount(subTotal)
    }, [toggle])

    useEffect(() => {
        getAllProductsNameWithPrice();
    }, [invoiceList])

    function getAllProductsNameWithPrice() {
        setAllProductsNameWithPrice([]);
        invoiceList.map(invoice => {
            invoice.billItems.map(item => {
                let obj = {};
                obj.name = item.products[0].name
                obj.rate = item.products[0].rate
                setAllProductsNameWithPrice(allProductsNameWithPrice => [...allProductsNameWithPrice, obj])
            })
        })
    }

    const sendDataToServer = async(fieldObj) => {
        await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/save/newInvoice/${userData.userId}/v1`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fieldObj })
        })
            .then(data => data.json())
            .then(data => {
                dispatch({ type: 'ADD_NEW_INVOICE', payload: fieldObj })
                setSnackbar({ ...snackbar, status: true, message: 'Invoice saved successfully', severity: Constants.SUCCESS })
                // ==== Cleaning States ==== //
                setBillItems([
                    {
                        partyChNo: '',
                        description: '',
                        pcs: '',
                        mtr: '',
                        rate: '',
                        item_amount: ''
                    }
                ]);
                setBillHeaders({
                    partyName: '',
                    address: '',
                    billNo: '',
                    date: formatedDate
                });
                setBillSubTotalAmount(0);
                setDiscount(0);
                setGst(0);
                setSgst(0);
                setCgst(0);
                setTds(0);
                setBillTotalAmount(0);
            })
            .catch(err => {
                setSnackbar({ ...snackbar, status: true, message: err.message, severity: Constants.ERROR })
            })
    }

    const checkIsValueChage = () => {
        billItems.map(item => {
            allProductsNameWithPrice.map(prod => {
                if(prod.name === item.description && prod.rate != item.rate) {
                    // Call API for UPDATING RATE OF PRODUCT
                    console.log("Please select :- ", prod.rate, item.rate);
                }
                else{
                    console.log("not changed");
                }
            })

        })
    }

    const saveInvoice = () => {
        if (validate() == true) {
            var fieldObj = {
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
            sendDataToServer(fieldObj);
            checkIsValueChage();
        }
        else {
            checkIsValueChage();
            setSnackbar({ ...snackbar, status: true, message: "Invoice is not added", severity: Constants.ERROR })
            console.log(">>>> CLEAR LOCAL STORAGE ITEMS <<<<<<");
        }
    }

    const cancleInvoice = () => {
        navigate('/invoice-list')
    }

    let subTotal = billItems.reduce((prev, curr) => {
        if (curr.item_amount.trim().length > 0) {
            return prev + Number(curr.item_amount)
        }
        else return prev
    }, 0)

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
        (typeof e == Object || typeof e == 'object') && e.preventDefault();
        let allObj = [...billItems]
        allObj[index][e.target.name] = e.target.value;

        if (allObj[index]['rate'] && allObj[index]['pcs']) {
            setToggle(!toggle)
            allObj[index]['item_amount'] = String(Number(allObj[index]['rate']) * Number(allObj[index]['pcs']))
        }
    }

    const AutoFillRate = (idx, clearVal=false) => {
        billItems.map(item => {
            allProductsNameWithPrice.map(prod => {
                if (item.description == prod.name) {
                    let temp = [...billItems];
                    temp[idx].rate = prod.rate.toString();
                    clearVal && (temp[idx].rate = '')
                    setBillItems(temp)
                }
            })
        })
    }

    const handleDescription = (e, index) => {
        let allObj = [...billItems];
        allObj[index]['description'] = e ? e : '';
        e?.length > 0 ? AutoFillRate(index) : AutoFillRate(index,true);
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
                {/* // , maxWidth : 300,, minHeight: 200 */}
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableHeader.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{ color: 'text.normal', backgroundColor: 'background.primary', border: '1px solid #d6d6d7', fontSize: 16, fontWeight: 400 }}
                                        align={column.align}
                                        style={{ maxWidth: column.minWidth }}
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
                                                                // defaultValue={value}
                                                                value={value}
                                                                name={item}
                                                                onChange={(e) => { handleChange(e, id) }}
                                                                placeholder={item}
                                                                size='small'
                                                                variant="outlined"
                                                                {...(itemValidationError[index] && ({ error: true, helperText: itemValidationError[index][item] }))}
                                                            />
                                                            :
                                                            // Below text box just for showing Total Amount of PCS & Rate
                                                            item != 'description' && <TextField
                                                                value={value}
                                                                name={item}
                                                                onChange={(e) => { handleChange(e, id) }}
                                                                placeholder={item}
                                                                size='small'
                                                                variant="outlined" />
                                                        }
                                                        {item == 'description' &&
                                                            <React.Fragment>
                                                                <SelectCompo
                                                                    handleChange={handleDescription}
                                                                    id={id}
                                                                />
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
            </Paper >
            <div className='mt-7 flex justify-center'>
                <div className='container grid md:grid-cols-3 gap-4 xs:grid-rows-1 mb-10'>
                    <Button className='m-5 w-100' color="secondary" variant="outlined" startIcon={<VisibilityIcon />}>
                        View Mode
                    </Button>
                    <Button variant="outlined" color="error" onClick={cancleInvoice} startIcon={<CloseSharpIcon />}>
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
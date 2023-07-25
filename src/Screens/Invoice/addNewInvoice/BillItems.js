import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, TextField } from '@mui/material';

import SubCategory from "./SubCategory"
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import { useNavigate } from "react-router-dom";

import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Constants from "../../../Utilities/Constants/responseConstants";
import SelectCompo from "../../../Components/SelectDropDown";

import { updatedProducts, upsertProducts } from "../../../ApiController/ProductsAndPartyApis";

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
    const { dispatch, state, userData, token, getAllPartyNameAndProductsList } = useInvoiceContext();
    let userId = userData.userId;
    let { productsList } = state;

    const [billItems, setBillItems] = useState([
        {
            partyChNo: '',
            description: '',
            pcs: '',
            mtr: '',
            rate: '',
            item_amount: ''
        }
    ]);

    const [billSubTotalAmount, setBillSubTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [gst, setGst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [tds, setTds] = useState(0); // Not used in total amount formula
    const [billTotalAmount, setBillTotalAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [itemValidationError, setItemValidationError] = useState([]);

    useEffect(() => {
        setBillSubTotalAmount(subTotal)
    }, [toggle])

    let subTotal = billItems.reduce((prev, curr) => {
        if (curr.item_amount.trim().length > 0) {
            return prev + Number(curr.item_amount)
        }
        else return prev
    }, 0);

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

    const sendDataToServer = async (obj) => {
        await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/save/newInvoice/${userData.userId}/v1`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ obj })
        })
            .then(data => data.json())
            .then(data => {
                dispatch({ type: 'ADD_NEW_INVOICE', payload: obj })
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

    const checkAndUpdateProductPrice = () => {
        let updatedProducts = [];
        billItems.map(item => {
            productsList.map(prod => {
                if (prod._id === item.description && prod.rate != item.rate) {
                    updatedProducts.push({ name: item.description, rate: item.rate })
                }
            })
        })
        if (updatedProducts.length > 0) {
            upsertProducts(updatedProducts, userId, token, true)
                .then(data => {
                    if (data?.status == 401) {
                        setSnackbar({ ...snackbar, status: true, message: 'User unauthorized', severity: Constants.ERROR });
                    }
                    else if (data?.err) {
                        setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                    }
                    else {
                        getAllPartyNameAndProductsList();
                        setSnackbar({ ...snackbar, status: true, message: data?.data?.msg, severity: Constants.SUCCESS });
                    }
                })
                .catch(error => {
                    setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
                });
        }
    }

    const saveInvoice = () => {
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
            sendDataToServer(obj);
            checkAndUpdateProductPrice();
        }
        else {
            checkAndUpdateProductPrice(); // Remove it.....................................................................
            setSnackbar({ ...snackbar, status: true, message: "All fields are required", severity: Constants.ERROR });
        }
    }

    const cancleInvoice = () => {
        navigate('/invoice-list')
    }

    let checkTableItemValues = (Item) => {
        let temp = {}
        temp.partyChNo = Item?.partyChNo ? '' : Constants.FIELD_REQUIRED
        temp.description = Item?.description ? '' : Constants.FIELD_REQUIRED
        temp.pcs = Item?.pcs ? '' : Constants.FIELD_REQUIRED
        temp.mtr = Item?.mtr ? '' : Constants.FIELD_REQUIRED
        temp.rate = Item?.rate ? '' : Constants.FIELD_REQUIRED
        setItemValidationError(itemValidationError => ([...itemValidationError, temp]))
        return Object.values(temp).every(val => val == '')
    }

    const addNewItem = () => {
        let validateUserFilledData = checkTableItemValues(billItems[billItems.length - 1]);
        if ((validateUserFilledData && billItems.length < 12) || billItems.length == 0) {
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

    const removeItem = (id) => {
        if (billItems.length == 1 || (billItems[id].item_amount == 0 && id == 0)) {
            alert("Can't Remove first item");
        }
        else {
            let remainedItems = [];
            billItems.map((item, index) => {
                if (id !== index) {
                    remainedItems.push(item)
                }
            })
            setBillItems(remainedItems);
            getTotalAmount();
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
        setBillItems(allObj)
    }

    const AutoFillRateField = (allObj, idx, clearVal = false) => {
        billItems.map(item => {
            productsList.map(prod => {
                if (item.description == prod._id) {
                    allObj[idx].rate = prod.rate.toString();
                    allObj[idx]['item_amount'] = String(Number(allObj[idx]['rate']) * Number(allObj[idx]['pcs']))
                }
                else if (clearVal) {
                    allObj[idx].rate = ''
                    allObj[idx].item_amount = ''
                }
            })
        })
    }

    const handleDescription = (e, index) => {
        let allObj = [...billItems];
        allObj[index]['description'] = e ? e : '';
        allObj[index]['description'].length > 0 ? AutoFillRateField(allObj, index) : AutoFillRateField(allObj, index, true);
        setBillItems(allObj)
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

    let viewPdf = () => {
        console.log("View PDF");
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
                                                                name={item}
                                                                onChange={(e) => { handleChange(e, id) }}
                                                                value={value}
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
                                                                    ipArray={productsList}
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
                    <Button className='m-5 w-100' color="secondary" onClick={viewPdf} variant="outlined" startIcon={<VisibilityIcon />}>
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
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, TextField } from '@mui/material';

import SubCategory from "./SubCategory";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import { useNavigate, useParams } from "react-router-dom";

import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Constants from "../../../Utilities/Constants/responseConstants";
import SelectCompo from "../../../Components/SelectDropDown";

import { saveNewInvoice, updateInvoiceApi } from "../../../ApiController/InvoiceApis";
import { upsertProducts } from "../../../ApiController/ProductsAndPartyApis";

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
        label: 'Producut Name',
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

export default function BillItems({ billHeaders, setBillHeaders, formatedDate, paymentEntryStatus, setPaymentEntryStatus, validate, snackbar, setSnackbar, setBillApiLoader }) {

    let { invoice_id } = useParams();
    const navigate = useNavigate();
    const { dispatch, state, userData, token, getAllPartyNameAndProductsList } = useInvoiceContext();
    let userId = userData?.userId;
    let { productsList, invoiceList } = state;

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
    const [sgst, setSgst] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [igst, setIgst] = useState(0);
    const [tds, setTds] = useState(0);
    const [billTotalAmount, setBillTotalAmount] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [itemValidationError, setItemValidationError] = useState([]);

    useEffect(() => {
        if (invoice_id) {
            setToggle(!toggle)
            invoiceList.forEach(invoiceObj => {
                if (invoiceObj._id._id == invoice_id) {

                    setBillHeaders({
                        partyName: invoiceObj?._id?.party_name,
                        address: invoiceObj?._id?.address,
                        billNo: invoiceObj?._id?.bill_no,
                        date: invoiceObj?._id?.date_created
                    })

                    let billItems_arr = [];

                    invoiceObj.billItems.map(async item => {
                        billItems_arr.push({
                            partyChNo: item.partyChNo,
                            description: item?.products[0]?.name,
                            pcs: item.pcs,
                            mtr: item.mtr,
                            rate: item.products[0]?.rate,
                            item_amount: item.item_amount.toString()
                        })
                    })

                    setBillItems(billItems_arr);
                    setPaymentEntryStatus(invoiceObj?._id?.paymentEntryStatus == 'out' ? true : false)
                    setDiscount(invoiceObj?._id?.discount);
                    setSgst(invoiceObj?._id?.sgst);
                    setCgst(invoiceObj?._id?.cgst);
                    setIgst(invoiceObj?._id?.igst);
                    setTds(invoiceObj?._id?.tds);
                    setBillSubTotalAmount(invoiceObj?._id?.billSubTotalAmount);
                    setBillTotalAmount(invoiceObj?._id?.billTotalAmount);

                    return 0;
                }
            })
        }
    }, [invoiceList])

    useEffect(() => {
        let subTotal = billItems.reduce((prev, curr) => {
            if (curr.item_amount.trim().length > 0) {
                return prev + Number(curr.item_amount)
            }
            else return prev
        }, 0);
        setBillSubTotalAmount(subTotal)
    }, [toggle])


    const getTotalAmount = () => {
        let total = billSubTotalAmount
            - ((billSubTotalAmount * (discount)) / 100)
            - ((billSubTotalAmount * (tds)) / 100)
            + ((billSubTotalAmount * (igst)) / 100)
            + ((billSubTotalAmount * (sgst)) / 100)
            + ((billSubTotalAmount * (cgst)) / 100)
        setBillTotalAmount(total);
        return total;
    }

    const sendDataToServer = async (obj) => {
        setBillApiLoader(true);
        saveNewInvoice(obj, userId, token)
            .then(data => {
                // ==== Loader Closed ==== //
                setBillApiLoader(false);
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
                    date: formatedDate,
                });
                setPaymentEntryStatus(false);
                setBillSubTotalAmount(0);
                setDiscount(0);
                setIgst(0);
                setSgst(0);
                setCgst(0);
                setTds(0);
                setBillTotalAmount(0);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err ? data?.err?.err.toString() : data?.err.toString(), severity: Constants.ERROR });
                }
                else {
                    obj._id = data.data.data
                    dispatch({ type: 'ADD_NEW_INVOICE', payload: obj });
                    setSnackbar({ ...snackbar, status: true, message: data.msg, severity: Constants.SUCCESS });
                    navigate('/invoice-list');
                }
            })
            .catch(err => {
                setBillApiLoader(false);
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
                        setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
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
        if (validate() == true && checkTableItemValues(billItems[0]) == true) {
            let obj = {
                party_name: billHeaders.partyName,
                address: billHeaders.address,
                bill_no: billHeaders.billNo,
                date_created: billHeaders.date,
                paymentEntryStatus: paymentEntryStatus,
                billItems: billItems,
                discount: discount,
                igst: igst,
                sgst: sgst,
                cgst: cgst,
                tds: tds,
                is_paid: false,
                billSubTotalAmount: billSubTotalAmount,
                billTotalAmount: billTotalAmount
            }

            dispatch({ type: 'SET_LOADING' })
            sendDataToServer(obj);
            checkAndUpdateProductPrice();
        }
        else {
            setSnackbar({ ...snackbar, status: true, message: "All fields are required", severity: Constants.ERROR });
        }
    }

    let updateInvoice = () => {
        if (validate() == true && checkTableItemValues(billItems[0]) == true) {
            let curr_invoiceObj = invoiceList.filter(obj => obj._id._id == invoice_id);

            billHeaders.partyName && (curr_invoiceObj[0]._id['party_name'] = billHeaders.partyName);
            curr_invoiceObj[0]._id['address'] = billHeaders.address;
            curr_invoiceObj[0]._id['bill_no'] = billHeaders.billNo;
            curr_invoiceObj[0]._id['date_created'] = billHeaders.date;
            curr_invoiceObj[0]._id['paymentEntryStatus'] = paymentEntryStatus;
            curr_invoiceObj[0]._id['discount'] = discount;
            curr_invoiceObj[0]._id['igst'] = igst;
            curr_invoiceObj[0]._id['sgst'] = sgst;
            curr_invoiceObj[0]._id['cgst'] = cgst;
            curr_invoiceObj[0]._id['tds'] = tds;
            curr_invoiceObj[0]._id['billSubTotalAmount'] = billSubTotalAmount;
            curr_invoiceObj[0]._id['billTotalAmount'] = billTotalAmount;

            let temp_bill_items = curr_invoiceObj[0].billItems
            curr_invoiceObj[0].billItems = billItems
            curr_invoiceObj[0].billItems.forEach(obj => {
                temp_bill_items.forEach(item => {
                    if (obj.partyChNo == item.partyChNo) {
                        obj.productsIds = item.productsIds;
                        obj._id = item._id
                    }
                })
            })

            updateInvoiceApi(curr_invoiceObj[0], userId, invoice_id, token)
                .then(data => {
                    // ==== Loader Closed ==== //
                    setBillApiLoader(false);
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
                        date: formatedDate,
                    });
                    setPaymentEntryStatus(false);
                    setBillSubTotalAmount(0);
                    setDiscount(0);
                    setIgst(0);
                    setSgst(0);
                    setCgst(0);
                    setTds(0);
                    setBillTotalAmount(0);
                    if (data?.status == 401) {
                        setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                    }
                    else if (data?.err) {
                        setSnackbar({ ...snackbar, status: true, message: data?.err?.err ? data?.err?.err.toString() : data?.err.toString(), severity: Constants.ERROR });
                    }
                    else {
                        dispatch({ type: 'UPDATE_INVOICE', payload: data.data.data });
                        setSnackbar({ ...snackbar, status: true, message: data.data.msg, severity: Constants.SUCCESS });
                        setSnackbar({ ...snackbar, status: true, message: data.data?.is_product_rate_updated, severity: Constants.SUCCESS });
                        navigate('/invoice-list');
                    }
                })
                .catch(err => {
                    setBillApiLoader(false);
                    setSnackbar({ ...snackbar, status: true, message: err.message, severity: Constants.ERROR })
                })
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
            setSnackbar({ ...snackbar, status: true, message: Constants.CANNOT_REMOVE_FIRST_ITEM, severity: Constants.ERROR });
            alert(Constants.CANNOT_REMOVE_FIRST_ITEM);
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
            setToggle(!toggle);
            allObj[index]['item_amount'] = String(Number(allObj[index]['rate']) * Number(allObj[index]['pcs']))
        }
        setBillItems(allObj)
    }

    const AutoFillRateField = (allObj, idx, clearVal = false) => {
        billItems.map(item => {
            productsList.map(prod => {
                if (item.description == prod.name) {
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
    const handleIgst = (e) => {
        setIgst(Math.abs(e.target.value))
    }
    const handleSgst = (e) => {
        setSgst(Math.abs(e.target.value))
    }
    const handleCgst = (e) => {
        setCgst(Math.abs(e.target.value))
    }
    const handleTds = (e) => {
        setTds(Math.abs(e.target.value))
    }

    let viewPdf = () => {
        // console.log("View PDF");
    }

    return (
        <div className='mt-5 w-full max-[500px]:w-[330px]'>
            <Paper className=''>
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
                                            {Object.keys(bill).filter(field => !(['productsIds', '_id'].includes(field))).map((item, index) => {
                                                let value = bill[item];
                                                return (
                                                    <TableCell key={index} align='center'>
                                                        {/* {(item != 'description' && item != 'item_amount') ? */}
                                                        {item != 'description' && <TextField
                                                            required
                                                            type='number'
                                                            name={item}
                                                            onChange={item == 'item_amount' ? null : (e) => { handleChange(e, id) }}
                                                            value={value}
                                                            placeholder={item}
                                                            size='small'
                                                            variant="outlined"
                                                            {...(itemValidationError[index] && ({ error: true, helperText: itemValidationError[index][item] }))}

                                                        />
                                                        }
                                                        {item == 'description' &&
                                                            <React.Fragment>
                                                                <SelectCompo
                                                                    handleChange={handleDescription}
                                                                    id={id}
                                                                    ipArray={productsList}
                                                                    label={invoice_id ? value : ''}
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
                    sgst={sgst}
                    cgst={cgst}
                    igst={igst}
                    tds={tds}
                    discount={discount}
                    billSubTotalAmount={billSubTotalAmount}
                    handleDiscount={handleDiscount}
                    handleSgst={handleSgst}
                    handleCgst={handleCgst}
                    handleIgst={handleIgst}
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
                        Cancel Bill Details
                    </Button>
                    {
                        invoice_id ?
                            <Button variant="outlined" color="success" onClick={updateInvoice} startIcon={<PaidSharpIcon />}>
                                Update Detais
                            </Button>
                            :
                            <Button variant="outlined" color="success" onClick={saveInvoice} startIcon={<PaidSharpIcon />}>
                                Save As Paid
                            </Button>
                    }
                </div>
            </div>
        </div >
    );
}
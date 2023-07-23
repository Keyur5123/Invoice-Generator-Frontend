import React, { useState } from 'react';
import Constants from "../../Utilities/Constants/responseConstants";
import { Button } from '@mui/material';
import TextFieldControl from "../../Controls/TextFieldControl";
import Snackbar from '../../Components/Snackbar';
import { useInvoiceContext } from "../../Context/InvoiceContext"

function AddProductAndParty() {

    const { userData, token, getAllPartyNameAndProductsList } = useInvoiceContext();

    const [productDetails, setProductDetails] = useState({
        name: '',
        rate: ''
    });
    const [partyFermDetails, setPartyFermDetails] = useState({
        name: ''
    });

    const [productDetailsError, setproductDetailsError] = useState();
    const [partyFermError, setPartyFermError] = useState();

    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    });

    let ProductValidator = () => {
        let temp = {}
        temp.name = productDetails?.name ? '' : Constants.FIELD_REQUIRED
        temp.rate = productDetails?.rate ? '' : Constants.FIELD_REQUIRED
        setproductDetailsError(temp)
        return Object.values(temp).every(val => val == '')
    }

    let PartyFermValidator = () => {
        let temp = {}
        temp.name = productDetails?.name ? '' : Constants.FIELD_REQUIRED
        setPartyFermError(temp)
        return Object.values(temp).every(val => val == '')
    }

    let handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    let handleProductSubmit = async () => {
        if (ProductValidator() == true) {
            await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/save/add-new-product/${userData.userId}/v1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
                body: JSON.stringify({ name: productDetails.name, rate: productDetails.rate })
            })
                .then(res => res.json())
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
                })
        }
        else {
            setSnackbar({ ...snackbar, status: true, message: Constants.ALL_FIELD_REQUIRED, severity: Constants.ERROR });
        }
    }

    let handlePartyFermChange = (e) => {
        setPartyFermDetails({ ...partyFermDetails, [e.target.name]: e.target.value });
    }

    let handlePartyFermSubmit = async () => {
        if (PartyFermValidator() == true) {
            await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/save/add-new-partyFerm/${userData.userId}/v1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
                body: JSON.stringify({ name: partyFermDetails.name })
            })
                .then(res => res.json())
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
                })
        }
        else {
            setSnackbar({ ...snackbar, status: true, message: Constants.ALL_FIELD_REQUIRED, severity: Constants.ERROR });
        }
    }

    return (
        <>
            <div className='px-5 h-fit border-solid border-2 border-sky-400'>
                <Snackbar
                    snackbar={snackbar}
                    setSnackbar={setSnackbar}
                />
                <span className='mt-7 flex justify-center main-header'>Add Product</span>
                <div className='flex justify-center'>
                    <div>
                        <div className='flex items-center mt-5 justify-between min-w-[50%]'>
                            <h6 className='mr-5'>Name</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextFieldControl
                                size='small'
                                label="Product Name"
                                name="name"
                                variant="outlined"
                                onChange={handleChange}
                                error={productDetailsError?.name}
                            />
                        </div>
                        <div className='flex items-center mt-5 justify-between min-w-[50%]'>
                            <h6 className='mr-5'>Rate</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextFieldControl
                                size='small'
                                label="Rate"
                                name="rate"
                                variant="outlined"
                                onChange={handleChange}
                                error={productDetailsError?.rate}
                            />
                        </div>
                        <Button
                            sx={{ width: '100%', marginY: '20px' }}
                            variant="contained"
                            color='success'
                            onClick={handleProductSubmit}
                        >
                            Add New Product
                        </Button>
                    </div>
                </div>
            </div>

            <div className='px-5 mt-10 h-fit border-solid border-2 border-sky-400'>
                <span className='mt-7 flex justify-center main-header'>Add Party Ferm</span>
                <div className='flex justify-center'>
                    <div>
                        <div className='flex items-center mt-5 justify-between min-w-[50%]'>
                            <h6 className='mr-5'>Name</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextFieldControl
                                size='small'
                                label="Party Name"
                                name="name"
                                variant="outlined"
                                onChange={handlePartyFermChange}
                                error={partyFermError?.name}
                            />
                        </div>

                        <Button
                            sx={{ width: '100%', marginY: '20px' }}
                            variant="contained"
                            color='success'
                            onClick={handlePartyFermSubmit}
                        >
                            Add New Party
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProductAndParty
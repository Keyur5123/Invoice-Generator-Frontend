import React, { useState } from 'react';
import Constants from "../../Utilities/Constants/responseConstants";
import { Button } from '@mui/material';
import TextFieldControl from "../../Controls/TextFieldControl";
import Snackbar from '../../Components/Snackbar';
import { useInvoiceContext } from "../../Context/InvoiceContext";
import { upsertProducts, upsertPartyFerm } from "../../ApiController/ProductsAndPartyApis";

function AddProductAndParty({ snackbar, setSnackbar, setApiCallLoader }) {

    const { userData, token, getAllPartyNameAndProductsList } = useInvoiceContext();
    let userId = userData.userId;

    const [productDetails, setProductDetails] = useState({
        name: '',
        rate: ''
    });
    const [partyFermDetails, setPartyFermDetails] = useState({
        name: '',
        address: '',
        gstNo: ''
    });

    const [productDetailsError, setproductDetailsError] = useState();
    const [partyFermError, setPartyFermError] = useState();

    let ProductValidator = () => {
        let temp = {}
        temp.name = productDetails?.name ? '' : Constants.FIELD_REQUIRED
        temp.rate = productDetails?.rate ? '' : Constants.FIELD_REQUIRED
        setproductDetailsError(temp)
        return Object.values(temp).every(val => val == '')
    }

    let PartyFermValidator = () => {
        let temp = {}
        temp.name = partyFermDetails?.name ? '' : Constants.FIELD_REQUIRED
        temp.address = partyFermDetails?.address ? '' : Constants.FIELD_REQUIRED
        temp.gstNo = partyFermDetails?.gstNo ? '' : Constants.FIELD_REQUIRED
        setPartyFermError(temp)
        return Object.values(temp).every(val => val == '')
    }

    let handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    let handleProductSubmit = async () => {
        if (ProductValidator() == true) {
            setApiCallLoader(true);
            upsertProducts(productDetails, userId, token)
                .then(data => {
                    setApiCallLoader(false);
                    setProductDetails({
                        name: '',
                        rate: ''
                    })
                    if (data?.status == 401) {
                        setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                    }
                    else if (data?.err) {
                        setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                    }
                    else {
                        getAllPartyNameAndProductsList();
                        setSnackbar({ ...snackbar, status: true, message: Constants.PRODUCT_ADDED_SUCCESSFULLY, severity: Constants.SUCCESS });
                    }
                })
                .catch(error => {
                    setApiCallLoader(false);
                    setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
                });
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
            setApiCallLoader(true);
            upsertPartyFerm(partyFermDetails, userId, token)
                .then(data => {
                    setApiCallLoader(false);
                    setPartyFermDetails({
                        name: '',
                        address: '',
                        gstNo: ''
                    })
                    if (data?.status == 401) {
                        setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                    }
                    else if (data?.err) {
                        setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                    }
                    else {
                        getAllPartyNameAndProductsList();
                        setSnackbar({ ...snackbar, status: true, message: Constants.PARTY_ADDED_SUCCESSFULLY, severity: Constants.SUCCESS });
                    }
                })
                .catch(error => {
                    setApiCallLoader(false);
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
                                value={productDetails.name}
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
                                value={productDetails.rate}
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
                                value={partyFermDetails.name}
                                size='small'
                                label="Party Name"
                                name="name"
                                variant="outlined"
                                onChange={handlePartyFermChange}
                                error={partyFermError?.name}
                            />
                        </div>
                        <div className='flex items-center mt-5 justify-between min-w-[50%]'>
                            <h6 className='mr-5'>Address</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextFieldControl
                                value={partyFermDetails.address}
                                size='small'
                                label="Address"
                                name="address"
                                variant="outlined"
                                onChange={handlePartyFermChange}
                                error={partyFermError?.address}
                            />
                        </div>
                        <div className='flex items-center mt-5 justify-between min-w-[50%]'>
                            <h6 className='mr-5'>Gst No</h6> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextFieldControl
                                value={partyFermDetails.gstNo}
                                size='small'
                                label="Gst No"
                                name="gstNo"
                                variant="outlined"
                                onChange={handlePartyFermChange}
                                error={partyFermError?.gstNo}
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
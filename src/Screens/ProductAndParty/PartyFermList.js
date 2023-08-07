import React, { useState } from 'react';
import Constants from "../../Utilities/Constants/responseConstants";
import { useInvoiceContext } from "../../Context/InvoiceContext";
import ProductPartyAndUserInfoTable from '../../Components/Table/ProductPartyAndUserInfoTable';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { upsertPartyFerm, deletePartyFerm } from '../../ApiController/ProductsAndPartyApis';
import Modal from "../../Components/Modal";

function PartyFermList({ snackbar, setSnackbar }) {

    const { state, userData, token, getAllPartyNameAndProductsList } = useInvoiceContext();
    let userId = userData.userId;
    let { partyNameList } = state;

    const [searchParty, setSearchParty] = useState();
    const [operationStatus, setOperationStatus] = useState();
    const [open, setOpen] = useState(false);
    const [modelData, setModelData] = useState({});
    const [errors, setErrors] = useState({});

    const handleModelDataChange = (e) => {
        setModelData({ ...modelData, [e.target.name]: e.target.value });
    }

    const handleUpdateModelOpen = (partyList) => {
        setOperationStatus('update');
        setOpen(true);
        setModelData(partyList);
    }

    const handleDeleteModelOpen = (partyList) => {
        setOperationStatus('delete');
        setOpen(true);
        setModelData(partyList);
    }

    const validate = () => {
        let errObj = {};
        errObj.name = modelData.name ? '' : Constants.FIELD_REQUIRED
        errObj.address = modelData.address ? '' : Constants.FIELD_REQUIRED
        errObj.gstNo = modelData.gstNo ? '' : Constants.FIELD_REQUIRED
        setErrors({ ...errObj })
        return Object.values(errObj).every(item => item == '')
    }

    const handleUpdateItem = () => {
        if (validate() == true) {
            updateItem()
        }
    }

    const updateItem = () => {
        upsertPartyFerm(modelData, userId, token)
            .then(data => {
                setOpen(false);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                }
                else {
                    getAllPartyNameAndProductsList();
                    setSnackbar({ ...snackbar, status: true, message: Constants.PARTY_UPDATED_SUCCESSFULLY, severity: Constants.SUCCESS });
                }
            })
            .catch(error => {
                setOpen(false);
                setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
            });
    }

    const handleDeleteItem = (partyId) => {
        if (validate() == true) {
            deleteItem(partyId)
        }
    }

    const deleteItem = (partyId) => {
        deletePartyFerm(partyId, userId, token)
            .then(data => {
                setOpen(false);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                }
                else {
                    getAllPartyNameAndProductsList();
                    setSnackbar({ ...snackbar, status: true, message: data?.data?.data, severity: Constants.SUCCESS });
                }
            })
            .catch(error => {
                setOpen(false);
                setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
            });
    }

    return (
        <>
            <Modal
                isPartyFermModel={true}
                status={operationStatus}
                modelData={modelData}
                open={open}
                setOpen={setOpen}
                errors={errors}
                setErrors={setErrors}
                handleModelDataChange={handleModelDataChange}
                handleUpdateItem={handleUpdateItem}
                handleDeleteItem={handleDeleteItem}
            />
            <div className='mt-7 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-12'>
                <div className='flex justify-start '>
                    <FormControl fullWidth size='small'>
                        <InputLabel htmlFor="outlined-adornment-amount">Search by party name & gst no</InputLabel>
                        <OutlinedInput
                            onChange={(e) => setSearchParty(e.target.value)}
                            id="outlined-adornment-amount"
                            endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            label="Search by party name & gst no"
                        />
                    </FormControl>
                </div>
            </div>

            <ProductPartyAndUserInfoTable
                searchItem={searchParty}
                partyNameList={partyNameList}
                handleUpdateModelOpen={handleUpdateModelOpen}
                handleDeleteModelOpen={handleDeleteModelOpen}
            />
        </>
    )
}

export default PartyFermList;
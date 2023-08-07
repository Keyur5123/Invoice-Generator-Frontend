import React, { useEffect, useState } from 'react';
import Sidebar from "../../Components/Sidebar";
import Constants from "../../Utilities/Constants/responseConstants";
import { useInvoiceContext } from "../../Context/InvoiceContext";
import ProductPartyAndUserInfoTable from "../../Components/Table/ProductPartyAndUserInfoTable";
import { getAllUsers, updateUserDetials, deleteUserDetails } from '../../ApiController/UserApis';
import Snackbar from '../../Components/Snackbar';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";

function Index() {

    const { state, userData, token } = useInvoiceContext();
    let userId = userData.userId;

    const [allUsersList, setAllUserList] = useState();
    const [searchUser, setSearchUser] = useState('');
    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const getAllUserData = () => {
        setIsLoading(true);
        getAllUsers(userId, token)
            .then(data => {
                setIsLoading(false);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                }
                else {
                    setAllUserList(data.data);
                }
            })
            .catch(error => {
                setIsLoading(false);
                setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
            });
    }

    useEffect(() => {
        getAllUserData()
    }, []);

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
        if (partyList?._id == userId) {
            alert('cannot delete item');
            setSnackbar({ ...snackbar, status: true, message: Constants.CANNOT_DELETE_ITEM, severity: Constants.ERROR });
        }
        else {
            setOperationStatus('delete');
            setOpen(true);
            setModelData(partyList);
        }
    }

    const validate = () => {
        let errObj = {};
        errObj.user_name = modelData.user_name ? '' : Constants.FIELD_REQUIRED
        errObj.email = modelData.email ? '' : Constants.FIELD_REQUIRED
        errObj.roleId = modelData.roleId ? '' : Constants.FIELD_REQUIRED
        setErrors({ ...errObj })
        return Object.values(errObj).every(item => item == '')
    }

    const handleUpdateItem = () => {
        if (validate() == true) {
            updateItem()
        }
    }

    const updateItem = () => {
        updateUserDetials(userId, modelData, token)
            .then(data => {
                setOpen(false);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                }
                else {
                    getAllUserData();
                    setSnackbar({ ...snackbar, status: true, message: data.data, severity: Constants.SUCCESS });
                }
            })
            .catch(error => {
                setOpen(false);
                setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
            });
    }

    const handleDeleteItem = (userIdtoDelete) => {
        if (validate() == true) {
            deleteItem(userIdtoDelete)
        }
    }

    const deleteItem = (userToDeleteId) => {
        deleteUserDetails(userToDeleteId, token)
            .then(data => {
                setOpen(false);
                if (data?.status == 401) {
                    setSnackbar({ ...snackbar, status: true, message: Constants.USER_NOT_AUTHORIZED, severity: Constants.ERROR });
                }
                else if (data?.err) {
                    setSnackbar({ ...snackbar, status: true, message: data?.err?.err, severity: Constants.ERROR });
                }
                else {
                    getAllUserData();
                    setSnackbar({ ...snackbar, status: true, message: data?.data, severity: Constants.SUCCESS });
                }
            })
            .catch(error => {
                setOpen(false);
                setSnackbar({ ...snackbar, status: true, message: error.toString(), severity: Constants.ERROR });
            });
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Snackbar
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
            <Sidebar>
                <Modal
                    isUserModel={true}
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
                <div className='mt-7 mb-5 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-12'>
                    <div className='flex justify-start '>
                        <FormControl fullWidth size='small'>
                            <InputLabel htmlFor="outlined-adornment-amount">Search by user name</InputLabel>
                            <OutlinedInput
                                onChange={(e) => setSearchUser(e.target.value)}
                                id="outlined-adornment-amount"
                                endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                label="Search by user name"
                            />
                        </FormControl>
                    </div>
                </div>

                {allUsersList && <ProductPartyAndUserInfoTable
                    searchItem={searchUser}
                    allUsersList={allUsersList}
                    handleUpdateModelOpen={handleUpdateModelOpen}
                    handleDeleteModelOpen={handleDeleteModelOpen}
                />}
            </Sidebar>
        </>
    )
}

export default Index;
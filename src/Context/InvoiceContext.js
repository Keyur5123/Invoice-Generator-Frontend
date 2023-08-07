import { createContext, useState, useContext, useEffect, useReducer } from "react";
import reducer from "./InvoiceReducer";
import Constants from "../Utilities/Constants/responseConstants";

const AppContext = createContext();

const initialState = {
    isLoading: true,
    isUserAuthorized: true,
    invoiceList: [],
    partyNameList: [],
    productsList: [],
}

const AppProvider = ({ children }) => {
    let token = localStorage.getItem('invoice_dc_token');
    let userData = JSON.parse(localStorage.getItem('userData'));
    const [state, dispatch] = useReducer(reducer, initialState);

    const [contextSnackbar, setContextSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    })

    const getInvoiceList = (token) => {
        // dispatch({ type: 'SET_LOADING' })
        try {
            fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/check/allInvoices/${userData.userId}/v1`, {
                headers: { Authentication: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(response => {
                    dispatch({ type: 'SET_LOADING_OFF' })
                    if (response?.data?.status === 200) {
                        dispatch({ type: 'SET_INVOICE_DATA', payload: response.data.data })
                        // setContextSnackbar({ ...contextSnackbar, status: true, message: response.data.msg, severity: Constants.SUCCESS })
                    }
                    else if (response?.status === 401) {
                        dispatch({ type: 'SET_USER_NOT_AUTHORIZED' })
                        setContextSnackbar({ ...contextSnackbar, status: true, message: 'User not authorize', severity: Constants.ERROR })
                    }
                    else {
                        setContextSnackbar({ ...contextSnackbar, status: true, message: response?.data?.err, severity: Constants.ERROR })
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_LOADING_OFF' })
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message, severity: Constants.ERROR })
                })
        } catch (error) {
            dispatch({ type: 'SET_LOADING_OFF' })
            setContextSnackbar({ ...contextSnackbar, status: true, message: error.toString(), severity: Constants.ERROR })
        }
    }

    async function getAllPartyNameAndProductsList () {
        // dispatch({ type: 'SET_LOADING' })
        try {
            await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/check/all-products-and-partyFerms/${userData.userId}/v1`, {
                headers: { Authentication: `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(response => {
                    dispatch({ type: 'SET_LOADING_OFF' })
                    if (response?.data?.status == 200) {
                        dispatch({ type: 'SET_PARTY_NAME_AND_PRODUCTS_NAME', payload: response?.data?.data });
                        // setContextSnackbar({ ...contextSnackbar, status: true, message: response.data.msg, severity: Constants.SUCCESS })
                    }
                    else {
                        setContextSnackbar({ ...contextSnackbar, status: true, message: response?.data?.err, severity: Constants.ERROR });
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_LOADING_OFF' })
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err ? err.toString() : 'API ERROR', severity: Constants.ERROR });
                });
        } catch (error) {
            dispatch({ type: 'SET_LOADING_OFF' })
            setContextSnackbar({ ...contextSnackbar, status: true, message: error?.toString(), severity: Constants.ERROR });
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        token && getInvoiceList(token);
        token && getAllPartyNameAndProductsList();
    }, [token])

    return (
        <AppContext.Provider value={{ state, dispatch, contextSnackbar, setContextSnackbar, userData, token, getAllPartyNameAndProductsList }}>
            {children}
        </AppContext.Provider>
    )
};

// custom hooks
const useInvoiceContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useInvoiceContext }
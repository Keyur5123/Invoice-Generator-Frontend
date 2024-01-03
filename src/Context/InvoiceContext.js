import { createContext, useState, useContext, useEffect, useReducer } from "react";
import reducer from "./InvoiceReducer";
import Constants from "../Utilities/Constants/responseConstants";
import { decryptData } from "../Utilities/Cryoto";
import { getAllInvoices } from "../ApiController/InvoiceApis";
import { getAllPartyNameAndProducts } from "../ApiController/ProductsAndPartyApis";

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
    let storageRawUserData = localStorage.getItem('userData')
    let userData = storageRawUserData && decryptData(storageRawUserData);
    let [state, dispatch] = useReducer(reducer, initialState);

    let [contextSnackbar, setContextSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    });

    let [is_paidStatusUpdated, setIs_paidStatusUpdated] = useState(false);

    let getInvoiceList = (token) => {
        try {
            getAllInvoices(userData.userId, token)
                .then(response => {
                    dispatch({ type: 'SET_LOADING_OFF' })
                    if (response?.data?.status === 200) {
                        dispatch({ type: 'SET_INVOICE_PRODUCT_PARTY_DATA', payload: response.data.data })
                        // setContextSnackbar({ ...contextSnackbar, status: true, message: response.data.msg, severity: letants.SUCCESS })
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
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message ?? err ? err.toString() : 'API ERROR', severity: Constants.ERROR })
                })
        } catch (error) {
            dispatch({ type: 'SET_LOADING_OFF' })
            setContextSnackbar({ ...contextSnackbar, status: true, message: error ? error.toString() : 'API ERROR', severity: Constants.ERROR })
        }
    }

    let getAllPartyNameAndProductsList = async () => {
        try {
            getAllPartyNameAndProducts(userData.userId, token)
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
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message ?? err ? err.toString() : 'API ERROR', severity: Constants.ERROR });
                });
        } catch (err) {
            dispatch({ type: 'SET_LOADING_OFF' })
            setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message ?? err ? err.toString() : 'API ERROR', severity: Constants.ERROR });
        }
    }

    useEffect(() => {
        dispatch({ type: 'SET_LOADING' })
        token && getInvoiceList(token);
        token && getAllPartyNameAndProductsList();
    }, [token])

    return (
        <AppContext.Provider value={
            {
                state,
                dispatch,
                contextSnackbar,
                setContextSnackbar,
                is_paidStatusUpdated,
                setIs_paidStatusUpdated,
                userData,
                token,
                getAllPartyNameAndProductsList
            }
        }>
            {children}
        </AppContext.Provider>
    )
};

// custom hooks
const useInvoiceContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useInvoiceContext }
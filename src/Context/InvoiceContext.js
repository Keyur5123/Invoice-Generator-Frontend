import { createContext, useState, useContext, useEffect, useReducer } from "react";
import reducer from "./InvoiceReducer";
import Constants from "../Utilities/Constants/responseConstants";

const AppContext = createContext();

const initialState = {
    isLoading: true,
    isUserAuthorized: true,
    invoiceList: [],
    partyList: [],
    products: [],
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
        dispatch({ type: 'SET_LOADING' })
        try {
            fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/check/allInvoices/${userData.userId}/v1`,{
                headers: {Authentication: `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(response => {
                    if(response?.data?.status === 200){
                        dispatch({ type: 'SET_INVOICE_DATA', payload: response.data.data })
                        setContextSnackbar({ ...contextSnackbar, status: true, message: response.data.msg, severity: Constants.SUCCESS })
                    }
                    else if(response?.status === 401) {
                        dispatch({ type: 'SET_USER_NOT_AUTHORIZED' })
                        setContextSnackbar({ ...contextSnackbar, status: true, message: 'User not authorize', severity: Constants.ERROR })
                    }
                    else {
                        dispatch({ type: 'SET_API_ERROR' })
                        setContextSnackbar({ ...contextSnackbar, status: true, message: response?.data?.err, severity: Constants.ERROR })
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_API_ERROR' })
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err?.message, severity: Constants.ERROR })
                })
        } catch (error) {
            dispatch({ type: 'SET_API_ERROR' })
            setContextSnackbar({ ...contextSnackbar, status: true, message: error, severity: Constants.ERROR })
        }
    }

    useEffect(() => {
        token && getInvoiceList(token);
    }, [token])

    return (
        <AppContext.Provider value={{ state, dispatch, contextSnackbar, setContextSnackbar, userData }}>
            {children}
        </AppContext.Provider>
    )
};

// custom hooks
const useInvoiceContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useInvoiceContext }
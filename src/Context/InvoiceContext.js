import { createContext, useState, useContext, useEffect, useReducer } from "react";
import reducer from "./InvoiceReducer";
import Constants from "../Utilities/Constants/responseConstants";

const AppContext = createContext();

const initialState = {
    isLoading: true,
    invoiceList: [],
    partyList: [],
    products: [],
}

const AppProvider = ({ children }) => {
    let token = localStorage.getItem('token');
    const [state, dispatch] = useReducer(reducer, initialState);

    const [contextSnackbar, setContextSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    })

    const getInvoiceList = (token) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            fetch('http://localhost:4000/darshan-creation/check/allInvoices/1/v1',{
                headers: {Authentication: `Bearer ${token}`}
            })
                .then(res => res.json())
                .then(response => {
                    if(response.data.status === 200){
                        dispatch({ type: 'SET_INVOICE_DATA', payload: response.data.data })
                    }
                    else {
                        dispatch({ type: 'SET_API_ERROR' })
                        setContextSnackbar({ ...contextSnackbar, status: true, message: response.data.err, severity: Constants.ERROR })
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_API_ERROR' })
                    setContextSnackbar({ ...contextSnackbar, status: true, message: err.message, severity: Constants.ERROR })
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
        <AppContext.Provider value={{ state, dispatch, contextSnackbar, setContextSnackbar }}>
            {children}
        </AppContext.Provider>
    )
};

// custom hooks
const useInvoiceContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useInvoiceContext }
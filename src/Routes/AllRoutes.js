import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import GeneratePdf from '../Components/pdfComponents/GeneratePdf';
import AddNewInvoice from '../Screens/Invoice/addNewInvoice/AddNewInvoice';
import InvoicesList from "../Screens/Invoice";
import ProductAndParty from "../Screens/ProductAndParty";
import DashBoard from "../Screens/dashboard";
import SignIn from "../Screens/authentication/SignIn";
import SignUp from "../Screens/authentication/SignUp";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from "../Screens/NotFoundPage";

function AnimatedRoutes() {
    const location = useLocation();
    let token = localStorage.getItem("invoice_dc_token");
    
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {token
                    ?
                    <React.Fragment>
                        <Route path="/" element={<ProtectedRoute token={token} Component={DashBoard} />} />
                        <Route path="/dashboard" element={<ProtectedRoute token={token} Component={DashBoard} />} />
                        <Route path="/add-new-invoice" element={<ProtectedRoute token={token} Component={AddNewInvoice} />} />
                        <Route path="/generate-invoice-pdf/:invoice_id" element={<ProtectedRoute token={token} Component={GeneratePdf} />} />
                        <Route path="/invoice-list" element={<ProtectedRoute token={token} Component={InvoicesList} />} />
                        <Route path="/manage-product-and-party" element={<ProtectedRoute token={token} Component={ProductAndParty} />} />
                        <Route path="/not-found" element={<NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </React.Fragment>
                }

            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
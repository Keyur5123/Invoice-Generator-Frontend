import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import Sidebar from "../../Components/Sidebar";
import AnalyseCard from "./components/AnalyseCard";
import Table from "../../Components/Table";
import { motion } from "framer-motion";
import { useInvoiceContext } from "../../Context/InvoiceContext";
import Charts from "../../Components/Charts/LogRocket";
import { useNavigate } from 'react-router-dom';
import Loader from "../../Components/Loader";

import Snackbar from '../../Components/Snackbar';

// icons
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Dashboard() {
    let navigate = useNavigate();
    let { state, contextSnackbar, setContextSnackbar, is_paidStatusUpdated, setIs_paidStatusUpdated } = useInvoiceContext();
    let { invoiceList, isUserAuthorized, isLoading } = state
    let [totalPcs, setTotalPcs] = useState(0);
    let [totalAmount, setTotalAmount] = useState(0);
    let [moneyToBeTaken, setMoneyToBeTaken] = useState(0);
    let [moneyToBeGranted, setMoneyToBeGranted] = useState(0);

    useEffect(() => {
        let TotalRevenue = invoiceList?.reduce((prev, next) => prev + next._id.billTotalAmount, 0);
        setTotalAmount(TotalRevenue);

        calcMoneyToBeTakenAndGranted(invoiceList)
    }, [invoiceList, is_paidStatusUpdated]);

    function calcMoneyToBeTakenAndGranted() {
        let moneyToBeTaken = 0;
        let moneyToBeGranted = 0;

        invoiceList.forEach(element => {
            if (element._id.paymentEntryStatus == 'in' && element._id.is_paid == false) {
                moneyToBeTaken += element._id.billTotalAmount
            }
            else if (element._id.is_paid == false) {
                moneyToBeGranted += element._id.billTotalAmount
            }
        });

        setMoneyToBeTaken(moneyToBeTaken);
        setMoneyToBeGranted(moneyToBeGranted);
    }

    if (isLoading) {
        return <Loader />
    }

    if (!isUserAuthorized) {
        localStorage.removeItem('invoice_dc_token');
        localStorage.removeItem('userData');
        navigate('/login');
    }

    return (
        <Sidebar>
            <div>
                <Snackbar
                    snackbar={contextSnackbar}
                    setSnackbar={setContextSnackbar}
                />
            </div>
            <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', duration: 0.4 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={3}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                        >
                            <AnalyseCard
                                header="Total Revenue"
                                amount={totalAmount}
                                trend="+55 %"
                                icon={
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#fff" }} />
                                }
                            />

                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                        >
                            <AnalyseCard
                                header="Total PCS"
                                amount={totalPcs}
                                trend="+10 %"
                                icon={
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#fff" }} />
                                }
                            />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                        >
                            <AnalyseCard
                                header="લેવાના બાકી"
                                amount={moneyToBeTaken}
                                trend="+55 %"
                                icon={
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#fff" }} />
                                }
                            />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                        >
                            <AnalyseCard
                                header="આપવાના બાકી"
                                amount={moneyToBeGranted}
                                trend="+55 %"
                                icon={
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#fff" }} />
                                }
                            />
                        </motion.div>
                    </Grid>
                </Grid>

                <div className='mb-7'>
                    <Charts invoiceList={invoiceList} setTotalPcs={setTotalPcs} />
                </div>

                <>
                    <Table
                        isExtractable={false}
                        invoiceList={invoiceList}
                        isPaginationAllowed={true}
                        contextSnackbar={contextSnackbar}
                        setContextSnackbar={setContextSnackbar}
                        is_paidStatusUpdated={is_paidStatusUpdated}
                        setIs_paidStatusUpdated={setIs_paidStatusUpdated}
                    />
                </>
            </motion.div>
        </Sidebar >
    )
}

export default Dashboard
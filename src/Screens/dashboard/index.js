import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material';
import Sidebar from "../../Components/Sidebar";
import AnalyseCard from "./components/AnalyseCard";
import Table from "../../Components/Table";
import { motion } from "framer-motion";
import { useInvoiceContext } from "../../Context/InvoiceContext";
import Charts from "../../Components/Charts/LogRocket"

// icons
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Dashboard() {
    const { state } = useInvoiceContext();
    let { invoiceList } = state
    const [totalPcs, setTotalPcs] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let amount = invoiceList.reduce((prev,next) => prev + next._id.billTotalAmount, 0);
        setTotalAmount(amount)
    },[invoiceList]);

    return (
        <Sidebar>
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
                                header="Potential Amount"
                                amount="2,00,000"
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
                                header="Potential Amount"
                                amount="2,00,000"
                                trend="+55 %"
                                icon={
                                    <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#fff" }} />
                                }
                            />
                        </motion.div>
                    </Grid>
                </Grid>

                <Charts invoiceList={invoiceList} setTotalPcs={setTotalPcs} />

                <Box>
                    <Grid sx={{ marginTop: "0px" }} container spacing={3}>
                        <Grid item xs={12} sm={12} xl={9}>
                            <Table
                                isExtractable={false}
                                invoiceList={invoiceList}
                                isPaginationAllowed={false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} xl={3}>
                            <Table
                                isExtractable={false}
                                invoiceList={invoiceList}
                                isPaginationAllowed={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </Sidebar >
    )
}

export default Dashboard
import React, { useState } from 'react';

import Sidebar from '../../Components/Sidebar/index';
import CenteredTabs from "../../Components/Tabs/CenteredTabs";
import AddProductAndParty from './AddProductAndParty';
import ProductList from './ProductList';
import PartyFermList from './PartyFermList';
import { useInvoiceContext } from "../../Context/InvoiceContext";
import Snackbar from '../../Components/Snackbar';
import Loader from "../../Components/Loader";

function Index() {

    const { state } = useInvoiceContext();
    let { isLoading } = state;

    const [currTab, setCurrTab] = useState(0);
    const [snackbar, setSnackbar] = useState({
        status: false,
        message: '',
        severity: ''
    })

    const [apiCallLoader, setApiCallLoader] = useState(false);

    if (isLoading || apiCallLoader) {
        return <Loader />
    }

    return (
        <>
            <Snackbar
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
            <Sidebar>
                <CenteredTabs
                    currTab={currTab}
                    setCurrTab={setCurrTab}
                />
                {currTab == 0 ?
                    <AddProductAndParty
                        snackbar={snackbar}
                        setSnackbar={setSnackbar}
                        setApiCallLoader={setApiCallLoader}
                    />
                    :
                    currTab == 1 ?
                        <>
                            <ProductList
                                snackbar={snackbar}
                                setSnackbar={setSnackbar}
                            />
                        </>
                        :
                        <>
                            <PartyFermList
                                snackbar={snackbar}
                                setSnackbar={setSnackbar}
                            />
                        </>
                }
            </Sidebar>
        </>
    )
}

export default Index;
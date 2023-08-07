import React, { Fragment, useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Table from "./Table";
import { useInvoiceContext } from "../../Context/InvoiceContext";
import { useParams } from "react-router-dom";

function GeneratePdf() {
    let { isLoading, state } = useInvoiceContext();
    let { invoiceList } = state;
    let { invoice_id } = useParams();

    const [invoiceData, setInvoiceData] = useState([]);

    useEffect(() => {
        let filteredInvoices = invoiceList?.filter(invoice => {
            if (invoice._id._id == invoice_id) {
                return invoice
            }
        });

        setInvoiceData(filteredInvoices);
    }, [invoiceList]);

    if (isLoading) {
        return <p>Loading ....</p>
    }

    return (
        <Fragment>
                <PDFViewer width="100%" style={{ height: '100vh' }}>
                    {invoiceData.length > 0 && <Table invoiceList={invoiceData[0]} />}
                </PDFViewer>
        </Fragment>
    )
}

export default GeneratePdf
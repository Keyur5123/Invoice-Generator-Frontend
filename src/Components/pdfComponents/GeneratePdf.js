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
    // const [data, setData] = useState({
    //     user_code: "6418a3a460d617f446e86e52",
    //     party_name: "party_name",
    //     address: "address",
    //     bill_no: "11",
    //     date: "12-02-11",
    //     billItems: [
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "123",
    //             products_list: [
    //                 {
    //                     name: "Abc",
    //                     rate: "100"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "1000"
    //         },
    //         {
    //             partyChNo: "124ssss",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //         {
    //             partyChNo: "124ssss",
    //             products_list: [
    //                 {
    //                     name: "XYZ",
    //                     rate: "200"
    //                 }
    //             ],
    //             pcs: "1",
    //             mtr: "0",
    //             item_amount: "200"
    //         },
    //     ],
    //     discount: 5,
    //     gst: 18,
    //     sgst: 0,
    //     igst: 0,
    //     tds: 0,
    //     billTotalAmount: 1000
    // })

    useEffect(() => {
        let filteredInvoices = invoiceList?.filter(invoice => {
            if(invoice._id._id == invoice_id){
                console.log(">>>>>>>>>",invoice);
                return invoice
            }else {
                console.log("===========");
            } 
        })
        console.log("filteredInvoices :- ",filteredInvoices);
        setInvoiceData(filteredInvoices)
    },[invoiceList])

    console.log("invoiceData :- ",invoiceData);

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
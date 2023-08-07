import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    margin: 20,
    color: 'blue',
    flex: 1,
  }
});

const ItemsTable = ({ invoiceList }) => {
  let subHeaderData = {};
  subHeaderData.party_name = invoiceList._id.party_name;
  subHeaderData.address = invoiceList._id.address;
  subHeaderData.bill_no = invoiceList._id.bill_no;
  subHeaderData.date = invoiceList._id.date_created;
  subHeaderData.partyChNo = invoiceList.billItems.map((item) => {
    return item.partyChNo
  });

  return (
    <View style={styles.tableContainer} >
      <TableHeader subHeaderData={subHeaderData} />
      <TableRow items={invoiceList.billItems} />
      <TableFooter
        discount={invoiceList._id.discount}
        igst={invoiceList._id.igst}
        sgst={invoiceList._id.sgst}
        cgst={invoiceList._id.cgst}
        tds={invoiceList._id.tds}
        billTotalAmount={invoiceList._id.billTotalAmount}
      />
    </View >
  )
};

export default ItemsTable;
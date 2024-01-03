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
  let HeaderData = {};
  HeaderData.party_name = invoiceList._id.party_name;
  HeaderData.address = invoiceList._id.address;
  HeaderData.bill_no = invoiceList._id.bill_no;
  HeaderData.date = invoiceList._id.date_created;
  HeaderData.partyChNo = invoiceList.billItems.map((item) => {
    return item.partyChNo
  });

  return (
    <View style={styles.tableContainer} >
      <TableHeader HeaderData={HeaderData} />
      <TableRow items={invoiceList.billItems} totalAmountBeforeDiscount={invoiceList._id.billSubTotalAmount} />
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
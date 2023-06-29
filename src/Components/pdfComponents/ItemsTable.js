import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableFooter from "./TableFooter";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    margin : 20,
    color : 'blue',
    flex : 1,
  }
});

const ItemsTable = ({ invoiceList }) => {
  console.log("invoiceList >>>>>>> ",invoiceList);
  let subHeaderData = {};
  subHeaderData.party_name = invoiceList._id.party_name;
  subHeaderData.address = invoiceList._id.address;
  subHeaderData.bill_no = invoiceList._id.bill_no;
  subHeaderData.date = invoiceList._id.date_created;
  subHeaderData.partyChNo = invoiceList.billItems.map((item) => {
    return item.partyChNo
  })

  return (
    <View style={styles.tableContainer}>
      <TableHeader subHeaderData={subHeaderData} />
      <TableRow items={invoiceList.billItems} />
      <TableFooter 
        discount={invoiceList.discount} 
        gst={invoiceList.gst} 
        sgst={invoiceList.sgst}  
        cgst={invoiceList.cgst} 
        tds={invoiceList.tds}
        billTotalAmount={invoiceList.billTotalAmount}
        />
    </View>
  )
};

export default ItemsTable;
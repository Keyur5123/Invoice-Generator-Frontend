import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
    height : "100vh",
  },
});

const Table = ({ invoiceList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {invoiceList && <ItemsTable invoiceList={invoiceList} />}
    </Page>
  </Document>
);

export default Table;
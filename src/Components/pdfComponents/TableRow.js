import React, { Fragment, useState } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
    },
    TableRowRoot: {
        borderBottom: "1px solid blue",
        borderLeft: "1px solid blue",
        borderRight: "1px solid blue",
        height: "55%"
    },
    TableRowHeader: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid blue",
    },
    TableRowBody: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    TablePan: {
        paddingLeft: "170px",
        paddingBottom: "2px"
    },
    panNO: {
        fontSize: "14px",
        fontWeight: "bold"
    }
});

let TableRow = ({ items }) => {

    const [tableHeaders, setTableHeaders] = useState([
        {
            No: "",
            width: "10%",
        },
        {
            partyChNo: "",
            width: "15%",
        },
        {
            Description: "",
            width: "30%",
        },
        {
            PCS: "",
            width: "10%",
        },
        {
            Mtr: "",
            width: "10%",
        },
        {
            Rate: "",
            width: "10%",
        },
        {
            Amount: "",
            width: "15%",
        },
    ])

    let headers = tableHeaders.map((item, index) => (
        <View
            style={
                index == 6 ?
                    { width: `${item.width}`, textAlign: "center", padding: "10px 0px" }
                    :
                    { width: `${item.width}`, textAlign: "center", borderRight: '1px solide blue', padding: "10px 0px" }
            }
            key={index}
        >
            <Text>{Object.keys(item)[0]}</Text>
        </View>
    ))

    let rows = items.map((item, index) => (
        <View style={styles.row} key={index}>
            <Text style={{ width: `${tableHeaders[0].width}`, padding: "10px 0px" }}> {index + 1} </Text>
            <Text style={{ width: `${tableHeaders[1].width}`, padding: "10px 0px" }}> {item.partyChNo} </Text>
            <Text style={{ width: `${tableHeaders[2].width}`, padding: "10px 0px" }}>{item.products[0].name}</Text>
            <Text style={{ width: `${tableHeaders[3].width}`, padding: "10px 0px" }}>{item.pcs}</Text>
            <Text style={{ width: `${tableHeaders[4].width}`, padding: "10px 0px" }}>{item.mtr}</Text>
            <Text style={{ width: `${tableHeaders[5].width}`, padding: "10px 0px" }}>{item.products[0].rate}</Text>
            <Text style={{ width: `${tableHeaders[6].width}`, padding: "10px 0px" }}>{item.item_amount}</Text>
        </View>
    ));
    return (
        <View style={styles.TableRowRoot}>
            <View style={styles.TableRowHeader}>
                {headers}
            </View>
            <View style={styles.TableRowBody}>
                <View>
                    {rows}
                </View>
                <View style={styles.TablePan}>
                    <Text style={styles.panNO}>Pan no. A0MPP6852K</Text>
                </View>
            </View>
        </View>);
};

export default TableRow;
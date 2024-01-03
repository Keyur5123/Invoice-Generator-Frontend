import React, { Fragment, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    TableRowRoot: {
        borderBottom: "1px solid blue",
        borderLeft: "1px solid blue",
        borderRight: "1px solid blue",
        height: "50%"
    },
    TablePan: {
        paddingLeft: "26%",
        paddingBottom: "2px"
    },
    GstNo: {
        fontSize: "12px",
        fontWeight: "bold"
    },
    TableFooter: {
        display: 'flex',
        flexDirection: 'row'
    },
    Tabletotal: {
        paddingLeft: "24%",
        paddingBottom: "2px"
    },
    TabletotalAmount: {
        paddingLeft: "4%",
        paddingBottom: "2px"
    }
});

let TableRow = ({ items, totalAmountBeforeDiscount }) => {

    const [tableHeaders, setTableHeaders] = useState([
        {
            No: "",
            width: "10%",
        },
        {
            PartyChNo: "",
            width: "15%",
        },
        {
            Description: "",
            width: "30%",
        },
        {
            Pcs: "",
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
                    { display: 'flex', flexDirection: 'column', width: `${item.width}`, textAlign: "center", padding: "10px 0px" }
                    :
                    { display: 'flex', flexDirection: 'column', width: `${item.width}`, textAlign: "center", borderRight: '1px solide blue', padding: "10px 0px" }
            }
            key={index}
        >
            <Text>{Object.keys(item)[0]}</Text>
        </View>
    ));

    return (
        <View style={styles.TableRowRoot}>
            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid blue' }}>
                {headers}
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[0].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{index + 1}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[1].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.partyChNo}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[2].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.products[0].name}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[3].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.pcs}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[4].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.mtr}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid blue', width: tableHeaders[5].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.products[0].rate}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', width: tableHeaders[6].width }}>
                    {items.map((item, index) => (
                        <View style={{ padding: '10px 0px', textAlign: 'center' }}>
                            <Text key={index}>{item.item_amount}</Text>
                        </ View>
                    ))}
                </View>
            </View>

            <View style={styles.TableFooter}>
                <View style={styles.TablePan}>
                    <Text style={styles.GstNo}>GSTIN 24A0MPP6852K1ZC</Text>
                </View>
                <View style={styles.Tabletotal}>
                    <Text style={styles.GstNo}>Total :- </Text>
                </View>
                <View style={styles.TabletotalAmount}>
                    <Text style={styles.GstNo}>{totalAmountBeforeDiscount}</Text>
                </View>
            </View>
        </View>);
};

export default TableRow;
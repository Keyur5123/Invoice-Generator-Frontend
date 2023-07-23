import React from 'react';
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    TableHeader: {
        width: "100%",
        border: "1px solid blue"
    },
    TablePrimaryHeader: {
        flexDirection: 'row'
    },
    JobBill: {
        backgroundColor: 'blue',
        borderBottomRightRadius: "15px",
        padding: "5px",
        paddingRight: "10px",
        color: "white"
    },
    ganeshay_namah: {
        fontSize: 11,
        alignItems: "center",
        display: 'flex',
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    TableSubHeader: {
        display: 'flex',
        padding: "2px 0px 10px 0px",
        borderBottom: "1px solid blue",
        alignItems: "center",
    },
    TableSubHeaderAddress: {
        paddingTop: "5px"
    },
    slogan: {
        paddingTop: "5px"
    },
    TableSubHeaderHeading: {
        fontSize: 26,
        paddingBottom: "5px",
        justifyContent: "center",
        alignContent: "center",
    },
    TableSubHeaderBorder: {
        width: "80%",
        justifyContent: "center",
        alignContent: "center",
        borderBottom: "1px solid blue",
    },
    HeaderInfo: {
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    HeaderElements: {
        display: "flex",
        flexDirection: "row",
        margin: "2px 0px"
    },
    HeaderName: {
        marginRight: "10px",
    },
    HeaderElementsBorder: {
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        borderBottom: "1px solid blue",
    }
});

function TableHeader({ subHeaderData }) {
    return (
        <View style={styles.TableHeader}>
            <View style={styles.TablePrimaryHeader}>
                <Text style={styles.JobBill}>Job Bill</Text>
                <View style={styles.ganeshay_namah}>
                    <Text>Shree 1 |</Text>
                    <Text>Shree ganeshay namah</Text>
                    <Text>Sitaram</Text>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: '2px' }}>
                    <Text style={{ marginLeft : '10%'}}>Subh</Text>
                    <Text style={{ marginRight : '10%'}}>Labh</Text>
            </View>
            <View style={styles.TableSubHeader}>
                <Text style={styles.TableSubHeaderHeading}><Text style={{ fontSize: '29' ,fontWeight: '900' }}>D</Text>arshan <Text style={{ fontSize: '29' ,fontWeight: '900' }}>C</Text>reation</Text>
                <View style={styles.TableSubHeaderBorder}></View>
                <Text style={styles.TableSubHeaderAddress}>B/31,3rd Floor, Akshardham Soc./Kapodra, Varachha Road, Surat - 6</Text>
                <Text>Mo. 9998410484</Text>
                <Text style={styles.slogan}>Om namo hanumate bhaybhanjanaya sukham kuru phat swaha :</Text>
            </View>
            <View style={styles.HeaderInfo}>
                <View>
                    <View style={styles.HeaderElements}>
                        <Text style={{ marginRight: "20px" }}>Party Name.</Text>
                        <View style={styles.HeaderElementsBorder}>
                            <Text>{subHeaderData.party_name}</Text>
                        </View>
                    </View>
                    <View style={styles.HeaderElements}>
                        <Text style={{ marginRight: "10px" }}>Add.</Text>
                        <View style={styles.HeaderElementsBorder}>
                            <Text>{subHeaderData.address}</Text>
                        </View>
                    </View>
                    <View style={styles.HeaderElements}>
                        <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', borderBottom: '1px solid blue', paddingTop: '12px' }}>
                            <Text>{''}</Text>
                            {/* <Text>{subHeaderData.address}</Text> */}
                        </View>
                    </View>
                </View>
                <View style={{ marginLeft: "10px" }}>
                    <View style={styles.HeaderElements}>
                        <Text style={{ marginRight: "10px" }}>Bill No.</Text>
                        <View style={styles.HeaderElementsBorder}>
                            <Text>{subHeaderData.bill_no}</Text>
                        </View>
                    </View>
                    <View style={styles.HeaderElements}>
                        <Text style={{ marginRight: "20px" }}>Party Ch No.</Text>
                        <View style={styles.HeaderElementsBorder}>
                            <Text>{subHeaderData.partyChNo.join(',')}</Text>
                        </View>
                    </View>
                    <View style={styles.HeaderElements}>
                        <Text style={{ marginRight: "10px" }}>Date :</Text>
                        <View style={styles.HeaderElementsBorder}>
                            <Text>{subHeaderData.date}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default TableHeader;
import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    TableFooter: {
        width: "100%",
        flex: 1,
        borderBottom: '1px solid blue',
        borderLeft: '1px solid blue',
        borderRight: '1px solid blue',
        padding : "5px 10px",
    },
    TableFooterItem : {
        justifyContent : "space-between",
        display: 'flex',
        flexDirection: "row",
        flex: 2,
    },
    RupeesInWords : {
        flex : 2/3,
    },
    Taxs : {
        flex : 1/3,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    TearmsAndConditions : {
        flex : 2/3,
        paddingBottom : '2px',
        fontSize: "10px"
    },
    TearmsAndConditionItems : {
        paddingTop : '2px'
    },
    TaxName : {
        display: 'flex',
        flexDirection: "row",
        // justifyContent : "space-between",      // this will place number at the end of _____ (looks ocward)...
        width: "100%",
        borderBottom: "1px solid blue",
    },
    Stemp : {
        flex : 1/3,
    },
    StempFor : {
        marginTop:'10px',
        fontSize:"14px",
        textAlign: "center"
    },
    StempCompanyName : {
        fontSize:"16px",
        fontWeight : "bold",
        textAlign: "center"
    },
});

function TableFooter({ discount, igst, sgst, cgst, tds, billTotalAmount }) {
    
    return (
        <View style={styles.TableFooter}>
            <View style={styles.TableFooterItem}>
                <View style={styles.RupeesInWords}>
                    <Text>Rupees In Words :</Text>
                </View>
                <View style={styles.Taxs}>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Disc. %</Text>
                        <Text style={{ paddingLeft: "23px" }}>{discount}</Text>   
                        {/* // paddingRight: "10px" in case of justify-between */}
                    </View>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Sgst %</Text>
                        <Text style={{ paddingLeft: "25px" }}>{sgst}</Text>
                    </View>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Cgst %</Text>
                        <Text style={{ paddingLeft: "24px" }}>{cgst}</Text>
                    </View>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Igst %</Text>
                        <Text style={{ paddingLeft: "30px" }}>{igst}</Text>
                    </View>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Tds %</Text>
                        <Text style={{ paddingLeft: "29px" }}>{tds}</Text>
                    </View>
                    <View style={styles.TaxName}>
                        <Text style={{ paddingLeft : "5px"}}>Total</Text>
                        <Text style={{ paddingLeft: "39px" }}>{billTotalAmount}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.TableFooterItem}>
                <View style={styles.TearmsAndConditions}>
                    <Text>Tearms and Conditions :</Text>
                    <Text style={styles.TearmsAndConditionItems}>1. Payment within 15 Days, late payment will be charged@% P.M. As interest.</Text>
                    <Text style={styles.TearmsAndConditionItems}>2. Make Payment by. A/c. Pay cheque only.</Text>
                    <Text style={styles.TearmsAndConditionItems}>3. Any complain regarding rate different must be made within 24 hours after the receipt of the bill.</Text>
                    <Text style={styles.TearmsAndConditionItems}>4. The complain receive there after will not be entertained. Subject to SURAT Jurisdiction.</Text>
                </View>
                <View style={styles.Stemp}>
                    <Text style={styles.StempFor}>For,</Text>
                    <Text style={styles.StempCompanyName}>Darshan Creation</Text>
                </View>
            </View>
        </View>
    );
}

export default TableFooter;
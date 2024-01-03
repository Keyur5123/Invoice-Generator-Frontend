function InvoiceReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true
            }

        case 'SET_USER_NOT_AUTHORIZED':
            return {
                ...state,
                isUserAuthorized: false
            }

        case 'SET_LOADING_OFF':
            return {
                ...state,
                isLoading: false
            }

        case 'SET_INVOICE_PRODUCT_PARTY_DATA':
            let invoiceList = action.payload;
            let products = [];
            let partyList = [];

            invoiceList.forEach(invoices => {
                let oldParty = partyList.some(party => party.party_name === invoices._id.party_name)
                !oldParty && partyList.push({
                    party_name: invoices._id.party_name,
                    address: invoices._id.address
                })

                return invoices.billItems.forEach(element => {
                    return products.push(element.products[0])
                });
            })

            return {
                ...state,
                isLoading: false,
                invoiceList: invoiceList,
                products: products
            }

        case 'SET_INVOICE_LIST':
            let updatedInvoiceArr = action.payload.data.data;
            return {
                ...state,
                invoiceList: updatedInvoiceArr
            }


        case 'SET_PARTY_NAME_AND_PRODUCTS_NAME':
            return {
                ...state,
                partyNameList: action.payload.partyNameList,
                productsList: action.payload.ProductsList
            }

        case 'ADD_NEW_INVOICE':
            let tempArr = [...state?.invoiceList];
            let tempObj = {};
            let tempModifiedArr = [];

            tempObj._id = {
                "_id": action.payload._id,
                "party_name": action.payload.party_name,
                "address": action.payload.address,
                "paymentEntryStatus": action.payload.paymentEntryStatus,
                "bill_no": action.payload.bill_no,
                "discount": action.payload.discount,
                "igst": action.payload.igst,
                "sgst": action.payload.sgst,
                "cgst": action.payload.cgst,
                "tds": action.payload.tds,
                "is_paid": action.payload.is_paid,
                "billSubTotalAmount": action.payload.billSubTotalAmount,
                "billTotalAmount": action.payload.billTotalAmount,
                "date_created": action.payload.date_created
            }

            action.payload.billItems.map(item => {
                let modifiedObj = {
                    "partyChNo": item.partyChNo,
                    "pcs": item.pcs,
                    "mtr": item.mtr,
                    "item_amount": item.item_amount,
                    "products": [
                        {
                            "name": item.description,
                            "rate": item.rate,
                        }
                    ]
                }
                tempModifiedArr.push(modifiedObj)
            })

            tempObj.billItems = tempModifiedArr
            tempArr.unshift(tempObj)
            return {
                ...state,
                isLoading: false,
                invoiceList: tempArr
            }

        case 'UPDATE_INVOICE':
            let invoiceArr = state.invoiceList;
            let edited_bill = action.payload

            invoiceArr.forEach((tempObj) => {
                if (tempObj._id._id == edited_bill._id._id) {

                    tempObj._id = {
                        "_id": edited_bill._id._id,
                        "party_name": edited_bill._id.party_name,
                        "address": edited_bill._id.address,
                        "paymentEntryStatus": edited_bill._id.paymentEntryStatus,
                        "bill_no": edited_bill._id.bill_no,
                        "discount": edited_bill._id.discount,
                        "igst": edited_bill._id.igst,
                        "sgst": edited_bill._id.sgst,
                        "cgst": edited_bill._id.cgst,
                        "tds": edited_bill._id.tds,
                        "billSubTotalAmount": edited_bill._id.billSubTotalAmount,
                        "billTotalAmount": edited_bill._id.billTotalAmount,
                        "date_created": edited_bill._id.date_created
                    }

                    let tempModifiedArr = [];
                    edited_bill.billItems.billItems.map(item => {
                        let modifiedObj = {
                            "_id": item._id,
                            "partyChNo": item.partyChNo,
                            "pcs": item.pcs,
                            "mtr": item.mtr,
                            "item_amount": item.item_amount,
                            "products": [
                                {
                                    "name": edited_bill.products[0].name,
                                    "rate": edited_bill.products[0].rate,
                                    "_id": edited_bill.products[0]._id
                                }
                            ]
                        }
                        tempModifiedArr.push(modifiedObj);
                    })

                    tempObj.billItems = tempModifiedArr;
                }
            })

        default:
            return state;
    }
}

export default InvoiceReducer
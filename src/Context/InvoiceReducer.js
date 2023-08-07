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

        case 'SET_INVOICE_DATA':
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
                "bill_no": action.payload.bill_no,
                "discount": action.payload.discount,
                "igst": action.payload.igst,
                "sgst": action.payload.sgst,
                "cgst": action.payload.cgst,
                "tds": action.payload.tds,
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
            tempArr.push(tempObj)
            return {
                ...state,
                isLoading: false,
                invoiceList: tempArr
            }

        default:
            return state;
    }
}

export default InvoiceReducer
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

        case 'SET_API_ERROR':
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
            return {
                ...state,
                isLoading: false,
                invoiceList: action.payload
            }

        default:
            return state;
    }
}

export default InvoiceReducer
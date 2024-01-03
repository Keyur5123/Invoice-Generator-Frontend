
export async function getAllPartyNameAndProducts(userId, token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/check/all-products-and-partyFerms/${userId}/v1`, {
        headers: { Authentication: `Bearer ${token}` }
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function upsertProducts(productDetails, userId, token, updateValue = false) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/upsert/product-list/${userId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
        body: JSON.stringify({ productDetails, updateValue })
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function upsertPartyFerm(partyFermDetails, userId, token) {
    let obj = { name: partyFermDetails.name, address: partyFermDetails.address, gstNo: partyFermDetails.gstNo }
    partyFermDetails._id && (obj._id = partyFermDetails._id)

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/upsert/partyFerm/${userId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function deleteProducts(productId, userId, token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/delete/productDetail/${userId}/${productId}/v1`, {
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token }
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function deletePartyFerm(partyId, userId, token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/delete/partyFerm/${userId}/${partyId}/v1`, {
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token }
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}
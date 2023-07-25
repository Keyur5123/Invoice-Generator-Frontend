
export async function upsertProducts( productDetails, userId, token, updateValue = false ) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/product-and-party/upsert/product-list/${userId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
        body: JSON.stringify({ productDetails, updateValue })
    })
        .then(res => res.json())
        
    return res;
}
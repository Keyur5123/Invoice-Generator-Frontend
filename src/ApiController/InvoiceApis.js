
export async function getAllInvoices(userId, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/check/allInvoices/${userId}/v1`, {
        headers: { Authentication: `Bearer ${token}` }
    })
        .then(res => res.json())

    return res;
}

export async function saveNewInvoice(obj, userId, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/save/newInvoice/${userId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: `Bearer ${token}` },
        body: JSON.stringify({ obj })
    })
        .then(data => data.json())

    return res;
}
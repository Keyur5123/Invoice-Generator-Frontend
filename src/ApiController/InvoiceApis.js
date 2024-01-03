export async function getAllInvoices(userId, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/check/allInvoices/${userId}/v1`, {
        headers: { Authentication: `Bearer ${token}` }
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function saveNewInvoice(obj, userId, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/save/newInvoice/${userId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: `Bearer ${token}` },
        body: JSON.stringify({ obj })
    })
        .then(data => data.json())
        .catch(err => err);

    return res;
}

export async function updateInvoiceApi(obj, userId, invoice_id, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/update/invoice/${userId}/${invoice_id}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: `Bearer ${token}` },
        body: JSON.stringify({ obj })
    })
        .then(data => data.json())
        .catch(err => err);

    return res;
}

export async function updateInvoiceIsPaidStatusApi(invoiceArr, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/update/invoice_paid_status/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: `Bearer ${token}` },
        body: JSON.stringify({ invoiceArr })
    })
        .then(data => data.json())
        .catch(err => err);

    return res;
}

export async function deleteInvoiceApi(userId, roleId, invoice_id, token) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/delete/deleteInvoice/${userId}/${roleId}/${invoice_id}/v1`, {
        method: 'DELETE',
        headers: { Authentication: `Bearer ${token}` }
    })
        .then(data => data.json())
        .catch(err => err);

    return res;
}
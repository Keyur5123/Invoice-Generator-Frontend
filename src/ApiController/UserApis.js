
export async function getAllUsers(userId,token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/users/check/allUsersList/${userId}/v1`, {
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token }
    })
        .then(res => res.json())

    return res;
}

export async function updateUserDetials(adminId, updatedUserData, token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/users/update/userDetails/${adminId}/v1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token },
        body: JSON.stringify(updatedUserData)
    })
        .then(res => res.json())

    return res;
}

export async function deleteUserDetails(userToDeleteId, token) {

    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/users/delete/userDetails/${userToDeleteId}/v1`, {
        headers: { 'Content-Type': 'application/json', Authentication: 'Bearer ' + token }
    })
        .then(res => res.json())

    return res;
}
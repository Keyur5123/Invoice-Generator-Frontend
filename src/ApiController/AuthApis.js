
export async function SignInUser(email, password) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/auth/login/checkUser/v1`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export async function SignUpUser(user_name, email, password) {
    let res = await fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/auth/register/addUser/v1`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_name, email, password })
    })
        .then(res => res.json())
        .catch(err => err);

    return res;
}
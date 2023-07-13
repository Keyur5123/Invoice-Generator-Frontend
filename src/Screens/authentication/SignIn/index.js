/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import { Box, Button, Input, Typography, Switch } from "@mui/material";

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
// import Typography from "components/Typography";
// import Input from "components/Input";
// import Button from "components/Button";

// Authentication layout components
import CoverLayout from "../Components/CoverLayout";

// Images
import curved9 from "../../../assets/images/curved-images/curved-6.jpg";

import Constants from "../../../Utilities/Constants/responseConstants"
import TextFieldControl from "../../../Controls/TextFieldControl";

import Snackbar from '../../../Components/Snackbar';
import { useInvoiceContext } from "../../../Context/InvoiceContext";

function SignIn() {

  const navigate = useNavigate();
  const { isLoading, state, dispatch, contextSnackbar, setContextSnackbar } = useInvoiceContext();

  const [rememberMe, setRememberMe] = useState(true);
  const [addUser, setAddUser] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const [addUserError, setAddUserError] = useState({})

  const handleSetRememberMe = () => setAddUser({ ...addUser, ['rememberMe']: !addUser.rememberMe });

  let checkFieldValues = (Item) => {
    let temp = {}
    temp.email = Item.email ? '' : Constants.FIELD_REQUIRED
    temp.password = Item.password ? '' : Constants.FIELD_REQUIRED

    setAddUserError(temp)
    return Object.values(temp).every(val => val == '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  }

  const handleSubmit = () => {
    let checkError = checkFieldValues(addUser);
    if (checkError == true) {
      fetch(`${process.env.REACT_APP_DARSHAN_CREATION_API}/darshan-creation/auth/login/checkUser/v1`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: addUser.email, password: addUser.password })
      })
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            addUser.rememberMe && localStorage.setItem('invoice_dc_token', res.data.token);
            localStorage.setItem('userData', JSON.stringify({ userId:res.data.userId, userName: res.data.userName, roleId: res.data.roleId }));
            setContextSnackbar({
              ...contextSnackbar,
              status: true,
              message: res.msg,
              severity: Constants.SUCCESS
            })
            navigate('/dashboard');
          }
          else {
            setContextSnackbar({
              ...contextSnackbar,
              status: true,
              message: res.err,
              severity: Constants.ERROR
            })
          }
        })
        .catch(err => {
          setContextSnackbar({ ...contextSnackbar, status: true, message: err.msg, severity: Constants.ERROR })
        })
    }
    else {
      setContextSnackbar({
        ...contextSnackbar,
        status: true,
        message: 'All fields are mandatory',
        severity: Constants.ERROR
      })
    }
  }

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <div>
        <Snackbar
          snackbar={contextSnackbar}
          setSnackbar={setContextSnackbar}
        />
      </div>
      <Box component="form" role="form">
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography
              component="label" variant="caption" fontWeight="bold"
            >
              Email
            </Typography>
          </Box>
          <TextFieldControl
            size='small'
            name="email"
            variant="outlined"
            placeholder="Email"
            onChange={handleChange}
            error={addUserError.email}
          />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography
              component="label" variant="caption" fontWeight="bold"
            >
              Password
            </Typography>
          </Box>
          <TextFieldControl
            size='small'
            name="password"
            variant="outlined"
            placeholder="Password"
            onChange={handleChange}
            error={addUserError.password}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Switch checked={addUser.rememberMe} onChange={handleSetRememberMe} />
          <Typography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </Typography>
        </Box>
        <Box mt={4} mb={1} className="text-white">
          <Button
            className="rounded bg-gradient-to-r from-sky-500 to-indigo-800"
            variant="gradient"
            onClick={handleSubmit}
            fullWidth
          >
            sign in
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <Typography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-800"
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </CoverLayout>
  );
}

export default SignIn;

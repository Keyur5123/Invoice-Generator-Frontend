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

import { Link } from "react-router-dom";
import { Box, Button, Input, Typography, Switch } from "@mui/material";
import CoverLayout from "../Components/CoverLayout";

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";

import Constants from "../../../Utilities/Constants/responseConstants"
import TextFieldControl from "../../../Controls/TextFieldControl";
import Snackbar from '../../../Components/Snackbar';
import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Loader from "../../../Components/Loader";
import { SignUpUser } from "../../../ApiController/AuthApis";

function SignUp() {

  const navigate = useNavigate();
  const { contextSnackbar, setContextSnackbar } = useInvoiceContext();

  const [newUser, setNewUser] = useState({
    user_name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [newUserError, setNewUserError] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  let checkFieldValues = (Item) => {
    let temp = {}
    temp.user_name = Item.user_name ? '' : Constants.FIELD_REQUIRED
    temp.email = Item.email ? '' : Constants.FIELD_REQUIRED
    temp.password = Item.password ? '' : Constants.FIELD_REQUIRED
    temp.confirm_password = Item.confirm_password ? '' : Constants.FIELD_REQUIRED

    setNewUserError(temp)
    return Object.values(temp).every(val => val == '')
  }

  const handleSubmit = () => {
    let checkError = checkFieldValues(newUser);
    if (checkError == true && newUser.password === newUser.confirm_password) {
      setIsLoading(true);

      SignUpUser(newUser.user_name, newUser.email, newUser.password)
        .then(res => {
          setIsLoading(false);
          if (res.status === 200) {
            setContextSnackbar({
              ...contextSnackbar,
              status: true,
              message: res.msg,
              severity: Constants.SUCCESS
            })
            navigate('/')
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
          console.log(err)
        })
    }
    else {
      setContextSnackbar({
        ...contextSnackbar,
        status: true,
        message: checkError == false ? 'All fields are mandatory' : 'Password and confirm password must be same',
        severity: Constants.ERROR
      })
    }
  }

  return (
    <CoverLayout
      title="Registration"
      description="Register your self by filling out the details"
      image={curved6}
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
              UserName
            </Typography>
          </Box>
          <TextFieldControl
            size='small'
            name="user_name"
            variant="outlined"
            placeholder="UserName"
            onChange={handleChange}
            error={newUserError.user_name}
          />
        </Box>
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
            error={newUserError.email}
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
            error={newUserError.password}
          />
        </Box>
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography
              component="label" variant="caption" fontWeight="bold"
            >
              Confirm Password
            </Typography>
          </Box>
          <TextFieldControl
            size='small'
            name="confirm_password"
            variant="outlined"
            placeholder="Confirm Password"
            onChange={handleChange}
            error={newUserError.confirm_password}
          />
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
            Already have an account?{" "}
            <Typography
              component={Link}
              to="/"
              variant="button"
              color="info"
              fontWeight="medium"
              className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-700"
            >
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </CoverLayout>
  );
}

export default SignUp;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Input, Typography, Switch } from "@mui/material";

// Authentication layout components
import CoverLayout from "../Components/CoverLayout";

// Images
import curved9 from "../../../assets/images/curved-images/curved-6.jpg";

import Constants from "../../../Utilities/Constants/responseConstants"
import TextFieldControl from "../../../Controls/TextFieldControl";
import Snackbar from '../../../Components/Snackbar';
import { useInvoiceContext } from "../../../Context/InvoiceContext";
import Loader from "../../../Components/Loader";
import { SignInUser } from "../../../ApiController/AuthApis";

function SignIn() {

  const navigate = useNavigate();
  const { contextSnackbar, setContextSnackbar } = useInvoiceContext();

  const [addUser, setAddUser] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const [addUserError, setAddUserError] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

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
      setIsLoading(true);

      SignInUser(addUser.email, addUser.password)
        .then(res => {
          setIsLoading(false);
          if (res.status === 200) {
            addUser.rememberMe && localStorage.setItem('invoice_dc_token', res.data.token);
            localStorage.setItem('userData', JSON.stringify({ userId: res.data.userId, userName: res.data.userName, roleId: res.data.roleId }));
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

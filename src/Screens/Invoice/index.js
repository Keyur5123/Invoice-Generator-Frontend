import React, { useEffect, useState } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useInvoiceContext } from "../../Context/InvoiceContext";

import Sidebar from '../../Components/Sidebar';
import Snackbar from '../../Components/Snackbar';

import Table from "../../Components/Table";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../../Components/Loader";
import SelectDropdown from "../../Components/SelectDropDown";

export default function InvoicesList() {

  const navigate = useNavigate();
  const { state, contextSnackbar, setContextSnackbar, userData } = useInvoiceContext();

  let { invoiceList, isUserAuthorized, isLoading } = state;
  const [searchData, setSearchData] = useState('');
  const [selectUserData, setSelectUserData] = useState('');
  const [invoiceUsers, setInvoiceUsers] = useState([]);

  useEffect(() => {
    setInvoiceUsers([]);
    displayUserList(invoiceList)
  }, [invoiceList])

  function displayUserList(invoice) {
    let uniqueUserObjects = [];
    let uniqueObject = {};

    for (let i in invoice) {
      let user_name = invoice[i]?._id?.user_details?.user_name && invoice[i]?._id?.user_details?.user_name;
      let objTitle = user_name;
      if (objTitle) {
        uniqueObject[objTitle] = { label: user_name, name: user_name };
      }
    }

    for (let i in uniqueObject) {
      uniqueUserObjects.push(uniqueObject[i]);
      setInvoiceUsers(invoiceUsers => [...invoiceUsers, uniqueObject[i]])
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (!isUserAuthorized) {
    localStorage.removeItem('invoice_dc_token');
    localStorage.removeItem('userData');
    navigate('/login');
  }

  const handleChange = (e) => {
    setSelectUserData(e)
  }

  return (
    <Sidebar>
      <div>
        <Snackbar
          snackbar={contextSnackbar}
          setSnackbar={setContextSnackbar}
        />
      </div>
      <>
        <span className='flex justify-center main-header'>Invoices List</span>

        <div className='mt-10 grid md:grid-cols-4 sm:grid-cols-12'>
          <p></p>
          <p></p>
          <p></p>
          <Link className='w-full' to='/add-new-invoice'>
            <Button
              sx={{ width: '100%' }}
              variant="contained"
              color='success'
            >
              Add New Item
            </Button>
          </Link>
        </div>

        <div className='mt-7 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-12'>
          <div className='flex justify-start '>
            <FormControl fullWidth size='small'>
              <InputLabel htmlFor="outlined-adornment-amount">Search by Party Name & Challan, Bill No</InputLabel>
              <OutlinedInput
                onChange={(e) => setSearchData(e.target.value)}
                id="outlined-adornment-amount"
                endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                label="Search by party name & challan , bill no"
              />
            </FormControl>
          </div>&nbsp;
          <p></p>
          {userData.roleId == '1' && <div>
            <SelectDropdown
              label={selectUserData ? '' : "Select Users Data"}
              handleChange={handleChange}
              ipArray={invoiceUsers}
            />
          </div>}
        </div>

        <Grid sx={{ marginTop: "0px" }} container spacing={3}>
          <Grid item xs={12}>
            <Table
              isExtractable={true}
              searchData={searchData}
              invoiceList={invoiceList.filter(invoice => selectUserData ? invoice?._id?.user_details?.user_name === selectUserData : invoice)}
              isPaginationAllowed={true}
              contextSnackbar={contextSnackbar}
              setContextSnackbar={setContextSnackbar}
            />
          </Grid>
        </Grid>
      </>
    </Sidebar>

  );
}

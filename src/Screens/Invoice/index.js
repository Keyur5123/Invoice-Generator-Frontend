import React, { useEffect } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useInvoiceContext } from "../../Context/InvoiceContext";

import Sidebar from '../../Components/Sidebar';
import Snackbar from '../../Components/Snackbar';

import Table from "../../Components/Table";

export default function InvoicesList() {

  const navigate = useNavigate();
  const { isLoading, state, dispatch, contextSnackbar, setContextSnackbar } = useInvoiceContext();
  let { invoiceList, isUserAuthorized } = state

  if (isLoading) {
    return <p>Loading ....</p>
  }

  if (!isUserAuthorized) {
    localStorage.removeItem('invoice_dc_token');
    localStorage.removeItem('userData');
    navigate('/login');
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

        <div className='flex justify-end'>
          <div className='m-5 mr-0 bg-slate-600 w-1/3'>
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
        </div>

          <Grid sx={{ marginTop: "0px" }} container spacing={3}>
            <Grid item xs={12}>
              <Table
                isExtractable={true}
                invoiceList={invoiceList}
                isPaginationAllowed={true}
              />
            </Grid>
          </Grid>
      </>
    </Sidebar>

  );
}

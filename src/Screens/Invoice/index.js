import React, { useEffect } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useInvoiceContext } from "../../Context/InvoiceContext";

import Sidebar from '../../Components/Sidebar';
import Snackbar from '../../Components/Snackbar';

import Table from "../../Components/Table";

export default function InvoicesList() {

  const { isLoading, state, dispatch, contextSnackbar, setContextSnackbar } = useInvoiceContext();
  let { invoiceList } = state

  if (isLoading == true) {
    return <p>Loading ....</p>
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

        {/* <Box>
          <Table
            isExtractable={true}
            invoiceList={invoiceList}
            isPaginationAllowed={true}
          />
        </Box> */}
        <Box>
          <Grid sx={{ marginTop: "0px" }} container spacing={3}>
            <Grid item xs={12}>
              <Table
                isExtractable={true}
                invoiceList={invoiceList}
                isPaginationAllowed={true}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    </Sidebar>

  );
}

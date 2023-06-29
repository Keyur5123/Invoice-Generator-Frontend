import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import TextFieldControl from '../../../Controls/TextFieldControl';

import Sidebar from '../../../Components/Sidebar';
import Snackbar from '../../../Components/Snackbar';
import BillItems from "./BillItems";
import Constants from "../../../Utilities/Constants/responseConstants";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from '@mui/material';

import { useInvoiceContext } from "../../../Context/InvoiceContext";

export default function Home() {

  const [snackbarData, setSnackbarData] = useState({
    status: false,
    message: '',
    severity: ''
  })

  const [billHeaders, setBillHeaders] = useState({
    partyName: '',
    address: '',
    billNo: '',
    date: ''
  });

  const [errors, setErrors] = useState({});

  const { isLoading, state, dispatch, contextSnackbar, setContextSnackbar } = useInvoiceContext();
  let { invoiceList } = state

  const validate = () => {
    let errObj = {};
    errObj.partyName = billHeaders.partyName ? '' : Constants.FIELD_REQUIRED
    errObj.address = billHeaders.address ? '' : Constants.FIELD_REQUIRED
    errObj.billNo = billHeaders.billNo ? '' : Constants.FIELD_REQUIRED
    errObj.date = billHeaders.date ? '' : Constants.FIELD_REQUIRED
    setErrors({ ...errObj })
    return Object.values(errObj).every(item => item == '')
  }

  let handleChange = (e) => {
    setBillHeaders({ ...billHeaders, [e.target.name]: e.target.value })
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Sidebar>
      <React.Fragment>
        <div>
          <Snackbar
            snackbar={snackbarData}
            setSnackbar={setSnackbarData}
          />
        </div>

        <span className='flex justify-center main-header'>Add New Invoice</span>

        <div className='container grid md:grid-cols-2 gap-4 xs:grid-rows-2'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-between min-w-[50%] mt-5'>
              <h6 className='mr-5'>Party Name</h6>
              {/* <TextFieldControl
                size='small'
                label="Party Name"
                name="partyName"
                variant="outlined"
                onChange={handleChange}
                error={errors.partyName}
              /> */}
              <FormControl>
                <InputLabel id="demo-simple-select-autowidth-label"><p className={(errors && errors?.partyName) && 'text-red-700'}>Party Name</p></InputLabel>
                <Select
                  displayEmpty
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="partyName"
                  onChange={handleChange}
                  autoWidth
                  label="Party Name"
                  size='sm'
                  sx={{ height: 42, width: 222 }}

                  error={errors.partyName}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {invoiceList && invoiceList.length > 0 && invoiceList?.map(invoice => (
                    <MenuItem value={invoice?._id?.party_name}>{invoice?._id?.party_name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText><p className='text-red-600'>{errors && errors?.partyName}</p></FormHelperText>
              </FormControl>
            </div>
            <div className='flex items-center mt-5 justify-between min-w-[50%]'>
              <h6 className='mr-5'>Address</h6>
              <TextFieldControl
                size='small'
                label="Address"
                name="address"
                variant="outlined"
                onChange={handleChange}
                error={errors.address}
              />
            </div>
          </div>

          <div className='flex flex-col items-center justify-between'>
            <div className='flex items-center mt-5 justify-between min-w-[50%]'>
              <h6 className='mr-5'>Bill No.</h6>
              <TextFieldControl
                size='small'
                label="Bill No."
                name="billNo"
                variant="outlined"
                onChange={handleChange}
                error={errors.billNo}
              />
            </div>
            <div className='flex items-center mt-5 justify-between min-w-[50%]'>
              <h6 className='mr-5'>Date</h6>
              <TextFieldControl
                size='small'
                label="Date"
                name="date"
                variant="outlined"
                onChange={handleChange}
                error={errors.date}
              />
            </div>
          </div>
        </div>

        <BillItems
          billHeaders={billHeaders}
          validate={validate}
          snackbar={snackbarData}
          setSnackbar={setSnackbarData}
        />

      </React.Fragment>

    </Sidebar>
  )
}

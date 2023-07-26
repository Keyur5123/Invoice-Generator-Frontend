import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import TextFieldControl from '../../../Controls/TextFieldControl';
import Sidebar from '../../../Components/Sidebar';
import Snackbar from '../../../Components/Snackbar';
import BillItems from "./BillItems";
import Constants from "../../../Utilities/Constants/responseConstants";
import { useInvoiceContext } from "../../../Context/InvoiceContext";
import SelectCompo from "../../../Components/SelectDropDown";

export default function Home() {

  const { isLoading, state, contextSnackbar, setContextSnackbar } = useInvoiceContext();
  let { partyNameList } = state;

  let currDate = new Date;
  let formatedDate = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()].join('-');

  const [snackbarData, setSnackbarData] = useState({
    status: false,
    message: '',
    severity: ''
  })
  const [billHeaders, setBillHeaders] = useState({
    partyName: '',
    address: '',
    billNo: '',
    date: formatedDate
  });

  const [errors, setErrors] = useState({});

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

  let handlePartyName = (e) => {
    setBillHeaders({ ...billHeaders, partyName: e })
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  if (isLoading) {
    return <p>Loading ....</p>
  }

  return (
    <Sidebar>
      <React.Fragment>
        <div>
          <Snackbar
            snackbar={snackbarData}
            setSnackbar={setSnackbarData}
          />
          <Snackbar
            snackbar={contextSnackbar}
            setSnackbar={setContextSnackbar}
          />
        </div>

        <span className='flex justify-center main-header'>Add New Invoice</span>

        <div className='container grid md:grid-cols-2 gap-4 xs:grid-rows-2'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-between min-w-[50%] mt-5'>
              <h6 className='mr-5'>Party Name</h6>
              <div>
                <SelectCompo
                  handleChange={handlePartyName}
                  ipArray={partyNameList}
                />
                {errors.partyName && <p className='font-normal text-[12px] text-[#d54f4f] ml-4 mt-1'>{errors.partyName}</p>}

              </div>
            </div>
            <div className='flex items-center mt-5 justify-between min-w-[50%]'>
              <h6 className='mr-5'>Address</h6>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextFieldControl
                size='small'
                label={billHeaders.date}
                name="date"
                defaultValue={billHeaders.date}
                variant="outlined"
                onChange={handleChange}
                error={errors.date}
              />
            </div>
          </div>
        </div>

        <BillItems
          billHeaders={billHeaders}
          setBillHeaders={setBillHeaders}
          formatedDate={formatedDate}
          validate={validate}
          snackbar={snackbarData}
          setSnackbar={setSnackbarData}
        />

      </React.Fragment>

    </Sidebar>
  )
}

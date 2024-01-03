import React, { useEffect, useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import TextFieldControl from '../../../Controls/TextFieldControl';
import Sidebar from '../../../Components/Sidebar';
import Snackbar from '../../../Components/Snackbar';
import BillItems from "./BillItems";
import Constants from "../../../Utilities/Constants/responseConstants";
import { useInvoiceContext } from "../../../Context/InvoiceContext";
import SelectCompo from "../../../Components/SelectDropDown";
import Loader from "../../../Components/Loader";
import { FormControlLabel, Switch } from '@mui/material';
import { curr_date } from "../../../Utilities/date_funcs";
import { useParams } from 'react-router-dom';  
export default function Home() {

  const invoice_id = useParams();
  const { state, contextSnackbar, setContextSnackbar } = useInvoiceContext();
  let { partyNameList, isLoading, invoiceList } = state;

  const [snackbarData, setSnackbarData] = useState({
    status: false,
    message: '',
    severity: ''
  })
  const [billHeaders, setBillHeaders] = useState({
    partyName: '',
    address: '',
    billNo: '',
    date: curr_date
  });

  const [errors, setErrors] = useState({});

  const [billApiLoader, setBillApiLoader] = useState(false);
  const [paymentEntryStatus, setPaymentEntryStatus] = useState(false);

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
    partyNameList.forEach(partyFerm => {
      if (partyFerm.name == e) {
        setBillHeaders({ ...billHeaders, partyName: e, address: partyFerm.address });
      }
    });
  }

  let handlePaymentEntryState = () => {
    setPaymentEntryStatus(!paymentEntryStatus)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  if (isLoading || billApiLoader) {
    return <Loader />
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
                  label={invoice_id ? billHeaders.partyName : ''}
                />
                {errors.partyName && <p className='font-normal text-[12px] text-[#d54f4f] ml-4 mt-1'>{errors.partyName}</p>}

              </div>
            </div>
            <div className='flex items-center mt-5 justify-between min-w-[50%]'>
              <h6 className='mr-5'>Address</h6>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TextFieldControl
                value={billHeaders.address}
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
                type='number'
                value={billHeaders.billNo}
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
                value={billHeaders.date}
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

        <div className='flex justify-center'>
          <FormControlLabel
            control={<Switch checked={paymentEntryStatus} onChange={handlePaymentEntryState} />}
            label={`Payment Status :- ${paymentEntryStatus ? 'out'.toUpperCase() : 'in'.toUpperCase()}`}
          />
        </div>

        <BillItems
          billHeaders={billHeaders}
          setBillHeaders={setBillHeaders}
          formatedDate={curr_date}
          paymentEntryStatus={paymentEntryStatus == false ? 'in' : 'out'}
          setPaymentEntryStatus={setPaymentEntryStatus}
          validate={validate}
          snackbar={snackbarData}
          setSnackbar={setSnackbarData}
          setBillApiLoader={setBillApiLoader}
        />

      </React.Fragment>

    </Sidebar>
  )
}

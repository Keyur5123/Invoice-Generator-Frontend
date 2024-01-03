import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextFieldControl from "../../Controls/TextFieldControl";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Index({
    isProductModel,
    isPartyFermModel,
    isUserModel,
    status,
    modelData,
    open,
    setOpen,
    errors,
    handleModelDataChange,
    handleUpdateItem,
    handleDeleteItem,

}) {

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='text-center'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure to {status} this item?
                        </Typography>
                        {isProductModel &&
                            <>
                                <div className='mt-4'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.name}
                                        size='small'
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.name}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.rate}
                                        size='small'
                                        label="Rate"
                                        name="rate"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.rate}
                                    />
                                </div>
                            </>
                        }
                        {isPartyFermModel &&
                            <>
                                <div className='mt-4'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.name}
                                        size='small'
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.name}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.address}
                                        size='small'
                                        label="Address"
                                        name="address"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.address}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.gstNo}
                                        size='small'
                                        label="GST No"
                                        name="gstNo"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.gstNo}
                                    />
                                </div>
                            </>
                        }
                        {isUserModel &&
                            <>
                                <div className='mt-4'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.user_name}
                                        size='small'
                                        label="Name"
                                        name="user_name"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.user_name}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <TextFieldControl
                                        disabled={status == 'delete' ? true : false}
                                        value={modelData.email}
                                        size='small'
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        onChange={handleModelDataChange}
                                        error={errors.email}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <FormControl>
                                        <RadioGroup
                                            onChange={handleModelDataChange}
                                            aria-labelledby="user-roles-radio-buttons-group-label"
                                            defaultValue={modelData.roleId == '1' ? '1' : '2'}
                                            name="roleId"
                                        >
                                            <div>
                                                <FormControlLabel
                                                    disabled={status == 'delete' ? true : false}
                                                    value="1" control={<Radio />}
                                                    label="Admin"
                                                />
                                                <FormControlLabel
                                                    disabled={status == 'delete' ? true : false}
                                                    value="2" control={<Radio />}
                                                    label="User"
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </>
                        }
                        <div className='mt-5'>
                            <Button sx={{ marginRight: '15px' }} onClick={handleClose} variant="outlined" color="error">
                                cancel
                            </Button>
                            <Button onClick={() => { status == 'delete' ? handleDeleteItem(modelData._id) : handleUpdateItem() }} variant="outlined" color="success">
                                Done
                            </Button>
                        </ div>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}
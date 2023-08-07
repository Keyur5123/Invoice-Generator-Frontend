import React from 'react';
import { Button, TextField } from '@mui/material';

export default function SubCategory({ addNewItem, billSubTotalAmount, handleDiscount, handleIgst, handleSgst, handleCgst, handleTds, getTotalAmount }) {

    return (
        <React.Fragment>
            <div className='flex justify-center m-5'>
                <Button
                    sx={{ backgroundColor: 'button.primary' }}
                    variant="contained" onClick={addNewItem}
                >
                    Add New Item
                </Button>
            </div>

            <div className='flex justify-between  mr-5'>
                <div>
                </div>
                <div className='min-w-[30%]'>
                    <div className='flex justify-around items-center'>
                        <h1 className='text-lg'>Sub Total</h1>
                        <p>{billSubTotalAmount}</p>
                    </div>
                    <div className='flex justify-around items-center mt-3'>
                        <TextField
                            style={{ width: '100px' }}
                            disabled={billSubTotalAmount <= 0 && true}
                            name='Sgst'
                            type='number'
                            onChange={(e) => { handleSgst(e) }}
                            placeholder='Sgst %'
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            style={{ width: '100px' }}
                            disabled={billSubTotalAmount <= 0 && true}
                            name='Cgst'
                            type='number'
                            onChange={(e) => { handleCgst(e) }}
                            placeholder='Cgst %'
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            style={{ width: '100px' }}
                            disabled={billSubTotalAmount <= 0 && true}
                            name='Igst'
                            type='number'
                            onChange={(e) => { handleIgst(e) }}
                            placeholder='Igst %'
                            size='small'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex justify-around items-center mt-3'>
                        <TextField
                            style={{ width: '160px' }}
                            disabled={billSubTotalAmount <= 0 && true}
                            name='Discount'
                            type='number'
                            onChange={(e) => { handleDiscount(e) }}
                            placeholder='Discount %'
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            style={{ width: '160px' }}
                            disabled={billSubTotalAmount <= 0 && true}
                            name='Tds'
                            type='number'
                            onChange={(e) => { handleTds(e) }}
                            placeholder='Tds %'
                            size='small'
                            variant="outlined"
                        />
                    </div>
                    <div className='flex justify-around items-center pb-1 mt-3 bg-slate-200 mb-3  '>
                        <p className='text-lg pt-1'>Total Amount</p>
                        <p>{getTotalAmount()}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

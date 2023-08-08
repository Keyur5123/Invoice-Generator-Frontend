import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TablePagination } from '@mui/material';

function ProductItemTable({ productsList, partyNameList, allUsersList, searchItem, handleUpdateModelOpen, handleDeleteModelOpen }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <div className="text-end justify-content-center max-[500px]:w-[330px] overflow-x-scroll md:overflow-hidden">
                <table cellSpacing="0" className="mt-4" style={{ width: "100%", textAlign: 'center' }}>
                    <thead>
                        {productsList ?
                            <tr style={{ backgroundColor: "#007bff" }}>
                                <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Id</th>
                                <th className='w-2/3 py-2 bg-[#1d3461] text-white border-r border-sky-500'>Name</th>
                                <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Rate</th>
                                <th className='py-2 bg-[#1d3461] text-white '>Option</th>
                            </tr>
                            :
                            allUsersList
                                ?
                                <tr style={{ backgroundColor: "#007bff" }}>
                                    <th className='py-2 px-1 bg-[#1d3461] text-white border-r border-sky-500'>Id</th>
                                    <th className='w-3/2 py-2 bg-[#1d3461] text-white border-r border-sky-500'>Name</th>
                                    <th className='w-3/2 py-2 bg-[#1d3461] text-white border-r border-sky-500'>Email Id</th>
                                    <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Type</th>
                                    <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Option</th>
                                </tr>
                                :
                                <tr style={{ backgroundColor: "#007bff" }}>
                                    <th className='py-2 px-3 bg-[#1d3461] text-white border-r border-sky-500'>Id</th>
                                    <th className='w-2/3 py-2 bg-[#1d3461] text-white border-r border-sky-500'>Name</th>
                                    <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Gst No</th>
                                    <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Address</th>
                                    <th className='py-2 bg-[#1d3461] text-white border-r border-sky-500'>Option</th>
                                </tr>
                        }
                    </thead>
                    <tbody>
                        {productsList && productsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((obj, index) => searchItem ?
                                obj?.name.toLowerCase().includes(searchItem.toLowerCase()) /* checking is user searching data by product name or go for product rate */
                                    ? obj?.name.toLowerCase().includes(searchItem.toLowerCase()) /* search by product name */
                                    : obj?.rate.toString().toLowerCase().includes(searchItem.toLowerCase()) /* search by product rate */
                                : obj
                            )
                            .map((item, index) => (
                                <tr key={index} className='border border-sky-500'>
                                    <td className='py-1 px-2 border-r border-sky-500'>{index + 1}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{item.name}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{item.rate}</td>
                                    <td className='py-1 px-2 border-r border-sky-500 flex justify-center'>
                                        <div className='mx-2 text-center rounded bg-green-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleUpdateModelOpen(item)} color='success' aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                        <div className='text-center rounded bg-pink-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleDeleteModelOpen(item)} color='error' aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        {partyNameList && partyNameList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((obj, index) => searchItem ?
                                obj?.name.toLowerCase().includes(searchItem.toLowerCase()) ? /* checking is user searching data by partyFerm name or go for partyFerm GST NO */
                                    obj?.name.toLowerCase().includes(searchItem.toLowerCase()) : /* search by partyFerm name */
                                    obj?.gstNo.toString().toLowerCase().includes(searchItem.toLowerCase()) /* search by GST NO */
                                : obj
                            )
                            .map((partyFerm, index) => (
                                <tr key={index} className='border border-sky-500'>
                                    <td className='py-1 px-2 border-r border-sky-500'>{index + 1}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{partyFerm.name}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{partyFerm.gstNo}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{partyFerm.address}</td>
                                    <td className='py-1 px-2 border-r flex justify-center'>
                                        <div className='mx-2 text-center rounded bg-green-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleUpdateModelOpen(partyFerm)} color='success' aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                        <div className='ml-3 mr-2 text-center rounded bg-pink-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleDeleteModelOpen(partyFerm)} color='error' aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        {allUsersList && allUsersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((obj, index) => searchItem ?
                                obj?.user_name.toLowerCase().includes(searchItem.toLowerCase()) ? /* checking is user searching data by user name or go for Email Id */
                                    obj?.user_name.toLowerCase().includes(searchItem.toLowerCase()) :
                                    obj?.email.toLowerCase().includes(searchItem.toLowerCase()) /* search by Email Id */
                                : obj
                            )
                            .map((userDetail, index) => (
                                <tr key={index} className='border border-sky-500'>
                                    <td className='py-1 px-2 border-r border-sky-500'>{index + 1}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{userDetail.user_name}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{userDetail.email}</td>
                                    <td className='py-1 px-2 border-r border-sky-500'>{userDetail.roleId == '1' ? 'Admin' : 'User'}</td>
                                    <td className='py-1 px-2 border-r flex justify-center'>
                                        <div className='mx-2 text-center rounded bg-green-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleUpdateModelOpen(userDetail)} color='success' aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                        <div className='ml-3 mr-2 text-center rounded bg-pink-200'>
                                            <IconButton variant="filledTonal" onClick={() => handleDeleteModelOpen(userDetail)} color='error' aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productsList ? productsList?.length > 0 ? productsList?.length : 0 : partyNameList ? partyNameList?.length > 0 ? partyNameList?.length : 0 : allUsersList?.length > 0 ? allUsersList?.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div >
    )
}

export default ProductItemTable;
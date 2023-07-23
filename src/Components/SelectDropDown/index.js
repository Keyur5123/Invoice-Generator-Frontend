import { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';

const Index = ({ handleChange, id, ipArray }) => {

  const data = ipArray?.map(
    item => ({ label: item?.name, value: item?._id })
  );

  return (
    <>
      <SelectPicker name='description' data={data} style={{ width: 224 }} block onChange={(e) => {handleChange(e,id)}} />
    </>
  )
};

export default Index
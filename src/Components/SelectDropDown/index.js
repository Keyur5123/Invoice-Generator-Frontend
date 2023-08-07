import { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';

const Index = ({ handleChange, id, ipArray, label }) => {

  const data = ipArray?.map(
    (item,index) => ({ key:index, label: item?.name, value: item?.name })
  );

  return (
    <>
      <SelectPicker key={data.key} name='description' label={label} data={data} style={{ width: 224 }} block onChange={(e) => {handleChange(e,id)}} />
    </>
  )
};

export default Index
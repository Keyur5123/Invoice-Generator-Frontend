import { SelectPicker } from 'rsuite';

const data = ['product1', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert',].map(
  item => ({ label: item, value: item })
);

const Index = ({ handleChange, id }) => {
  return (
    <>
      <SelectPicker name='description' data={data} style={{ width: 224 }} block onChange={(e) => {handleChange(e,id)}} />
    </>
  )
};

export default Index
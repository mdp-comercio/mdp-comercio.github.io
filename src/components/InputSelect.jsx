import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
  
const InputSelect = ({value, setValue, options}) => (
  <FormControl fullWidth size='small'>
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      fullWidth={true}
    > 
      {options.map((option, idx) => (
        <MenuItem key={idx} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
)

export default InputSelect
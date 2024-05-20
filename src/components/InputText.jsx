import * as React from 'react';
import TextField from '@mui/material/TextField';
  
const InputText = ({value, setValue}) => (
  <TextField 
    value={value} 
    onChange={(e) => setValue(e.target.value)} 
    variant="outlined" 
    size='small'
    fullWidth={true}
  />
)

export default InputText
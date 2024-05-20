import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InputDate({value, setValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          value={value}
          onChange={(e) => setValue(e)}
          slotProps={{ textField: { size: 'small', fullWidth: true } }}
          format='DD-MM-YYYY'
        />
    </LocalizationProvider>
  );
}
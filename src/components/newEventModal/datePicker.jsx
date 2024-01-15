import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function Label({ componentName, valueType }) {
  const content = (
    <span>
      <strong>{componentName}</strong>
    </span>
  )

  return content;
}

export default function CommonlyUsedComponents() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
        ]}
      >
            <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
              <DatePicker />
            </DemoItem>
          <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
            <TimePicker />
          </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
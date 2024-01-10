import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function textBox() {
  return (
    <div>
        <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 4, width: '1250px' },
          }}
          noValidate
          autoComplete="off"
          >
            <div>
              <TextField
                aria-label="empty textarea"
                placeholder="Write a short description"
                multiline
                style={{ maxHeight: '250px' ,height: '250px',maxWidth:'1300px' ,width: '100%', 
                  margin: "20px", border:"rgb(241,241,241)", backgroundColor:"rgb(241,241,241)", outline:'none'}}
                minRows={7}
                maxRows={9}
              />
            </div>
          </Box>
        </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function TextBox() {
  return (
    <div>
        <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '1250px' },
          }}
          noValidate
          autoComplete="off"
          >
            <div>
              <TextField
                aria-label="empty textarea"
                placeholder="Write a short description"
                multiline
                style={{ maxHeight: '250px' ,height: '250px',maxWidth:'1300px' ,width: '100%', border: 'white', 
                  margin: "20px", backgroundColor:"rgb(241,241,241)", outline:'none'}}
                minRows={3}
                maxRows={4}
              />
            </div>
          </Box>
        </div>
    </div>
  )
}

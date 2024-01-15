import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function PostModalTextBox() {
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
                            style={{
                                maxHeight: '250px',
                                maxWidth: '1200px',
                                width: '98%',
                                border: 'white',
                                margin: '10px',
                                backgroundColor: 'rgb(241,241,241)',
                                outline: 'none',
                            }}
                            minRows={4}
                            maxRows={5}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}

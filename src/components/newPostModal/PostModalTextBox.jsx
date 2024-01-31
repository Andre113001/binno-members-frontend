import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function PostModalTextBox(props) {

    const {onContentChange} = props
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
                            placeholder="What's it about?"
                            multiline
                            style={{
                                maxHeight: '250px',
                                maxWidth: '100%',
                                width: '98%',
                                border: 'white',
                                margin: '10px',
                                backgroundColor: 'rgb(241,241,241)'
                            }}
                            minRows={4}
                            maxRows={5}
                            onChange={onContentChange}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}

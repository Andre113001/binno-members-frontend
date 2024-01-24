import React, {useState, useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem, TextField, Typography, Divider } from '@mui/material';
import { 
    Add,
    Title,
    Notes,
    Image,
    InsertLink,
    YouTube
} from '@mui/icons-material';

import { FileUploader } from 'react-drag-drop-files';
import useCustomModal  from '../../../hooks/useCustomModal';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function AddElement({ onSelectOption, onHandleImage, onHandleYoutube }) {
  const { handleClose, handleOpen, CustomModal } = useCustomModal();
  const [passContent, setPassContent] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState()
  const [youtube, setYoutube] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchorEl(null);
  };

  function extractVideoCode(link) {
    if (typeof link !== 'string') {
      // Handle invalid input
      return null;
    }
  
    const regex = /(?:\?v=|\/embed\/|\/watch\?v=|youtu.be\/|\/v\/|\/e\/|\?v%3D|\/videos\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      // Handle invalid or unsupported links
      return null;
    }
  }

  return (
    <div>
      {
        <CustomModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          content = {
            <>
              <h1>{passContent}</h1>
              <Button fullWidth variant='contained' sx={{p: 2.5, borderRadius: 2}} style={{backgroundColor: "#ff7a00"}} onClick={handleClose}>Submit</Button>
            </>
          }
        />
      }
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<Add />}
      >
        Add Elements
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseAdd}
      >
        <MenuItem onClick={() => { onSelectOption({ 
            type: 'h1', 
            attributes: "class=\"element_h1\"", 
            content: "New Added"
          }); handleCloseAdd(); }} disableRipple>
          <Title />
          Heading
        </MenuItem>
        <MenuItem 
          onClick={() => {
            onSelectOption({ 
              type: 'p',
              attributes: "class=\"element_p\"",
              content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi vel quas magni id perferendis tenetur, nisi expedita, vitae voluptates a beatae pariatur neque sunt repudiandae labore ratione! Nemo libero quis quia nostrum distinctio tenetur eum odio consequuntur fuga impedit officiis quod non itaque mollitia repudiandae nam officia, tempore error obcaecati!"
            });
            handleCloseAdd();
          }} 
          disableRipple
        >
          <Notes />
          Paragraph
        </MenuItem>
        {/* <Divider sx={{ my: 0.5 }} /> */}
        {/* Insert other components here */}
      </StyledMenu>
    </div>
  );
}

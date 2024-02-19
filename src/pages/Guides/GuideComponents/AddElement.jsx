import React, {useState, useEffect, useRef} from 'react';
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

export default function AddElement({ onSelectOption, onHandleImage}) {
  const { handleClose, handleOpen, CustomModal } = useCustomModal();
  const [passContent, setPassContent] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState()
  const [youtube, setYoutube] = useState('');

  const [type, setType] = useState('');
  const [attributes, setAttributes] = useState('');
  const [content, setContent] = useState('');
  const textFieldRef = useRef(null);
 
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
      // console.log(match[1]);
      return match[1];
    } else {
      // Handle invalid or unsupported links
      return null;
    }
  }

  const handleYoutubeLink = (link) => {
    const youtubeCode = extractVideoCode(link);

    const uploadData = {
      type: 'iframe',
      attributes: `"class=\"element_iframe\"" src="https://www.youtube.com/embed/${youtubeCode}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen`,
      content: ''
    }
    // setType('iframe');
    // setAttributes(`width="1300" height="720" src="https://www.youtube.com/embed/${youtubeCode}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen`);
    return uploadData;
  };

  const handleChangeImage = (file) => {
    const blob = file.slice(0, file.size, file.type);
    console.log(blob);
    setType('img');
    setAttributes(`src=\"${URL.createObjectURL(blob)}\" style=\"max-width: '400px'\"`);
    handleSubmit();
  };

  const handleSubmit = async () => {
    const link = textFieldRef.current.value;
    const code = handleYoutubeLink(link)

    // console.log({
    //   code: code,
    //   type: type,
    //   attributes: attributes,
    //   content: content
    // });
    onSelectOption({ 
    type: code.type,
    attributes: code.attributes,
    content: code.content,
    }); 
    handleClose();
  }

  return (
    <div>
      {
        <CustomModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          content = {
            <>
              <div>{passContent}</div>
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
            content: "Untitled Header"
          }); handleCloseAdd(); }} disableRipple>
          <Title />
          Heading
        </MenuItem>
        <MenuItem 
          onClick={() => {
            onSelectOption({ 
              type: 'p',
              attributes: "class=\"element_p\"",
              content: "Untitled Paragraph"
            });
            handleCloseAdd();
          }} 
          disableRipple
        >
          <Notes />
          Paragraph
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => {
          handleOpen();
          setPassContent(
            <>
              <center>
              {/* <Typography variant='h3'>Upload an image</Typography>
              <TextField
                margin="normal"
                fullWidth
                id="image-link"
                label="Image Link"
                name="access-key"
                autoComplete="off"
                autoFocus
              /> */}
              {/* <Typography fontSize={30}>or</Typography> */}
              <FileUploader
                  required
                  maxSize={20}
                  minSize={0.002}
                  onSizeError={(file) => alert(`File ${file.name} exceeds the allowed size.`)}
                  label={`Upload your files here`}
                  types={['JPG', 'PNG']}
                  handleChange={(file) => onHandleImage(file)}
              />
              
              </center>
            </>
          );
        // { onSelectOption({ 
        //   type: 'img',
        //   attributes: "src=\"https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1000&h=563&crop=1&resize=1000%2C563\" class=\"element_img\"",
        //   content: ""
        //   }
          handleCloseAdd();
          }} disableRipple>
          <Image />
          Image
        </MenuItem>

        {/* Insert other components here */}
        <MenuItem onClick={() => { 
          handleOpen();
          setPassContent(
            <>
              <center><Typography variant='h4' fontWeight={"bold"}>Youtube Embed</Typography>
              <TextField
                margin="normal"
                fullWidth
                name="yt-link"
                autoComplete="off"
                autoFocus
                placeholder='https://www.youtube.com/watch?v=FTsuS3Opf1s'
                // onChange={(e) => handleChangeYoutube(e)}
                inputRef={textFieldRef}
              />
              <Button fullWidth variant='contained' sx={{p: 2.5, borderRadius: 2}} style={{backgroundColor: "#ff7a00"}} onClick={handleSubmit}>Submit</Button>
              </center>
            </>
          );
          
          handleCloseAdd();
          }} 
          disableRipple>
          <YouTube />
          Youtube Embed
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

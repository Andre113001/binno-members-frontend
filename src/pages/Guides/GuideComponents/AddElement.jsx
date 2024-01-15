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

export default function AddElement({ onSelectOption,onHandleImage }) {
  const { handleClose, handleOpen, CustomModal } = useCustomModal();
  const [passContent, setPassContent] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState()
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAdd = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={() => {
          handleOpen();
          setPassContent(
            <>
              <center>
              <Typography variant='h3'>Upload an image</Typography>
              {/* <TextField
                margin="normal"
                fullWidth
                id="image-link"
                label="Image Link"
                name="access-key"
                autoComplete="off"
                autoFocus
              />
              <Typography fontSize={30}>or</Typography> */}
              <FileUploader
                  required
                  maxSize={20}
                  minSize={0.002}
                  onSizeError={(file) => alert(`File ${file.name} exceeds the allowed size.`)}
                  label={`Upload your files here`}
                  types={['JPG', 'PNG']}
                  handleChange={(file) => {onHandleImage(file);}}
              />
              
              </center>
            </>
          );
        // { onSelectOption({ 
        //   type: 'img',
        //   attributes: "src=\"https://variety.com/wp-content/uploads/2023/06/MCDSPMA_SP062.jpg?w=1000&h=563&crop=1&resize=1000%2C563\" class=\"element_img\"",
        //   content: ""
        //   }
          handleCloseAdd(); }} disableRipple>
          <Image />
          Image
        </MenuItem>
        <MenuItem onClick={() => { 
          handleOpen();
          setPassContent(
            <>
              <center><Typography variant='h4'>Your text</Typography>
              <TextField
                margin="normal"
                fullWidth
                name="link-text"
                autoComplete="off"
                autoFocus
                placeholder='Example: Click Me, Press me to access page'
              />
              <Typography variant='h4' >Hyperlink</Typography>
              <TextField
                margin="normal"
                fullWidth
                name="link-link"
                autoComplete="off"
                autoFocus
                placeholder='https://'
              />
              </center>
            </>
          );
          // onSelectOption({ 
          //   type: 'a',
          //   attributes: "href='https://www.youtube.com/watch?v=mwKJfNYwvm8' class='element_a'",
          //   content: "Click me"
          handleCloseAdd(); }} disableRipple>
          <InsertLink />
          Link
        </MenuItem>
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
              />
              </center>
            </>
          );
          // onSelectOption({ 
          // type: "iframe",
          // attributes: `title="YouTube Video" width="1300" height="720" src="https://www.youtube.com/embed/FTsuS3Opf1s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen`, 
          // content: ''
          // }); 
          handleCloseAdd(); }} disableRipple>
          <YouTube />
          Youtube Embed
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

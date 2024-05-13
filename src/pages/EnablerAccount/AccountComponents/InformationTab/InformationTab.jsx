import React, { Fragment, useState, useRef, useEffect } from "react";
import styles from "./informationTab.module.css";
import useHttp from "../../../../hooks/http-hook";

import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import useCustomToolTip from "../../../../hooks/useCustomToolTip";
import useCustomModal from "../../../../hooks/useCustomModal";
import { Add, InfoOutlined, Clear, Save } from "@mui/icons-material";
import useRandomString from "../../../../hooks/useRandomString";
import moment from "moment/moment";

import { MenuItem, Select, IconButton, Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import useCustomSnackbar from "../../../../hooks/useCustomSnackbar";
import { v4 as uuidv4 } from "uuid";

function InformationTab(props) {
  const { TooltipComponent: ToolTip1, showTooltip: showTooltip1 } =
    useCustomToolTip();
  const { TooltipComponent: ToolTip2, showTooltip: showTooltip2 } =
    useCustomToolTip();
  const { CustomModal, handleClose, handleOpen } = useCustomModal();
  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();
  const profileData = props.profileData;
  const uuid = uuidv4();

  const [initialValues, setInitialValues] = useState({
    description: props.description,
    phone: props.phone,
    name: profileData?.setting_institution, // Add name to initial values
  });
  const [bio, setBio] = useState(props.description);
  const [classification, setClassification] = useState();
  const [name, setName] = useState(profileData?.setting_institution || ""); // Initialize with profileData value or empty string
  const [email, setEmail] = useState(profileData?.email_address || ""); // Initialize with profileData value or empty string
  const [contactNum, setContactNum] = useState(
    profileData?.contact_number || ""
  ); // Initialize with profileData value or empty string
  const [address, setAddress] = useState(profileData?.setting_address || ""); // Initialize with profileData value or empty string
  const [currentPassword, setCurrentPassword] = useState("");
  const [tagline, setTagline] = useState(profileData?.setting_tagline || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [edit, setEdit] = useState(null);

  const [nameChanged, setNameChanged] = useState(false);
  const [toggleLinkEdit, setToggleLinkEdit] = useState(false);
  const linkRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const { sendRequest, isLoading } = useHttp();
  const [changeForm, setChangeForm] = useState(true);
  const [companyLinks, setCompanyLinks] = useState(profileData?.companyLinks);
  const [randomString, regenerateRandomString] = useRandomString();
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentModal, setCurrentModal] = useState();

  useEffect(() => {
    if (name != initialValues.name) {
      setNameChanged(true);
    } else {
      setNameChanged(false);
    }
  }, [name, initialValues.name]);

  const handleRemoveLink = async (link_id) => {
    const updatedLinks = companyLinks.filter(
      (link) => link.link_id !== link_id
    );
    setCompanyLinks([...updatedLinks]);
    props.setCompanyLinks([...updatedLinks]);
  };

  const handleAddLink = () => {
    const truncatedUuid = uuid.substring(0, 6);
    const newLink = { link_id: truncatedUuid, url: "" };
    setCompanyLinks((prevLinks) => {
      // Ensure prevLinks is always initialized as an array
      const updatedLinks = Array.isArray(prevLinks) ? prevLinks : [];
      return [...updatedLinks, newLink];
    });
  };

  const handleChangeLink = (index, value) => {
    // Calculate updatedLinks based on the current state
    const updatedLinks = companyLinks.map((link, i) => {
      if (i === index) {
        return { ...link, url: value };
      }
      return link;
    });

    // Update the local state
    setCompanyLinks(updatedLinks);

    // Update the state managed by props
    props.setCompanyLinks(updatedLinks);
  };

  const handleClassificationChange = (value) => {
    setClassification(value);
    props.setClassification(value);
    setCurrentModal(
      <ModalChangeClass
        handleClose={handleClose}
        submitChangeClass={() => submitChangeClass(value)}
      />
    );
    handleOpen();
    setError("");
  };

  const handleToggleEditField = (fieldName) => {
    setEdit(fieldName === edit ? null : fieldName);
  };

  const isEditingField = (fieldName) => {
    return edit === fieldName;
  };

  const handleNameChange = (value) => {
    setName(value);
  }

  const handleDescriptionChange = (event) => {
    setBio(event);
    props.setBio(event);
    setError('');
  };
  

  const handleEmailChange = (event) => {
    setEmail(event);
    props.setEmail(event);
    setError("");
  };

  const handleAddressChange = (event) => {
    setAddress(event);
    props.setAddress(event);
    setError("");
  };

  const handleTaglineChange = (event) => {
    setTagline(event);
    props.setTagline(event);
    setError("");
  };

  const handlePhoneChange = (event) => {
    setContactNum(event);
    props.setContactNum(event);
    setError("");
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event);
  };

  const handleSaveName = async () => {
    setCurrentModal(
      <ModalChangeName
        handleClose={handleClose}
        submitSaveName={submitSaveName}
      />
    );
    handleOpen();
  };

  const submitSaveName = async () => {
    handleClose();
    setCurrentModal(
      <ModalPassword
        handleClose={() => {
          setError("");
          handleClose();
        }}
        passwordRef={passwordRef}
        submitPassword={() => submitPassword("newName", null)}
      />
    );
    handleOpen();
  };

  const submitChangeClass = async (newClass) => {
    handleClose();
    setCurrentModal(
      <ModalPassword
        handleClose={() => {
          setError("");
          handleClose();
        }}
        passwordRef={passwordRef}
        submitPassword={() => submitPassword("newClass", newClass)}
      />
    );
    handleOpen();
  };

  const submitNewPassword = async () => {
    if (
      confirmPassword === "" ||
      newPassword === "" ||
      currentPassword === ""
    ) {
      showSnackbar("Fill-in all forms", "error");
      return;
    } else if (confirmPassword !== newPassword) {
      showSnackbar("Confirm your new password.", "error");
      return;
    }

    const res = await sendRequest({
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-password`,
      method: "POST",
      body: JSON.stringify({
        member_id: profileData.member_id,
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    if (res === "Password Changed Sucessfully") {
      showSnackbar("Password Changed Sucessfully", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      showSnackbar(res, "error");
      return;
    }
  };

  const submitPassword = async (type, value) => {
    const pw = passwordRef.current.value;
    if (type === "newName") {
      const res = await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_DOMAIN}/members/update-name`,
        method: "POST",
        body: JSON.stringify({
          member_id: profileData.member_id,
          newName: name,
          pw: pw,
        }),
      });
      // alert(`newName: ${pw}`);
      if (!res) {
        showSnackbar("Invalid Password.", "error");
      } else {
        handleClose();
        showSnackbar("Name Changed Successfully!.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else if (type === "newClass") {
      const res = await sendRequest({
        url: `${
          import.meta.env.VITE_BACKEND_DOMAIN
        }/members/update-enablerClass`,
        method: "POST",
        body: JSON.stringify({
          member_id: profileData.member_id,
          newClass: value,
          pw: pw,
        }),
      });
      // alert(`newName: ${pw}`);
      if (!res) {
        showSnackbar("Invalid Password.", "error");
      } else {
        handleClose();
        showSnackbar("Classification Changed Successfully!.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }

  // console.log("profileData: ", profileData);

  return (
    <>
            {props.isEditing ?(
              <div className={styles["editingContainer"]}>
                  <SnackbarComponent />
                  <CustomModal 
                    content={currentModal}
                  />
                  <section className={styles['form-container']}>
                    <h1 className={styles['editing_header']}>{changeForm ? 'Your Profile' : "Change Password"}</h1>
                      {changeForm ? (
                        <Fragment>
                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label htmlFor="company_name">
                                Company Name 
                                <ToolTip1 title={`Changing the name will have a one-year duration before changing to another name. ${profileData?.institution_change_valid_date ? `You may change your institution's name by ${moment(profileData.institution_change_valid_date).format('MMMM D, YYYY')}.` : ''}`}>
                                  <InfoOutlined onMouseEnter={() => showTooltip1()}/> 
                                </ToolTip1>
                              </label>
                              <TextField
                                id="company_name"
                                size="small"
                                placeholder="Insert your organization's name here..."
                                fullWidth
                                onChange={(e) => {
                                  setName(e.target.value); // Update name state
                                }}
                                value={name}
                                disabled={currentDate <= profileData.institution_change_valid_date || !isEditingField('name')}
                                InputProps={
                                  currentDate <= profileData.institution_change_valid_date 
                                    ? {}
                                    : {
                                        endAdornment: (
                                          <>
                                            {nameChanged && ( // Render save button only if name changed
                                              <Button 
                                                onClick={handleSaveName}
                                                sx={{
                                                  textTransform: 'none',
                                                  color: '#292d3e',
                                                  '&:hover': {
                                                    color: '#292d3e',
                                                  },
                                                  marginLeft: '-2', // Add some margin between the buttons
                                                }}
                                              >
                                                Save
                                              </Button>
                                            )}
                                            {!isEditingField('name') && (
                                              <Fragment>
                                                <Button
                                                  onClick={() => handleToggleEditField('name')} // Handle toggle edit mode
                                                  sx={{
                                                    textTransform: 'none',
                                                    color: '#292d3e',
                                                    '&:hover': {
                                                      color: '#292d3e',
                                                    },
                                                    marginLeft: '-2', // Add some margin between the buttons
                                                  }}
                                                >
                                                  Edit
                                                </Button>
                                              </Fragment>
                                            )}
                                            
                                          </>
                                        ),
                                      }
                                }
                              />
                            </div>

                  <div className={styles["form-col"]}>
                    <label htmlFor="email">Email Address</label>
                    <TextField
                      id="email"
                      size="small"
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Insert email address here..."
                      fullWidth
                      disabled
                      value={email}
                    />
                  </div>
                </div>

                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label htmlFor="contact">Contact Number</label>
                                <TextField 
                                  id='contact'
                                  size='small'
                                  onChange={e => handlePhoneChange(e.target.value)}
                                  placeholder='Insert contact number here...'
                                  fullWidth
                                  disabled={!isEditingField('contactNum')}
                                  value={contactNum}
                                  InputProps={
                                    isEditingField('contactNum') ? {} : { // If edit is true, don't add any InputProps
                                      endAdornment: ( // Render save button only if edit is false
                                        <Button 
                                          onClick={() => handleToggleEditField('contactNum')} // Set edit to true when clicked
                                          sx={{
                                            textTransform: 'none',
                                            color: '#292d3e',
                                            '&:hover': {
                                              color: '#292d3e',
                                            },
                                            marginRight: -2
                                          }}
                                        >
                                          Edit
                                        </Button>
                                      ),
                                    }
                                  }
                                />
                            </div>

                  <div className={styles["form-col"]}>
                    {profileData.member_type === 2 && (
                      <Fragment>
                        <label htmlFor="enabler_class">
                          Classification
                          <ToolTip2
                            title={
                              "Changing the classification of your account will have a one-year duration before changing to another classification."
                            }
                          >
                            <InfoOutlined
                              onMouseEnter={() =>
                                showTooltip2(
                                  "Changing the classification of your account will have a one-year duration before changing to another classification."
                                )
                              }
                            />
                          </ToolTip2>
                        </label>
                        <Select
                          id="enabler_class"
                          value={profileData.enabler_class}
                          onChange={(event) =>
                            handleClassificationChange(event.target.value)
                          }
                          fullWidth
                          size="small"
                          disabled={
                            currentDate <= profileData.class_change_valid_date
                          }
                        >
                          <MenuItem value={"SUC"}>
                            State University and Colleges
                          </MenuItem>
                          <MenuItem value={"LGU"}>
                            Local Government Unit
                          </MenuItem>
                          <MenuItem value={"TBI"}>
                            Technology Business Incubator
                          </MenuItem>
                        </Select>
                      </Fragment>
                    )}
                  </div>
                </div>

                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label htmlFor="address">Address</label>
                              <TextField 
                                id='address'
                                size='small'
                                onChange={e => handleAddressChange(e.target.value)}
                                placeholder='Insert address here...'
                                fullWidth
                                value={address}
                                disabled={!isEditingField('address')}
                                InputProps={
                                  isEditingField('address') ? {} : { // If edit is true, don't add any InputProps
                                    endAdornment: ( // Render save button only if edit is false
                                      <Button 
                                        onClick={() => handleToggleEditField('address')} // Set edit to true when clicked
                                        sx={{
                                          textTransform: 'none',
                                          color: '#292d3e',
                                          '&:hover': {
                                            color: '#292d3e',
                                          },
                                          marginRight: -2
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    ),
                                  }
                                }
                              />
                            </div>
                          </div>


                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label htmlFor="tagline">Tagline</label>
                              <TextField 
                                id='tagline'
                                size='small'
                                onChange={e => handleTaglineChange(e.target.value)}
                                placeholder='Masarap kahit walang sauce.'
                                defaultValue={tagline}
                                fullWidth
                                disabled={!isEditingField('tagline')}
                                InputProps={
                                  isEditingField('tagline') ? {} : { // If edit is true, don't add any InputProps
                                    endAdornment: ( // Render save button only if edit is false
                                      <Button 
                                        onClick={() => handleToggleEditField('tagline')} // Set edit to true when clicked
                                        sx={{
                                          textTransform: 'none',
                                          color: '#292d3e',
                                          '&:hover': {
                                            color: '#292d3e',
                                          },
                                          marginRight: -2
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    ),
                                  }
                                }
                              />
                            </div>
                          </div>

                            <div className={styles['form-row']}>
                              <div className={styles['form-col']}>
                                <label 
                                    htmlFor="description" 
                                    style={{
                                      display: 'flex',

                                    }}
                                  >
                                    <span style={{flex: 1}}>
                                      Web Links 
                                    </span>
                                    {!isEditingField('links') && ( 
                                      <Fragment>
                                        <Button
                                          sx={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                            textTransform: 'none',
                                            color: '#292d3e',
                                            '&:hover': {
                                              color: '#292d3e',
                                            },
                                          }}
                                          onClick={() => handleToggleEditField('links')}
                                        >
                                          Edit
                                        </Button>
                                      </Fragment>
                                      )
                                    }
                                  </label>
                                {companyLinks.length > 0 && companyLinks?.map((link, index) => (
                                  <TextField 
                                    key={link.link_id}
                                    id={`link-${index}`}
                                    size='small'
                                    inputRef={linkRef}
                                    fullWidth
                                    disabled={!isEditingField('links')}
                                    onChange={e => handleChangeLink(index, e.target.value)}
                                    placeholder='Insert link here...'
                                    defaultValue={link.url}
                                    InputProps={
                                      toggleLinkEdit
                                        ? {
                                            endAdornment: (
                                              <Button
                                                onClick={() => handleSaveLink(link.link_id)}
                                              >
                                                Save
                                              </Button>
                                            ),
                                          }
                                        : (
                                          {
                                            endAdornment: (
                                              isEditingField('links') && (
                                                <IconButton onClick={() => handleRemoveLink(link.link_id)}>
                                                  <Clear sx={{ color: 'red' }} />
                                                </IconButton>
                                              )
                                            ),
                                          }
                                        )
                                      }
                                    />
                                  ))}
                                <Button
                                    variant='outlined'
                                    startIcon={<Add />}
                                    sx={{
                                        color: 'text.primary',
                                        borderColor: 'text.disabled',
                                        '&:hover': {
                                            borderColor: 'text.primary',
                                            color: 'black'
                                        }
                                    }}
                                    disabled={!isEditingField('links')}
                                    onClick={handleAddLink}
                                    >
                                    Add
                                </Button>
                              </div>
                            </div>

                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label 
                                htmlFor="description" 
                                style={{
                                  display: 'flex',

                                }}
                              >
                                <span style={{flex: 1}}>
                                  Description 
                                </span>
                                {!isEditingField('bio') && ( 
                                  <Fragment>
                                    <Button
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'right',
                                        textTransform: 'none',
                                        color: '#292d3e',
                                        '&:hover': {
                                          color: '#292d3e',
                                        },
                                      }}
                                      onClick={() => handleToggleEditField('bio')}
                                    >
                                      Edit
                                    </Button>
                                  </Fragment>
                                  )
                                }
                              </label>
                              <TextField 
                                id='description'
                                size='small'
                                onChange={e => handleDescriptionChange(e.target.value)}
                                defaultValue={profileData.setting_bio}
                                placeholder='Tell us about your organization...'
                                fullWidth
                                multiline
                                rows={12}
                                disabled={!isEditingField('bio')}
                              />
                            </div>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div className={styles['form-row']}>
                            <div className={styles['form-col']}>
                              <label htmlFor="pw-current">Current Password</label>
                              <TextField 
                                id='pw-current'
                                size='small'
                                type='password'
                                value={currentPassword}
                                onChange={e => handleCurrentPasswordChange(e.target.value)}
                                fullWidth
                              />
                            </div>
                          </div>

                <div className={styles["form-row"]}>
                  <div className={styles["form-col"]}>
                    <label htmlFor="pw-new">New Password</label>
                    <TextField
                      id="pw-new"
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      size="small"
                      type="password"
                      fullWidth
                    />
                  </div>
                </div>

                <div className={styles["form-row"]}>
                  <div className={styles["form-col"]}>
                    <label htmlFor="pw-confirm">Confirm New Password</label>
                    <TextField
                      id="pw-confirm"
                      value={confirmPassword}
                      onChange={(e) =>
                        handleConfirmPasswordChange(e.target.value)
                      }
                      size="small"
                      fullWidth
                      type="password"
                    />
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={submitNewPassword}
                  sx={{
                    padding: "15px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    borderRadius: "15px",
                    backgroundColor: "#fd7c06",
                    "&:hover": {
                      backgroundColor: "#fd7c06",
                    },
                  }}
                >
                  Submit
                </Button>
              </Fragment>
            )}

            <div className={styles["form-row"]}>
              <a
                href="#"
                onClick={() => setChangeForm((prevState) => !prevState)}
              >
                {changeForm ? "Change Password" : "Back"}
              </a>
            </div>
          </section>
        </div>
      ) : (
        // className={styles["AboutTabContainer"]}
        <div className="bg-white p-3 mr-3 shadow-lg rounded-lg w-[380px] h-max-[400px] h-[300px]">
          <h1 className="text-3xl font-bold mb-1">About</h1>
          <hr />
          <div className={styles["enablerContent"]}>
            <p className={styles["enablerDescription"]}>{props.description}</p>
            <p className={styles["enablerLocation"]}>
              <FmdGoodRoundedIcon />⠀{props.address}
            </p>
            <div className={styles["enablerContact"]}>
              <p>
                <EmailRoundedIcon />⠀{props.email}
              </p>
              <p>
                <CallRoundedIcon />⠀{props.phone}
              </p>
              {/* <p><FacebookRoundedIcon/>⠀@{props.fb}</p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ModalChangeName = ({ handleClose, submitSaveName }) => (
  <Fragment>
    <section className={styles["modal-container"]}>
      <h1>Are you sure you want to change Name?</h1>
      <p>
        Changing the name will have a one-year duration before changing to
        another name.
      </p>
      <div className={styles["modal-buttons"]}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleClose}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={submitSaveName}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
            backgroundColor: "#EB5858",
            "&:hover": {
              backgroundColor: "#EB5858",
            },
          }}
        >
          Change
        </Button>
      </div>
    </section>
  </Fragment>
);

const ModalChangeClass = ({ handleClose, submitChangeClass }) => (
  <Fragment>
    <section className={styles["modal-container"]}>
      <h1>Are you sure you want to change Classification?</h1>
      <p>
        Changing the classification of your account will have a one-year
        duration before changing to another classification.
      </p>
      <div className={styles["modal-buttons"]}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleClose}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={submitChangeClass}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
            backgroundColor: "#EB5858",
            "&:hover": {
              backgroundColor: "#EB5858",
            },
          }}
        >
          Change
        </Button>
      </div>
    </section>
  </Fragment>
);

const ModalPassword = ({ handleClose, submitPassword, passwordRef }) => (
  <Fragment>
    <section className={styles["modal-container"]}>
      <h1>Enter Password</h1>
      <TextField
        fullWidth
        inputRef={passwordRef}
        size="small"
        sx={{
          margin: "20px",
          textAlign: "center",
        }}
        inputProps={{
          style: {
            textAlign: "center",
            fontSize: "25px",
          },
        }}
        type="password"
      />
      <div className={styles["modal-buttons"]}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleClose}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => submitPassword(passwordRef)}
          sx={{
            padding: "20px",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "15px",
            backgroundColor: "#EB5858",
            "&:hover": {
              backgroundColor: "#EB5858",
            },
          }}
        >
          Submit
        </Button>
      </div>
    </section>
  </Fragment>
);

export default InformationTab;

import { Fragment, useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FirstTimeLogin.module.css';
import HeaderLogo from '../../../components/HeaderLogo/HeaderLogo';
import { Add, Clear, InfoOutlined } from '@mui/icons-material';
import { TextField, Button, IconButton, Tooltip, Divider } from '@mui/material';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar';
import useLoadProfile from '../../../hooks/useLoadProfile';
import axios from 'axios';

const FirstTimeLogin = () => {
    const {profileData} = useLoadProfile();
    const [userType, setUserType] = useState({code: null, text: ''});
    const [lastId, setLastId] = useState(1);
    const navigate = useNavigate();
    const { SnackbarComponent, showSnackbar } = useCustomSnackbar();

    const [logo, setLogo] = useState();
    const [cover, setCover] = useState();
    const [description, setDescription] = useState('');
    const [tagline, setTagline] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyLinks, setCompanyLinks] = useState([{ id: 1, value: '' }]);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const logoAndCover = useMemo(() => ({ logo, cover }), [logo, cover]);

    useEffect(() => {
        const loadData = () => {
            setUserType({code: profileData?.member_type, text: profileData?.user_type})
            setEmail(profileData?.email_address);
            setAddress(profileData?.setting_address);
        } 

        loadData();
    }, [profileData])

    const handleChangeNumber = (value) => {
        setPhoneNumber(value);
    };

    const handleChangeDescription = (value) => {
        setDescription(value);
    };

    const handleChangeTagline = (value) => {
        setTagline(value);
    };

    const handleChangeEmail = (value) => {
        setEmail(value);
    };

    const handleChangeAddress = (value) => {
        setAddress(value);
    };

    const handleChangePassword = (value) => {
        setPassword(value);
    }

    const handleChangeConfirmPass = (value) => {
        setConfirmPass(value);
    }

    const formRenderer = useMemo(() => {
        switch (userType.code) {
            case 1:
                setUserType({ code: 1, text: 'Startup Company' });
                return <CompanyForm handleChangeAddress={handleChangeAddress} handleChangeNumber={handleChangeNumber} handleChangeTagline={handleChangeTagline} profileData={profileData}/>
            case 2:
                setUserType({ code: 2, text: 'Startup Enabler' });
                return <EnablerForm handleChangeAddress={handleChangeAddress} handleChangeEmail={handleChangeEmail} handleChangeNumber={handleChangeNumber} profileData={profileData}/>;
            case 3:
                setUserType({ code: 3, text: 'Startup Mentor' });
                return <MentorForm handleChangeAddress={handleChangeAddress} handleChangeNumber={handleChangeNumber} handleChangeTagline={handleChangeTagline} profileData={profileData}/>;
            default:
                return null;
        }
    }, [userType.code]);

    const handleAddLink = () => {
        const newId = lastId + 1;
        setLastId(newId);
        setCompanyLinks([...companyLinks, { id: newId, value: '' }]);
    };

    const handleChangeLink = (id, value) => {
        const updatedLinks = companyLinks.map((link) => {
            if (link.id === id) {
                return { ...link, value };
            }
            return link;
        });
        setCompanyLinks(updatedLinks);
    };

    const handleRemoveLink = (id) => {
        const filteredLinks = companyLinks.filter((link) => link.id !== id);
        setCompanyLinks(filteredLinks);
    };

    const handleSubmit = async () => {
        const requiredFields = [phoneNumber, address, description, password];
        const companyLinkValues = companyLinks.map(link => link.value);

        if (userType.code === 1 || userType.code === 3) {
            requiredFields.push(tagline);
        }
    
        // Check if any required field is empty
        if (requiredFields.some(field => !field)) {
            requiredFields.push(email);
            showSnackbar('Please fill in all required fields.', "error");
            return;
        }

        if (!logo || !cover) {
            showSnackbar('Please include your logo and cover photo.', "error")
            return;
        }

        if (password != confirmPass) {
            showSnackbar('Your password does not match.', "error");
            return;
        }

        const formData = new FormData();

        formData.append('token', localStorage.getItem('access'));
        formData.append('password', password);
        formData.append('contact', phoneNumber);
        formData.append('description', description);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('profileImg', logo);
        formData.append('coverImg', cover);

        companyLinkValues.forEach(value => {
            formData.append('links[]', value);
        });
        
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/login/firstTime`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads
                },
            });
            
            if (res.data === true) {
              navigate('/account')
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <Fragment>
            <SnackbarComponent />
            <main className={styles['setup-main']}>
                <header className={styles['setup-header']}>
                    <HeaderLogo />
                </header>

                <section className={styles['setup-container']}>
                    <div className={styles["setup-body"]}>
                        <h1>Profile Setup</h1>
                        <div className={styles["setup-forms"]}>
                            <div className={styles["setup-form-profile-pics"]}>
                                {logoAndCover.cover ? (
                                    <div
                                        htmlFor="fileInput"
                                        className={styles["setup-form-cover"]}
                                        style={{
                                            backgroundImage: `url(${logoAndCover.cover ? URL.createObjectURL(logoAndCover.cover[0]) : ''})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                        }}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept='.jpg, .png, .jpeg'
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                setCover(e.target.files);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <label htmlFor="fileInput" className={styles["setup-form-cover"]}>
                                        <Add />
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept='.jpg, .png, .jpeg'
                                            style={{ display: 'none' }}
                                            onChange={(e) => setCover(e.target.files)}
                                        />
                                        Include your cover photo
                                    </label>
                                )}
                                {logoAndCover.logo ? (
                                    <div
                                        className={styles['setup-form-profilePic']}
                                        style={{
                                            backgroundImage: `url(${logoAndCover.cover ? URL.createObjectURL(logoAndCover.logo[0]) : ''})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                        }}
                                        onClick={() => document.getElementById('logoInput').click()}
                                    >
                                        <input
                                            type="file"
                                            id="logoInput"
                                            accept='.jpg, .png, .jpeg'
                                            style={{ display: 'none' }}
                                            onChange={(e) => setLogo(e.target.files)}
                                        />
                                    </div>
                                ) : (
                                    <label htmlFor="logoInput" className={styles['setup-form-profilePic']}>
                                        <Add sx={{ fontSize: 30 }} />
                                        <input
                                            type="file"
                                            id="logoInput"
                                            accept='.jpg, .png, .jpeg'
                                            style={{ display: 'none' }}
                                            onChange={(e) => setLogo(e.target.files)}
                                        />
                                        Include your logo
                                    </label>
                                )}
                                <div className={styles['setup-form-name']}>
                                    <h2>{profileData?.setting_institution}</h2>
                                    <span>{userType?.text}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles['setup-form-fields']}>
                            <div className={styles['text-field-container']}>
                                {formRenderer}

                                <div className={styles['field-row']}>
                                    <div className={styles['field-col']}>
                                    <label htmlFor="linkField">Company Links</label>
                                    {companyLinks.map(link => (
                                        <div key={link.id} className={styles['field-row']}>
                                            <TextField
                                                id={`linkField${link.id}`}
                                                size='small'
                                                variant="outlined"
                                                placeholder='website.com'
                                                // value={link.value}
                                                fullWidth
                                                onChange={e => handleChangeLink(link.id, e.target.value)}
                                                InputProps={companyLinks.length > 1 ? // Use a ternary operator to conditionally render InputProps
                                                    {
                                                        endAdornment: (
                                                            <IconButton 
                                                                onClick={() => handleRemoveLink(link.id)}
                                                            >
                                                                <Clear sx={{color: 'red'}} />
                                                            </IconButton>
                                                        )
                                                    }
                                                    : {} // Provide an empty object if companyLinks.length is not greater than 1
                                            }
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        variant='outlined'
                                        startIcon={<Add />}
                                        onClick={handleAddLink}
                                        sx={{
                                            color: 'text.primary',
                                            borderColor: 'text.disabled',
                                            '&:hover': {
                                                borderColor: 'text.primary',
                                                color: 'black'
                                            }
                                        }}>
                                        Add
                                    </Button>
                                    </div>
                                </div>

                                <div className={styles['field-row']}>
                                    <div className={styles['field-col']}>
                                        <label htmlFor="descriptionField">Description</label>
                                        <TextField
                                            id="descriptionField"
                                            placeholder="Tell us something about you..."
                                            multiline
                                            rows={10}
                                            variant="outlined"
                                            value={description}
                                            onChange={(e) => handleChangeDescription(e.target.value)}
                                            // onChange={(event) => handleInputLimiterChange(event.target.value, setDescription, 100)} // Maximum length set to 100
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <div style={{
                                            //             position: 'absolute',
                                            //             bottom: '0',
                                            //             right: '0',
                                            //             color: 'gray',
                                            //             marginRight: '10px',
                                            //             marginBottom: '20px'
                                            //         }}>
                                            //             ({description ? description.length : 0}/100)
                                            //         </div>
                                            //     ),
                                            // }}
                                        />
                                    </div>
                                </div>

                                <Divider />
                                
                                <div className={styles['field-row']}>
                                    <div className={styles['field-col']}>
                                        <label htmlFor="passwordField">New Password</label>
                                        <TextField id="passwordField" onChange={(e) => handleChangePassword(e.target.value)} value={password} type='password' size='small' variant="outlined" />
                                    </div>
                                </div>

                                <div className={styles['field-row']}>
                                    <div className={styles['field-col']}>
                                        <label htmlFor="confirmPasswordField">Confirm Password</label>
                                        <TextField id="confirmPasswordField" onChange={(e) => handleChangeConfirmPass(e.target.value)} value={confirmPass} type='password' size='small' variant="outlined" />
                                    </div>
                                </div>

                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={handleSubmit}
                                    sx={{
                                        backgroundColor: "#fe7d07",
                                        padding: 1.5,
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        marginTop: 2,
                                        '&:hover': { // Override default hover styles
                                            backgroundColor: "#fe7d07", // Set the same background color as normal state
                                        }
                                    }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Fragment>
    );
};

// FORMS
const EnablerForm = ({ handleChangeEmail, email, phoneNumber, handleChangeNumber, handleChangeAddress, address, profileData}) => {
    return (
        <Fragment>
            <div className={styles['field-row']}>
                <div className={styles['field-col']}>   
                    <label htmlFor="emailField">Email Address</label>
                    <TextField id="emailField" onChange={(e) => handleChangeEmail(e.target.value)} defaultValue={profileData.email_address} value={email} placeholder='username@email.com' sx={{width: '50%'}} type='email' size='small' variant="outlined" />
                </div>
            </div>

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <div className={styles['field-col']}>
                        <label>Contact Number</label>
                        <TextField 
                            size='small'
                            placeholder="+63 923 123 7890"
                            value={phoneNumber}
                            onChange={(e) => handleChangeNumber(e.target.value)}
                            sx={{
                                marginTop: 0.5
                            }}
                            inputProps={{
                                maxLength: 12,
                            }}
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={styles['field-col']}>
                    <div className={styles['field-row']}>
                        <label htmlFor="numberField">Classification </label>
                        <Tooltip 
                            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam temporibus earum blanditiis impedit officiis placeat iste. Facere molestiae eos atque illum vero, ea, accusamus veniam, fugit deserunt totam aliquam eaque?"
                            placement='top'
                        >
                            <InfoOutlined />
                        </Tooltip>
                    </div>
                    <TextField id="numberField" disabled placeholder='Technology Business Incubator' size='small' fullWidth variant="outlined" />
                </div>
            </div> 

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label htmlFor="addressField">Address</label>
                    <TextField id="addressField" defaultValue={profileData?.setting_address} onChange={(e) => handleChangeAddress(e.target.value)} value={address} placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                </div>
            </div>
        </Fragment>
    )
}

const CompanyForm = ({ phoneNumber, handleChangeNumber, handleChangeAddress, address, tagline, handleChangeTagline, profileData }) => {
    return (
        <Fragment>
            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label>Contact Number</label>
                    <TextField 
                        id='contactForm'
                        size='small'
                        placeholder="+63 923 123 7890"
                        value={phoneNumber}
                        onChange={(e) => handleChangeNumber(e.target.value)}
                        inputProps={{
                            maxLength: 12,
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={styles['field-col']}>
                    &nbsp;
                </div>
            </div> 

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label htmlFor="addressField">Address</label>
                    <TextField id="addressField" onChange={(e) => handleChangeAddress(e.target.value)} defaultValue={profileData.setting_address} value={address} placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                </div>
            </div>

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label htmlFor="numberField">Company Tagline</label>
                    <TextField
                        placeholder='Masarap kahit walang sauce.'
                        size='small'
                        variant="outlined"
                        value={tagline}
                        onChange={(e) => handleChangeTagline(e.target.value)}
                    />
                </div>
            </div> 

        </Fragment>
    )
}


const MentorForm = ({ phoneNumber, handleChangeNumber, handleChangeAddress, address, tagline, handleChangeTagline, profileData }) => {
    return (
        <Fragment>
            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label>Contact Number</label>
                    <TextField 
                        size='small'
                        placeholder="+63 923 123 7890"
                        value={phoneNumber}
                        onChange={(e) => handleChangeNumber(e.target.value)}
                        inputProps={{
                            maxLength: 12,
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={styles['field-col']}>
                    &nbsp;
                </div>
            </div> 

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label htmlFor="addressField">Address</label>
                    <TextField id="addressField" onChange={(e) => handleChangeAddress(e.target.value)} value={address} placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                </div>
            </div>

            <div className={styles['field-row']}>
                <div className={styles['field-col']}>
                    <label htmlFor="numberField">Company Tagline</label>
                    <TextField
                        placeholder='Masarap kahit walang sauce.'
                        size='small'
                        variant="outlined"
                        value={tagline}
                        onChange={(e) => handleChangeTagline(e.target.value)}
                        // onChange={(event) => handleInputLimiterChange(event.target.value, setTagline, 20)}
                        // InputProps={{
                        //     endAdornment: (
                        //         <div>
                        //             ({tagline ? tagline.length : 0}/20)
                        //         </div>
                        //     ),
                        // }}
                    />
                </div>
            </div> 
        </Fragment>
    )
}



export default FirstTimeLogin

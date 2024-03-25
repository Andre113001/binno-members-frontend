import { Fragment, useState, useRef } from 'react'
import styles from './FirstTimeLogin.module.css'
import HeaderLogo from '../../../components/HeaderLogo/HeaderLogo'
import { Add, Clear, InfoOutlined } from '@mui/icons-material'
import { TextField, Button, IconButton, Tooltip } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'

const FirstTimeLogin = () => {
    const [userType, setUserType] = useState(3);
    const [companyLinks, setCompanyLinks] = useState([{ id: 1, value: '' }]);
    const [ description, setDescription ] = useState(null);
    const [ tagline, setTagline ] = useState(null);
    const [lastId, setLastId] = useState(1);

    // FormRefs
    const descriptionRef = useRef(null);
    const taglineRef = useRef(null);

    const formRenderer = () => {
        switch (userType) {
            case 1:
                return <CompanyForm />
            case 2: 
                return <EnablerForm/>
            case 3: 
                return <MentorForm />
            default:
                break;
        }
    }

    const handleInputLimiterChange = (inputText, setter, maxLength) => {
        // Limiting characters
        if (!maxLength || inputText.length <= maxLength) {
            setter(inputText);
        }
    };

    const handleAddLink = () => {
        const newId = lastId + 1;
        setLastId(newId);
        setCompanyLinks([...companyLinks, { id: newId, value: '' }]);
    };

    const handleChangeLink = (id, value) => {
        const updatedLinks = companyLinks.map(link => {
            if (link.id === id) {
                return { ...link, value };
            }
            return link;
        });
        setCompanyLinks(updatedLinks);
    };

    const handleRemoveLink = id => {
        const filteredLinks = companyLinks.filter(link => link.id !== id);
        setCompanyLinks(filteredLinks);
    };


    // FORMS
    const EnablerForm = () => {
        return (
            <Fragment>
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>   
                        <label htmlFor="emailField">Email Address</label>
                        <TextField id="emailField" placeholder='username@email.com' sx={{width: '50%'}} type='email' size='small' variant="outlined" />
                    </div>
                </div>
    
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="numberField">Contact Number</label>
                        <MuiTelInput size='small' defaultCountry="PH" inputProps={{ maxLength: 12 }} forceCallingCode disableDropdown sx={{marginTop: 0.55}}/>
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
                        <TextField id="addressField" placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                    </div>
                </div>
            </Fragment>
        )
    }
    
    const CompanyForm = () => {
        return (
            <Fragment>
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="numberField">Contact Number</label>
                        <MuiTelInput size='small' defaultCountry="PH" inputProps={{ maxLength: 12 }} forceCallingCode disableDropdown sx={{marginTop: 0.55, width: '50%'}}/>
                    </div>
                </div> 
    
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="addressField">Address</label>
                        <TextField id="addressField" placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                    </div>
                </div>
    
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="numberField">Company Tagline</label>
                        <TextField
                            placeholder='Masarap kahit walang sauce.'
                            size='small'
                            variant="outlined"
                            inputRef={taglineRef}
                            value={tagline}
                            onChange={(event) => handleInputLimiterChange(event, setTagline, 20)} // Pass event object as the first argument
                            InputProps={{
                                endAdornment: (
                                    <div>
                                        ({tagline ? tagline.length : 0}/20)
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </div> 
    
            </Fragment>
        )
    }
    
    const MentorForm = () => {
        return (
            <Fragment>
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="numberField">Contact Number</label>
                        <MuiTelInput size='small' defaultCountry="PH" inputProps={{ maxLength: 12 }} forceCallingCode disableDropdown sx={{marginTop: 0.55, width: '50%'}}/>
                    </div>
                </div> 
    
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="addressField">Address</label>
                        <TextField id="addressField" placeholder='Sagpon, Legazpi City, Albay' size='small' variant="outlined" />
                    </div>
                </div>
    
                <div className={styles['field-row']}>
                    <div className={styles['field-col']}>
                        <label htmlFor="numberField">Company Tagline</label>
                        <TextField
                            placeholder='Masarap kahit walang sauce.'
                            size='small'
                            variant="outlined"
                            inputRef={taglineRef}
                            value={tagline}
                            onChange={(event) => handleInputLimiterChange(event.target.value, setTagline, 20)}
                            InputProps={{
                                endAdornment: (
                                    <div>
                                        ({tagline ? tagline.length : 0}/20)
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </div> 
            </Fragment>
        )
    }

    const handleSubmit = async () => {
        console.log(companyLinks);
    }

    return (
        <Fragment>
            <main className={styles['setup-main']}>
                <header className={styles['setup-header']}>
                    <HeaderLogo />
                </header>

                <section className={styles['setup-container']}>
                    <div className={styles["setup-body"]}>
                        <h1>Profile Setup</h1>
                        <div className={styles["setup-forms"]}>
                            <div className={styles["setup-form-profile-pics"]}>
                                <div className={styles["setup-form-cover"]}>
                                    <Add/>
                                    <span>Include your cover photo</span>
                                </div>
                                <div className={styles['setup-form-profilePic']}>
                                    <Add sx={{fontSize: 30}}/>
                                    <span>Include your logo</span>
                                </div>
                                <div className={styles['setup-form-name']}>
                                    <h2>Andale</h2>
                                    <span>Startup Company</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles['setup-form-fields']}>
                            <div className={styles['text-field-container']}>
                                {formRenderer()}
                                {/* Corrected the syntax here */}

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
                                                value={link.value}
                                                fullWidth
                                                onChange={e => handleChangeLink(link.id, e.target.value)}
                                                InputProps={companyLinks.length > 1 && {
                                                    endAdornment: (
                                                        <IconButton 
                                                            onClick={() => handleRemoveLink(link.id)}
                                                        >
                                                            <Clear sx={{color: 'red'}} />
                                                        </IconButton>
                                                    )
                                                }}
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
                                            inputRef={descriptionRef}
                                            value={description}
                                            onChange={(event) => handleInputLimiterChange(event.target.value, setDescription, 100)} // Maximum length set to 100
                                            InputProps={{
                                                endAdornment: (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '0',
                                                        right: '0',
                                                        color: 'gray',
                                                        marginRight: '10px',
                                                        marginBottom: '20px'
                                                    }}>
                                                        ({description ? description.length : 0}/100)
                                                    </div>
                                                ),
                                            }}
                                        />
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
    )
}



export default FirstTimeLogin

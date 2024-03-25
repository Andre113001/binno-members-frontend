import { Fragment, useState, useRef } from 'react';
import logo from "../../../icon.svg";
import styles from './Register.module.css';
import { Tabs, Tab, TextField, Button, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import { Link } from 'react-router-dom';
import useHttp from '../../../hooks/http-hook';
import { useNavigate } from 'react-router-dom';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar';

const Register = () => {
    const [value, setValue] = useState(0); // State to keep track of the selected tab
    const [ classification, setClassification ] = useState('');
    const [ type, setType ] = useState('Company');
    const [error, setError] = useState(false);

    const { sendRequest, isLoading } = useHttp();
    const navigate = useNavigate();
    const { showSnackbar, SnackbarComponent } = useCustomSnackbar();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);

    const handleChangeType = (event, newValue) => {
        switch (newValue) {
            case 0:
                setType('Company');
                break;
            case 1:
                setType('Enabler');
                break;
            case 2: 
                setType('Mentor');
                break;
            default:
                break;
        }
        setValue(newValue);
        setClassification('');
        setError(false);
    };

    // console.log(type);

    const handleChangeClass = (event) => {
        setClassification(event.target.value);
        setError(false);
    }

    const handleFieldChange = () => {
        setError(false);
    }

    const handleSubmit = async () => {
        const formData = {
            institution: nameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            classification: classification,
            type: type
        }
        if (
            Object.values(formData).every(value => value === '') ||
            (
                Object.entries(formData)
                    .filter(([key]) => key !== 'classification')
                    .some(([_, value]) => value === '') &&
                !(type === 'Enabler' && formData.classification)
            ) ||
            (type === 'Enabler' && !formData.classification)
        ) {
            showSnackbar("Please fill in all required fields.", 'error');
            setError(true);
            return; // Exit the function if all fields are empty or if any other required field is empty (for Mentor and Company) or if classification is empty for Enabler
        }

        if (!isValidEmail(formData.email)) {
            showSnackbar("Please enter a valid email address.", 'error');
            setError(true);
            return;
        }

        try {
            const res = await sendRequest({
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/register/`,
                method: 'POST',
                body: JSON.stringify(formData)
            })

            if (res.appId) {
                localStorage.setItem("app_id", res.appId);
                localStorage.setItem("form_info", JSON.stringify(formData));
                navigate('/upload');
            } else {
                showSnackbar(res.result, "error")
            }

        } catch (error) {
            console.error('Error: ', error.message);
        }
    }

    return (
        <>
            <SnackbarComponent/>
            <header className={styles['header']}>
                <img src={logo} className={styles['header-logo']} alt="" />
            </header>
            <nav className={styles['tabs']}>
                <h1 className={styles['header-title']}>Register</h1>
                <Tabs className={styles['tab-selection']} value={value} onChange={handleChangeType} indicatorColor="primary">
                    <Tab label="Startup Company" sx={{ fontWeight: value === 0 ? 'bold' : 'normal' }} /> 
                    <Tab label="Startup Enabler" sx={{ fontWeight: value === 1 ? 'bold' : 'normal' }} /> 
                    <Tab label="Startup Mentor" sx={{ fontWeight: value === 2 ? 'bold' : 'normal' }} /> 
                </Tabs>
            </nav>
            
            <section className={styles['form-textfields']}>
                {(value === 0 || value === 2) && (
                    <Fragment>
                        <TextField error={error} onChange={handleFieldChange} inputRef={nameRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Name of Institution" fullWidth variant='outlined' />
                        <TextField error={error} onChange={handleFieldChange} inputRef={emailRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Email" variant='outlined' fullWidth />
                        <TextField error={error} onChange={handleFieldChange} inputRef={addressRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Address" variant='outlined' fullWidth />
                    </Fragment>
                )}
                {value === 1  && (
                    <Fragment>
                        <FormControl fullWidth sx={{ borderRadius: '16px' }}>
                            <InputLabel>Select type of enabler</InputLabel>
                            <Select
                                value={classification}
                                label="Select type of enabler"
                                onChange={handleChangeClass}
                                error={error}
                                sx={{ borderRadius: '16px' }} // Apply border radius to the Select component
                            >
                                <MenuItem value="LGU">Local Government Unit</MenuItem>
                                <MenuItem value="SUC">State Universities and Colleges</MenuItem>
                                <MenuItem value="TBI">Technology Business Incubator</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField error={error} onChange={handleFieldChange} inputRef={nameRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Name of Institution" fullWidth variant='outlined' />
                        <TextField error={error} onChange={handleFieldChange} inputRef={emailRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Email" variant='outlined' fullWidth />
                        <TextField error={error} onChange={handleFieldChange} inputRef={addressRef} InputProps={{ sx: { borderRadius: '16px' } }} label="Address" variant='outlined' fullWidth />
                    </Fragment>
                
                )}
                <Button onClick={handleSubmit} disabled={isLoading} variant='contained' sx={{backgroundColor: "#fe7d07", padding: 1.5, fontWeight: 'bold', borderRadius: '16px', '&:hover': { // Override default hover styles
                          backgroundColor: "#fe7d07", // Set the same background color as normal state
                        }}} fullWidth>Submit</Button>
                <Link to={'/'}>Already have an account? Click here</Link>
            </section>
        </>
    )
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default Register;

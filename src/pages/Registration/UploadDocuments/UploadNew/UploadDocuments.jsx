import { Fragment, useState, useEffect } from 'react'

import styles from './UploadDocuments.module.css';
import logo from "../../../../icon.svg";
import { useNavigate } from 'react-router-dom';
import useCustomSnackbar from '../../../../hooks/useCustomSnackbar';
import useHttp from '../../../../hooks/http-hook';
import axios from 'axios';

import { Button } from '@mui/material';
import { Add, CheckRounded, CheckCircleRounded } from '@mui/icons-material'

const UploadDocuments = () => {
  const [page, setPage] = useState(0);
  const [validIdFile, setValidIdFile] = useState(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState(null);
  const [businessIdFile, setBusinessIdFile] = useState(null);
  const navigate = useNavigate();
  const [ uploading, setUploading ] = useState(false);
  const { sendRequest, isLoading } = useHttp();
  const [ error, setError ] = useState(false);
  const [ appId, setAppId ] = useState();
  const [ formInfo, setFormInfo ] = useState();

  const { SnackbarComponent, showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    const loadData = () => {
      setAppId(localStorage.getItem('app_id'));
      setFormInfo(JSON.parse(localStorage.getItem('form_info')));
    }

    loadData();
  }, [])

  // console.log({
  //   app_id: appId,
  //   form_info: formInfo
  // });

  // Function to handle file upload for each document type
  const handleFileUpload = (file, type) => {
    // Check if the file size exceeds 5MB
    if (file.size > 5 * 1024 * 1024) {
        showSnackbar("File size exceeds the 5MB limit.", "error");
        return; // Exit the function without setting the file
    }

    // If the file size is within the limit, set it based on the type
    switch (type) {
        case 'validId':
            setValidIdFile(file);
            break;
        case 'proofOfAddress':
            setProofOfAddressFile(file);
            break;
        case 'businessId':
            setBusinessIdFile(file);
            break;
        default:
            break;
    }
};


  const handleSubmit = async () => {
    setUploading(true);
    const files = [validIdFile, proofOfAddressFile, businessIdFile].filter(file => file);

    if (files.length < 3) {
      showSnackbar("Please upload all required files.", "error");
      return;
    }

    try {
      const formData = new FormData();

      // Append application data to formData
      formData.append('id', appId);
      formData.append('email', formInfo.email);
      formData.append('institution', formInfo.institution);
      formData.append('address', formInfo.address);
      formData.append('type', formInfo.type);
      formData.append('classification', formInfo.classification);
      files.forEach(file => {
        formData.append('files', file); // Append each file to formData
      });

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN_ADMIN}/application/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',}
      });

      // const res = await sendRequest({
      //   url: `${import.meta.env.VITE_BACKEND_DOMAIN_ADMIN}/application/upload`,
      //   method: 'POST',
      //   body: formData,
      //   // headers: {
      //   //   'Content-Type': 'multipart/form-data'
      //   // }
      // });

      if (res && res.data.result) {
        setPage(1);
        localStorage.clear();
      } else {
        showSnackbar("Failed to upload documents.", "error");
      }
    } catch (error) {
      console.error('Error: ', error.message);
      showSnackbar("Error uploading documents.", "error");
      setUploading(false);
    }
  };



  return (
    <Fragment>
      <SnackbarComponent />
      <main className={styles['body']}>
        <section className={styles['container']}>
          <img className={styles['header-logo']} src={logo} />
          {page === 0 ? (
            <Fragment>
              <header className={styles['header']}>
                <h1 className={styles['header-heading']}>Credentials</h1>
                <p>A part of our process to determine your legitimacy</p>
              </header>
              <section className={styles['content-wrapper']}>
                <div className={styles['file-section']}>

                  <div className={styles['file-card']}>
                    <h4 className={styles['file-heading']}>Valid ID</h4>
                    <label htmlFor="validIdFile" className={styles['file-upload-label']}>
                      {validIdFile ? <CheckCircleRounded sx={{fontSize: 50, color: '#5C9FEF'}} /> : <Add />  }
                      <input
                        type="file"
                        id="validIdFile"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'validId')}
                        style={{ display: 'none' }}
                      />
                      <p>{validIdFile ? validIdFile.name : 'Upload File (.pdf)'}</p>
                    </label>
                  </div>

                  <div className={styles['file-card']}>
                    <h4 className={styles['file-heading']}>Proof of Business Address</h4>
                    <label htmlFor="proofOfAddressFile" className={styles['file-upload-label']}>
                    {proofOfAddressFile ? <CheckCircleRounded sx={{fontSize: 50, color: '#5C9FEF'}} /> : <Add />  }
                      <input
                          type="file"
                          id="proofOfAddressFile"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e.target.files[0], 'proofOfAddress')}
                          style={{ display: 'none' }}
                        />
                      <p>{proofOfAddressFile ? proofOfAddressFile.name : 'Upload File (.pdf)'}</p>
                    </label>
                  </div>

                  <div className={styles['file-card']}>
                    <h4 className={styles['file-heading']}>Business Identification Document</h4>
                    <label htmlFor="businessIdFile" className={styles['file-upload-label']}>
                    {businessIdFile ? <CheckCircleRounded sx={{fontSize: 50, color: '#5C9FEF'}} /> : <Add />  }
                      <input
                          type="file"
                          id="businessIdFile"
                          accept=".pdf"
                          onChange={(e) => handleFileUpload(e.target.files[0], 'businessId')}
                          style={{ display: 'none' }}
                        />
                      <p>{businessIdFile ? businessIdFile.name : 'Upload File (.pdf)'}</p>
                    </label>
                  </div>
                </div>

                <div className={styles['submit-button']}>
                  <Button
                      fullWidth
                      onClick={handleSubmit}
                      disabled={uploading}
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
                      variant='contained'
                  >
                      Submit
                  </Button>
                </div>
              </section>
            </Fragment>
          ) : (
            <Fragment>
              <main className={styles['success-main']}>
                <span className={styles['success-heading']}>Thank you for submitting your application!</span>
                <p>A response from BiCoRSE management may take up to <b>3 to 7 days</b>. Check your email, as the management will reach out.</p>
                <p>The following step must let you upload certain documents for BiCoRSE to verify your legitimacy. The documents must be:</p>
                <div className={styles['success-checklist']}>
                  <div className={styles["success-checklist-items"]}>
                    <span><CheckRounded /> Legitimate</span>
                    <span><CheckRounded /> Readable</span>
                    <span><CheckRounded /> Timely</span>
                  </div>
                </div>
                <a href="https://binnostartup.site">
                  <Button
                      fullWidth
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
                      // onClick={() => navigate('https://binnostartup.site')}
                      variant='contained'
                  >
                      I understand and Proceed
                  </Button>
                </a>
              </main>
            </Fragment>
            )}
            </section>
          </main>
        </Fragment>
    )
}

export default UploadDocuments

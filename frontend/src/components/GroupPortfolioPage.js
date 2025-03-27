import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from '../axios';
import VerticalNavigation from './VerticalHeader';
import { useDropzone } from 'react-dropzone';


// Custom Theme
const theme = createTheme({
  palette: {
    primary: { main: '#4682B4' },
    secondary: { main: '#B0C4DE' },
  },
});

// Styled Components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginTop: '30px',
  borderRadius: '8px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
    padding: '15px',
  },
}));

const UploadDownloadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  marginTop: '30px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '15px',
  },
}));

const UploadDownloadBox = styled(Paper)({
  flex: 1,
  padding: '20px',
  backgroundColor: '#fff',
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
});

const UploadButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#32CD32',
  color: '#fff',
  '&:hover': { backgroundColor: '#2E8B57' },
});

const UploadArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #4682B4',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#f0f8ff' },
}));

const DownloadButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#4682B4',
  color: '#fff',
  '&:hover': { backgroundColor: '#5A8FBF' },
});

const SubmitButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#4682B4',
  color: '#fff',
  '&:hover': { backgroundColor: '#5A8FBF' },
});

const CancelButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#B0C4DE',
  color: '#4682B4',
  '&:hover': { backgroundColor: '#A1B8C9' },
});

const GroupPortfolioPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [formData, setFormData] = useState({
    group_name: '',
    group_email: '',
    group_phone: '',
    group_address: '',
    group_vat: '',
    group_contact_person: '',
  });
  const [formMessage, setFormMessage] = useState(""); // Message for form submission

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Handle File Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file.");
      return;
    }
  
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axiosInstance.post("http://127.0.0.1:8000/api/atlip/upload-group/", formData, {
        headers: { 
          "Authorization": `JWT ${accessToken}`,  // 🔐 Added JWT Token
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response Status:", response.status); // ✅ Log response status
      console.log("Response Data:", response.data);     // ✅ Log response data
      
      setUploadMessage("File uploaded successfully!");
    } catch (error) {
      setUploadMessage("File upload failed.");

      // ✅ Log error response details
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      } else {
        console.error("Upload error:", error.message);
      }
    }
};

  // Handle Template Download
  const handleDownload = async () => {
    // Retrieve the access_token from localStorage
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);
  
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      return;
    }
  
    try {
      const response = await axiosInstance.get("http://127.0.0.1:8000/api/atlip/download-template/", {
        headers: {
          'Authorization': `JWT ${accessToken}`,  // ✅ Include JWT Token
        },
        responseType: 'blob', // 🔹 Important: Treat response as a file
      });
  
      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx"); // Set default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Cleanup
  
      console.log("Template downloaded successfully!");
    } catch (error) {
      console.error("Error downloading template:", error);
      alert("Failed to download the template.");
    }
  };


  // Handle Form Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(""); // Reset message
  
    // Retrieve the access_token from localStorage
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);
  
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      return;
    }
  
    try {
      console.log( "formData>>>>>>>>>>" , formData); 
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/atlip/group_portfolio/",
        formData,
        {
          headers: {
            'Authorization': `JWT ${accessToken}`,  // ✅ Fixed template literal
            'Content-Type': 'application/json',
          },
        }
      );
  
      setFormMessage("Group data saved successfully!");
      console.log("Success:", response.data);
  
      // Reset form after submission
      setFormData({
        groupName: '',
        groupEmail: '',
        groupPhone: '',
        groupAddress: '',
        groupVat: '',
        groupContactPerson: '',
      });
    } catch (error) {
      setFormMessage("Failed to save group data.");
      console.error("Error:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv, .xlsx',
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
        
        {/* Navigation */}
        <VerticalNavigation selectedTab={selectedTab} onTabChange={(event, newValue) => setSelectedTab(newValue)} />

        {/* Main Content */}
        <Box sx={{ flex: 1, padding: { xs: '10px', md: '20px' } }}>
          
        {/* Upload/Download Section */}
        <UploadDownloadContainer>
          <UploadDownloadBox elevation={3}>
            <Typography variant="h6" color="primary">Upload XLS</Typography>
            <UploadArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>Drag & Drop your file here or click to browse</Typography>
          </UploadArea>
          {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
            <UploadButton variant="contained" onClick={handleUpload}>Upload File</UploadButton>
              {uploadMessage && <Typography color="error">{uploadMessage}</Typography>}
            </UploadDownloadBox>
        <UploadDownloadBox elevation={3}>
          <Typography variant="h6" color="primary">Download Template</Typography>
            <DownloadButton variant="contained" onClick={handleDownload}>Download CSV Template</DownloadButton>
        </UploadDownloadBox>
      </UploadDownloadContainer>

          {/* Form Section */}
          <FormContainer elevation={3}>
            <Typography variant="h4" sx={{ textAlign: 'center', color: '#4682B4', fontWeight: 'bold', marginBottom: '20px' }}>
              Group Data Entry
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {Object.entries(formData).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField 
                      label={key.replace(/([A-Z])/g, ' $1').trim()} 
                      name={key} 
                      value={value} 
                      onChange={handleInputChange} 
                      variant="outlined" 
                      fullWidth 
                      required
                    />
                  </Grid>
                ))}
              </Grid>
              {formMessage && <Typography color="error" sx={{ mt: 2 }}>{formMessage}</Typography>}
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item><CancelButton variant="contained">Cancel</CancelButton></Grid>
                <Grid item><SubmitButton type="submit" variant="contained">Submit</SubmitButton></Grid>
              </Grid>
            </form>
          </FormContainer>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default GroupPortfolioPage;
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from '../axios';
import VerticalNavigation from './VerticalHeader';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";


const theme = createTheme({
  palette: {
    primary: { main: '#4682B4' },
    secondary: { main: '#B0C4DE' },
  },
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: '20px',
  marginTop: '30px',
  borderRadius: '8px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: { marginTop: '20px', padding: '15px' },
}));

const UploadDownloadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  marginTop: '30px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: { flexDirection: 'column', gap: '15px' },
}));

const UploadArea = styled(Box)({
  border: '2px dashed #4682B4',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': { backgroundColor: '#f0f8ff' },
});

const OwnerPortfolioPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [formData, setFormData] = useState({ 
    owner_name : "", 
    owner_email : "" , 
    owner_phone : "", 
    owner_address : "" , 
    owner_vat : "", 
    owner_contact_person : "", 
    
  });


  const handleUpload = async () => {
    if (!file) return setUploadMessage("Please select a file.");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return alert("Access token not found. Please log in.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post("/atlip/upload-owner/", formData, {
        headers: { Authorization: `JWT ${accessToken}`, "Content-Type": "multipart/form-data" },
      });
      setUploadMessage("File uploaded successfully!");
    } catch (error) {
      setUploadMessage("File upload failed.");
      console.error("Upload error:", error.response?.data || error.message);
    }
  };

  const handleDownload = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return alert("Access token not found. Please log in.");

    try {
        console.log( accessToken , "accessToken"); 
        const response = await axiosInstance.get("http://127.0.0.1:8000/api/atlip/download-owner-template/", {
            headers: { Authorization: `JWT ${accessToken}` },
            responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
      alert("Failed to download the template.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(""); // Reset any previous messages

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
        alert("Access token not found. Please log in.");
        return;
    }

    
    
    try {
        
        console.log("Form Data:", formData.title);

        // Create form data object with the received image URL
        const formDataToSend = {
            owner_name: formData.owner_name,
            owner_email: formData.owner_email,
            owner_phone: formData.owner_phone,
            owner_address: formData.owner_address,
            owner_vat: formData.owner_vat,
            owner_contact_person: formData.owner_contact_person,
            
        };

        console.log("Submitting Data:", formDataToSend);

        console.log("Submitting Data formdata:", formData);

        // Send POST request with JSON data
        const response = await axiosInstance.post(
            "http://127.0.0.1:8000/api/atlip/owner_portfolio/",
            formDataToSend,
            {
                headers: {
                    'Authorization': `JWT ${accessToken}`,
                    "Content-Type": "multipart/form-data" 
                },
            }
        );

        setFormMessage("owner portfolio saved successfully!");
        console.log("Success:", response.data);

        // Reset form fields
        setFormData({
            owner_name: "",
            owner_email: "",
            owner_phone: "",
            owner_address: "",
            owner_vat: "",
            owner_contact_person: "",
            
        });

    } catch (error) {
        console.error("Error:", error);
        setFormMessage("Failed to save owner portfolio.");
    }
};

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv, .xlsx',
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          logo: file, // Store file
          logoPreview: reader.result, // Store preview URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
        <VerticalNavigation selectedTab={selectedTab} onTabChange={(_, newValue) => setSelectedTab(newValue)} />
        <Box sx={{ flex: 1, padding: { xs: '10px', md: '20px' } }}>
          <UploadDownloadContainer>
            <Paper elevation={3} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">Upload XLS</Typography>
              <UploadArea {...getRootProps()}>
                <input {...getInputProps()} />
                <Typography>Drag & Drop or Click to Browse</Typography>
              </UploadArea>
              {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
              <Button variant="contained" onClick={handleUpload} sx={{ mt: 2, backgroundColor: '#32CD32' }}>Upload</Button>
              {uploadMessage && <Typography color="error">{uploadMessage}</Typography>}
            </Paper>
            <Paper elevation={3} sx={{ flex: 1, p: 2, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">Download Template</Typography>
              <Button variant="contained" onClick={handleDownload} sx={{ mt: 2 }}>Download Template</Button>
            </Paper>
          </UploadDownloadContainer>
          <FormContainer elevation={3}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Owner & Registration Form
            </Typography>

            <hr />
            <br />

            <form onSubmit={handleSubmit}>
            
            <Typography variant="h5" sx={{ textAlign: "left", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Owner Data
            </Typography>

            <Grid container spacing={2}>
              {["owner_name", "owner_email", "owner_phone", "owner_address", "owner_vat", "owner_contact_person"].map((key) => (
                <Grid item xs={12} sm={4} key={key}>
                  <TextField 
                    label={key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} // Convert snake_case to Title Case
                    name={key}
                    value={formData[key] || ""} // Ensure value is controlled
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              ))}
            </Grid>

           
            

            <br />
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

export default OwnerPortfolioPage;

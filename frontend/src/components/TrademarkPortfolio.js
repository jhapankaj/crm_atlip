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

const TrademarkPortfolioPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [formData, setFormData] = useState({ 
    title : "",
    logo: "na.png",
    b_Type : "",
    territory : "",
    application_date : "",
    application_no: "",
    registration_date: "",
    registration_no: "",
    classes : "",
    deadline : "",
    affidavit : "",
    owner_name : "", 
    owner_email : "" , 
    owner_phone : "", 
    owner_address : "" , 
    owner_vat : "", 
    owner_contact_person : "", 
    agent_name : "", 
    agent_email : "" , 
    agent_phone : "" , 
    agent_address : "" , 
    agent_vat : "" , 
    agent_contact_person : "" , 
    group_name : "", 
    group_email : "", 
    group_address : "", 
    group_phone : "", 
    group_vat : "" , 
    group_contact_person : "",
    comments: "",
    status: "",
  });


  const handleUpload = async () => {
    if (!file) return setUploadMessage("Please select a file.");
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) return alert("Access token not found. Please log in.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosInstance.post("/atlip/upload-brand/", formData, {
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
      const response = await axiosInstance.get("/atlip/download-brand-template/", {
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

    let logoUrl = "/media/logos/na.png"; // Default logo path

    
    try {
        const formatDateForAPI = (dateStr) => {
            return dateStr ? format(parse(dateStr, "dd/MM/yyyy", new Date()), "yyyy-MM-dd") : "";
        };

        console.log("Form Data:", formData.title);

        if (formData.logo instanceof File) {
            const logoUrl = formData.logo; // Append file if it exists
        }

        console.log(formData.logo ,  typeof(formData.logo ) , "logo" );
        // Create form data object with the received image URL
        const formDataToSend = {
            title: formData.title,
            b_Type: formData.b_Type,
            territory: formData.territory,
            application_date: formatDateForAPI(formData.application_date),
            registration_date: formatDateForAPI(formData.registration_date),
            application_no : formData.application_no,
            registration_no : formData.registration_no,
            classes: formData.classes,
            deadline: formatDateForAPI(formData.deadline),
            affidavit: formatDateForAPI(formData.affidavit),
            owner_name: formData.owner_name,
            owner_email: formData.owner_email,
            owner_phone: formData.owner_phone,
            owner_address: formData.owner_address,
            owner_vat: formData.owner_vat,
            owner_contact_person: formData.owner_contact_person,
            agent_name: formData.agent_name,
            agent_email: formData.agent_email,
            agent_phone: formData.agent_phone,
            agent_address: formData.agent_address,
            agent_vat: formData.agent_vat,
            agent_contact_person: formData.agent_contact_person,
            group_name: formData.group_name,
            group_email: formData.group_email,
            group_address: formData.group_address,
            group_phone: formData.group_phone,
            group_vat: formData.group_vat,
            group_contact_person: formData.group_contact_person,
            comments: formData.comments,
            status: formData.status,
            logo: formData.logo, // Use the URL from the upload API
        };

        console.log("Submitting Data:", formDataToSend);

        console.log("Submitting Data formdata:", formData);

        // Send POST request with JSON data
        const response = await axiosInstance.post(
            "http://127.0.0.1:8000/api/atlip/brand_portfolio/",
            formDataToSend,
            {
                headers: {
                    'Authorization': `JWT ${accessToken}`,
                    "Content-Type": "multipart/form-data" 
                },
            }
        );

        setFormMessage("Brand portfolio saved successfully!");
        console.log("Success:", response.data);

        // Reset form fields
        setFormData({
            title: "",
            logo: "", // Reset file input
            b_Type: "",
            territory: "",
            application_date: "",
            application_no: "",
            registration_date: "",
            registration_no: "",
            classes: "",
            deadline: "",
            affidavit: "",
            owner_name: "",
            owner_email: "",
            owner_phone: "",
            owner_address: "",
            owner_vat: "",
            owner_contact_person: "",
            agent_name: "",
            agent_email: "",
            agent_phone: "",
            agent_address: "",
            agent_vat: "",
            agent_contact_person: "",
            group_name: "",
            group_email: "",
            group_address: "",
            group_phone: "",
            group_vat: "",
            group_contact_person: "",
            comments: "",
            status: "",
        });

    } catch (error) {
        console.error("Error:", error);
        setFormMessage("Failed to save brand portfolio.");
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
              <Button variant="contained" onClick={handleDownload} sx={{ mt: 2 }}>Download CSV</Button>
            </Paper>
          </UploadDownloadContainer>
          <FormContainer elevation={3}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Trademark & Registration Form
            </Typography>

            <hr />
            <br />

            <Typography variant="h5" sx={{ textAlign: "left", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Trademark & Registration Form
            </Typography>

            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <input
                        accept="image/*"
                        type="file"
                        name="logo"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="logo-upload"
                    />
                    <label htmlFor="logo-upload">
                        <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
                            Upload Logo
                        </Button>
                    </label>
                    {formData.logoPreview && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={formData.logoPreview}
                                alt="Logo Preview"
                                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                            />
                        </Box>
                    )}
                </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Trademark Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Territory"
                  name="territory"
                  value={formData.territory}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Type"
                  name="b_Type"
                  value={formData.b_Type}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Classes"
                  name="classes"
                  value={formData.priority}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Deadline"
                    value={formData.deadline ? parse(formData.deadline, "dd/MM/yyyy", new Date()) : null}
                    onChange={(newValue) => {
                    const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                    handleInputChange({ target: { name: "deadline", value: formattedDate } });
                    }}
                  renderInput={(params) => (
                  <TextField 
                    {...params} 
                      fullWidth 
                        sx={{ 
                          mb: 2, 
                          '& .MuiInputBase-root': { minHeight: 60 },  // Increased field height
                          '& .MuiOutlinedInput-input': { padding: "18px 14px" }, // Adjust padding properly
                          '& .MuiInputLabel-root': { top: -2 }, // Adjust label position if needed
                        }} 
                    />
                    )}
                    inputFormat="dd/MM/yyyy"
                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
                </LocalizationProvider>
              </Grid>
            
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Affidavit"
                    value={formData.deadline ? parse(formData.affidavit, "dd/MM/yyyy", new Date()) : null}
                    onChange={(newValue) => {
                    const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                    handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                    }}
                  renderInput={(params) => (
                  <TextField 
                    {...params} 
                      fullWidth 
                        sx={{ 
                          mb: 2, 
                          '& .MuiInputBase-root': { minHeight: 60 },  // Increased field height
                          '& .MuiOutlinedInput-input': { padding: "18px 14px" }, // Adjust padding properly
                          '& .MuiInputLabel-root': { top: -2 }, // Adjust label position if needed
                        }} 
                    />
                    )}
                    inputFormat="dd/MM/yyyy"
                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
                </LocalizationProvider>
              </Grid>


            
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
            

            </Grid>
            <hr />
            <br />
            
            <Typography variant="h5" sx={{ textAlign: "left", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Registration Data
            </Typography>

            
            <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Application Number"
                  name="application_no"
                  value={formData.application_no}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Registration Number"
                  name="registration_no"
                  value={formData.registration_no}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Application Date"
                    value={formData.application_date ? parse(formData.application_date, "dd/MM/yyyy", new Date()) : null}
                    onChange={(newValue) => {
                      const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                      handleInputChange({ target: { name: "application_date", value: formattedDate } });
                    }}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        sx={{ width: "400px", minWidth: "700px" }} // Wider input field
                      />
                      )}
                      inputFormat="dd/MM/yyyy"
                      slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
                </LocalizationProvider>
              </Grid>

              
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Registration Date"
                  value={formData.registration_date ? parse(formData.registration_date, "dd/MM/yyyy", new Date()) : null}
                  onChange={(newValue) => {
                    const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                    handleInputChange({ target: { name: "registration_date", value: formattedDate } });
                  }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    sx={{ 
                      '& .MuiInputBase-root': { minHeight: 70 },  
                      '& .MuiOutlinedInput-input': { fontSize: "1.2rem", padding: "20px" }, 
                      '& .MuiInputLabel-root': { fontSize: "1rem", top: -2 }, 
                    }} 
                  />
                )}
                inputFormat="dd/MM/yyyy"
                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                />
              </LocalizationProvider>
            </Grid>

            

            </Grid>

            <hr />
            <br />
            
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

            <hr />
            <br />
            
            <Typography variant="h5" sx={{ textAlign: "left", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Agent Data
            </Typography>

            <Grid container spacing={2}>
              {["agent_name" , "agent_email" , "agent_phone" , "agent_address",  "agent_vat" , "agent_contact_person" ].map((key) => (
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

            <hr />
            <br />
            
            <Typography variant="h5" sx={{ textAlign: "left", color: "#4682B4", fontWeight: "bold", mb: 3 }}>
              Group Data
            </Typography>

            <Grid container spacing={2}>
              {["group_name" , "group_email" , "group_phone" , "group_address",  "group_vat" , "group_contact_person" ].map((key) => (
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

export default TrademarkPortfolioPage;

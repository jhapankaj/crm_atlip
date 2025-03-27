import React, { useState, useEffect } from "react";
import {
    Box, Card, Typography, TextField, Button, Table, Grid,
    TableHead, TableBody, TableRow, TableCell, Container,
    IconButton, TablePagination, Dialog, DialogTitle,
    DialogContent, DialogActions, Autocomplete, Radio
} from "@mui/material";
import { FaTrash, FaPencilAlt, FaEye, FaPlus, FaDownload , FaEdit , FaTrashAlt } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "../axios";
import VerticalNavigation from "./VerticalHeader";
import { useDropzone } from 'react-dropzone';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";



const ModelSearch = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [Model, setModel] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedModel, setSelectedModel] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false);
    const [modelForm, setModelForm] = useState({
      design_title : "", 
      logo : "", 
      territory : "", 
      d_Type :"", 
      application_date : "", 
      application_no : "", 
      registration_date: "", 
      registration_no : "", 
      deadline : "", 
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
      inventor : "", 
      comments: "",
      status: "",
    });

    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    

    
    useEffect(() => {
        fetchModel();
    }, []);

    

    const fetchModel = async () => {
      setLoading(true);
    
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          alert("Access token not found. Please log in.");
          return;
        }
    
        const response = await axiosInstance.get(`/atlip/model_portfolio/`, {
          headers: { Authorization: `JWT ${accessToken}` },
        });
    
        // Update the logo if it's null
        const updatedData = response.data.map((item) => ({
          ...item,
          logo: item.logo ? item.logo : "http://127.0.0.1:8000/media/na.png",
        }));
    
        console.log(updatedData, "on loading data");
        setModel(updatedData);
      } catch (error) {
        console.error("Error fetching Model:", error);
      } finally {
        setLoading(false);
      }
    };

    // View group details
    const handleViewModel = (model) => {
        setSelectedModel(model);
        setOpenViewModal(true);
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedModel(null);
    };

    // Open Delete Confirmation
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    // Delete Group
    const handleDeleteModel = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            await axiosInstance.delete(`/atlip/model_portfolio/${deleteId}/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setModel(Model.filter(model => model.id !== deleteId));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting group:", error);
        } finally {
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    
    const [searchParams, setSearchParams] = useState({
      design_title : "", 
      logo : "na.png", 
      territory : "", 
      d_Type :"", 
      application_date : "", 
      application_no : "", 
      registration_date: "", 
      registration_no : "", 
      deadline : "", 
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
      inventor : "", 
      comments: "",
      status: "",
    });

    const handleSearchChange = (name, value) => {
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };
    
    
    
    const handleSearch = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
    
            const response = await axiosInstance.get(`/atlip/model_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
                params: searchParams, // Send search parameters
            });
    
            setModel(response.data);
        } catch (error) {
            console.error("Error searching Model:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOpen = ( model = null) => {
        if ( model ) {
            setModelForm({ ...model });
        } else {
            setModelForm({
              design_title : "", 
              logo : "na.png", 
              territory : "", 
              d_Type :"", 
              application_date : "", 
              application_no : "", 
              registration_date: "", 
              registration_no : "", 
              deadline : "", 
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
              inventor : "", 
              comments: "",
              status: "",
            });
        }
        setOpenAddDialog(true);
    };


    const handleUpdateOpen = ( model = null) => {
        if (model) {
            console.log( model , "data on update console Recieved" , typeof model.logo) ; 
            setModelForm({ ...model });
        } else {
            console.log('Batch Update:', selectedRows);
            setModelForm({
              design_title : "", 
              logo : "", 
              territory : "", 
              d_Type :"", 
              application_date : "", 
              application_no : "", 
              registration_date: "", 
              registration_no : "", 
              deadline : "", 
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
              inventor : "", 
              comments: "",
              status: "",
            });
        }
        setOpenUpdateDialog(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdateDialog(false);
    };

    const handleBatchUpdateClose = () => {
        setOpenBatchUpdateDialog(false);
    };

    const handleAddClose = () => {
        setOpenAddDialog(false);
    };

    // Add submit button 
    const handleSubmit = async (e) => {
        console.log("ading records", modelForm); 
        e.preventDefault();
        // setFormMessage(""); // Reset any previous messages
    
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert("Access token not found. Please log in.");
            return;
        }
    
        let logoUrl = "/media/logos/na.png"; // Default logo path
    
        
        try {
            const formatDateForAPI = (dateStr) => {
                if (!dateStr) return "";  // Handle empty values safely
            
                const parsedDate = new Date(dateStr);
                if (isNaN(parsedDate)) {
                    console.error("Invalid date format:", dateStr);
                    return "";  // Return empty to avoid crashing
                }
                
                return format(parsedDate, "yyyy-MM-dd");
            };
    
            // console.log("Form Data:", modelForm.application_date );
            
            let imageToSend = modelForm.logo;

            if (!modelForm.existingLogo && !(modelForm.logo instanceof File)) {
                // No existing logo and no new upload, fetch and create a File object from the default image
                console.log("No image uploaded, using default logo...");

                const blob = await fetch("/images/logo.png").then(res => res.blob());
                imageToSend = new File([blob], "logo.png", { type: "image/png" });
}
    
            console.log( modelForm.logo ,  typeof modelForm.logo  , modelForm.deadline ,  "logo" );
             
            // Append Logo if it exists and is a File
            if (modelForm.logo instanceof File) {
              console.log("Uploading logo:", modelForm.logo);
              imageToSend = modelForm.logo
              // formDataToSend.append("logo", modelForm.logo);
          } else if (modelForm.existingLogo) {
              console.log("Using existing logo");
              imageToSend = modelForm.existingLogo
              // formDataToSend.append("existingLogo", modelForm.existingLogo);
          }

            const formDataToSend = {
              design_title : modelForm.design_title, 
              territory : modelForm.territory, 
              d_Type : modelForm.d_Type, 
              application_date : formatDateForAPI(modelForm.application_date), 
              application_no :  modelForm.application_no, 
              registration_date: formatDateForAPI(modelForm.registration_date), 
              registration_no : modelForm.registration_no, 
              deadline : formatDateForAPI(modelForm.deadline), 
              owner_name: modelForm.owner_name,
              owner_email: modelForm.owner_email,
              owner_phone: modelForm.owner_phone,
              owner_address: modelForm.owner_address,
              owner_vat: modelForm.owner_vat,
              owner_contact_person: modelForm.owner_contact_person,
              agent_name: modelForm.agent_name,
              agent_email: modelForm.agent_email,
              agent_phone: modelForm.agent_phone,
              agent_address: modelForm.agent_address,
              agent_vat: modelForm.agent_vat,
              agent_contact_person: modelForm.agent_contact_person,
              group_name: modelForm.group_name,
              group_email: modelForm.group_email,
              group_address: modelForm.group_address,
              group_phone: modelForm.group_phone,
              group_vat: modelForm.group_vat,
              group_contact_person: modelForm.group_contact_person,
              inventor : modelForm.inventor,
              comments: modelForm.comments,
              status: modelForm.status,
              logo: imageToSend,
              
            };
    
            console.log("Submitting Data:", formDataToSend);
    
            console.log("Submitting Data formdata:", modelForm);
            
    
            // Send POST request with JSON data
            const response = await axiosInstance.post(
                "http://127.0.0.1:8000/api/atlip/model_portfolio/",
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
            setModelForm({
              design_title : "", 
              logo : "", 
              territory : "", 
              d_Type :"", 
              application_date : "", 
              application_no : "", 
              registration_date: "", 
              registration_no : "", 
              deadline : "", 
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
              inventor : "", 
              comments: "",
              status: "",
            });
            window.location.reload();
    
        } catch (error) {
            console.error("Error:", error);
            setFormMessage("Failed to save model portfolio.");
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", modelForm);
    
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert("Access token not found. Please log in.");
            return;
        }
    
        const formatDateForAPI = (dateStr) => {
            if (!dateStr) return "";
            const parsedDate = new Date(dateStr);
            return !isNaN(parsedDate) ? format(parsedDate, "yyyy-MM-dd") : "";
        };
    
        try {
            const formData = new FormData();
    
            // Append all other fields
            const fields = [
                'design_title', 'logo', 'territory', 'd_Type', 
                 'application_no', 
                'registration_no',  'owner_name', 'owner_email', 
                'owner_phone', 'owner_address', 'owner_vat', 'owner_contact_person', 
                'agent_name', 'agent_email', 'agent_phone', 'agent_address', 'agent_vat', 
                'agent_contact_person', 'group_name', 'group_email', 'group_address', 
                'group_phone', 'group_vat', 'group_contact_person', 'inventor', 'comments', 
                'status'
            ];
    
            fields.forEach((field) => {
                if (modelForm[field]) {
                    formData.append(field, modelForm[field]);
                }
            });
    
            // Append Dates
            formData.append("application_date", formatDateForAPI(modelForm.application_date));
            formData.append("registration_date", formatDateForAPI(modelForm.registration_date));
            formData.append("deadline", formatDateForAPI(modelForm.deadline));
            // formData.append("affidavit", formatDateForAPI(modelForm.affidavit));
    
            // Append Logo if it exists and is a File
            if (modelForm.logo instanceof File) {
                console.log("Uploading logo:", modelForm.logo);
                formData.append("logo", modelForm.logo);
            } else if (modelForm.existingLogo) {
                console.log("Using existing logo");
                formData.append("existingLogo", modelForm.existingLogo);
            }
    
            // API Request
            const response = await axiosInstance.put(
                `http://127.0.0.1:8000/api/atlip/model_portfolio/${modelForm.id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Success:", response.data);
            
            // alert("Model data updated successfully!");
            handleUpdateClose();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update model data.");
        }
    };

    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allIds = Model.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => tmark.id);
          setSelectedRows(allIds);
        } else {
          setSelectedRows([]);
        }
      };
    
      
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            console.log( "File found");
            const reader = new FileReader();
            reader.onloadend = () => {
                setModelForm((prevFormData) => ({
                    ...prevFormData,
                    logo: file, // Store the file
                    logoPreview: reader.result, // Show preview
                    existingLogo: prevFormData.existingLogo, // Keep existing image if no new upload
                }));
            };
            reader.readAsDataURL(file);
            console.log("Updated formData:", modelForm); 
        }
    };
    
    const handleRemoveImage = () => {
        setModelForm((prevFormData) => ({
            ...prevFormData,
            logo: null, // Remove uploaded file
            logoPreview: "", // Clear preview
            existingLogo: "", // Remove existing image
        }));
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
    
        // If value is a Date object, format it to "YYYY-MM-DD"
        if (value instanceof Date) {
            value = format(value, "yyyy-MM-dd");
        }
    
        setModelForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setModelForm({ ...modelForm, logo: imageUrl });
        }
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelected) => {
          let updatedSelected;
          if (prevSelected.includes(id)) {
            // If already selected, remove from selection
            updatedSelected = prevSelected.filter((rowId) => rowId !== id);
          } else {
            // If not selected, add to selection
            updatedSelected = [...prevSelected, id];
          }
          console.log('Selected Rows:', updatedSelected); // Log updated selection
          return updatedSelected;
        });
      };  

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
        setSelectedRows([]); // Reset selection on page change
      };
    
    const handleRowsPerPageChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setRowsPerPage(value === -1 ? Model.length : value); // -1 means 'All'
        setPage(0);
      };

    const handleSelectAllToggle = () => {
        const visibleIds = Model.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => tmark.id);
        if (selectedRows.length === visibleIds.length) {
          setSelectedRows([]); // Deselect all if already selected
        } else {
          setSelectedRows(visibleIds); // Select all if not selected
        }
      };

    const handleBatchDownload = async () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            alert("Access token not found. Please log in.");
            return;
        }

        if (selectedRows.length === 0) {
          console.log('No rows selected for download');
          return;
        }
      
        try {
          const response = await fetch('http://127.0.0.1:8000/api/atlip/model_portfolio/download_selected/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${accessToken}` // Ensure token is available
            },
            body: JSON.stringify({ ids: selectedRows })
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error downloading:', errorData);
            alert('Failed to download Excel. Please try again.');
            return;
          }
      
          // Handle file download
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'selected_designs.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
          console.log('Download successful');
        } catch (error) {
          console.error('Download failed:', error);
          alert('An error occurred while downloading.');
        }
      };
      
    const handleBatchUpdateOpen = () => {
        console.log('Batch Update:', selectedRows);
      
        setModelForm({
          design_title : "", 
              logo : "", 
              territory : "", 
              d_Type :"", 
              application_date : "", 
              application_no : "", 
              registration_date: "", 
              registration_no : "", 
              deadline : "", 
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
              inventor : "", 
              comments: "",
              status: "",
        });
      
        setOpenBatchUpdateDialog(true);
      };
    
      const handleBatchUpdateSubmit = async () => {
        console.log('Batch Update:', selectedRows);
        console.log('Model Form Data:', modelForm);
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          alert("Access token not found. Please log in.");
          return;
        }
      
        const chunkSize = 5; // Adjust based on your server capacity
        const chunkArray = (array, size) => {
          const chunks = [];
          for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
          }
          return chunks;
        };
      
        const idChunks = chunkArray(selectedRows, chunkSize);
        console.log(idChunks, "idChunks");
      
        try {
          for (let i = 0; i < idChunks.length; i++) {
            const chunk = idChunks[i];
            console.log(`Sending Chunk ${i + 1}/${idChunks.length}`, chunk);
      
            const formData = new FormData();
      
            // Append IDs as form data
            chunk.forEach((id) => {
              formData.append('ids[]', id);
            });
      
            // Append other fields
            for (const key in modelForm) {
              if (modelForm[key] !== "" && modelForm[key] !== null) {
                if (key === "logo" && modelForm.logo instanceof File) {
                    console.log( modelForm.logo , "lllll"); 
                  formData.append('logo', modelForm.logo);
                } else {
                  formData.append(`data[${key}]`, modelForm[key]);
                }
              }
            }
      
            const response = await axiosInstance.post(
              "http://127.0.0.1:8000/api/atlip/model_portfolio/batch-update/",
              formData,
              {
                headers: {
                  Authorization: `JWT ${accessToken}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
      
            console.log(`Chunk ${i + 1} Response:`, response.data);
          }

          
          setOpenBatchUpdateDialog(false); 
          window.location.reload();
          setFormMessage("Design portfolio updated successfully!");
        } catch (error) {
          console.error("API call failed:", error);
          alert("Failed to update records. Please try again.");
        }
      };


      const handleBatchDelete = async () => {
        const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }

        if (selectedRows.length === 0) {
          console.warn('No rows selected for deletion');
          return;
        }
      
        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedRows.length} records?`);
        if (!confirmDelete) return;
      
        try {
          const response = await fetch('http://127.0.0.1:8000/api/atlip/model_portfolio/batch-delete/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${accessToken}`, // Assuming you use token-based authentication
            },
            body: JSON.stringify({ ids: selectedRows }),
          });
      
          if (response.ok) {
            //const data = await response.json();
            //console.log(data.message);
            alert('Records deleted successfully');
            setSelectedRows([]); // Clear selection
            window.location.reload() ;  // Refresh data (assuming you have a function to fetch data)
          } else {
            const errorData = await response.json();
            console.error('Error deleting records:', errorData);
            alert(errorData.error || 'Failed to delete records');
          }
        } catch (error) {
          console.error('Network error:', error);
          alert('Network error occurred');
        }
      };

    // console.log("Model Data:", Model, '///',modelForm);
    // console.log("Processed Options:", [...new Set((Model || []).map(t => t?.b_Type).filter(Boolean))]);

    return (
        

        <Box display="flex" flexDirection="column" minHeight="100vh" >
            {/* Main Content */}
           


            <Box display="flex" flex={1} overflow="hidden">
                {/* Left Navigation */}
                <Box width="250px" p={2} color="white">
                    <VerticalNavigation />
                </Box>

                {/* Main Content Area */}
                <Box flex={1} p={3} display="flex" flexDirection="column">
                    <Container maxWidth="lg" sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 3 }}>
                        
                        <Card sx={{ p: 2, boxShadow: 3, borderLeft: "5px solid steelblue", mb: 2 ,width: "90%"}}>
                            <Typography variant="h4" align="center" color="steelblue">
                                Search Design
                            </Typography>

                            {/* First Row: Group Name, Group Address, Group Phone */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.design_title).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Design Title" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("design_title", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        
                                        options={[...new Set((Model || []).map(t => t?.territory).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Territory" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("territory", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.b_Type).filter(Boolean))]} 
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("d_Type", value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Second Row: Owner Name, Agent Name , Group Name */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.owner_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Owner Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("owner_name", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.agent_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_name", value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.group_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Group Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("group_name", value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Thrid Row: Status, Agent Name , Group Name */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        options={[...new Set((Model || []).map(t => t?.status).filter(Boolean))]}
                                        
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("status", value)}
                                    />
                                </Grid>
                                
                                {/* Deadline DatePicker */}
                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Deadline"
                                            onChange={(newValue) => {
                                                const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                                                    handleSearchChange("deadline", formattedDate);
                                            }}
                                            format="dd/MM/yyyy"
                                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                              </Grid>

                            {/* Search Button */}
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "steelblue", "&:hover": { bgcolor: "#3a6498" }, mt: 2 }}
                                fullWidth
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Card>

                        {/* Add container for serach Results  */}
                        {/* Group List */}
                        <Card sx={{ p: 2, boxShadow: 3, borderLeft: "5px solid steelblue", flex: 1, display: "flex", flexDirection: "column" , width: "90%"}}>
                            <Typography variant="h5" color="steelblue" sx={{ mb: 2 }}>
                                Model List
                            </Typography>

                        {/* Action Icons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <IconButton onClick={handleBatchDownload} sx={{ color: 'steelblue' }}>
                            <FaDownload />
                            </IconButton>
                            <IconButton onClick={handleBatchUpdateOpen} sx={{ color: 'orange' }}>
                            <FaEdit />
                            </IconButton>
                            <IconButton onClick={handleBatchDelete} sx={{ color: 'red' }}>
                            <FaTrashAlt />
                            </IconButton>
                        </Box>


                        {/* Table Container (Dynamic Height) */}
                        <Box sx={{ flex: 1, overflow: "auto" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                    <TableCell align="center" sx={{ bgcolor: 'steelblue', color: 'white', fontWeight: 'bold' }} onClick={handleSelectAllToggle}>
              <Radio
                color="default"
                checked={selectedRows.length === Model.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length && Model.length > 0}
                inputProps={{ 'aria-label': 'Select all rows' }}
              />
            </TableCell>    
                                        
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Design Title</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Logo</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Territory</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Type</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Application Date</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Registration No</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Deadline</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Owner</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Group</TableCell>

                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>View</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Add</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Update</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { Model.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => (
                                        <TableRow
                                        key={tmark.id}
                                        onClick={() => handleRowSelect(tmark.id)}
                                        selected={selectedRows.includes(tmark.id)}
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                          <Radio
                                            color="default"
                                            checked={selectedRows.includes(tmark.id)}
                                            onChange={() => handleRowSelect(tmark.id)}
                                          />
                                        </TableCell>

                                        <TableCell>{tmark.design_title}</TableCell>
                                        <TableCell>
                                            <img 
                                                src={tmark.logo} 
                                                alt="Logo" 
                                                style={{ width: 100, height: 100, objectFit: "contain" }} 
                                            />
                                        </TableCell>
                                        <TableCell>{tmark.territory}</TableCell>
                                        <TableCell>{tmark.d_Type}</TableCell>
                                        <TableCell>{ tmark.application_date}</TableCell>
                                        <TableCell>{ tmark.registration_no}</TableCell>
                                        <TableCell>{ tmark.deadline}</TableCell>
                                        <TableCell>{ tmark.owner_name}</TableCell>
                                        <TableCell>{ tmark.group_name}</TableCell>


                                        {/* View Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="View" onClick={() => handleViewModel(tmark)}>
                                                <FaEye />
                                            </IconButton>
                                        </TableCell>

                                        {/* Add Button */}
                                        <TableCell>
                                            <IconButton sx={{ color: "steelblue" }} aria-label="Add" onClick={() => handleAddOpen( tmark)}>
                                                <FaPlus />
                                            </IconButton>
                                        </TableCell>

                                        {/* Update Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="Update" onClick={() => handleUpdateOpen( tmark )}>
                                                <FaPencilAlt />
                                            </IconButton>
                                        </TableCell>

                                        {/* Delete Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "red" }} aria-label="Delete" onClick={() => handleDeleteClick( tmark.id)}>
                                                <FaTrash />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                        ))}
                                    </TableBody>
                                    
                            </Table>
                        </Box>

                        {/* Pagination Component */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            component="div"
                            count={Model.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />


                            
                        </Card>

                        
                    </Container>
                </Box>
            </Box>
            {/* View Group Modal */}
            <Dialog open={openViewModal} onClose={handleCloseViewModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "steelblue", color: "white", textAlign: "center", fontWeight: "bold" }}>
                    Model Details
                </DialogTitle>
                <DialogContent sx={{ p: 5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {selectedModel && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "steelblue" }}>
                            {selectedModel.design_title}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <span>Logo:</span>
                        <img
                            src={selectedModel.logo}
                            alt="Logo Preview"
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                        />
                </Box>
                <Typography>
                    <b>Territory:</b> {selectedModel.territory}
                </Typography>
                <Typography>
                    <b>Type:</b> {selectedModel.d_Type}
                </Typography>
                <Typography>
                    <b>Application Date:</b> {selectedModel.application_date }
                </Typography>
                <Typography>
                    <b>Application Number:</b> {selectedModel.application_no }
                </Typography>
                <Typography>
                    <b>Registration Date:</b> {selectedModel.registration_date }
                </Typography>
                <Typography>
                    <b>Registration Number:</b> {selectedModel.registration_no }
                </Typography>
                
                <Typography>
                    <b>Deadline:</b> {selectedModel.deadline }
                </Typography>
                
                <Typography>
                    <b>Owner Name:</b> {selectedModel.owner_name }
                </Typography>
                <Typography>
                    <b>Owner Email:</b> {selectedModel.owner_email }
                </Typography>
                <Typography>
                    <b>Owner Phone:</b> {selectedModel.owner_phone }
                </Typography>
                <Typography>
                    <b>Owner Address:</b> {selectedModel.owner_address }
                </Typography>
                <Typography>
                    <b>Owner Vat:</b> {selectedModel.owner_vat }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedModel.owner_contact_person }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedModel.owner_contact_person }
                </Typography>

                <Typography>
                    <b>Agent Name:</b> {selectedModel.agent_name }
                </Typography>
                <Typography>
                    <b>Agent Email:</b> {selectedModel.agent_email }
                </Typography>
                <Typography>
                    <b>Agent Phone:</b> {selectedModel.agent_phone }
                </Typography>
                <Typography>
                    <b>Agent Address:</b> {selectedModel.agent_address }
                </Typography>
                <Typography>
                    <b>Agent Vat:</b> {selectedModel.agent_vat }
                </Typography>
                <Typography>
                    <b>Agent Contact Person:</b> {selectedModel.agent_contact_person }
                </Typography>

                <Typography>
                    <b>Group Name:</b> {selectedModel.group_name }
                </Typography>
                <Typography>
                    <b>Group Email:</b> {selectedModel.group_email }
                </Typography>
                <Typography>
                    <b>Group Phone:</b> {selectedModel.group_phone }
                </Typography>
                <Typography>
                    <b>Group Address:</b> {selectedModel.group_address }
                </Typography>
                <Typography>
                    <b>Group Vat:</b> {selectedModel.group_vat }
                </Typography>
                <Typography>
                    <b>Group Contact Person:</b> {selectedModel.group_contact_person }
                </Typography>
                <Typography>
                    <b>Inventor:</b> {selectedModel.inventor }
                </Typography>
                <Typography>
                    <b>Comments:</b> {selectedModel.comments }
                </Typography>
                <Typography>
                    <b>status:</b> {selectedModel.status }
                </Typography>
            </Box>
        )}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleCloseViewModal} variant="contained" sx={{ bgcolor: "steelblue", ":hover": { bgcolor: "#4682b4" } }}>
            Close
        </Button>
    </DialogActions>
            </Dialog>

{/* Dialog to Add View  */}
<Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="sm" fullWidth>
    <DialogTitle>Add / Modify Group</DialogTitle>
    <DialogContent>
    <TextField
            fullWidth
            label="Design Title"
            value={modelForm.design_title}
            onChange={(e) => setModelForm({ ...modelForm, design_title: e.target.value })}
            margin="dense"
            required
        />

        {/* Image Upload Section */}

<Grid container spacing={2} alignItems="center">
  {/* Upload Image Button */}
  <Grid item xs={12} sm={6}>
    <input
      accept="image/*"
      type="file"
      name="logo"
      onChange={handleFileChange}
      style={{ display: "none" }}
      id="logo-upload"
    />
    <label htmlFor="logo-upload">
      <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
        Upload Logo
      </Button>
    </label>
  </Grid>

  {/* Show Existing or Uploaded Image with Remove Option */}
  {/* Show Existing or Uploaded Image with Remove Option */}
{modelForm.logo && (
  <Grid item xs={12} sm={6}>
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <img
        src={modelForm.logo instanceof File 
          ? URL.createObjectURL(modelForm.logo) 
          : modelForm.logo
        }
        alt="Logo Preview"
        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
      />
      {/* Small Cross Icon */}
      <IconButton
        onClick={() => setModelForm({ ...modelForm, logo: 'http://127.0.0.1:8000/media/na.png' })}
        size="small"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          '&:hover': {
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            color: "white",
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  </Grid>
)}

</Grid>


            <TextField
            fullWidth
            label="Territory"
            name="territory"
            value={modelForm.territory}
            onChange={(e) => setModelForm({ ...modelForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="d_Type"
                value={modelForm.d_Type}
                onChange={(e) => setModelForm({ ...modelForm, d_Type: e.target.value })}
                margin="dense"
            />
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Application Date"
                    value={ modelForm.application_date ? new Date(modelForm.application_date) : null}
                    onChange={(newValue) => {
                    handleInputChange({ target: { name: "deadline", value: newValue } });
                    }}
                    inputFormat="dd/MM/yyyy"
                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
/>
        
                </LocalizationProvider>
            </Grid>

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={modelForm.application_no}
                onChange={(e) => setModelForm({ ...modelForm, application_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Registration Date"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.registration_date) {
                                    parsedDate = new Date(modelForm.registration_date); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
        
                </LocalizationProvider>
            </Grid>

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={modelForm.registration_no}
                onChange={(e) => setModelForm({ ...modelForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Deadline"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.deadline) {
                                    parsedDate = new Date(modelForm.deadline); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
        
                </LocalizationProvider>
            </Grid>

            
            

            

            <TextField
                        fullWidth
                        label="Owner Name"
                        value={modelForm.owner_name}
                        onChange={(e) => setModelForm({ ...modelForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={modelForm.owner_email}
                        onChange={(e) => setModelForm({ ...modelForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={modelForm.owner_address}
                        onChange={(e) => setModelForm({ ...modelForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={modelForm.owner_phone}
                        onChange={(e) => setModelForm({ ...modelForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={modelForm.owner_vat}
                        onChange={(e) => setModelForm({ ...modelForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={modelForm.owner_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={modelForm.agent_name}
                        onChange={(e) => setModelForm({ ...modelForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={modelForm.agent_email}
                        onChange={(e) => setModelForm({ ...modelForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={modelForm.agent_address}
                        onChange={(e) => setModelForm({ ...modelForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={modelForm.agent_phone}
                        onChange={(e) => setModelForm({ ...modelForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={modelForm.agent_vat}
                        onChange={(e) => setModelForm({ ...modelForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={modelForm.agent_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={modelForm.group_name}
                        onChange={(e) => setModelForm({ ...modelForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={modelForm.group_email}
                        onChange={(e) => setModelForm({ ...modelForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={modelForm.group_address}
                        onChange={(e) => setModelForm({ ...modelForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={modelForm.group_phone}
                        onChange={(e) => setModelForm({ ...modelForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={modelForm.group_vat}
                        onChange={(e) => setModelForm({ ...modelForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={modelForm.group_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                      fullWidth
                      label="Inventor"
                      name="inventor"
                      value={modelForm.inventor}
                      onChange={(e) => setModelForm({ ...modelForm, inventor: e.target.value })}
                      margin="dense"
                    />

<TextField
                      fullWidth
                      label="Comments"
                      name="comments"
                      value={modelForm.comments}
                      onChange={(e) => setModelForm({ ...modelForm, comments: e.target.value })}
                      margin="dense"
            />

                  <TextField
                      fullWidth
                      label="Status"
                      name="status"
                      value={modelForm.status}
                      onChange={(e) => setModelForm({ ...modelForm, status: e.target.value })}
                      margin="dense"
            />

    </DialogContent>
    <DialogActions>
        <Button onClick={handleAddClose} color="primary">Cancel</Button>
        <Button color="success" onClick={handleSubmit}>Save</Button>
    </DialogActions>
</Dialog>

{/* Dialog to update  */}
    {/* Update Group Dialog */}
    <Dialog open={openUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Model</DialogTitle>
                <DialogContent>
                <TextField
            fullWidth
            label="Design Title"
            value={modelForm.design_title}
            onChange={(e) => setModelForm({ ...modelForm, design_title: e.target.value })}
            margin="dense"
            required
        />

        {/* Image Upload Section */}

<Grid container spacing={2} alignItems="center">
  {/* Upload Image Button */}
  <Grid item xs={12} sm={6}>
    <input
      accept="image/*"
      type="file"
      name="logo"
      onChange={handleFileChange}
      style={{ display: "none" }}
      id="logo-upload"
    />
    <label htmlFor="logo-upload">
      <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
        Upload Logo
      </Button>
    </label>
  </Grid>

  {/* Show Existing or Uploaded Image with Remove Option */}
  {/* Show Existing or Uploaded Image with Remove Option */}
{modelForm.logo && (
  <Grid item xs={12} sm={6}>
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <img
        src={modelForm.logo instanceof File 
          ? URL.createObjectURL(modelForm.logo) 
          : modelForm.logo
        }
        alt="Logo Preview"
        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
      />
      {/* Small Cross Icon */}
      <IconButton
        onClick={() => setModelForm({ ...modelForm, logo: 'http://127.0.0.1:8000/media/na.png' })}
        size="small"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          '&:hover': {
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            color: "white",
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  </Grid>
)}

</Grid>


            <TextField
            fullWidth
            label="Territory"
            name="territory"
            value={modelForm.territory}
            onChange={(e) => setModelForm({ ...modelForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="d_Type"
                value={modelForm.d_Type}
                onChange={(e) => setModelForm({ ...modelForm, d_Type: e.target.value })}
                margin="dense"
            />
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Application Date"
                    value={ modelForm.application_date ? new Date(modelForm.application_date) : null}
                    onChange={(newValue) => {
                    handleInputChange({ target: { name: "deadline", value: newValue } });
                    }}
                    inputFormat="dd/MM/yyyy"
                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
/>
        
                </LocalizationProvider>
            </Grid>

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={modelForm.application_no}
                onChange={(e) => setModelForm({ ...modelForm, application_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Registration Date"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.registration_date) {
                                    parsedDate = new Date(modelForm.registration_date); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
        
                </LocalizationProvider>
            </Grid>

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={modelForm.registration_no}
                onChange={(e) => setModelForm({ ...modelForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Deadline"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.deadline) {
                                    parsedDate = new Date(modelForm.deadline); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
        
                </LocalizationProvider>
            </Grid>

            
            

            

            <TextField
                        fullWidth
                        label="Owner Name"
                        value={modelForm.owner_name}
                        onChange={(e) => setModelForm({ ...modelForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={modelForm.owner_email}
                        onChange={(e) => setModelForm({ ...modelForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={modelForm.owner_address}
                        onChange={(e) => setModelForm({ ...modelForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={modelForm.owner_phone}
                        onChange={(e) => setModelForm({ ...modelForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={modelForm.owner_vat}
                        onChange={(e) => setModelForm({ ...modelForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={modelForm.owner_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={modelForm.agent_name}
                        onChange={(e) => setModelForm({ ...modelForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={modelForm.agent_email}
                        onChange={(e) => setModelForm({ ...modelForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={modelForm.agent_address}
                        onChange={(e) => setModelForm({ ...modelForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={modelForm.agent_phone}
                        onChange={(e) => setModelForm({ ...modelForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={modelForm.agent_vat}
                        onChange={(e) => setModelForm({ ...modelForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={modelForm.agent_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={modelForm.group_name}
                        onChange={(e) => setModelForm({ ...modelForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={modelForm.group_email}
                        onChange={(e) => setModelForm({ ...modelForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={modelForm.group_address}
                        onChange={(e) => setModelForm({ ...modelForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={modelForm.group_phone}
                        onChange={(e) => setModelForm({ ...modelForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={modelForm.group_vat}
                        onChange={(e) => setModelForm({ ...modelForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={modelForm.group_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                      fullWidth
                      label="Inventor"
                      name="inventor"
                      value={modelForm.inventor}
                      onChange={(e) => setModelForm({ ...modelForm, inventor: e.target.value })}
                      margin="dense"
                    />

<TextField
                      fullWidth
                      label="Comments"
                      name="comments"
                      value={modelForm.comments}
                      onChange={(e) => setModelForm({ ...modelForm, comments: e.target.value })}
                      margin="dense"
            />

                  <TextField
                      fullWidth
                      label="Status"
                      name="status"
                      value={modelForm.status}
                      onChange={(e) => setModelForm({ ...modelForm, status: e.target.value })}
                      margin="dense"
            />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleUpdateSubmit} >Update</Button>
                </DialogActions>
    </Dialog>

    {/* Batch Update Group Dialog */}
    <Dialog open={openBatchUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Batch Update Model(Applied to all selected records)</DialogTitle>
                <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={modelForm.title}
                    onChange={(e) => setModelForm({ ...modelForm, title: e.target.value })}
                    margin="dense"
                />

        

        {/* Image Upload Section */}

        
        <Grid container spacing={2} alignItems="center">
        {/* Upload Image Button */}
        <Grid item xs={12} sm={6}>
        <input
        accept="image/*"
        type="file"
        name="logo"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="logo-upload"
        />
        <label htmlFor="logo-upload">
        <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
            Upload Logo
        </Button>
        </label>
    </Grid>

  {/* Show Existing or Uploaded Image */}
  {modelForm.logo && (
    <Grid item xs={12} sm={6}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={modelForm.logo instanceof File 
            ? URL.createObjectURL(modelForm.logo) 
            : modelForm.logo
          }
          alt="Logo Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>
    </Grid>
  )}
</Grid>

            <TextField
            fullWidth
            label="Territory"
            name="territory"
            value={modelForm.territory}
            onChange={(e) => setModelForm({ ...modelForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="b_Type"
                value={modelForm.b_Type}
                onChange={(e) => setModelForm({ ...modelForm, b_Type: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Classes"
                name="classes"
                value={modelForm.classes}
                onChange={(e) => setModelForm({ ...modelForm, classes: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={modelForm.comments}
                onChange={(e) => setModelForm({ ...modelForm, comments: e.target.value })}
                margin="dense"
            />

                
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Deadline"
                    value={modelForm.deadline ? new Date(modelForm.deadline) : null}
                    onChange={(newValue) => {
                    handleInputChange({ target: { name: "deadline", value: newValue } });
                    }}
                    inputFormat="dd/MM/yyyy"
                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
/>
        
                </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Affidavit"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.affidavit) {
                                    parsedDate = new Date(modelForm.affidavit); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "affidavit", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />
        
                </LocalizationProvider>
            </Grid>

            <TextField
                fullWidth
                label="Status"
                name="status"
                value={modelForm.status}
                onChange={(e) => setModelForm({ ...modelForm, status: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={modelForm.application_no}
                onChange={(e) => setModelForm({ ...modelForm, application_no: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={modelForm.registration_no}
                onChange={(e) => setModelForm({ ...modelForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Application Date"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.application_date) {
                                    parsedDate = new Date(modelForm.application_date ); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                            console.log("Raw Selected Date:", newValue); // Log selected date object
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "application_date", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
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
                        label="Registration Date"
                        value={(() => {
                            let parsedDate = null;

                                if (modelForm.registration_date ) {
                                    parsedDate = new Date(modelForm.registration_date ); // Directly create Date object
                                }

                                return parsedDate;
                        })()}
                        onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                        handleInputChange({ target: { name: "registration_date", value: formattedDate } });
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                fullWidth 
                                sx={{ 
                                    mb: 2, 
                                    '& .MuiInputBase-root': { minHeight: 60 },  
                                    '& .MuiOutlinedInput-input': { padding: "18px 14px" }, 
                                    '& .MuiInputLabel-root': { top: -2 }, 
                                }} 
                            />
                        )}
                        inputFormat="dd/MM/yyyy"
                        slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                    />

                    
        
                </LocalizationProvider>
            </Grid>

            <TextField
                        fullWidth
                        label="Owner Name"
                        value={modelForm.owner_name}
                        onChange={(e) => setModelForm({ ...modelForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={modelForm.owner_email}
                        onChange={(e) => setModelForm({ ...modelForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={modelForm.owner_address}
                        onChange={(e) => setModelForm({ ...modelForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={modelForm.owner_phone}
                        onChange={(e) => setModelForm({ ...modelForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={modelForm.owner_vat}
                        onChange={(e) => setModelForm({ ...modelForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={modelForm.owner_contact_person}
                        onChange={(e) => setModelForm({ ...modelForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />


                <TextField
                        fullWidth
                        label="Agent Name"
                        value={modelForm.agent_name}
                        onChange={(e) => setModelForm({ ...modelForm, agent_phone_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={ modelForm.agent_address}
                        onChange={(e) => setModelForm({ ...modelForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={ modelForm.agent_phone}
                        onChange={(e) => setModelForm({ ...modelForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={modelForm.agent_vat}
                        onChange={(e) => setModelForm({ ...modelForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={modelForm.agent_contact_person}
                        onChange={(e) => setModel({ ...modelForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Name"
                        value={modelForm.group_name}
                        onChange={(e) => setModelForm({ ...modelForm, group_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Address"
                        value={ modelForm.group_address}
                        onChange={(e) => setModelForm({ ...modelForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={ modelForm.group_phone}
                        onChange={(e) => setModelForm({ ...modelForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={modelForm.group_vat}
                        onChange={(e) => setModelForm({ ...modelForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={modelForm.group_contact_person}
                        onChange={(e) => setModel({ ...modelForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBatchUpdateClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleBatchUpdateSubmit} >Update</Button>
                </DialogActions>
            </Dialog>


            {/* Delete Dialog  */}
            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this TradeMark?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteModel} color="error">Delete</Button>
                </DialogActions>
            </Dialog>




    </Box>
    );
};

export default ModelSearch;
import React, { useState, useEffect } from "react";
import {
    Box, Card, Typography, TextField, Button, Table, Grid,
    TableHead, TableBody, TableRow, TableCell, Container,
    IconButton, TablePagination, Dialog, DialogTitle,
    DialogContent, DialogActions, Autocomplete, Radio
} from "@mui/material";
import { FaTrash, FaPencilAlt, FaEye, FaPlus, FaDownload , FaEdit , FaTrashAlt } from "react-icons/fa";
import axiosInstance from "../axios";
import VerticalNavigation from "./VerticalHeader";
import { useDropzone } from 'react-dropzone';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, parse } from "date-fns";



const DomainSearch = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [Domain, setDomain] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false);
    const [domainForm, setDomainForm] = useState({
      domain_name : "", 
            extension : "" ,
            creation_date : "" , 
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
            status : "" , 
            comments : ""
    });

    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    

    
    useEffect(() => {
        fetchDomain();
    }, []);

    

    const fetchDomain = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
            const response = await axiosInstance.get(`/atlip/domain_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            console.log( response.data , "initial data") ; 
            setDomain(response.data);
        } catch (error) {
            console.error("Error fetching Domain:", error);
        } finally {
            setLoading(false);
        }
    };

    // View domain details
    const handleViewDomain = (domain) => {
        setSelectedDomain(domain);
        setOpenViewModal(true);
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedDomain(null);
    };

    // Open Delete Confirmation
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    // Delete Domain
    const handleDeleteDomain = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            await axiosInstance.delete(`/atlip/domain_portfolio/${deleteId}/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setDomain(Domain.filter(domain => domain.id !== deleteId));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting domain:", error);
        } finally {
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    
    const [searchParams, setSearchParams] = useState({
      domain_name : "", 
            extension : "" ,
            owner_name : "", 
            agent_name : "", 
            group_name : "", 
            status : "" , 
            deadline : ""
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
    
            const response = await axiosInstance.get(`/atlip/domain_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
                params: searchParams, // Send search parameters
            });
    
            setDomain(response.data);
        } catch (error) {
            console.error("Error searching Domain:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOpen = ( domain = null) => {
        if ( domain ) {
            setDomainForm({ ...domain });
        } else {
            setDomainForm({
              domain_name : "", 
            extension : "" ,
            creation_date : "" , 
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
            status : "" , 
            comments : ""
            });
        }
        setOpenAddDialog(true);
    };


    const handleUpdateOpen = ( domain = null) => {
        if (domain) {
            setDomainForm({ ...domain });
        } else {
            console.log('Batch Update:', selectedRows);
            setDomainForm({
              domain_name : "", 
              extension : "" ,
              creation_date : "" , 
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
              status : "" , 
              comments : ""
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
        console.log("ading records", domainForm); 
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
    
            console.log("Form Data:", domainForm.application_date );
            
            let imageToSend = domainForm.logo;

            if (!domainForm.existingLogo && !(domainForm.logo instanceof File)) {
                // No existing logo and no new upload, fetch and create a File object from the default image
                console.log("No image uploaded, using default logo...");

                const blob = await fetch("/images/logo.png").then(res => res.blob());
                imageToSend = new File([blob], "logo.png", { type: "image/png" });
}
    
            console.log( domainForm.logo ,  typeof domainForm.logo  , domainForm.deadline ,  "logo" );
             

            const formDataToSend = {
              domain_name : domainForm.domain_name, 
              extension :  domainForm.extension ,
              creation_date : domainForm.creation_date , 
              deadline :  domainForm.deadline,  
              owner_name :  domainForm.owner_name, 
              owner_email : domainForm.owner_email , 
              owner_phone :  domainForm.owner_phone, 
              owner_address : domainForm.owner_address , 
              owner_vat :  domainForm.owner_vat, 
              owner_contact_person :  domainForm.owner_contact_person, 
              agent_name :  domainForm.agent_name, 
              agent_email : domainForm.agent_email , 
              agent_phone : domainForm.agent_phone , 
              agent_address : domainForm.agent_address , 
              agent_vat : domainForm.agent_vat , 
              agent_contact_person : domainForm.agent_contact_person , 
              group_name :  domainForm.group_name, 
              group_email : domainForm.group_email, 
              group_address : domainForm.group_address, 
              group_phone : domainForm.group_phone, 
              group_vat : domainForm.group_vat , 
              group_contact_person : domainForm.group_contact_person, 
              status : domainForm.status , 
              comments : domainForm.comments

                
            };
    
            console.log("Submitting Data:", formDataToSend);
    
            console.log("Submitting Data formdata:", domainForm);
    
            // Send POST request with JSON data
            const response = await axiosInstance.post(
                "http://127.0.0.1:8000/api/atlip/domain_portfolio/",
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
            setDomainForm({
                
              domain_name : "", 
              extension : "" ,
              creation_date : "" , 
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
              status : "" , 
              comments : ""

            });
            window.location.reload();
    
        } catch (error) {
            console.error("Error:", error);
            setFormMessage("Failed to save domain portfolio.");
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", domainForm);
    
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
                    'domain_name', 'extension', 'creation_date', 'deadline', 
                    'owner_name', 'owner_email', 'owner_phone', 'owner_address', 'owner_vat', 'owner_contact_person', 
                    'agent_name', 'agent_email', 'agent_phone', 'agent_address', 'agent_vat', 'agent_contact_person', 
                    'group_name', 'group_email', 'group_address', 'group_phone', 'group_vat', 'group_contact_person', 
                    'status', 'comments' 
            ];
    
            fields.forEach((field) => {
                if (domainForm[field]) {
                    formData.append(field, domainForm[field]);
                }
            });
    
            
            // API Request
            const response = await axiosInstance.put(
                `http://127.0.0.1:8000/api/atlip/domain_portfolio/${domainForm.id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Success:", response.data);
            
            // alert("Domain data updated successfully!");
            handleUpdateClose();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update domain data.");
        }
    };

    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allIds = Domain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
                setDomainForm((prevFormData) => ({
                    ...prevFormData,
                    
                }));
            };
            reader.readAsDataURL(file);
            console.log("Updated formData:", domainForm); 
        }
    };
    
    const handleRemoveImage = () => {
        setDomainForm((prevFormData) => ({
            ...prevFormData,
            
        }));
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
    
        // If value is a Date object, format it to "YYYY-MM-DD"
        if (value instanceof Date) {
            value = format(value, "yyyy-MM-dd");
        }
    
        setDomainForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
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
        setRowsPerPage(value === -1 ? Domain.length : value); // -1 means 'All'
        setPage(0);
      };

    const handleSelectAllToggle = () => {
        const visibleIds = Domain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/domain_portfolio/download_selected/', {
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
          a.download = 'selected_domains.xlsx';
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
      
        setDomainForm({
          domain_name : "", 
          extension : "" ,
          creation_date : "" , 
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
          status : "" , 
          comments : ""

        });
      
        setOpenBatchUpdateDialog(true);
      };
    
      const handleBatchUpdateSubmit = async () => {
        console.log('Batch Update:', selectedRows);
        console.log('Domain Form Data:', domainForm);
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
            for (const key in domainForm) {
              if (domainForm[key] !== "" && domainForm[key] !== null) {
                if (key === "logo" && domainForm.logo instanceof File) {
                    console.log( domainForm.logo , "lllll"); 
                  formData.append('logo', domainForm.logo);
                } else {
                  formData.append(`data[${key}]`, domainForm[key]);
                }
              }
            }
      
            const response = await axiosInstance.post(
              "http://127.0.0.1:8000/api/atlip/domain_portfolio/batch-update/",
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
          setFormMessage("Domain portfolio updated successfully!");
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/domain_portfolio/batch-delete/', {
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

    // console.log("Domain Data:", Domain, '///',domainForm);
    // console.log("Processed Options:", [...new Set((Domain || []).map(t => t?.b_Type).filter(Boolean))]);

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
                                Search Domain
                            </Typography>

                            {/* First Row: Domain Name, Domain Address, Domain Phone */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Domain.map(d => d.domain_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Domain Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("domain_name", value)}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Domain.map(d => d.extension))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Extension" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("extension", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set( Domain.map(d => d.status))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("status", value)}
                                    />
                                </Grid>
                            </Grid>

                            
                            {/* Second Row: Domain VAT, Domain Contact Person */}
                          <Grid container spacing={2} sx={{ my: 2 }}>
                                
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Domain.map(g => g.owner_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Owner Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("owner_name", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Domain.map(g => g.agent_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label= "Agent Number" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange( "agent_name", value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Domain.map(g => g.group_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Group Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("group_name", value)}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container spacing={2} sx={{ my: 2 }}>
                            
                                <Grid item xs={12} md={12}>
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
                        {/* Domain List */}
                        <Card sx={{ p: 2, boxShadow: 3, borderLeft: "5px solid steelblue", flex: 1, display: "flex", flexDirection: "column" , width: "90%"}}>
                            <Typography variant="h5" color="steelblue" sx={{ mb: 2 }}>
                                Domain List
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
                                              checked={selectedRows.length === Domain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length && Domain.length > 0}
                                              inputProps={{ 'aria-label': 'Select all rows' }}
                                            />
                                        </TableCell>    
                                              
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Domain Name</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Extension</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Creation Date</TableCell>
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
                                    { Domain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => (
                                        <TableRow
                                        key={grp.id}
                                        onClick={() => handleRowSelect(grp.id)}
                                        selected={selectedRows.includes(grp.id)}
                                        sx={{ cursor: 'pointer' }}
                                      >
                                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                                          <Radio
                                            color="default"
                                            checked={selectedRows.includes(grp.id)}
                                            onChange={() => handleRowSelect(grp.id)}
                                          />
                                        </TableCell>

                                        <TableCell>{grp.domain_name}</TableCell>
                                        <TableCell>{grp.extension}</TableCell>
                                        <TableCell>{grp.creation_date}</TableCell>
                                        <TableCell>{grp.deadline}</TableCell>
                                        <TableCell>{grp.owner_name}</TableCell>
                                        <TableCell>{grp.group_name}</TableCell>

                                        {/* View Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="View" onClick={() => handleViewDomain(grp)}>
                                                <FaEye />
                                            </IconButton>
                                        </TableCell>

                                        {/* Add Button */}
                                        <TableCell>
                                            <IconButton sx={{ color: "steelblue" }} aria-label="Add" onClick={() => handleAddOpen( grp)}>
                                                <FaPlus />
                                            </IconButton>
                                        </TableCell>

                                        {/* Update Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="Update" onClick={() => handleUpdateOpen( grp )}>
                                                <FaPencilAlt />
                                            </IconButton>
                                        </TableCell>

                                        {/* Delete Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "red" }} aria-label="Delete" onClick={() => handleDeleteClick( grp.id)}>
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
                            count={Domain.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />


                            
                        </Card>

                        
                    </Container>
                </Box>
            </Box>
            {/* View Domain Modal */}
            
        <Dialog open={openViewModal} onClose={handleCloseViewModal} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ bgcolor: "steelblue", color: "white", textAlign: "center", fontWeight: "bold" }}>
                  Domain Details
              </DialogTitle>
              <DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {selectedDomain && (
                      <Box display="flex" flexDirection="column" gap={2}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "steelblue" }}>
                            {selectedDomain.domain_name}
                </Typography>
                <Typography>
                    <b>Extension:</b> {selectedDomain.extension}
                </Typography>
                <Typography>
                    <b>Creation Date:</b> {selectedDomain.creation_date}
                </Typography>
                <Typography>
                    <b>Deadline:</b> {selectedDomain.deadline }
                </Typography>
                

                <Typography>
                    <b>Owner Name:</b> {selectedDomain.owner_name }
                </Typography>
                <Typography>
                    <b>Owner Email:</b> {selectedDomain.owner_email }
                </Typography>
                <Typography>
                    <b>Owner Phone:</b> {selectedDomain.owner_phone }
                </Typography>
                <Typography>
                    <b>Owner Address:</b> {selectedDomain.owner_address }
                </Typography>
                <Typography>
                    <b>Owner Vat:</b> {selectedDomain.owner_vat }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedDomain.owner_contact_person }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedDomain.owner_contact_person }
                </Typography>

                <Typography>
                    <b>Agent Name:</b> {selectedDomain.agent_name }
                </Typography>
                <Typography>
                    <b>Agent Email:</b> {selectedDomain.agent_email }
                </Typography>
                <Typography>
                    <b>Agent Phone:</b> {selectedDomain.agent_phone }
                </Typography>
                <Typography>
                    <b>Agent Address:</b> {selectedDomain.agent_address }
                </Typography>
                <Typography>
                    <b>Agent Vat:</b> {selectedDomain.agent_vat }
                </Typography>
                <Typography>
                    <b>Agent Contact Person:</b> {selectedDomain.agent_contact_person }
                </Typography>

                <Typography>
                    <b>Group Name:</b> {selectedDomain.group_name }
                </Typography>
                <Typography>
                    <b>Group Email:</b> {selectedDomain.group_email }
                </Typography>
                <Typography>
                    <b>Group Phone:</b> {selectedDomain.group_phone }
                </Typography>
                <Typography>
                    <b>Group Address:</b> {selectedDomain.group_address }
                </Typography>
                <Typography>
                    <b>Group Vat:</b> {selectedDomain.group_vat }
                </Typography>
                <Typography>
                    <b>Group Contact Person:</b> {selectedDomain.group_contact_person }
                </Typography>
                
                <Typography>
                    <b>Comments:</b> {selectedDomain.comments }
                </Typography>
                <Typography>
                    <b>Status:</b> {selectedDomain.status }
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
{/* domain_name : "", 
          extension : "" ,
          creation_date : "" , 
          deadline : "",   */}
{/* Add Domain Dialog */}
<Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add / Modify Domain</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Domain Name"
                        value={domainForm.domain_name}
                        onChange={(e) => setDomainForm({ ...domainForm, domain_name: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Extension"
                        value={domainForm.extension}
                        onChange={(e) => setDomainForm({ ...domainForm, extension: e.target.value })}
                        margin="dense"
                    />

                    
                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Creation Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.creation_date) {
                                    parsedDate = new Date( domainForm.creation_date ); // Directly create Date object
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
                          label="Deadline"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.deadline) {
                                    parsedDate = new Date( domainForm.deadline ); // Directly create Date object
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


                    
                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ domainForm.owner_name}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={domainForm.owner_email}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ domainForm.owner_address}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={domainForm.owner_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={domainForm.owner_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={domainForm.owner_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={domainForm.agent_name}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={domainForm.agent_email}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={domainForm.agent_address}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={domainForm.agent_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={domainForm.agent_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={domainForm.agent_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={domainForm.group_name}
                        onChange={(e) => setDomainForm({ ...domainForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={domainForm.group_email}
                        onChange={(e) => setDomainForm({ ...domainForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={domainForm.group_address}
                        onChange={(e) => setDomainForm({ ...domainForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={domainForm.group_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={domainForm.group_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={domainForm.group_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    
                    <TextField
                        fullWidth
                        label="Status"
                        value={domainForm.status}
                        onChange={(e) => setDomainForm({ ...domainForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={domainForm.comments}
                        onChange={(e) => setDomainForm({ ...domainForm, comments: e.target.value })}
                        margin="dense"
                    />




                      



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleSubmit} >Save</Button>
                </DialogActions>
            </Dialog>




          {/* Dialog to update  */}
          {/* Update Domain Dialog */}
          <Dialog open={openUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Domain</DialogTitle>
                <DialogContent>
                <TextField
                        fullWidth
                        label="Domain Name"
                        value={domainForm.domain_name}
                        onChange={(e) => setDomainForm({ ...domainForm, domain_name: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Extension"
                        value={domainForm.extension}
                        onChange={(e) => setDomainForm({ ...domainForm, extension: e.target.value })}
                        margin="dense"
                    />

                    
                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Creation Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.creation_date) {
                                    parsedDate = new Date( domainForm.creation_date ); // Directly create Date object
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
                          label="Deadline"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.deadline) {
                                    parsedDate = new Date( domainForm.deadline ); // Directly create Date object
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


                    
                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ domainForm.owner_name}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={domainForm.owner_email}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ domainForm.owner_address}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={domainForm.owner_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={domainForm.owner_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={domainForm.owner_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={domainForm.agent_name}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={domainForm.agent_email}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={domainForm.agent_address}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={domainForm.agent_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={domainForm.agent_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={domainForm.agent_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={domainForm.group_name}
                        onChange={(e) => setDomainForm({ ...domainForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={domainForm.group_email}
                        onChange={(e) => setDomainForm({ ...domainForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={domainForm.group_address}
                        onChange={(e) => setDomainForm({ ...domainForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={domainForm.group_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={domainForm.group_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={domainForm.group_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    
                    <TextField
                        fullWidth
                        label="Status"
                        value={domainForm.status}
                        onChange={(e) => setDomainForm({ ...domainForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={domainForm.comments}
                        onChange={(e) => setDomainForm({ ...domainForm, comments: e.target.value })}
                        margin="dense"
                    />




                      

                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleUpdateSubmit} >Update</Button>
                </DialogActions>
            </Dialog>
            

        {/* Batch Update Domain Dialog */}
        <Dialog open={openBatchUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Batch Update Domain(Applied to all selected records)</DialogTitle>
                <DialogContent>
                <TextField
                        fullWidth
                        label="Domain Title"
                        value={domainForm.domain_title}
                        onChange={(e) => setDomainForm({ ...domainForm, domain_title: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Territory"
                        value={domainForm.territory}
                        onChange={(e) => setDomainForm({ ...domainForm, territory: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Type"
                        value={domainForm.p_type}
                        onChange={(e) => setDomainForm({ ...domainForm, p_type: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Priority"
                        value={domainForm.priority}
                        onChange={(e) => setDomainForm({ ...domainForm, priority: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Application Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.application_date) {
                                    parsedDate = new Date( domainForm.application_date ); // Directly create Date object
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


                    <TextField
                        fullWidth
                        label="Application Number"
                        value={domainForm.application_no}
                        onChange={(e) => setDomainForm({ ...domainForm, application_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Publication Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.publication_date) {
                                    parsedDate = new Date( domainForm.publication_date ); // Directly create Date object
                                }

                                return parsedDate;
                            })()}
                            onChange={(newValue) => {
                            console.log("Raw Selected Date:", newValue); // Log selected date object
                            const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                            handleInputChange({ target: { name: "publication_date", value: formattedDate } });
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
                        label="Publication Number"
                        value={domainForm.publication_no}
                        onChange={(e) => setDomainForm({ ...domainForm, publication_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Registration Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.registration_date) {
                                    parsedDate = new Date( domainForm.registration_date ); // Directly create Date object
                                }

                                return parsedDate;
                            })()}
                            onChange={(newValue) => {
                            console.log("Raw Selected Date:", newValue); // Log selected date object
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
                        label="Registration Number"
                        value={domainForm.registration_no}
                        onChange={(e) => setDomainForm({ ...domainForm, registration_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Next Annuity"
                          value={(() => {
                            let parsedDate = null;

                                if ( domainForm.next_annuity) {
                                    parsedDate = new Date( domainForm.next_annuity ); // Directly create Date object
                                }

                                return parsedDate;
                            })()}
                            onChange={(newValue) => {
                            console.log("Raw Selected Date:", newValue); // Log selected date object
                            const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : "";
                            handleInputChange({ target: { name: "next_annuity", value: formattedDate } });
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
                        label="Annuity Number"
                        value={domainForm.registration_no}
                        onChange={(e) => setDomainForm({ ...domainForm, annuity_no: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ domainForm.owner_name}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={domainForm.owner_email}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ domainForm.owner_address}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={domainForm.owner_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={domainForm.owner_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={domainForm.owner_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={domainForm.agent_name}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={domainForm.agent_email}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={domainForm.agent_address}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={domainForm.agent_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={domainForm.agent_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={domainForm.agent_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={domainForm.group_name}
                        onChange={(e) => setDomainForm({ ...domainForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={domainForm.group_email}
                        onChange={(e) => setDomainForm({ ...domainForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={domainForm.group_address}
                        onChange={(e) => setDomainForm({ ...domainForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={domainForm.group_phone}
                        onChange={(e) => setDomainForm({ ...domainForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={domainForm.group_vat}
                        onChange={(e) => setDomainForm({ ...domainForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={domainForm.group_contact_person}
                        onChange={(e) => setDomainForm({ ...domainForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Inventor"
                        value={domainForm.inventor}
                        onChange={(e) => setDomainForm({ ...domainForm, inventor: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        value={domainForm.status}
                        onChange={(e) => setDomainForm({ ...domainForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={domainForm.comments}
                        onChange={(e) => setDomainForm({ ...domainForm, comments: e.target.value })}
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
                <DialogContent>Are you sure you want to delete this DomainMark?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteDomain} color="error">Delete</Button>
                </DialogActions>
            </Dialog>




    </Box>
    );
};

export default DomainSearch;
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



const PatentSearch = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [Patent, setPatent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedPatent, setSelectedPatent] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false);
    const [patentForm, setPatentForm] = useState({
      patent_title: "", 
      territory :"", 
      p_type : "",
      priority :"",
      application_date :"" , 
      application_no : "", 
      publication_date :"" , 
      publication_no : "" , 
      registration_date : "" , 
      registration_no : "" , 
      next_annuity : "", 
      annuity_no : "", 
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
      status :"", 
      comments : ""
    });

    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    

    
    useEffect(() => {
        fetchPatent();
    }, []);

    

    const fetchPatent = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
            const response = await axiosInstance.get(`/atlip/patent_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            console.log( response.data , "initial data") ; 
            setPatent(response.data);
        } catch (error) {
            console.error("Error fetching Patent:", error);
        } finally {
            setLoading(false);
        }
    };

    // View patent details
    const handleViewPatent = (patent) => {
        setSelectedPatent(patent);
        setOpenViewModal(true);
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedPatent(null);
    };

    // Open Delete Confirmation
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    // Delete Patent
    const handleDeletePatent = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            await axiosInstance.delete(`/atlip/patent_portfolio/${deleteId}/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setPatent(Patent.filter(patent => patent.id !== deleteId));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting patent:", error);
        } finally {
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    
    const [searchParams, setSearchParams] = useState({
      patent_title: "", 
    territory :"", 
    p_type : "",
    priority :"",
    application_date :"" , 
    application_no : "", 
    publication_date :"" , 
    publication_no : "" , 
    registration_date : "" , 
    registration_no : "" , 
    next_annuity : "", 
    annuity_no : "", 
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
    status :"", 
    comments : ""
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
    
            const response = await axiosInstance.get(`/atlip/patent_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
                params: searchParams, // Send search parameters
            });
    
            setPatent(response.data);
        } catch (error) {
            console.error("Error searching Patent:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOpen = ( patent = null) => {
        if ( patent ) {
            setPatentForm({ ...patent });
        } else {
            setPatentForm({
              patent_title: "", 
    territory :"", 
    p_type : "",
    priority :"",
    application_date :"" , 
    application_no : "", 
    publication_date :"" , 
    publication_no : "" , 
    registration_date : "" , 
    registration_no : "" , 
    next_annuity : "", 
    annuity_no : "", 
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
    status :"", 
    comments : ""
            });
        }
        setOpenAddDialog(true);
    };


    const handleUpdateOpen = ( patent = null) => {
        if (patent) {
            setPatentForm({ ...patent });
        } else {
            console.log('Batch Update:', selectedRows);
            setPatentForm({
              patent_title: "", 
              territory :"", 
              p_type : "",
              priority :"",
              application_date :"" , 
              application_no : "", 
              publication_date :"" , 
              publication_no : "" , 
              registration_date : "" , 
              registration_no : "" , 
              next_annuity : "", 
              annuity_no : "", 
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
              status :"", 
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
        console.log("ading records", patentForm); 
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
    
            console.log("Form Data:", patentForm.application_date );
            
            let imageToSend = patentForm.logo;

            if (!patentForm.existingLogo && !(patentForm.logo instanceof File)) {
                // No existing logo and no new upload, fetch and create a File object from the default image
                console.log("No image uploaded, using default logo...");

                const blob = await fetch("/images/logo.png").then(res => res.blob());
                imageToSend = new File([blob], "logo.png", { type: "image/png" });
}
    
            console.log( patentForm.logo ,  typeof patentForm.logo  , patentForm.deadline ,  "logo" );
             

            const formDataToSend = {
              patent_title: patentForm.patent_title, 
              territory : patentForm.territory , 
              p_type : patentForm.p_type,
              priority : patentForm.priority,
              application_date : patentForm.application_date , 
              application_no :  patentForm.application_no, 
              publication_date : patentForm.publication_date , 
              publication_no :  patentForm.publication_no , 
              registration_date : patentForm.registration_date , 
              registration_no : patentForm.registration_no , 
              next_annuity :  patentForm.next_annuity, 
              annuity_no :  patentForm.annuity_no, 
              owner_name : patentForm.owner_name, 
              owner_email :  patentForm.owner_email , 
              owner_phone :  patentForm.owner_phone, 
              owner_address : patentForm.owner_address , 
              owner_vat :  patentForm.owner_vat, 
              owner_contact_person : patentForm.owner_contact_person, 
              agent_name :  patentForm.agent_name, 
              agent_email : patentForm.agent_email , 
              agent_phone : patentForm.agent_phone , 
              agent_address : patentForm.agent_address , 
              agent_vat :  patentForm.agent_vat , 
              agent_contact_person : patentForm.agent_contact_person , 
              group_name :  patentForm.group_name, 
              group_email :  patentForm.group_email, 
              group_address :  patentForm.group_address, 
              group_phone :  patentForm.group_phone, 
              group_vat :  patentForm.group_vat , 
              group_contact_person :  patentForm.group_contact_person, 
              inventor :  patentForm.inventor, 
              status : patentForm.status, 
              comments : patentForm.comments

                
            };
    
            console.log("Submitting Data:", formDataToSend);
    
            console.log("Submitting Data formdata:", patentForm);
    
            // Send POST request with JSON data
            const response = await axiosInstance.post(
                "http://127.0.0.1:8000/api/atlip/patent_portfolio/",
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
            setPatentForm({
                
              patent_title: "", 
              territory :"", 
              p_type : "",
              priority :"",
              application_date :"" , 
              application_no : "", 
              publication_date :"" , 
              publication_no : "" , 
              registration_date : "" , 
              registration_no : "" , 
              next_annuity : "", 
              annuity_no : "", 
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
              status :"", 
              comments : ""
            });
            window.location.reload();
    
        } catch (error) {
            console.error("Error:", error);
            setFormMessage("Failed to save patent portfolio.");
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", patentForm);
    
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
            "patent_title",
            "territory",
            "p_type",
            "priority",
            "application_date",
            "application_no",
            "publication_date",
            "publication_no",
            "registration_date",
            "registration_no",
            "next_annuity",
            "annuity_no",
            "owner_name",
            "owner_email",  
            "owner_phone",
            "owner_address",
            "owner_vat",
            "owner_contact_person",
            "agent_name",
            "agent_email",
            "agent_phone",
            "agent_address",
            "agent_vat",
            "agent_contact_person",
            "group_name",
            "group_email",
            "group_address",
            "group_phone",
            "group_vat",
            "group_contact_person",
            "inventor",
            "status",
            "comments"
            ];
    
            fields.forEach((field) => {
                if (patentForm[field]) {
                    formData.append(field, patentForm[field]);
                }
            });
    
            
            // API Request
            const response = await axiosInstance.put(
                `http://127.0.0.1:8000/api/atlip/patent_portfolio/${patentForm.id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Success:", response.data);
            
            // alert("Patent data updated successfully!");
            handleUpdateClose();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update patent data.");
        }
    };

    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allIds = Patent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
                setPatentForm((prevFormData) => ({
                    ...prevFormData,
                    
                }));
            };
            reader.readAsDataURL(file);
            console.log("Updated formData:", patentForm); 
        }
    };
    
    const handleRemoveImage = () => {
        setPatentForm((prevFormData) => ({
            ...prevFormData,
            
        }));
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
    
        // If value is a Date object, format it to "YYYY-MM-DD"
        if (value instanceof Date) {
            value = format(value, "yyyy-MM-dd");
        }
    
        setPatentForm((prevForm) => ({
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
        setRowsPerPage(value === -1 ? Patent.length : value); // -1 means 'All'
        setPage(0);
      };

    const handleSelectAllToggle = () => {
        const visibleIds = Patent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/patent_portfolio/download_selected/', {
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
          a.download = 'selected_patents.xlsx';
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
      
        setPatentForm({
              patent_title: "", 
              territory :"", 
              p_type : "",
              priority :"",
              application_date :"" , 
              application_no : "", 
              publication_date :"" , 
              publication_no : "" , 
              registration_date : "" , 
              registration_no : "" , 
              next_annuity : "", 
              annuity_no : "", 
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
              status :"", 
              comments : ""
        });
      
        setOpenBatchUpdateDialog(true);
      };
    
      const handleBatchUpdateSubmit = async () => {
        console.log('Batch Update:', selectedRows);
        console.log('Patent Form Data:', patentForm);
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
            for (const key in patentForm) {
              if (patentForm[key] !== "" && patentForm[key] !== null) {
                if (key === "logo" && patentForm.logo instanceof File) {
                    console.log( patentForm.logo , "lllll"); 
                  formData.append('logo', patentForm.logo);
                } else {
                  formData.append(`data[${key}]`, patentForm[key]);
                }
              }
            }
      
            const response = await axiosInstance.post(
              "http://127.0.0.1:8000/api/atlip/patent_portfolio/batch-update/",
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
          setFormMessage("Patent portfolio updated successfully!");
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/patent_portfolio/batch-delete/', {
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

    // console.log("Patent Data:", Patent, '///',patentForm);
    // console.log("Processed Options:", [...new Set((Patent || []).map(t => t?.b_Type).filter(Boolean))]);

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
                                Search Patent
                            </Typography>

                            {/* First Row: Patent Name, Patent Address, Patent Phone */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.patent_title))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Patent Title" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("patent_title", value)}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.territory))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Territory" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("territory", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set( Patent.map(g => g.p_type))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("p_type", value)}
                                    />
                                </Grid>
                            </Grid>

                            
                            {/* Second Row: Patent VAT, Patent Contact Person */}
                          <Grid container spacing={2} sx={{ my: 2 }}>
                                
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.owner_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Owner Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("owner_name", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.agent_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label= "Agent Number" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange( "agent_name", value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.group_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Group Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("group_name", value)}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        options={[...new Set(Patent.map(g => g.status))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("status", value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Next Annuity"
                                            onChange={(newValue) => {
                                                const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                                                    handleSearchChange("next_annuity", formattedDate);
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
                        {/* Patent List */}
                        <Card sx={{ p: 2, boxShadow: 3, borderLeft: "5px solid steelblue", flex: 1, display: "flex", flexDirection: "column" , width: "90%"}}>
                            <Typography variant="h5" color="steelblue" sx={{ mb: 2 }}>
                                Patent List
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
                                              checked={selectedRows.length === Patent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length && Patent.length > 0}
                                              inputProps={{ 'aria-label': 'Select all rows' }}
                                            />
                                        </TableCell>    
                                              
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Patent Title</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Territory</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Type</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Publication Number</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Application Date</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Registration Date</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Registration Number</TableCell>

                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Next Annuity</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Annuity Number</TableCell>

                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Owner</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Group</TableCell>


                                         
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>View</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Add</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Update</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { Patent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => (
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

                                        <TableCell>{grp.patent_title}</TableCell>
                                        <TableCell>{grp.territory}</TableCell>
                                        <TableCell>{grp.p_type}</TableCell>
                                        <TableCell>{grp.publication_no}</TableCell>
                                        <TableCell>{grp.application_date}</TableCell>
                                        <TableCell>{grp.registration_date}</TableCell>
                                        <TableCell>{grp.registration_no}</TableCell>
                                        <TableCell>{grp.next_annuity}</TableCell>
                                        <TableCell>{grp.annuity_no}</TableCell>
                                        <TableCell>{grp.owner_name}</TableCell>
                                        <TableCell>{grp.group_name}</TableCell>

                                        {/* View Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="View" onClick={() => handleViewPatent(grp)}>
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
                            count={Patent.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />


                            
                        </Card>

                        
                    </Container>
                </Box>
            </Box>
            {/* View Patent Modal */}
            
        <Dialog open={openViewModal} onClose={handleCloseViewModal} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ bgcolor: "steelblue", color: "white", textAlign: "center", fontWeight: "bold" }}>
                  Patent Details
              </DialogTitle>
              <DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {selectedPatent && (
                      <Box display="flex" flexDirection="column" gap={2}>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "steelblue" }}>
                            {selectedPatent.patent_title}
                </Typography>
                <Typography>
                    <b>Territory:</b> {selectedPatent.territory}
                </Typography>
                <Typography>
                    <b>Type:</b> {selectedPatent.p_type}
                </Typography>
                <Typography>
                    <b>Priority:</b> {selectedPatent.priority }
                </Typography>
                <Typography>
                    <b>Application Date:</b> {selectedPatent.application_date }
                </Typography>
                <Typography>
                    <b>Application Number:</b> {selectedPatent.application_no }
                </Typography>
                <Typography>
                    <b>Publication Date:</b> {selectedPatent.publication_date }
                </Typography>
                <Typography>
                    <b>Publication Number:</b> {selectedPatent.publication_no }
                </Typography>
                <Typography>
                    <b>Registration Date:</b> {selectedPatent.registration_date }
                </Typography>
                <Typography>
                    <b>Registration Number:</b> {selectedPatent.registration_no }
                </Typography>
                <Typography>
                    <b>Next Annuity:</b> {selectedPatent.next_annuity }
                </Typography>
                <Typography>
                    <b>Annuity Number:</b> {selectedPatent.annuity_no }
                </Typography>


                <Typography>
                    <b>Owner Name:</b> {selectedPatent.owner_name }
                </Typography>
                <Typography>
                    <b>Owner Email:</b> {selectedPatent.owner_email }
                </Typography>
                <Typography>
                    <b>Owner Phone:</b> {selectedPatent.owner_phone }
                </Typography>
                <Typography>
                    <b>Owner Address:</b> {selectedPatent.owner_address }
                </Typography>
                <Typography>
                    <b>Owner Vat:</b> {selectedPatent.owner_vat }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedPatent.owner_contact_person }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedPatent.owner_contact_person }
                </Typography>

                <Typography>
                    <b>Agent Name:</b> {selectedPatent.agent_name }
                </Typography>
                <Typography>
                    <b>Agent Email:</b> {selectedPatent.agent_email }
                </Typography>
                <Typography>
                    <b>Agent Phone:</b> {selectedPatent.agent_phone }
                </Typography>
                <Typography>
                    <b>Agent Address:</b> {selectedPatent.agent_address }
                </Typography>
                <Typography>
                    <b>Agent Vat:</b> {selectedPatent.agent_vat }
                </Typography>
                <Typography>
                    <b>Agent Contact Person:</b> {selectedPatent.agent_contact_person }
                </Typography>

                <Typography>
                    <b>Group Name:</b> {selectedPatent.group_name }
                </Typography>
                <Typography>
                    <b>Group Email:</b> {selectedPatent.group_email }
                </Typography>
                <Typography>
                    <b>Group Phone:</b> {selectedPatent.group_phone }
                </Typography>
                <Typography>
                    <b>Group Address:</b> {selectedPatent.group_address }
                </Typography>
                <Typography>
                    <b>Group Vat:</b> {selectedPatent.group_vat }
                </Typography>
                <Typography>
                    <b>Group Contact Person:</b> {selectedPatent.group_contact_person }
                </Typography>
                <Typography>
                    <b>Inventor:</b> {selectedPatent.inventor }
                </Typography>
                <Typography>
                    <b>Comments:</b> {selectedPatent.comments }
                </Typography>
                <Typography>
                    <b>Status:</b> {selectedPatent.status }
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
{/* Add Patent Dialog */}
<Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add / Modify Patent</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Patent Title"
                        value={patentForm.patent_title}
                        onChange={(e) => setPatentForm({ ...patentForm, patent_title: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Territory"
                        value={patentForm.territory}
                        onChange={(e) => setPatentForm({ ...patentForm, territory: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Type"
                        value={patentForm.p_type}
                        onChange={(e) => setPatentForm({ ...patentForm, p_type: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Priority"
                        value={patentForm.priority}
                        onChange={(e) => setPatentForm({ ...patentForm, priority: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Application Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.application_date) {
                                    parsedDate = new Date( patentForm.application_date ); // Directly create Date object
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
                        value={patentForm.application_no}
                        onChange={(e) => setPatentForm({ ...patentForm, application_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Publication Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.publication_date) {
                                    parsedDate = new Date( patentForm.publication_date ); // Directly create Date object
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
                        value={patentForm.publication_no}
                        onChange={(e) => setPatentForm({ ...patentForm, publication_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Registration Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.registration_date) {
                                    parsedDate = new Date( patentForm.registration_date ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, registration_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Next Annuity"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.next_annuity) {
                                    parsedDate = new Date( patentForm.next_annuity ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, annuity_no: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ patentForm.owner_name}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={patentForm.owner_email}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ patentForm.owner_address}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={patentForm.owner_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={patentForm.owner_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={patentForm.owner_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={patentForm.agent_name}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={patentForm.agent_email}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={patentForm.agent_address}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={patentForm.agent_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={patentForm.agent_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={patentForm.agent_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={patentForm.group_name}
                        onChange={(e) => setPatentForm({ ...patentForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={patentForm.group_email}
                        onChange={(e) => setPatentForm({ ...patentForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={patentForm.group_address}
                        onChange={(e) => setPatentForm({ ...patentForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={patentForm.group_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={patentForm.group_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={patentForm.group_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Inventor"
                        value={patentForm.inventor}
                        onChange={(e) => setPatentForm({ ...patentForm, inventor: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        value={patentForm.status}
                        onChange={(e) => setPatentForm({ ...patentForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={patentForm.comments}
                        onChange={(e) => setPatentForm({ ...patentForm, comments: e.target.value })}
                        margin="dense"
                    />




                      



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleSubmit} >Save</Button>
                </DialogActions>
            </Dialog>




          {/* Dialog to update  */}
          {/* Update Patent Dialog */}
          <Dialog open={openUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Patent</DialogTitle>
                <DialogContent>
                <TextField
                        fullWidth
                        label="Patent Title"
                        value={patentForm.patent_title}
                        onChange={(e) => setPatentForm({ ...patentForm, patent_title: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Territory"
                        value={patentForm.territory}
                        onChange={(e) => setPatentForm({ ...patentForm, territory: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Type"
                        value={patentForm.p_type}
                        onChange={(e) => setPatentForm({ ...patentForm, p_type: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Priority"
                        value={patentForm.priority}
                        onChange={(e) => setPatentForm({ ...patentForm, priority: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Application Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.application_date) {
                                    parsedDate = new Date( patentForm.application_date ); // Directly create Date object
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
                        value={patentForm.application_no}
                        onChange={(e) => setPatentForm({ ...patentForm, application_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Publication Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.publication_date) {
                                    parsedDate = new Date( patentForm.publication_date ); // Directly create Date object
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
                        value={patentForm.publication_no}
                        onChange={(e) => setPatentForm({ ...patentForm, publication_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Registration Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.registration_date) {
                                    parsedDate = new Date( patentForm.registration_date ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, registration_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Next Annuity"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.next_annuity) {
                                    parsedDate = new Date( patentForm.next_annuity ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, annuity_no: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ patentForm.owner_name}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={patentForm.owner_email}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ patentForm.owner_address}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={patentForm.owner_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={patentForm.owner_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={patentForm.owner_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={patentForm.agent_name}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={patentForm.agent_email}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={patentForm.agent_address}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={patentForm.agent_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={patentForm.agent_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={patentForm.agent_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={patentForm.group_name}
                        onChange={(e) => setPatentForm({ ...patentForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={patentForm.group_email}
                        onChange={(e) => setPatentForm({ ...patentForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={patentForm.group_address}
                        onChange={(e) => setPatentForm({ ...patentForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={patentForm.group_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={patentForm.group_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={patentForm.group_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Inventor"
                        value={patentForm.inventor}
                        onChange={(e) => setPatentForm({ ...patentForm, inventor: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        value={patentForm.status}
                        onChange={(e) => setPatentForm({ ...patentForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={patentForm.comments}
                        onChange={(e) => setPatentForm({ ...patentForm, comments: e.target.value })}
                        margin="dense"
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleUpdateSubmit} >Update</Button>
                </DialogActions>
            </Dialog>
            

        {/* Batch Update Patent Dialog */}
        <Dialog open={openBatchUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Batch Update Patent(Applied to all selected records)</DialogTitle>
                <DialogContent>
                <TextField
                        fullWidth
                        label="Patent Title"
                        value={patentForm.patent_title}
                        onChange={(e) => setPatentForm({ ...patentForm, patent_title: e.target.value })}
                        margin="dense"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Territory"
                        value={patentForm.territory}
                        onChange={(e) => setPatentForm({ ...patentForm, territory: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Type"
                        value={patentForm.p_type}
                        onChange={(e) => setPatentForm({ ...patentForm, p_type: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Priority"
                        value={patentForm.priority}
                        onChange={(e) => setPatentForm({ ...patentForm, priority: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Application Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.application_date) {
                                    parsedDate = new Date( patentForm.application_date ); // Directly create Date object
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
                        value={patentForm.application_no}
                        onChange={(e) => setPatentForm({ ...patentForm, application_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Publication Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.publication_date) {
                                    parsedDate = new Date( patentForm.publication_date ); // Directly create Date object
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
                        value={patentForm.publication_no}
                        onChange={(e) => setPatentForm({ ...patentForm, publication_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Registration Date"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.registration_date) {
                                    parsedDate = new Date( patentForm.registration_date ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, registration_no: e.target.value })}
                        margin="dense"
                    />

                    <Grid item xs={12} sm={4}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Next Annuity"
                          value={(() => {
                            let parsedDate = null;

                                if ( patentForm.next_annuity) {
                                    parsedDate = new Date( patentForm.next_annuity ); // Directly create Date object
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
                        value={patentForm.registration_no}
                        onChange={(e) => setPatentForm({ ...patentForm, annuity_no: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Name"
                        value={ patentForm.owner_name}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={patentForm.owner_email}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={ patentForm.owner_address}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={patentForm.owner_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={patentForm.owner_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={patentForm.owner_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={patentForm.agent_name}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={patentForm.agent_email}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={patentForm.agent_address}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={patentForm.agent_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={patentForm.agent_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={patentForm.agent_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={patentForm.group_name}
                        onChange={(e) => setPatentForm({ ...patentForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={patentForm.group_email}
                        onChange={(e) => setPatentForm({ ...patentForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={patentForm.group_address}
                        onChange={(e) => setPatentForm({ ...patentForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={patentForm.group_phone}
                        onChange={(e) => setPatentForm({ ...patentForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={patentForm.group_vat}
                        onChange={(e) => setPatentForm({ ...patentForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={patentForm.group_contact_person}
                        onChange={(e) => setPatentForm({ ...patentForm, group_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Inventor"
                        value={patentForm.inventor}
                        onChange={(e) => setPatentForm({ ...patentForm, inventor: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        value={patentForm.status}
                        onChange={(e) => setPatentForm({ ...patentForm, status: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Comments"
                        value={patentForm.comments}
                        onChange={(e) => setPatentForm({ ...patentForm, comments: e.target.value })}
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
                <DialogContent>Are you sure you want to delete this PatentMark?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDeletePatent} color="error">Delete</Button>
                </DialogActions>
            </Dialog>




    </Box>
    );
};

export default PatentSearch;
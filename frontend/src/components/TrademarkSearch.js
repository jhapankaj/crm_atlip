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
import TrademarkPortfolioPage from "./TrademarkPortfolio";



const TrademarkSearch = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [Trademark, setTrademark] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedTrademark, setSelectedTrademark] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false);
    const [trademarkForm, setTrademarkForm] = useState({
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

    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    

    
    useEffect(() => {
        fetchTrademark();
    }, []);

    

    const fetchTrademark = async () => {
      setLoading(true);
    
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          alert("Access token not found. Please log in.");
          return;
        }
    
        const response = await axiosInstance.get(`/atlip/brand_portfolio/`, {
          headers: { Authorization: `JWT ${accessToken}` },
        });
    
        // Update the logo if it's null
        const updatedData = response.data.map((item) => ({
          ...item,
          logo: item.logo ? item.logo : "http://127.0.0.1:8000/media/na.png",
        }));
    
        console.log(updatedData, "on loading data");
        setTrademark(updatedData);
      } catch (error) {
        console.error("Error fetching Trademark:", error);
      } finally {
        setLoading(false);
      }
    };

    // View group details
    const handleViewTrademark = (trademark) => {
        setSelectedTrademark(trademark);
        setOpenViewModal(true);
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedTrademark(null);
    };

    // Open Delete Confirmation
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    // Delete Group
    const handleDeleteTrademark = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            await axiosInstance.delete(`/atlip/brand_portfolio/${deleteId}/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setTrademark(Trademark.filter(trademark => trademark.id !== deleteId));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting group:", error);
        } finally {
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    
    const [searchParams, setSearchParams] = useState({
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
    
            const response = await axiosInstance.get(`/atlip/brand_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
                params: searchParams, // Send search parameters
            });
    
            setTrademark(response.data);
        } catch (error) {
            console.error("Error searching Trademark:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOpen = ( trademark = null) => {
        if ( trademark ) {
            setTrademarkForm({ ...trademark });
        } else {
            setTrademarkForm({
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
        }
        setOpenAddDialog(true);
    };


    const handleUpdateOpen = ( trademark = null) => {
        if (trademark) {
            console.log( trademark , "data on update console Recieved" , typeof trademark.logo) ; 
            setTrademarkForm({ ...trademark });
        } else {
            console.log('Batch Update:', selectedRows);
            setTrademarkForm({
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
        console.log("ading records", trademarkForm); 
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
    
            // console.log("Form Data:", trademarkForm.application_date );
            
            let imageToSend = trademarkForm.logo;

            if (!trademarkForm.existingLogo && !(trademarkForm.logo instanceof File)) {
                // No existing logo and no new upload, fetch and create a File object from the default image
                console.log("No image uploaded, using default logo...");

                const blob = await fetch("/images/logo.png").then(res => res.blob());
                imageToSend = new File([blob], "logo.png", { type: "image/png" });
}
    
            console.log( trademarkForm.logo ,  typeof trademarkForm.logo  , trademarkForm.deadline ,  "logo" );
             
            // Append Logo if it exists and is a File
            if (trademarkForm.logo instanceof File) {
              console.log("Uploading logo:", trademarkForm.logo);
              imageToSend = trademarkForm.logo
              // formDataToSend.append("logo", trademarkForm.logo);
          } else if (trademarkForm.existingLogo) {
              console.log("Using existing logo");
              imageToSend = trademarkForm.existingLogo
              // formDataToSend.append("existingLogo", trademarkForm.existingLogo);
          }

            const formDataToSend = {
              title: trademarkForm.title,
                b_Type: trademarkForm.b_Type,
                territory: trademarkForm.territory,
                application_date: formatDateForAPI(trademarkForm.application_date),
                registration_date: formatDateForAPI(trademarkForm.registration_date),
                application_no : trademarkForm.application_no,
                registration_no : trademarkForm.registration_no,
                classes: trademarkForm.classes,
                deadline: formatDateForAPI(trademarkForm.deadline),
                affidavit: formatDateForAPI(trademarkForm.affidavit),
                owner_name: trademarkForm.owner_name,
                owner_email: trademarkForm.owner_email,
                owner_phone: trademarkForm.owner_phone,
                owner_address: trademarkForm.owner_address,
                owner_vat: trademarkForm.owner_vat,
                owner_contact_person: trademarkForm.owner_contact_person,
                agent_name: trademarkForm.agent_name,
                agent_email: trademarkForm.agent_email,
                agent_phone: trademarkForm.agent_phone,
                agent_address: trademarkForm.agent_address,
                agent_vat: trademarkForm.agent_vat,
                agent_contact_person: trademarkForm.agent_contact_person,
                group_name: trademarkForm.group_name,
                group_email: trademarkForm.group_email,
                group_address: trademarkForm.group_address,
                group_phone: trademarkForm.group_phone,
                group_vat: trademarkForm.group_vat,
                group_contact_person: trademarkForm.group_contact_person,
                comments: trademarkForm.comments,
                status: trademarkForm.status,
                logo: imageToSend, // Use the URL from the upload API
              
            };
    
            console.log("Submitting Data:", formDataToSend);
    
            console.log("Submitting Data formdata:", trademarkForm);
            
    
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
            setTrademarkForm({
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
            })
            
            window.location.reload();
    
        } catch (error) {
            console.error("Error:", error);
            setFormMessage("Failed to save trademark portfolio.");
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", trademarkForm);
    
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
                "title", "b_Type", "territory", "application_no", "registration_no",
                "classes", "owner_name", "owner_email", "owner_phone", "owner_address",
                "owner_vat", "owner_contact_person", "agent_name", "agent_email",
                "agent_phone", "agent_address", "agent_vat", "agent_contact_person",
                "group_name", "group_email", "group_address", "group_phone", "group_vat",
                "group_contact_person", "comments", "status"
            ];
    
            fields.forEach((field) => {
                if (trademarkForm[field]) {
                    formData.append(field, trademarkForm[field]);
                }
            });
    
            // Append Dates
            formData.append("application_date", formatDateForAPI(trademarkForm.application_date));
            formData.append("registration_date", formatDateForAPI(trademarkForm.registration_date));
            formData.append("deadline", formatDateForAPI(trademarkForm.deadline));
            formData.append("affidavit", formatDateForAPI(trademarkForm.affidavit));
    
            // Append Logo if it exists and is a File
            if (trademarkForm.logo instanceof File) {
                console.log("Uploading logo:", trademarkForm.logo);
                formData.append("logo", trademarkForm.logo);
            } else if (trademarkForm.existingLogo) {
                console.log("Using existing logo");
                formData.append("existingLogo", trademarkForm.existingLogo);
            }
    
            // API Request
            const response = await axiosInstance.put(
                `http://127.0.0.1:8000/api/atlip/brand_portfolio/${trademarkForm.id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Success:", response.data);
            
            // alert("Trademark data updated successfully!");
            handleUpdateClose();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update trademark data.");
        }
    };

    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allIds = Trademark.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => tmark.id);
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
                setTrademarkForm((prevFormData) => ({
                    ...prevFormData,
                    logo: file, // Store the file
                    logoPreview: reader.result, // Show preview
                    existingLogo: prevFormData.existingLogo, // Keep existing image if no new upload
                }));
            };
            reader.readAsDataURL(file);
            console.log("Updated formData:", trademarkForm); 
        }
    };
    
    const handleRemoveImage = () => {
        setTrademarkForm((prevFormData) => ({
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
    
        setTrademarkForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTrademarkForm({ ...trademarkForm, logo: imageUrl });
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
        setRowsPerPage(value === -1 ? Trademark.length : value); // -1 means 'All'
        setPage(0);
      };

    const handleSelectAllToggle = () => {
        const visibleIds = Trademark.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => tmark.id);
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/brand_portfolio/download_selected/', {
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
          a.download = 'selected_trademark.xlsx';
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
      
        setTrademarkForm({
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
      
        setOpenBatchUpdateDialog(true);
      };
    
      const handleBatchUpdateSubmit = async () => {
        console.log('Batch Update:', selectedRows);
        console.log('Trademark Form Data:', trademarkForm);
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
            for (const key in trademarkForm) {
              if (trademarkForm[key] !== "" && trademarkForm[key] !== null) {
                if (key === "logo" && trademarkForm.logo instanceof File) {
                    console.log( trademarkForm.logo , "lllll"); 
                  formData.append('logo', trademarkForm.logo);
                } else {
                  formData.append(`data[${key}]`, trademarkForm[key]);
                }
              }
            }
      
            const response = await axiosInstance.post(
              "http://127.0.0.1:8000/api/atlip/brand_portfolio/batch-update/",
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/brand_portfolio/batch-delete/', {
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

    // console.log("Trademark Data:", Trademark, '///',trademarkForm);
    // console.log("Processed Options:", [...new Set((Trademark || []).map(t => t?.b_Type).filter(Boolean))]);

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
                                Search TradeMark
                            </Typography>

                            {/* First Row: Group Name, Group Address, Group Phone */}
                            {/* First Row: Group Name, Group Address, Group Phone */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.title).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Title" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("title", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        
                                        options={[...new Set((Trademark || []).map(t => t?.territory).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Territory" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("territory", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.b_Type).filter(Boolean))]} 
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Type" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("b_Type", value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Second Row: Owner Name, Agent Name , Group Name */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.owner_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Owner Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("owner_name", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.agent_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_name", value)}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.group_name).filter(Boolean))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Group Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("group_name", value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Thrid Row: Status, Agent Name , Group Name */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set((Trademark || []).map(t => t?.status).filter(Boolean))]}
                                        
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("status", value)}
                                    />
                                </Grid>
                                
                                {/* Deadline DatePicker */}
                                <Grid item xs={12} md={4}>
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

                                {/* Affadavit DatePicker */}
                                <Grid item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Affidavit"
                                            onChange={(newValue) => {
                                                const formattedDate = newValue ? format(newValue, "dd/MM/yyyy") : "";
                                                    handleSearchChange("affidavit", formattedDate);
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
                                Trademark List
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
                                            checked={selectedRows.length === Trademark.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length && Trademark.length > 0}
                                            inputProps={{ 'aria-label': 'Select all rows' }}
                                          />
                                        </TableCell>    
                                                                    
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Title</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Logo</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Territory</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Type</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Application Date</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Application No</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Registration Date</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Registration No</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Classes</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Deadline</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Affadavit</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Owner</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Group</TableCell>

                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>View</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Add</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Update</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { Trademark.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tmark) => (
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

                                        <TableCell>{tmark.title}</TableCell>
                                        <TableCell>
                                            <img 
                                                src={tmark.logo} 
                                                alt="Logo" 
                                                style={{ width: 100, height: 100, objectFit: "contain" }} 
                                            />
                                        </TableCell>
                                        <TableCell>{tmark.territory}</TableCell>
                                        <TableCell>{tmark.b_Type}</TableCell>
                                        <TableCell>{ tmark.application_date}</TableCell>
                                        <TableCell>{ tmark.application_no}</TableCell>
                                        <TableCell>{ tmark.registration_date}</TableCell>
                                        <TableCell>{ tmark.registration_no}</TableCell>
                                        <TableCell>{ tmark.classes}</TableCell>
                                        <TableCell>{ tmark.deadline}</TableCell>
                                        <TableCell>{ tmark.affidavit}</TableCell>
                                        <TableCell>{ tmark.owner_name}</TableCell>
                                        <TableCell>{ tmark.group_name}</TableCell>


                                        {/* View Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="View" onClick={() => handleViewTrademark(tmark)}>
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
                            count={Trademark.length}
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
               {/* View Group Modal */}
               <Dialog open={openViewModal} onClose={handleCloseViewModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: "steelblue", color: "white", textAlign: "center", fontWeight: "bold" }}>
                    Trademark Details
                </DialogTitle>
                <DialogContent sx={{ p: 5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {selectedTrademark && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "steelblue" }}>
                            {selectedTrademark.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <span>Logo:</span>
                        <img
                            src={selectedTrademark.logo}
                            alt="Logo Preview"
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                        />
                </Box>
                <Typography>
                    <b>Territory:</b> {selectedTrademark.territory}
                </Typography>
                <Typography>
                    <b>Type:</b> {selectedTrademark.b_Type}
                </Typography>
                <Typography>
                    <b>Application Date:</b> {selectedTrademark.application_date }
                </Typography>
                <Typography>
                    <b>Application Number:</b> {selectedTrademark.application_no }
                </Typography>
                <Typography>
                    <b>Registration Date:</b> {selectedTrademark.registration_date }
                </Typography>
                <Typography>
                    <b>Registration Number:</b> {selectedTrademark.registration_no }
                </Typography>
                <Typography>
                    <b>Classes:</b> {selectedTrademark.classes }
                </Typography>
                <Typography>
                    <b>Deadline:</b> {selectedTrademark.deadline }
                </Typography>
                <Typography>
                    <b>Affidavit:</b> {selectedTrademark.affidavit }
                </Typography>
                <Typography>
                    <b>Owner Name:</b> {selectedTrademark.owner_name }
                </Typography>
                <Typography>
                    <b>Owner Email:</b> {selectedTrademark.owner_email }
                </Typography>
                <Typography>
                    <b>Owner Phone:</b> {selectedTrademark.owner_phone }
                </Typography>
                <Typography>
                    <b>Owner Address:</b> {selectedTrademark.owner_address }
                </Typography>
                <Typography>
                    <b>Owner Vat:</b> {selectedTrademark.owner_vat }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedTrademark.owner_contact_person }
                </Typography>
                <Typography>
                    <b>Owner Contact Person:</b> {selectedTrademark.owner_contact_person }
                </Typography>

                <Typography>
                    <b>Agent Name:</b> {selectedTrademark.agent_name }
                </Typography>
                <Typography>
                    <b>Agent Email:</b> {selectedTrademark.agent_email }
                </Typography>
                <Typography>
                    <b>Agent Phone:</b> {selectedTrademark.agent_phone }
                </Typography>
                <Typography>
                    <b>Agent Address:</b> {selectedTrademark.agent_address }
                </Typography>
                <Typography>
                    <b>Agent Vat:</b> {selectedTrademark.agent_vat }
                </Typography>
                <Typography>
                    <b>Agent Contact Person:</b> {selectedTrademark.agent_contact_person }
                </Typography>

                <Typography>
                    <b>Group Name:</b> {selectedTrademark.group_name }
                </Typography>
                <Typography>
                    <b>Group Email:</b> {selectedTrademark.group_email }
                </Typography>
                <Typography>
                    <b>Group Phone:</b> {selectedTrademark.group_phone }
                </Typography>
                <Typography>
                    <b>Group Address:</b> {selectedTrademark.group_address }
                </Typography>
                <Typography>
                    <b>Group Vat:</b> {selectedTrademark.group_vat }
                </Typography>
                <Typography>
                    <b>Group Contact Person:</b> {selectedTrademark.group_contact_person }
                </Typography>
                <Typography>
                    <b>Comments:</b> {selectedTrademark.comments }
                </Typography>
                <Typography>
                    <b>status:</b> {selectedTrademark.status }
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
            label="Title"
            value={trademarkForm.title}
            onChange={(e) => setTrademarkForm({ ...trademarkForm, title: e.target.value })}
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
{trademarkForm.logo && (
  <Grid item xs={12} sm={6}>
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <img
        src={trademarkForm.logo instanceof File 
          ? URL.createObjectURL(trademarkForm.logo) 
          : trademarkForm.logo
        }
        alt="Logo Preview"
        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
      />
      {/* Small Cross Icon */}
      <IconButton
        onClick={() => setTrademarkForm({ ...trademarkForm, logo: 'http://127.0.0.1:8000/media/na.png' })}
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
            value={trademarkForm.territory}
            onChange={(e) => setTrademarkForm({ ...trademarkForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="b_Type"
                value={trademarkForm.b_Type}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, b_Type: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Classes"
                name="classes"
                value={trademarkForm.classes}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, classes: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={trademarkForm.classes}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, comments: e.target.value })}
                margin="dense"
            />

                
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Deadline"
                    value={ trademarkForm.deadline ? new Date(trademarkForm.deadline) : null}
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

                                if (trademarkForm.affidavit) {
                                    parsedDate = new Date(trademarkForm.affidavit); // Directly create Date object
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
                value={trademarkForm.status}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, status: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={trademarkForm.application_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, application_no: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={trademarkForm.registration_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Application Date"
                        value={(() => {
                            let parsedDate = null;

                                if (trademarkForm.application_date) {
                                    parsedDate = new Date(trademarkForm.application_date ); // Directly create Date object
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

                                if (trademarkForm.registration_date ) {
                                    parsedDate = new Date(trademarkForm.registration_date ); // Directly create Date object
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
                        value={trademarkForm.owner_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={trademarkForm.owner_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={trademarkForm.owner_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={trademarkForm.owner_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={trademarkForm.owner_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={trademarkForm.owner_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={trademarkForm.agent_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={trademarkForm.agent_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={trademarkForm.agent_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={trademarkForm.agent_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={trademarkForm.agent_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={trademarkForm.agent_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={trademarkForm.group_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={trademarkForm.group_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={trademarkForm.group_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={trademarkForm.group_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={trademarkForm.group_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={trademarkForm.group_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_contact_person: e.target.value })}
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
                <DialogTitle>Update Trademark</DialogTitle>
                <DialogContent>
                <TextField
            fullWidth
            label="Title"
            value={trademarkForm.title}
            onChange={(e) => setTrademarkForm({ ...trademarkForm, title: e.target.value })}
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
{trademarkForm.logo && (
  <Grid item xs={12} sm={6}>
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      <img
        src={trademarkForm.logo instanceof File 
          ? URL.createObjectURL(trademarkForm.logo) 
          : trademarkForm.logo
        }
        alt="Logo Preview"
        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
      />
      {/* Small Cross Icon */}
      <IconButton
        onClick={() => setTrademarkForm({ ...trademarkForm, logo: 'http://127.0.0.1:8000/media/na.png' })}
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
            value={trademarkForm.territory}
            onChange={(e) => setTrademarkForm({ ...trademarkForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="b_Type"
                value={trademarkForm.b_Type}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, b_Type: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Classes"
                name="classes"
                value={trademarkForm.classes}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, classes: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={trademarkForm.classes}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, comments: e.target.value })}
                margin="dense"
            />

                
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Deadline"
                    value={ trademarkForm.deadline ? new Date(trademarkForm.deadline) : null}
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

                                if (trademarkForm.affidavit) {
                                    parsedDate = new Date(trademarkForm.affidavit); // Directly create Date object
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
                value={trademarkForm.status}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, status: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={trademarkForm.application_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, application_no: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={trademarkForm.registration_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Application Date"
                        value={(() => {
                            let parsedDate = null;

                                if (trademarkForm.application_date) {
                                    parsedDate = new Date(trademarkForm.application_date ); // Directly create Date object
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

                                if (trademarkForm.registration_date ) {
                                    parsedDate = new Date(trademarkForm.registration_date ); // Directly create Date object
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
                        value={trademarkForm.owner_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={trademarkForm.owner_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={trademarkForm.owner_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={trademarkForm.owner_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={trademarkForm.owner_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={trademarkForm.owner_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />

<TextField
                        fullWidth
                        label="Agent Name"
                        value={trademarkForm.agent_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={trademarkForm.agent_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={trademarkForm.agent_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={trademarkForm.agent_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={trademarkForm.agent_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={trademarkForm.agent_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />


            <TextField
                        fullWidth
                        label="Group Name"
                        value={trademarkForm.group_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Email"
                        value={trademarkForm.group_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Address"
                        value={trademarkForm.group_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={trademarkForm.group_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={trademarkForm.group_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={trademarkForm.group_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_contact_person: e.target.value })}
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
                <DialogTitle>Batch Update Trademark(Applied to all selected records)</DialogTitle>
                <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    value={trademarkForm.title}
                    onChange={(e) => setTrademarkForm({ ...trademarkForm, title: e.target.value })}
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
  {trademarkForm.logo && (
    <Grid item xs={12} sm={6}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={trademarkForm.logo instanceof File 
            ? URL.createObjectURL(trademarkForm.logo) 
            : trademarkForm.logo
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
            value={trademarkForm.territory}
            onChange={(e) => setTrademarkForm({ ...trademarkForm, territory: e.target.value })}
            margin="dense"
        />

            <TextField
                fullWidth
                label="Type"
                name="b_Type"
                value={trademarkForm.b_Type}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, b_Type: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Classes"
                name="classes"
                value={trademarkForm.classes}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, classes: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={trademarkForm.comments}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, comments: e.target.value })}
                margin="dense"
            />

                
            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Deadline"
                    value={trademarkForm.deadline ? new Date(trademarkForm.deadline) : null}
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

                                if (trademarkForm.affidavit) {
                                    parsedDate = new Date(trademarkForm.affidavit); // Directly create Date object
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
                value={trademarkForm.status}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, status: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Application Number"
                name="application_no"
                value={trademarkForm.application_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, application_no: e.target.value })}
                margin="dense"
            />

            <TextField
                fullWidth
                label="Registration Number"
                name="registration_no"
                value={trademarkForm.registration_no}
                onChange={(e) => setTrademarkForm({ ...trademarkForm, registration_no: e.target.value })}
                margin="dense"
            />

            <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Application Date"
                        value={(() => {
                            let parsedDate = null;

                                if (trademarkForm.application_date) {
                                    parsedDate = new Date(trademarkForm.application_date ); // Directly create Date object
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

                                if (trademarkForm.registration_date ) {
                                    parsedDate = new Date(trademarkForm.registration_date ); // Directly create Date object
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
                        value={trademarkForm.owner_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Email"
                        value={trademarkForm.owner_email}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Owner Address"
                        value={trademarkForm.owner_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Phone"
                        value={trademarkForm.owner_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner VAT"
                        value={trademarkForm.owner_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Owner Contact Person"
                        value={trademarkForm.owner_contact_person}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, owner_contact_person: e.target.value })}
                        margin="dense"
                    />


                <TextField
                        fullWidth
                        label="Agent Name"
                        value={trademarkForm.agent_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_phone_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={ trademarkForm.agent_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={ trademarkForm.agent_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={trademarkForm.agent_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={trademarkForm.agent_contact_person}
                        onChange={(e) => setTrademark({ ...trademarkForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Group Name"
                        value={trademarkForm.group_name}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Address"
                        value={ trademarkForm.group_address}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Phone"
                        value={ trademarkForm.group_phone}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group VAT"
                        value={trademarkForm.group_vat}
                        onChange={(e) => setTrademarkForm({ ...trademarkForm, group_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Group Contact Person"
                        value={trademarkForm.group_contact_person}
                        onChange={(e) => setTrademark({ ...trademarkForm, group_contact_person: e.target.value })}
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
                    <Button onClick={handleDeleteTrademark} color="error">Delete</Button>
                </DialogActions>
            </Dialog>




    </Box>
    );
};

export default TrademarkSearch;
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



const AgentSearch = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [Agent, setAgent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openBatchUpdateDialog, setOpenBatchUpdateDialog] = useState(false);
    const [agentForm, setAgentForm] = useState({
        agent_name : "", 
        agent_email : "", 
        agent_address : "", 
        agent_phone : "", 
        agent_vat : "" , 
        agent_contact_person : "",
        
    });

    const [formMessage, setFormMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"

    

    
    useEffect(() => {
        fetchAgent();
    }, []);

    

    const fetchAgent = async () => {
        setLoading(true);
        try {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
            const response = await axiosInstance.get(`/atlip/agent_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setAgent(response.data);
        } catch (error) {
            console.error("Error fetching Agent:", error);
        } finally {
            setLoading(false);
        }
    };

    // View agent details
    const handleViewAgent = (agent) => {
        setSelectedAgent(agent);
        setOpenViewModal(true);
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedAgent(null);
    };

    // Open Delete Confirmation
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    // Delete Agent
    const handleDeleteAgent = async () => {
        try {
            const accessToken = localStorage.getItem("access_token");
            await axiosInstance.delete(`/atlip/agent_portfolio/${deleteId}/`, {
                headers: { Authorization: `JWT ${accessToken}` },
            });
            setAgent(Agent.filter(agent => agent.id !== deleteId));
            window.location.reload();
        } catch (error) {
            console.error("Error deleting agent:", error);
        } finally {
            setOpenDeleteDialog(false);
            setDeleteId(null);
        }
    };

    
    const [searchParams, setSearchParams] = useState({
      agent_name: "",
      agent_address: "",
      agent_phone: "",
      agent_vat: "",
      agent_contact_person: "",
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
    
            const response = await axiosInstance.get(`/atlip/agent_portfolio/`, {
                headers: { Authorization: `JWT ${accessToken}` },
                params: searchParams, // Send search parameters
            });
    
            setAgent(response.data);
        } catch (error) {
            console.error("Error searching Agent:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOpen = ( agent = null) => {
        if ( agent ) {
            setAgentForm({ ...agent });
        } else {
            setAgentForm({
              agent_name: "",
              agent_address: "",
              agent_phone: "",
              agent_vat: "",
              agent_contact_person: "",
            });
        }
        setOpenAddDialog(true);
    };


    const handleUpdateOpen = ( agent = null) => {
        if (agent) {
            setAgentForm({ ...agent });
        } else {
            console.log('Batch Update:', selectedRows);
            setAgentForm({
              agent_name: "",
              agent_address: "",
              agent_phone: "",
              agent_vat: "",
              agent_contact_person: ""
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
        console.log("ading records", agentForm); 
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
    
            console.log("Form Data:", agentForm.application_date );
            
            let imageToSend = agentForm.logo;

            if (!agentForm.existingLogo && !(agentForm.logo instanceof File)) {
                // No existing logo and no new upload, fetch and create a File object from the default image
                console.log("No image uploaded, using default logo...");

                const blob = await fetch("/images/logo.png").then(res => res.blob());
                imageToSend = new File([blob], "logo.png", { type: "image/png" });
}
    
            console.log( agentForm.logo ,  typeof agentForm.logo  , agentForm.deadline ,  "logo" );
             

            const formDataToSend = {
                agent_name: agentForm.agent_name,
                agent_email: agentForm.agent_email,
                agent_address: agentForm.agent_address,
                agent_phone: agentForm.agent_phone,
                agent_vat: agentForm.agent_vat,
                agent_contact_person: agentForm.agent_contact_person
                
            };
    
            console.log("Submitting Data:", formDataToSend);
    
            console.log("Submitting Data formdata:", agentForm);
    
            // Send POST request with JSON data
            const response = await axiosInstance.post(
                "http://127.0.0.1:8000/api/atlip/agent_portfolio/",
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
            setAgentForm({
                
                agent_name: "",
                agent_email: "",
                agent_address: "",
                agent_phone: "",
                agent_vat: "",
                agent_contact_person: "",
                
            });
            window.location.reload();
    
        } catch (error) {
            console.error("Error:", error);
            setFormMessage("Failed to save agent portfolio.");
        }
    };
    
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data:", agentForm);
    
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
                
                "agent_name", "agent_email", "agent_address", "agent_phone", "agent_vat",
                "agent_contact_person"
            ];
    
            fields.forEach((field) => {
                if (agentForm[field]) {
                    formData.append(field, agentForm[field]);
                }
            });
    
            
            // API Request
            const response = await axiosInstance.put(
                `http://127.0.0.1:8000/api/atlip/agent_portfolio/${agentForm.id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Success:", response.data);
            
            // alert("Agent data updated successfully!");
            handleUpdateClose();
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update agent data.");
        }
    };

    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
          const allIds = Agent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
                setAgentForm((prevFormData) => ({
                    ...prevFormData,
                    
                }));
            };
            reader.readAsDataURL(file);
            console.log("Updated formData:", agentForm); 
        }
    };
    
    const handleRemoveImage = () => {
        setAgentForm((prevFormData) => ({
            ...prevFormData,
            
        }));
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
    
        // If value is a Date object, format it to "YYYY-MM-DD"
        if (value instanceof Date) {
            value = format(value, "yyyy-MM-dd");
        }
    
        setAgentForm((prevForm) => ({
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
        setRowsPerPage(value === -1 ? Agent.length : value); // -1 means 'All'
        setPage(0);
      };

    const handleSelectAllToggle = () => {
        const visibleIds = Agent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => grp.id);
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/agent_portfolio/download_selected/', {
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
          a.download = 'selected_agents.xlsx';
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
      
        setAgentForm({
          agent_name: "",
          agent_email: "",
          agent_address: "",
          agent_phone: "",
          agent_vat: "",
          agent_contact_person: "",
          
        });
      
        setOpenBatchUpdateDialog(true);
      };
    
      const handleBatchUpdateSubmit = async () => {
        console.log('Batch Update:', selectedRows);
        console.log('Agent Form Data:', agentForm);
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
            for (const key in agentForm) {
              if (agentForm[key] !== "" && agentForm[key] !== null) {
                if (key === "logo" && agentForm.logo instanceof File) {
                    console.log( agentForm.logo , "lllll"); 
                  formData.append('logo', agentForm.logo);
                } else {
                  formData.append(`data[${key}]`, agentForm[key]);
                }
              }
            }
      
            const response = await axiosInstance.post(
              "http://127.0.0.1:8000/api/atlip/agent_portfolio/batch-update/",
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
          setFormMessage("Agent portfolio updated successfully!");
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
          const response = await fetch('http://127.0.0.1:8000/api/atlip/agent_portfolio/batch-delete/', {
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

    // console.log("Agent Data:", Agent, '///',agentForm);
    // console.log("Processed Options:", [...new Set((Agent || []).map(t => t?.b_Type).filter(Boolean))]);

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
                                Search Agent
                            </Typography>

                            {/* First Row: Agent Name, Agent Address, Agent Phone */}
                            <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Agent.map(g => g.agent_name))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Name" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_name", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set(Agent.map(g => g.agent_address))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Address" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_address", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={[...new Set( Agent.map(g => g.agent_phone))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Phone" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_phone", value)}
                                    />
                                </Grid>
                            </Grid>

                            {/* Second Row: Agent VAT, Agent Contact Person */}
                          <Grid container spacing={2} sx={{ my: 2 }}>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        options={[...new Set(Agent.map(g => g.agent_vat))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent VAT" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_vat", value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        options={[...new Set(Agent.map(g => g.agent_contact_person))]}
                                        freeSolo
                                        renderInput={(params) => <TextField {...params} label="Agent Contact Person" variant="outlined" />}
                                        onInputChange={(e, value) => handleSearchChange("agent_contact_person", value)}
                                    />
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
                        {/* Agent List */}
                        <Card sx={{ p: 2, boxShadow: 3, borderLeft: "5px solid steelblue", flex: 1, display: "flex", flexDirection: "column" , width: "90%"}}>
                            <Typography variant="h5" color="steelblue" sx={{ mb: 2 }}>
                                Agent List
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
                                              checked={selectedRows.length === Agent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length && Agent.length > 0}
                                              inputProps={{ 'aria-label': 'Select all rows' }}
                                            />
                                        </TableCell>    
                                              
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Agent Name</TableCell>
                                          <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Agent Address</TableCell>
                                          <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Agent Phone</TableCell>
                                          <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Agent Contact Name</TableCell>
                                          <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold" }}>Agent VAT</TableCell>
                                         
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>View</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Add</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Update</TableCell>
                                        <TableCell sx={{ bgcolor: "steelblue", color: "white", fontWeight: "bold", textAlign: "center" }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { Agent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((grp) => (
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

                                        <TableCell>{grp.agent_name}</TableCell>
                                        <TableCell>{grp.agent_address}</TableCell>
                                        <TableCell>{grp.agent_phone}</TableCell>
                                        <TableCell>{grp.agent_contact_person}</TableCell>
                                        <TableCell>{grp.agent_vat}</TableCell>


                                        {/* View Button */}
                                        <TableCell align="center">
                                            <IconButton sx={{ color: "steelblue" }} aria-label="View" onClick={() => handleViewAgent(grp)}>
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
                            count={Agent.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />


                            
                        </Card>

                        
                    </Container>
                </Box>
            </Box>
            {/* View Agent Modal */}
            
            <Dialog open={openViewModal} onClose={handleCloseViewModal} maxWidth="sm" fullWidth>
    <DialogTitle sx={{ bgcolor: "steelblue", color: "white", textAlign: "center", fontWeight: "bold" }}>
        Agent Details
    </DialogTitle>
    <DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {selectedAgent && (
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "steelblue" }}>
                    {selectedAgent.agent_name}
                </Typography>
                <Typography>
                    <b>Address:</b> {selectedAgent.agent_address}
                </Typography>
                <Typography>
                    <b>Phone:</b> {selectedAgent.agent_phone}
                </Typography>
                <Typography>
                    <b>VAT:</b> {selectedAgent.agent_vat}
                </Typography>
                <Typography>
                    <b>Contact Person:</b> {selectedAgent.agent_contact_person}
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
{/* Add Agent Dialog */}
<Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add / Modify Agent</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Agent Name"
                        value={agentForm.agent_name}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_name: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Email"
                        value={agentForm.agent_email}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_email: e.target.value })}
                        margin="dense"
                    />

                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={agentForm.agent_address}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={agentForm.agent_phone}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={agentForm.agent_vat}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={agentForm.agent_contact_person}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleSubmit} >Save</Button>
                </DialogActions>
            </Dialog>




          {/* Dialog to update  */}
          {/* Update Agent Dialog */}
          <Dialog open={openUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Update Agent</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Agent Name"
                        value={agentForm.agent_name}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={agentForm.agent_address}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={agentForm.agent_phone}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={agentForm.agent_vat}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={agentForm.agent_contact_person}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_contact_person: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClose} color="primary">Cancel</Button>
                    <Button color="success" onClick={handleUpdateSubmit} >Update</Button>
                </DialogActions>
            </Dialog>
            

        {/* Batch Update Agent Dialog */}
        <Dialog open={openBatchUpdateDialog} onClose={handleUpdateClose} maxWidth="sm" fullWidth>
                <DialogTitle>Batch Update Agent(Applied to all selected records)</DialogTitle>
                <DialogContent>
                
                    <TextField
                        fullWidth
                        label="Agent Name"
                        value={agentForm.agent_name}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_name: e.target.value })}    
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Address"
                        value={ agentForm.agent_address}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_address: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Phone"
                        value={ agentForm.agent_phone}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_phone: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent VAT"
                        value={agentForm.agent_vat}
                        onChange={(e) => setAgentForm({ ...agentForm, agent_vat: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Agent Contact Person"
                        value={agentForm.agent_contact_person}
                        onChange={(e) => setAgent({ ...agentForm, agent_contact_person: e.target.value })}
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
                    <Button onClick={handleDeleteAgent} color="error">Delete</Button>
                </DialogActions>
            </Dialog>




    </Box>
    );
};

export default AgentSearch;
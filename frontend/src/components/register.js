import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VerticalNavigation from './VerticalHeader';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    userType: '',
    selectedGroups: [],
  });
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          alert('Access token not found. Please log in.');
          return;
        }
        const response = await axiosInstance.get('/atlip/group_portfolio/', {
          headers: { Authorization: `JWT ${accessToken}` },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'selectedGroups' ? [...value] : value.trim(),
    }));
  };

  const handleDeleteGroup = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedGroups: prev.selectedGroups.filter((groupId) => groupId !== id),
    }));
  };

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'group_name', headerName: 'Group Name', width: 200 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('Access token not found. Please log in.');
      return;
    }

    try {
      // Step 1: Create User
      const userResponse = await axiosInstance.post(
        '/user/create/',
        {
          email: formData.email,
          user_name: formData.username,
          password: formData.password,
          is_staff: formData.userType === 'staff',
          is_admin: formData.userType === 'admin',
        },
        { headers: { Authorization: `JWT ${accessToken}` } }
      );

      const userId = userResponse.data.id;

      console.log("user id" , userId) ; 

      // Step 2: Assign Groups to User
      if (formData.selectedGroups.length > 0) {
        await axiosInstance.post(
          "/user/user-group-alloc/",
          {
            user: userId,
            groups: formData.selectedGroups,
          },
          { headers: { Authorization: `JWT ${accessToken}` } }
        );
      }

      setSuccessMessage("User added successfully!");
    } catch (err) {
      console.error('Error:', err);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      {/* Vertical Navigation */}
      <VerticalNavigation />
      
      {/* Main Content */}
      <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <CssBaseline />
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Email Address" name="email" onChange={handleChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Username" name="username" onChange={handleChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} required /></Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>User Type</InputLabel>
                  <Select name="userType" value={formData.userType} onChange={handleChange}>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Group Selection Button */}
              <Grid item xs={12}>
                <Button fullWidth variant="outlined" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {dropdownOpen ? 'Hide Groups' : 'Select Groups'}
                </Button>
              </Grid>

              {dropdownOpen && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Search Groups"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                  <div style={{ height: 400, width: '100%', marginTop: 10 }}>
                    <DataGrid
                      rows={filteredGroups}
                      columns={columns}
                      pageSizeOptions={[10, 50, 100]}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      checkboxSelection
                      onRowSelectionModelChange={(selectedRows) =>
                        setFormData((prev) => ({ ...prev, selectedGroups: selectedRows }))
                      }
                    />
                  </div>
                </Grid>
              )}

              {/* Selected Groups Display */}
              {formData.selectedGroups.length > 0 && (
                <Grid item xs={12}>
                  <Button fullWidth variant="outlined" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {dropdownOpen ? 'Hide Groups' : 'Show Groups'}
                  </Button>
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.selectedGroups.map((id) => (
                      <Chip
                        key={id}
                        label={groups.find((g) => g.id === id)?.group_name || id}
                        onDelete={() => handleDeleteGroup(id)}
                      />
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
              Add User
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

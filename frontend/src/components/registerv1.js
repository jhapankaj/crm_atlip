import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    userType: '',
    selectedGroups: [], // Holds selected groups
  });

  const [groups, setGroups] = useState([]); // Stores groups fetched from API

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        console.log( accessToken , "accessToken") ; 
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

      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>

            {/* Dropdown for user type selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user-type-label">User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  label="User Type"
                  onChange={handleChange}
                >
                  <MenuItem value="staff">Staff</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Multi-Select Dropdown for Group Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="group-select-label">Select Groups</InputLabel>
                <Select
                  labelId="group-select-label"
                  id="selectedGroups"
                  name="selectedGroups"
                  multiple
                  value={formData.selectedGroups}
                  onChange={handleChange}
                  renderValue={(selected) => selected.map((id) => groups.find((g) => g.id === id)?.group_name).join(', ')}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.group_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
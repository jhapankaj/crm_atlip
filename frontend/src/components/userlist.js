import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import {
  Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, Paper, IconButton, AppBar, Toolbar, Dialog, DialogActions,
  DialogContent, DialogTitle, Button
} from '@mui/material';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerticalNavigation from './VerticalHeader';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('user/list_users/');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  // Handle delete action
  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setOpenDialog(true);
  };

  // Confirm and execute delete
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`user/delete-user/${userToDelete}/`);
      setOpenDialog(false);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Vertical Navigation */}
      <VerticalNavigation selectedTab={selectedTab} onTabChange={(event, newValue) => setSelectedTab(newValue)} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        
        {/* Fixed Header */}
        <AppBar position="sticky" color="primary" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              User Management
            </Typography>
          </Toolbar>
        </AppBar>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, maxHeight: '70vh', overflow: 'auto' }}>
            <Table stickyHeader>
              {/* Table Head (Sticky Header) */}
              <TableHead>
                <TableRow sx={{ backgroundColor: '#4682B4' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Active</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }} align="center">Modify</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'black' }} align="center">Delete</TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id} sx={{ backgroundColor: index % 2 ? '#f2f2f2' : 'white', '&:hover': { backgroundColor: '#e0e0e0' } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.is_active ? 'True' : 'False'}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {/* Modify Column */}
                    <TableCell align="center">
                      <IconButton onClick={() => navigate(`/modify-user/${user.id}`)} sx={{ color: '#1976d2' }}>
                        <EditOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    {/* Delete Column */}
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(user.id)} disabled={user.is_superuser} sx={{ color: '#d32f2f' }}>
                        <DeleteSweepOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
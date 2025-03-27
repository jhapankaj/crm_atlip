import React, { useState } from 'react';
import axiosInstance from '../axios'; // Assuming axiosInstance is in the same directory
import { Button, TextField, Box, CircularProgress } from '@mui/material';

const GroupUpload = () => {
  const [groupName, setGroupName] = useState('');
  const [groupEmail, setGroupEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'groupName') setGroupName(value);
    if (name === 'groupEmail') setGroupEmail(value);
  };

  // Handle form submission using axiosInstance
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!groupName || !groupEmail) {
      setError('Group Name and Email are required');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new URLSearchParams();
    formData.append('groupName', groupName);
    formData.append('groupEmail', groupEmail);

    try {
      const response = await axiosInstance.post('/api/atlip/group-portfolio/', formData);

      if (response.status === 201) {
        console.log('Data uploaded successfully:', response.data);
        setGroupName('');
        setGroupEmail('');
      }
    } catch (err) {
      setError('Error uploading data: ' + err.message);
      console.error('Error uploading data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Group Name"
        name="groupName"
        value={groupName}
        onChange={handleInputChange}
        variant="outlined"
      />
      <TextField
        label="Group Email"
        name="groupEmail"
        value={groupEmail}
        onChange={handleInputChange}
        variant="outlined"
        type="email"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Button type="submit" variant="contained">
          Submit
        </Button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Box>
  );
};

export default GroupUpload;
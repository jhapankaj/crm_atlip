import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  Paper,
  Divider,
  useMediaQuery,
  TextField, 
  Radio
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import VerticalNavigation from "./VerticalHeader";

const Test = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [allocatedGroups, setAllocatedGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [error, setError] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      return;
    }

    axiosInstance
      .get(`/user/user/${userId}/`, {
        headers: { Authorization: `JWT ${accessToken}` },
      })
      .then((response) => {
        setUserData(response.data);
        setIsStaff(response.data.is_staff);
        setIsAdmin(response.data.is_superuser);
      })
      .catch(() => setError("Failed to fetch user details"));

    axiosInstance
      .get(`/user/user-group-alloc/user/${userId}/`, {
        headers: { Authorization: `JWT ${accessToken}` },
      })
      .then((response) => setAllocatedGroups(response.data))
      .catch(() => setError("Failed to fetch allocated groups"));

    axiosInstance
      .get(`/atlip/group_portfolio/`, {
        headers: { Authorization: `JWT ${accessToken}` },
      })
      .then((response) => setAllGroups(response.data))
      .catch(() => setError("Failed to fetch all groups"));
  }, [userId, accessToken]);

  const handleAddGroup = async () => {
    if (selectedGroup.length === 0) return;

    try {
      await axiosInstance.post(
        "/user/user-group-alloc/",
        {
          user: userId,
          groups: selectedGroup,
        },
        { headers: { Authorization: `JWT ${accessToken}` } }
      );

      setAllocatedGroups([
        ...allocatedGroups,
        ...selectedGroup.map((groupId) => ({
          id: groupId,
          group_name:
            allGroups.find((g) => g.id === groupId)?.group_name || "Unknown",
        })),
      ]);

      setSuccessMessage("User added successfully!");
      setSelectedGroup([]);
    } catch (error) {
      alert("Failed to allocate groups");
    }
  };

  const handleRemoveGroup = (groupId) => {
    axiosInstance
      .delete(`/user/user-group-alloc/${groupId}/`, {
        headers: { Authorization: `JWT ${accessToken}` },
      })
      .then(() =>
        setAllocatedGroups(allocatedGroups.filter((group) => group.id !== groupId))
      )
      .catch(() => alert("Failed to remove group"));
  };

  const handleToggleStaff = () => {
    axiosInstance
      .patch(
        `/user/user/${userId}/`,
        { is_staff: !isStaff },
        { headers: { Authorization: `JWT ${accessToken}` } }
      )
      .then(() => setIsStaff(!isStaff))
      .catch(() => alert("Failed to update staff status"));
  };

  const handleToggleAdmin = () => {
    axiosInstance
      .patch(
        `/user/user/${userId}/`,
        { is_superuser: !isAdmin },
        { headers: { Authorization: `JWT ${accessToken}` } }
      )
      .then(() => setIsAdmin(!isAdmin))
      .catch(() => alert("Failed to update admin status"));
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex",  minHeight: "100vh", backgroundColor: "#f0f8ff" }}>
      {isMobile && (
        <IconButton
          onClick={() => setShowSidebar(!showSidebar)}
          sx={{ position: "absolute", top: 10, left: 10 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isMobile || showSidebar ? (
        <Box
          sx={{
            width: isMobile ? "60%" : 250,
            flexShrink: 0,
            backgroundColor: "#ffffff",
            position: isMobile ? "absolute" : "static",
            zIndex: 10,
          }}
        >
          <VerticalNavigation />
        </Box>
      ) : null}

      <Box sx={{ flexGrow: 1, p: isMobile ? 2 : 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 2, color: "#4682B4", textAlign: isMobile ? "center" : "left" }}
        >
          Modify User
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: "#d7e3fc" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            User Details
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {userData.username}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {userData.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Permissions
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={isStaff} onChange={handleToggleStaff} />}
            label="Staff Member"
          />
          <FormControlLabel
            control={<Checkbox checked={isAdmin} onChange={handleToggleAdmin} />}
            label="Administrator"
          />
        </Paper>

        {/* Add to Group */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: "#b0c4de" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
            Add to Group
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Search Input */}
            <TextField
              fullWidth
              label="Search Groups"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />

            {/* Dropdown with Radio Buttons */}
            <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 1 }}>
              <Select
                displayEmpty
                value={selectedGroup}
                onChange={(e) => setSelectedGroup([e.target.value])}
                renderValue={(selected) =>
                  selected.length === 0 ? <em>Select a Group</em> : allGroups.find(g => g.id === selected[0])?.group_name
                }
              >
                {allGroups
                  .filter((group) => group.group_name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      <FormControlLabel
                        control={<Radio checked={selectedGroup.includes(group.id)} />}
                        label={group.group_name}
                      />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Add Group Button */}
            <Button variant="contained" color="primary" onClick={handleAddGroup} disabled={selectedGroup.length === 0}>
              Add
            </Button>
          </Box>
        </Paper>


        {/* Group Management */}
        {/* Group Management */}
<Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: "#d7e3fc" }}>
  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Group Management</Typography>


  
  
  {allocatedGroups.length > 0 ? (
    allocatedGroups.map((group, index) => (
      <Box 
        key={group.id} 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", // ✅ Group name left, delete right
          alignItems: "center",
          p: 1.5,
          borderRadius: 1,
          bgcolor: index % 2 === 0 ? "#e3f2fd" : "#bbdefb", // ✅ Alternating shades
        }}
      >
        <Typography variant="body1" fontWeight="500">
          {group.group_name}
        </Typography>
        <IconButton onClick={() => handleRemoveGroup(group.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    ))
  ) : (
    <Typography>No groups allocated</Typography>
  )}
</Paper>
      </Box>
    </Box>
  );
};

export default Test;
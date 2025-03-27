import React, { useState } from 'react';
import { 
  Box, List, ListItem, ListItemText, 
  Accordion, AccordionSummary, AccordionDetails, 
  IconButton, useMediaQuery 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group'; 
import BusinessIcon from '@mui/icons-material/Business'; 
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';

const VerticalNavigation = () => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Check if mobile view

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      sx={{ 
        width: isMobile ? '100%' : 250, 
        backgroundColor: '#f4f4f4', 
        height: isMobile ? 'auto' : '100%', 
        minHeight: "100vh",
        display: 'flex', 
        flexDirection: isMobile ? 'row' : 'column', 
        overflowX: isMobile ? 'auto' : 'hidden', 
        justifyContent: isMobile ? 'space-around' : 'flex-start', 
        padding: 1 
      }}
    >
      <List sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', width: '100%' }}>
        
        {/* Admin Section */}
        <Accordion 
          expanded={expanded === 'admin'} 
          onChange={handleChange('admin')}
          sx={{ width: isMobile ? 'auto' : '100%' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <IconButton>
              <AdminPanelSettingsIcon />
            </IconButton>
            <ListItemText primary="Admin" />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button component={Link} to="/register">
                <IconButton><PersonAddIcon /></IconButton>
                <ListItemText primary="Add User" />
              </ListItem>
              <ListItem button component={Link} to="/admin_dash">
                <IconButton><DashboardIcon /></IconButton>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Search Section */}
        <Accordion 
          expanded={expanded === 'search'} 
          onChange={handleChange('search')}
          sx={{ width: isMobile ? 'auto' : '100%' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <IconButton><SearchIcon /></IconButton>
            <ListItemText primary="Search" />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button component={Link} to="/group-search">
                <IconButton><GroupIcon /></IconButton>
                <ListItemText primary="Group" />
              </ListItem>
              <ListItem button component={Link} to="/owner-search">
                <IconButton><BusinessIcon /></IconButton>
                <ListItemText primary="Owner" />
              </ListItem>
              <ListItem button component={Link} to="/agent-search">
                <IconButton><BusinessIcon /></IconButton>
                <ListItemText primary="Agent" />
              </ListItem>

              <ListItem button component={Link} to="/patent-search">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Patent" />
              </ListItem>

              <ListItem button component={Link} to="/trademark-search">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Trademark" />
              </ListItem>
              
              <ListItem button component={Link} to="/domain-search">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Domain" />
              </ListItem>

              <ListItem button component={Link} to="/design-search">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Design" />
              </ListItem>

            </List>
          </AccordionDetails>
        </Accordion>

        {/* Data Upload Section */}
        <Accordion 
          expanded={expanded === 'dataUpload'} 
          onChange={handleChange('dataUpload')}
          sx={{ width: isMobile ? 'auto' : '100%' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <IconButton><UploadIcon /></IconButton>
            <ListItemText primary="Data Upload" />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button component={Link} to="/group-upload">
                <IconButton><GroupIcon /></IconButton>
                <ListItemText primary="Group" />
              </ListItem>
              <ListItem button component={Link} to="/owner-upload">
                <IconButton><GroupIcon /></IconButton>
                <ListItemText primary="Owner" />
              </ListItem>
              <ListItem button component={Link} to="/agent-upload">
                <IconButton><GroupIcon /></IconButton>
                <ListItemText primary="Agent" />
              </ListItem>
              
              <ListItem button component={Link} to="/patent-upload">
                <IconButton><BusinessIcon /></IconButton>
                <ListItemText primary="Patent" />
              </ListItem>
              <ListItem button component={Link} to="/trademark-upload">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Trademark" />
              </ListItem>
              <ListItem button component={Link} to="/domain-upload">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Domain" />
              </ListItem>
              <ListItem button component={Link} to="/design-upload">
                <IconButton><AccountBalanceWalletIcon /></IconButton>
                <ListItemText primary="Design" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

      </List>
    </Box>
  );
};

export default VerticalNavigation;
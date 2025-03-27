import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// ✅ Responsive Header Component
const Header = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userName = userData ? userData.username : '';

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: '5px 0px 15px #c3c3c3' }}>
            <Toolbar 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    width: '100%', 
                    maxWidth: '1200px', 
                    mx: 'auto', 
                    flexDirection: { xs: 'column', md: 'row' }, // Stacks on mobile
                    textAlign: 'center',
                    p: 2
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <img 
                            src="images/logo.png" 
                            alt="Logo" 
                            style={{ width: '200px', height: '90px', objectFit: 'contain' }} 
                        />
                    </Link>
                </Box>

                {/* User and Logout Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 2, md: 0 } }}>
                    {userName && (
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#274472' }}>
                            Hello, {userName}!
                        </Typography>
                    )}
                    <Link to="/logout" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#274472', fontSize: '18px' }}>
                        Logout
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
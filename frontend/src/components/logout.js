import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Logout() {
	const navigate = useNavigate();
	const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility

	useEffect(() => {
		const performLogout = async () => {
			try {
				// Send a request to blacklist the refresh token
				await axiosInstance.post('user/logout/blacklist/', {
					refresh_token: localStorage.getItem('refresh_token'),
				});
			} catch (error) {
				console.error('Logout error:', error);
			} finally {
				// Clear local storage and remove the authorization header
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_data');
				axiosInstance.defaults.headers['Authorization'] = null;

				// Show the Snackbar
				setOpenSnackbar(true);

				// Redirect to the login page after a delay
				setTimeout(() => {
					navigate('/login');
				}, 3000); // Redirect after 3 seconds
			}
		};

		performLogout();
	}, [navigate]);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<div>
			Logging out...
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000} // Snackbar will close after 3 seconds
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
					You have been logged out successfully.
				</Alert>
			</Snackbar>
		</div>
	);
}
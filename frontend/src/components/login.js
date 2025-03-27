import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../axios';

export default function SignIn() {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                // Store tokens in localStorage
                console.log( res.data.access) ; 
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);

                // Set authorization header for subsequent requests
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');

                // Fetch user profile data
                // Fetch user profile data
                axiosInstance.get('user/userdata/')
                .then((userDataRes) => {
                    // Store user data in localStorage (or context)
                    localStorage.setItem('user_data', JSON.stringify(userDataRes.data));
                    console.log( 'user data : ' , JSON.stringify(userDataRes.data));    
                    // Navigate to home page or another route
                    navigate('/');
                })
                .catch((err) => {
                    console.error('Failed to fetch user data:', err);
                });
                    
            })
            .catch((err) => {
                console.error('Login failed:', err);
            });
    };

    return (
        <div className="login-page">
            {/* Brand Promotion Section */}
            <div className="atlantip-brand">
                <div className="atlantip-brand-name">atlantIP</div>
                <div className="atlantip-brand-name-subtitle">
                    <p>Conseils en Propriété Industrielle</p>
                </div>
                <div className="atlantip-brand-name-desc">
                    <p>
                        Propriété Intellectuelle, Marques, Dessins & Modèles, Brevets,
                        Internet, Noms de domaine, Stratégie, Contrefaçon, Veilles
                        stratégiques, Contrats, Audit et valorisation
                    </p>
                </div>
            </div>

            {/* Login Form Section */}
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    {/* Logo Section */}
                    <div className="logo">
                        <p style={{ textAlign: 'center' }}>
                            <a href="http://www.atlantip.eu/">
                                <img
                                    alt="logo"
                                    src="/images/logo.png"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginTop: '-65px',
                                    }}
                                />
                            </a>
                        </p>
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>

            <style>
                {`
                .login-page {
                    display: flex;
                    height: 100vh;
                    background: #F2F2F2;
                }
                
                .atlantip-brand {
                    width: 50vw;
                    background: #274472;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 2rem;
                }
                
                .atlantip-brand-name {
                    font-family: Roboto, sans-serif;
                    font-weight: bold;
                    font-size: 6vw;
                    text-decoration: underline;
                    text-align: center;
                }
                
                .atlantip-brand-name-subtitle p {
                    font-family: Roboto, sans-serif;
                    font-weight: bold;
                    font-size: 2vw;
                    text-align: center;
                }
                
                .atlantip-brand-name-desc {
                    font-family: Roboto, sans-serif;
                    font-size: 1.2rem;
                    text-align: center;
                    margin-top: 1rem;
                }
                
                .login-form {
                    width: 50vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                }
                
                .login-form form {
                    width: 100%;
                    max-width: 400px;
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                
                .login-form .logo img {
                    width: 100%;
                    height: auto;
                    margin-top: -65px;
                }
                
                .login-form label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: bold;
                }
                
                .login-form input {
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                }
                
                .login-btn {
                    width: 100%;
                    padding: 0.75rem;
                    background: #274472;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 1.2rem;
                    cursor: pointer;
                }
                
                .login-btn:hover {
                    background: #1b2f4a;
                }
                `}
            </style>
        </div>
    );
}
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header /> {/* Header stays at the top */}
            
            {/* Main Content Wrapper - Pushes footer down */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {children}
            </main>

            <Footer /> 
        </div>
    );
};

export default Layout;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register' // Adjust the path to your SignUp component
import Home from './components/home'; // Landing page for home
import Login from './components/login'; // Login function  
import Logout from './components/logout'; // Logout function 
import Layout from './components/Layout'; // Import Layout component
import UserList from './components/userlist'; // Import UserList component
import VerticalNavigation from './components/VerticalHeader'; // Import VerticalNavigation
import GroupPortfolioPage from './components/GroupPortfolioPage';
import ModifyUser  from './components/ModifyUser';
import GroupSearch from './components/GroupSearch';
import Test from './components/test';
import PatentPortfolioPage from './components/PatentPortfolio';
import TrademarkPortfolioPage from './components/TrademarkPortfolio';
import TrademarkSearch  from './components/TrademarkSearch';
import OwnerPortfolioPage from './components/OwnerPortfolio';
import AgentPortfolioPage from './components/AgentPortFolio';
import DomainPortfolioPage  from './components/DomainPortfolio';
import ModelPortfolioPage from './components/ModelPortFolio';
import OwnerSearch from './components/OwnerSearch';
import AgentSearch from './components/AgentSearch';
import PatentSearch from './components/PatentSearch';
import DomainSearch from './components/DomainSearch';
import ModelSearch from './components/ModelSearch';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the SignUp page */}
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the Logout page */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/test" element={<Layout><Test /></Layout>} />
        {/* Test route for VerticalHeader */}
        <Route path="/group-upload" element={<Layout><GroupPortfolioPage /></Layout>} />
        <Route path="/patent-upload" element={<Layout><PatentPortfolioPage /></Layout>} />
        <Route path="/trademark-upload" element={<Layout><TrademarkPortfolioPage /></Layout>} />
        <Route path="/owner-upload" element={<Layout><OwnerPortfolioPage /></Layout>} />
        <Route path="/agent-upload" element={<Layout><AgentPortfolioPage /></Layout>} />
        <Route path="/domain-upload" element={<Layout><DomainPortfolioPage /></Layout>} />
        <Route path="/design-upload" element={<Layout><ModelPortfolioPage /></Layout>} />

        <Route path="/group-search" element={<Layout><GroupSearch /></Layout>} />
        <Route path="/owner-search" element={<Layout><OwnerSearch /></Layout>} />
        <Route path="/agent-search" element={<Layout><AgentSearch /></Layout>} />
        <Route path="/trademark-search" element={<Layout><TrademarkSearch /></Layout>} />
        <Route path="/patent-search" element={<Layout><PatentSearch /></Layout>} />
        <Route path="/design-search" element={<Layout><ModelSearch /></Layout>} />
        <Route path="/domain-search" element={<Layout><DomainSearch /></Layout>} />
        {/* Wrap routes that need the layout (vertical navigation) with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />

        {/* Admin route with Vertical Navigation and User List */}
        {/* Admin route where VerticalNavigation is needed */}
        <Route path="/admin_dash" element={<Layout><UserList /></Layout>} />
        <Route path="/modify-user/:userId" element={<Layout><ModifyUser /></Layout>} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
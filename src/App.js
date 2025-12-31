import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import FarmingHelp from './pages/farmingHelp';
import Payments from './pages/payments';
import Schemes from './pages/schemes';
import AddCrop from './pages/AddCrop';
import PriceHelp from './pages/pricehelp';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/farming-help" element={<FarmingHelp />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/add-crop" element={<AddCrop />} />
                    <Route path="/price-help" element={<PriceHelp />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AuthForm from './components/AuthForm';
import Profile from './pages/Profile'; // Import Profile page
import CreateAccount from './components/CreateAccount'; // Import CreateAccount
import WalletIdCreation from './components/WalletIdCreation'; // Import WalletIdCreation
import './global.css'; // Import the global CSS file

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} /> {/* Add route for Profile */}
          <Route path="/create-account" element={<CreateAccount />} /> {/* Add route for CreateAccount */}
          <Route path="/wallet-id-creation" element={<WalletIdCreation />} /> {/* Add route for WalletIdCreation */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

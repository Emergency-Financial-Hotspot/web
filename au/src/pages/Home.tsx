// src/pages/Home.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import AuthForm from '../components/AuthForm'; // Import AuthForm
import './Home.css'; // Import CSS for home styles

const Home: React.FC = () => {
  const { currentUser, successMessage } = useAuth(); // Get successMessage from context
  const [showAuthForm, setShowAuthForm] = useState(false); // State to control AuthForm visibility

  const handleLogout = () => {
    auth.signOut();
  };

  const toggleAuthForm = () => {
    setShowAuthForm((prev) => !prev); // Toggle the visibility of AuthForm
  };

  return (
    <div className="home-container">
      {/* Logo */}
      <img src="src/pages/icon.png" alt="Logo" className="logo" /> {/* Ensure you update this with your logo path */}

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/services" className="nav-link">Our Services</a>
        <a href="/contact" className="nav-link">Contact Us</a>
        
        {/* Sign In Button */}
        {currentUser ? (
          <div>
            <button onClick={handleLogout} className="sign-in-container">
              Logout
            </button>
          </div>
        ) : (
          <div className="sign-in-container">
            <button onClick={toggleAuthForm} className="sign-in-text">
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Success Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}

      {/* Auth Card */}
      {showAuthForm && (
        <div className={`auth-card ${showAuthForm ? 'show' : ''}`}>
          <AuthForm />
          <button onClick={toggleAuthForm} className="close-button">Close</button>
        </div>
      )}

      {/* Heading and Description */}
      <h1 className="hotspot-title">Emergency Financial Hotspot for Cashless Transactions</h1>
      <div className="feature-description">
        <p>This feature allows people to make peer-to-peer (P2P) cashless payments offline during emergencies or in areas with poor internet. Using Bluetooth, NFC, and mesh networks, users can send money securely without needing internet access. Once the connection is back, all transactions are synced to the cloud using Vultr’s services. This ensures that payments can continue smoothly during crises like natural disasters or in remote areas, helping to make cashless payments accessible to everyone.</p>
      </div>
      
    </div>
    
  );
};

export default Home;

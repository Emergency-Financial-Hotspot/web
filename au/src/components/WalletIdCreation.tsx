// src/components/WalletIdCreation.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get state data
import './WalletIdCreation.css';

const WalletIdCreation: React.FC = () => {
    const location = useLocation(); // Get location object
    const userData = location.state?.userData; // Access user data from state
    const [walletId, setWalletId] = useState<string>('');

    // Function to generate a unique 12-digit wallet ID
    const generateWalletId = () => {
        const uniqueId = `WALLET-${Math.floor(100000 + Math.random() * 900000)}`; // Random 6-digit number
        return uniqueId;
    };

    useEffect(() => {
        const id = generateWalletId();
        setWalletId(id);
    }, []);

    return (
        <div className="wallet-id-container">
            <div className="rectangle-5">
                <div className="rectangle-6">
                    <h1 className="wallet-id-title">Your Wallet ID is Successfully Generated</h1>
                </div>
                {/* Display user name if available */}
                {userData && <p className="user-name">Welcome, {userData.name}!</p>}
                <p className="wallet-id-text">This is your Wallet ID:</p>
                <h2 className="wallet-id">{walletId}</h2>
                <img className="emoji" src="party-popper-emoji-503x512-0vkq9zgo.png" alt="Party Popper" />
                <div className="download-section">
                    <h3 className="download-title">Download APK</h3>
                    <div className="download-icon-container">
                        <img className="download-icon" src="download-icon.png" alt="Download Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletIdCreation;

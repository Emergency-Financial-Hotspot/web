// src/components/CreateAccount.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CreateAccount.css';

const CreateAccount: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation
    const [name, setName] = useState('');
    const [showNotice, setShowNotice] = useState(false);
    const [idType, setIdType] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');

    // Handle name input change and notice display
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setShowNotice(e.target.value.trim() !== '');
    };

    // Handle ID type change
    const handleIdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdType(e.target.value);
        setIdNumber('');
    };

    // Handle payment method selection
    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    // Get UPI placeholder based on selected payment method
    const getUpiPlaceholder = () => {
        switch (selectedPaymentMethod) {
            case 'PhonePe':
                return 'Enter your PhonePe UPI ID';
            case 'Google Pay':
                return 'Enter your Google Pay UPI ID';
            case 'Paytm':
                return 'Enter your Paytm UPI ID';
            case 'PayPal':
                return 'PayPal doesn\'t support UPI';
            default:
                return 'Enter your UPI ID';
        }
    };

    // Handle account creation and success message
    const handleCreateAccount = () => {
        if (name && idType && idNumber && bankAccountNumber) {
            setSuccessMessage('Account created successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            // Navigate to WalletIdCreation with user data
            const userData = {
                name,
                idType,
                idNumber,
                bankAccountNumber,
                paymentMethod: selectedPaymentMethod,
            };
            navigate('/wallet-id-creation', { state: { userData } }); // Update navigation to use navigate
        }
    };

    return (
        <div className="rectangle-5">
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="create-account">
                <h1 className="create-wallet-account">Create Wallet Account</h1>
                <div className="input-frame">
                    <label className="input-label">Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {showNotice && (
                        <p className="notice-text">Notice: Name should match the bank account.</p>
                    )}
                </div>

                <div className="input-frame">
                    <label className="input-label">Enter your ID Type</label>
                    <select className="input-field" value={idType} onChange={handleIdTypeChange}>
                        <option value="" disabled>Select ID Type</option>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="Birth Certificate">Birth Certificate</option>
                        <option value="PAN Card">PAN Card</option>
                    </select>
                </div>

                {idType && (
                    <div className="input-frame">
                        <label className="input-label">Enter the no. for {idType}</label>
                        <input
                            type="text"
                            className="input-field"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                        />
                    </div>
                )}

                <div className="input-frame">
                    <label className="input-label">Enter Bank Account No.</label>
                    <input
                        type="text"
                        className="input-field"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                </div>

                <div className="input-frame">
                    <label className="input-label">Select Payment Method</label>
                    <div className="payment-method-buttons">
                        <button
                            className={`payment-button ${selectedPaymentMethod === 'PhonePe' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodSelect('PhonePe')}
                        >
                            PhonePe
                        </button>
                        <button
                            className={`payment-button ${selectedPaymentMethod === 'Google Pay' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodSelect('Google Pay')}
                        >
                            Google Pay
                        </button>
                        <button
                            className={`payment-button ${selectedPaymentMethod === 'Paytm' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodSelect('Paytm')}
                        >
                            Paytm
                        </button>
                        <button
                            className={`payment-button ${selectedPaymentMethod === 'PayPal' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodSelect('PayPal')}
                        >
                            PayPal
                        </button>
                    </div>
                </div>

                <div className="input-frame">
                    <label className="input-label">Enter your UPI ID</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder={getUpiPlaceholder()}
                        disabled={selectedPaymentMethod === 'PayPal'}
                    />
                </div>

                <div className="terms">
                    <input type="checkbox" className="checkbox" />
                    <span className="terms-text">I agree to the Terms of Service and Privacy Policy</span>
                </div>

                <div className="upload-photo-frame">
                    <span className="upload-photo-text">Upload Your Photo</span>
                    <input type="file" className="upload-photo-input" />
                </div>

                <button className="create-button" onClick={handleCreateAccount}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CreateAccount.css'; // Ensure to create this CSS file for styles

const CreateAccount: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [name, setName] = useState(''); // State to handle the name input
    const [showNotice, setShowNotice] = useState(false); // State to show notice for name field
    const [idType, setIdType] = useState(''); // State for ID type
    const [idNumber, setIdNumber] = useState(''); // State for ID number
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // State for selected payment method

    // Handle name input change and notice display
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setShowNotice(e.target.value.trim() !== '');
    };

    // Handle ID type change
    const handleIdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdType(e.target.value);
        setIdNumber(''); // Reset ID number field when ID type changes
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
                return 'PayPal doesn\'t support UPI'; // Custom message for PayPal
            default:
                return 'Enter your UPI ID';
        }
    };

    // Handle account creation and success message
    const handleCreateAccount = () => {
        if (name && idType && idNumber) {
            setSuccessMessage('Account created successfully!');
            setTimeout(() => {
                setSuccessMessage(''); // Clear message after 3 seconds
                navigate('/wallet-id-creation', { state: { userData: { name, idType, idNumber, selectedPaymentMethod } } }); // Navigate to wallet ID generation page
            }, 3000);
        }
    };

    return (
        <div className="rectangle-5">
            {/* Success message pop-up */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <div className="create-account">
                <h1 className="create-wallet-account">Create Wallet Account</h1>

                {/* Name input */}
                <div className="input-frame">
                    <label className="input-label">Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {showNotice && (
                        <p className="notice-text">
                            Notice: Name should match the bank account.
                        </p>
                    )}
                </div>

                {/* ID Type selection */}
                <div className="input-frame">
                    <label className="input-label">Enter your ID Type</label>
                    <select
                        className="input-field"
                        value={idType}
                        onChange={handleIdTypeChange}
                    >
                        <option value="" disabled>Select ID Type</option>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="Voter ID">Voter ID</option>
                        <option value="Birth Certificate">Birth Certificate</option>
                        <option value="PAN Card">PAN Card</option>
                    </select>
                </div>

                {/* ID Number input (conditional) */}
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

                {/* Bank Account No. input */}
                <div className="input-frame">
                    <label className="input-label">Enter Bank Account No.</label>
                    <input type="text" className="input-field" />
                </div>

                {/* Payment method buttons */}
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

                {/* UPI ID input */}
                <div className="input-frame">
                    <label className="input-label">Enter your UPI ID</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder={getUpiPlaceholder()}
                        disabled={selectedPaymentMethod === 'PayPal'} // Disable for PayPal
                    />
                </div>

                {/* Terms and conditions */}
                <div className="terms">
                    <input type="checkbox" className="checkbox" />
                    <span className="terms-text">
                        I agree to the Terms of Service and Privacy Policy
                    </span>
                </div>

                {/* Upload photo input */}
                <div className="upload-photo-frame">
                    <span className="upload-photo-text">Upload Your Photo</span>
                    <input type="file" className="upload-photo-input" />
                </div>

                {/* Move Create button here */}
                <button className="create-button" onClick={handleCreateAccount}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;

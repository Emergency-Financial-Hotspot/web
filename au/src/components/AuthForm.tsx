// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import the CSS file

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSuccessMessage } = useAuth();
  const navigate = useNavigate();

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if the email format is valid
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Check if email already exists
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          setError('This email is already in use. Please choose a different one.');
          setLoading(false);
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      }
      setSuccessMessage(`Successfully logged ${isLogin ? 'in' : 'up'}!`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate('/profile');
    } catch (err) {
      if (isFirebaseError(err)) {
        const errorMessages: { [key: string]: string } = {
          'auth/user-not-found': 'No user found with this email.',
          'auth/wrong-password': 'Incorrect password.',
          'auth/email-already-in-use': 'This email is already in use.',
        };
        setError(errorMessages[err.code] || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage('Successfully logged in with Google!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      navigate('/profile');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const isFirebaseError = (err: unknown): err is { code: string } => {
    return typeof err === 'object' && err !== null && 'code' in err;
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Sign in' : 'Sign Up'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-frame">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-frame">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          <img src="src/pages/google.png" alt="Google logo" className="google-logo" /> {/* Update the path */}
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;

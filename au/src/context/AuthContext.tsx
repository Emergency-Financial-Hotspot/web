// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextProps {
  currentUser: User | null;
  successMessage: string; // Include successMessage
  setSuccessMessage: (message: string) => void; // Include setSuccessMessage
}

interface AuthProviderProps {
  children: ReactNode; // Define the type for children
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Ensure useAuth is called within an AuthProvider
  }
  return context; // Return the context
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>(''); // State for success message

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, successMessage, setSuccessMessage }}> {/* Provide all values */}
      {children} {/* This accepts and renders the children */}
    </AuthContext.Provider>
  );
};

'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LoginButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth token on component mount
    checkAuthToken();

    // Optional: Recheck the token when cookie changes (requires handling external changes)
    const handleStorageChange = () => {
      checkAuthToken();
    };
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuthToken = () => {
    try {
      const token = Cookies.get('auth_token');
      console.log('Token on mount:', token);
      setIsLoggedIn(!!token); // Convert token to a boolean
    } catch (error) {
      console.error('Error retrieving auth_token:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    Cookies.remove('auth_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <button
      onClick={isLoggedIn ? handleLogout : handleLogin}
      className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
        isLoggedIn
          ? 'text-white bg-red-600 hover:bg-red-700  '
          : 'text-white'
      }`}
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
};

export default LoginButton;
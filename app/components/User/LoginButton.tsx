'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    checkAuthToken();

 
    const handleStorageChange = () => {
      checkAuthToken();
    };
    window.addEventListener('storage', handleStorageChange);

  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuthToken = () => {
    try {
      const token = Cookies.get('auth_token');
      console.log('Token on mount:', token);
      setIsLoggedIn(!!token); 
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
    <div className='flex items-center justify-center'>
       <span className= {` ${ isLoggedIn ? 'block': 'hidden'} px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium`}><Link href={'/admin'}>Dashboard</Link></span>
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
    </div>
  );
};

export default LoginButton;
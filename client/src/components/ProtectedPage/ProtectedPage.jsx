import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedPage = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Verifica se o token expirou
        if (decodedToken.exp < currentTime) {
          navigate('/');
        }

        if (requiredRole && decodedToken.role !== requiredRole) {
          navigate('/access-denied');
        }

      } catch (error) {
        navigate('/');
      }
    }
  }, [navigate, requiredRole]);

  return <>{children}</>;
};

export default ProtectedPage;

/* eslint-disable no-unused-vars */
// tokenHelper.js
import { jwtDecode } from 'jwt-decode';

import axiosInstance from './axiosInstance';

const prepareAuthRequest = async () => {
  try {
    const accessToken = getToken('access');
    const refreshToken = getToken('refresh');

    if (!accessToken && !refreshToken) {
      resetUserAndTokens(); // Only clear tokens, don't dispatch here
      return null;
    }

    if (accessToken && !isExpired(accessToken)) {
      return { headers: { Authorization: `Bearer ${accessToken}` } };
    }

    if (refreshToken && !isExpired(refreshToken)) {
      const success = await refreshTokens(refreshToken);
      if (success) {
        const newAccessToken = getToken('access');
        return { headers: { Authorization: `Bearer ${newAccessToken}` } };
      }
    }

    resetUserAndTokens(); // Only clear tokens
    return null;
  } catch (error) {
    console.error('Auth validation error:', error);
    resetUserAndTokens(); // Only clear tokens
    return null;
  }
};

const saveAuthTokens = (response) => {
    // Extract tokens from response.data.message
    const { accessToken, refreshToken } = response.data.message || {};

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

const resetUserAndTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Helper functions remain the same
function getToken(type) {
  return localStorage.getItem(type === 'access' ? 'accessToken' : 'refreshToken');
}

function isExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
}

async function refreshTokens(refreshToken) {
  try {
    const response = await axiosInstance.post('/users/refresh-token', { refreshToken });
    if (response.status === 200) {
      saveAuthTokens(response);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export { prepareAuthRequest, resetUserAndTokens, saveAuthTokens };
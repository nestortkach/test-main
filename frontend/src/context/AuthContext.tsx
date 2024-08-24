import React, { createContext, useState, useEffect } from 'react';
import axiosBase from '../api/axiosBase';
import axiosAuth from '../api/axiosAuth';
import { message } from 'antd';
import { IUserDataResponce } from '../types/user.types';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    phone: string,
    name: string
  ) => Promise<void>;
  user: IUserDataResponce | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserDataResponce | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const storeUserData = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const res = await axiosAuth.get('/user');
        const data: IUserDataResponce = res.data;

        localStorage.setItem('user', JSON.stringify(data));
        setUser(data); // Оновлюємо стан користувача
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    }
  };

  const register = async (
    email: string,
    password: string,
    phone: string,
    name: string
  ) => {
    try {
      const response = await axiosBase.post('/auth/register', {
        email,
        password,
        phone,
        name,
      });

      if (!response.data || !response.data.accessToken) {
        throw new Error('Registration failed. No access token received.');
      }

      const jwt = response.data.accessToken;
      localStorage.setItem('token', jwt);
      await storeUserData();
    } catch (error) {
      throw new Error()
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosBase.post('/auth/login', { email, password });

      if (!response.data || !response.data.accessToken) {
        throw new Error('Login failed. No access token received.');
      }

      const jwt = response.data.accessToken;
      localStorage.setItem('token', jwt);
      await storeUserData();
    } catch (error) {
     throw new Error()
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    message.success('Logout successful');
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

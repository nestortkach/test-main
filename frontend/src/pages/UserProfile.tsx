import { useEffect, useState } from 'react';
import { IUserDataResponce } from '../types/user.types';
import { Button } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const calculateDaysSinceCreation = (createdAt: string | undefined) => {
  if (!createdAt) return 'Date unknown!!';

  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
};

const UserProfile = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '15px',
          width: '50%',
          height: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>User data:</h1>
        <h3 style={{ fontSize: '1.4rem', marginTop: '20px' }}>
          User name - {user?.name}
        </h3>
        <h3 style={{ fontSize: '1.4rem', marginTop: '20px' }}>
          User email - {user?.email}
        </h3>
        <h3 style={{ fontSize: '1.2rem', marginTop: '20px' }}>
          User phone - {user?.phone}
        </h3>
        <h4 style={{ fontSize: '1.2rem', marginTop: '20px' }}>
          When user was created - {calculateDaysSinceCreation(user?.createdAt)}{' '}
          days ago
        </h4>
        <Button
          onClick={handleSignOut}
          style={{ marginTop: '20px', fontWeight: 'bold' }}
          type="primary"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;

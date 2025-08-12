import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckSquareIcon, LogOutIcon } from 'lucide-react';

export const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-bottom m-2">
      <div className="container py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h1 className="h5 mb-0 fw-bold text-dark">ToDo</h1>
        </div>
        {currentUser && (
          <div className="d-flex align-items-center">
            <span className="text-secondary small me-3">
              Welcome, {currentUser.name}
            </span>
            <button
              onClick={logout}
              className="btn btn-link d-flex align-items-center p-0 text-secondary text-decoration-none"
              style={{ fontSize: '0.9rem' }}
            >
              <LogOutIcon className="me-1" style={{ height: 16, width: 16 }} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

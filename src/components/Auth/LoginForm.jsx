import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="container" style={{ maxWidth: '420px', margin: '3rem auto' }}>
      <h2 className="text-center fw-bold mb-4">
        Log In
      </h2>
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          <p className="mb-0">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="d-grid gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary fw-bold"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const { register, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (password !== confirmPassword) {
      setFormError("Passwords don't match");
      return;
    }
    setIsSubmitting(true);
    await register(name,email, password);
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-center fw-bold mb-4">Register</h2>
      {(error || formError) && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-0">{error || formError}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-3">
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
            autoComplete="new-password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label fw-bold">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary fw-bold"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

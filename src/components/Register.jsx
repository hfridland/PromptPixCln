
import { useState } from 'react';
import { useRegisterMutation } from '../services/authApi';

function Register({ onSuccess, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      onSuccess();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Create User</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={100}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={128}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-control ${
              confirmPassword && !passwordsMatch ? 'is-invalid' : ''
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!passwordsMatch && confirmPassword && (
            <div className="invalid-feedback">
              Passwords do not match
            </div>
          )}
        </div>

        {error && (
          <div className="alert alert-danger">
            {error.status === 409
              ? 'User with this email already exists'
              : 'Registration failed. Please check your data.'}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading || !passwordsMatch}
        >
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      <div className="text-center mt-3">
        Already have an account?{' '}
        <a href="#login" onClick={(e) => {
          e.preventDefault();
          onLogin();
        }}>
          Login
        </a>
      </div>
    </div>
  );
}

export default Register;

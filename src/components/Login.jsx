
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../services/authApi';
import { setCredentials } from '../features/auth/authSlice';

function Login({ onRegister }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginRequest, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginRequest({
        username,
        password,
      }).unwrap();

      dispatch(setCredentials(result));
      setPassword('');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Email or Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div className="alert alert-danger">
            Invalid credentials or server error
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="text-center mt-3">
        Don't have an account?{' '}
        <a href="#register" onClick={(e) => {
          e.preventDefault();
          onRegister();
        }}>
          Create User
        </a>
      </div>      
    </div>
  );
}

export default Login;

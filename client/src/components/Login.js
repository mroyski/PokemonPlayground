import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    try {
      const response = await fetch('/api/auth/login', options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      setErrorMessage(null);
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={login}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loggedIn && <Navigate to="/captured" />}
    </>
  );
};

export default Login;

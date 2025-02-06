import { useState } from 'react';
import { registerUser } from '../api/auth';
import Button from '../components/Button';
import Header from '../components/Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) return;
    const result = await registerUser(username, password);
    console.log(result);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-16 border shadow-md rounded flex flex-col items-center">
          <text className="text-2xl font-bold mb-4">Login or Register</text>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="Username"
            className="p-3 w-96 rounded shadow-md mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            className="p-3 w-96 rounded shadow-md mb-8"
          />
          <Button onClick={handleRegister}>Register</Button>
        </div>
      </div>
    </>
  );
};

export default Login;

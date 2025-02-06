import { useState } from 'react';
import { registerUser } from '../api/auth';
import Button from '../components/Button';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // Get current theme for toastcontainer

  const handleRegister = async () => {
    if (!username || !password) return;
    try {
      const result = await registerUser(username, password);

      if (result.message === 'User registered successfully') {
        toast.success('Registration successful! 🎉');
        setIsDisabled(true); // Disable button on success
      } else if (result === 'Username already exists') {
        toast.error('User already exists! Try a different username.');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" theme={theme} />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-16 border shadow-md rounded flex flex-col items-center">
          <span className="text-2xl font-bold mb-4">Login or Register</span>
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
          <Button onClick={handleRegister} isDisabled={isDisabled}>
            {isDisabled ? 'Registered' : 'Register'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;

import { useContext, useState } from 'react';
import { registerUser, loginUser } from '../api/auth';
import Button from '../components/Button';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { setToken } = useContext(AppContext); // Access setToken from the context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; // Get current theme for toastcontainer
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      toast.error('Must enter a username and password');
      return;
    }
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

  const handleLogin = async () => {
    try {
      const result = await loginUser(username, password);

      if (result.message === 'Login successful') {
        toast.success('You are now logged in!');
        localStorage.setItem('token', result.token); //store JWT token
        setToken(result.token); // Update the token in the context
        localStorage.setItem('showLoginToast', 'true'); //Set a flag for login toast notification on home page
        navigate('/'); //if login is successful redirect user to homepage
      } else {
        toast.error(result.message);
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
        <div className="p-8 md:p-16 border shadow-md rounded flex flex-col items-center">
          <span className="text-2xl font-bold mb-4">Login or Register</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="Username"
            className="p-3 w-64 md:w-96 rounded shadow-md mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            className="p-3 w-64 md:w-96 rounded shadow-md mb-8"
          />
          <div className="flex gap-x-4">
            <Button
              onClick={handleLogin}
              isDisabled={!username || !password}
              variant="large"
            >
              Login
            </Button>
            <Button
              onClick={handleRegister}
              isDisabled={isDisabled}
              variant="large"
            >
              {isDisabled ? 'Registered' : 'Register'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

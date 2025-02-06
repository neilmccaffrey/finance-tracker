import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange); //clean up listener
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token
    setToken(null); //set token to null
  };

  return (
    <header className="w-full fixed top-0 p-2 md:p-6">
      <div className="flex justify-between items-center w-full sm:w-auto md:space-x-96">
        <ThemeToggle />
        <div className="inline-flex gap-x-2 items-center transition-transform duration-200 hover:scale-125">
          <FontAwesomeIcon icon={faUser} />
          {!token ? (
            <Link to="/login">Login/Register</Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

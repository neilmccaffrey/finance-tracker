import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { token, handleLogout } = useContext(AppContext);

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

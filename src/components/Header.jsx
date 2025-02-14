import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { token, handleLogout } = useContext(AppContext);

  return (
    <header className="w-full fixed top-0 p-2 md:p-6">
      <div className="flex justify-between items-center w-full md:space-x-96">
        <ThemeToggle />
        <div>
          <div className="inline-flex gap-x-2 items-center transition-transform duration-200 hover:scale-125 mr-4">
            <FontAwesomeIcon icon={faHome} />
            <Link to="/">Home</Link>
          </div>
          <div className="inline-flex gap-x-2 items-center transition-transform duration-200 hover:scale-125 mr-4">
            <FontAwesomeIcon icon={faUser} />
            {!token ? (
              <Link to="/login">Login/Register</Link>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

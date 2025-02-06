import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="w-full fixed top-0 p-2 md:p-6">
      <div className="flex justify-between items-center w-full sm:w-auto md:space-x-96">
        <ThemeToggle />
        <div className="inline-block transition-transform duration-200 hover:scale-125">
          <FontAwesomeIcon icon={faUser} />
          <Link to="/login" className="p-3">
            Login/Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

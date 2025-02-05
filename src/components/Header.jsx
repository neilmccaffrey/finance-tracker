import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full fixed top-0 p-2 md:p-4">
      <div className="flex justify-between items-center w-full sm:w-auto md:space-x-96">
        <ThemeToggle />
        <h1>Destructo-disc</h1>
      </div>
    </header>
  );
};

export default Header;

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded primary shadow-md hover:bg-blue-300`}
    >
      {children}
    </button>
  );
};

export default Button;

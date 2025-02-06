const Button = ({ onClick, children, isDisabled }) => {
  return (
    <button
      onClick={!isDisabled ? onClick : undefined}
      className={`w-32 py-2 rounded primary shadow-md 
        hover:bg-blue-300 
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;

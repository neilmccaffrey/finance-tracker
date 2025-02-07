const Button = ({ onClick, children, isDisabled, variant }) => {
  return (
    <button
      onClick={!isDisabled ? onClick : undefined}
      className={` rounded primary shadow-md 
        hover:bg-blue-300
        ${variant === 'large' ? 'w-32 py-2' : ''} 
        ${variant === 'small' ? 'w-16' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;

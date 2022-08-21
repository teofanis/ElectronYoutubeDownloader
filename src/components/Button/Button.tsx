/* eslint-disable react/button-has-type */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  className,
  type,
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`
       rounded-lg
     bg-gray-300
      hover:bg-gray-100
       font-semibold py-2 px-4 inline-flex items-center cursor-pointer
       transition duration-500 ease-in-out transform hover:-translate-y-1 focus:outline-none
       focus:shadow-outline
       focus:ring-2
       ring-offset-current ring-offset-2
      ring-gray-700
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

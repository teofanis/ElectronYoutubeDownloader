type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  name,
  id,
  placeholder,
  onChange,
  className,
  value,
}: TextInputProps) => {
  return (
    <input
      id={id}
      type="text"
      name={name}
      placeholder={placeholder}
      className={`
      text-black flex-1
              placeholder-gray-800
              px-4 py-2.5 mt-2
              text-base transition duration-500 ease-in-out transform border-transparent rounded-lg
             bg-gray-300
              focus:border-blueGray-500
              focus:bg-gray-100
              focus:outline-none
              focus:shadow-outline
              focus:ring-2
    ring-gray-700
              ring-offset-current ring-offset-2
              ${className}
      `}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;

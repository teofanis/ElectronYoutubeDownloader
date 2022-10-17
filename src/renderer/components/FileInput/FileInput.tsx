import React from 'react';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errored?: boolean;
  onClick: () => void;
}
const FileInput = ({
  id,
  className,
  label,
  name,
  onChange,
  onClick,
  errored,
  value,
}: FileInputProps) => {
  return (
    <div
      className={`text-black flex-1
              placeholder-gray-800
              mt-2
              text-base transition duration-500 ease-in-out transform border-transparent rounded-lg
              focus:border-blueGray-500
              bg-gray-300
              focus:bg-gray-100
              focus:outline-none
              focus:shadow-outline
              focus:ring-2
            ring-gray-700
              ring-offset-current ring-offset-2
              ${
                errored
                  ? 'border-red-500 right-2 outline-red-600 shadow-outline-red-500 '
                  : ''
              }
              ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="
          bg-gray-400
          hover:bg-gray-300
          py-2.5
          rounded-lg px-4 z-10
          text-base
        text-black
          border
          border-blueGray-500
          font-semibold
          "
      >
        {label}
      </button>
      {Boolean(value) && <span className="pl-2">{value}</span>}
      <input
        type="hidden"
        name={name}
        id={id}
        onChange={onChange}
        style={{ display: 'none' }}
        value={value}
      />
    </div>
  );
};
FileInput.defaultProps = {
  errored: false,
};
export default FileInput;

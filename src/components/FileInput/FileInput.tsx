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

//  return (
//    <label htmlFor="fileUpload" className="block bg-white rounded-lg flex-1">
//      <span className="sr-only">{label}</span>
//      <input
//        ref={ref}
//        id={id}
//        type="file"
//        name={name}
//        onClick={onClick}
//        className={`block
//                 w-full
//                 text-base text-gray-800
//                 file:mr-4
//                 cursor-pointer
//                 file:cursor-pointer
//                 file:py-2.5 file:px-4
//                 file:rounded-lg
//                 border-blueGray-500
//                 file:border-0
//                 file:text-base
//                 file:hover:bg-gray-100
//                 file:font-semibold
//                 file:bg-gray-300
//                 file:text-gray-800
//                 hover:file:bg-blueGray-500
//                 focus:outline-none
//                 focus:shadow-outline
//                 focus:ring-2
//                 ring-offset-current ring-offset-2
//               ring-gray-700
//                 transition duration-500 ease-in-out transform border-transparent rounded-lg
//                  ${
//                    errored
//                      ? 'border-red-500 right-2 outline-red-600 shadow-outline-red-500 '
//                      : ''
//                  }
//                 ${className}
//              `}
//        onChange={onChange}
//      />
//    </label>
//  );

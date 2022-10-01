interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errored?: boolean;
}

const FileInput = ({
  id,
  className,
  label,
  name,
  onChange,
  onClick,
  errored,
}: FileInputProps) => {
  return (
    <label htmlFor="fileUpload" className="block bg-white rounded-lg flex-1">
      <span className="sr-only">{label}</span>
      <input
        id={id}
        type="file"
        name={name}
        onClick={onClick}
        className={`block
                  w-full
                  text-base text-gray-800
                  file:mr-4
                  cursor-pointer
                  file:cursor-pointer
                  file:py-2.5 file:px-4
                  file:rounded-lg
                  border-blueGray-500
                  file:border-0
                  file:text-base
                  file:hover:bg-gray-100
                  file:font-semibold
                  file:bg-gray-300
                  file:text-gray-800
                  hover:file:bg-blueGray-500
                  focus:outline-none
                  focus:shadow-outline
                  focus:ring-2
                  ring-offset-current ring-offset-2
                ring-gray-700
                  transition duration-500 ease-in-out transform border-transparent rounded-lg
                   ${
                     errored
                       ? 'border-red-500 right-2 outline-red-600 shadow-outline-red-500 '
                       : ''
                   }
                  ${className}
               `}
        onChange={onChange}
      />
    </label>
  );
};

FileInput.defaultProps = {
  errored: false,
};
export default FileInput;

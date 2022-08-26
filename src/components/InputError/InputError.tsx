interface InputErrorProps {
  error?: string;
}

const InputError = ({ error }: InputErrorProps) => {
  if (!error) return null;
  return <span className="text-red-500 w-full text-base mt-2">{error}</span>;
};

InputError.defaultProps = {
  error: undefined,
};

export default InputError;

import { Button } from 'renderer/components';

const DownloadIcon = () => (
  <svg
    className="w-4 h-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
  </svg>
);

interface DownloadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const DownloadButton = ({ onClick, disabled, text }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-gray-300
      hover:bg-gray-100"
    >
      <DownloadIcon />
      <span>{text}</span>
    </Button>
  );
};

export default DownloadButton;

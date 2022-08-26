import { Button } from 'components';

interface CancelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const CancelButton = ({ text, onClick, disabled }: CancelButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-primary-red text-white
      hover:bg-red-400"
    >
      <span>{text}</span>
    </Button>
  );
};

export default CancelButton;

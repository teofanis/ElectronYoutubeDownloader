interface ProgressBarProps {
  progress: number | string;
  text?: string;
  hidePercentage?: boolean;
}

const ProgressBar = ({ progress, text, hidePercentage }: ProgressBarProps) => {
  return (
    <div className="w-full relative bg-gray-200 rounded-md h-6 dark:bg-gray-700 overflow-hidden">
      <div
        className="absolute order-last top-0 h-6 rounded-md animate-gradient-x bg-gradient-to-r from-pink-500 via-orange-400 to-primary-red "
        // style={{ width: `50%` }}
        style={{ width: hidePercentage ? `0%` : `${progress}%` }}
      />
      <span className="absolute left-1 mix-blend-difference  text-white whitespace-nowrap text-ellipsis overflow-hidden">
        {text}
      </span>
      {!hidePercentage && (
        <span className="absolute right-1 mix-blend-difference text-white">
          {progress}%
        </span>
      )}
    </div>
  );
};

ProgressBar.defaultProps = {
  text: '',
  hidePercentage: false,
};

export default ProgressBar;

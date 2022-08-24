interface ProgressBarProps {
  progress: number;
  text?: string;
}

const ProgressBar = ({ progress, text }: ProgressBarProps) => {
  return (
    <div className="w-full relative bg-gray-200 rounded-md h-6 dark:bg-gray-700 mt-10">
      <div
        className="absolute order-last top-0 h-6 rounded-md animate-gradient-x bg-gradient-to-r from-pink-500 via-orange-400 to-primary-red"
        // style={{ width: `50%` }}
        style={{ width: `${progress}%` }}
      />
      <span className="absolute left-1 mix-blend-difference text-white">
        {text}
      </span>
      <span className="absolute right-1 mix-blend-difference text-white">
        {progress}%
      </span>
    </div>
  );
};

ProgressBar.defaultProps = {
  text: '',
};

export default ProgressBar;

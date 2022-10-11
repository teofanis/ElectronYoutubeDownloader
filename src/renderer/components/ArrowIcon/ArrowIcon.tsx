interface ArrowIconProps {
  type: 'left' | 'right';
}

const LeftArrow = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const RightArrow = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowIcon = ({ type }: ArrowIconProps) => {
  switch (type) {
    case 'left':
      return <LeftArrow />;
    case 'right':
      return <RightArrow />;
    default:
      return null;
  }
};

export default ArrowIcon;

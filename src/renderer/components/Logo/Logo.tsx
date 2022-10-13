/* eslint-disable react/require-default-props */
import PropTypes, { InferProps } from 'prop-types';
import icon from '../../../../assets/icon.png';

const LogoPropTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
type LogoProps = InferProps<typeof LogoPropTypes> &
  React.HTMLAttributes<HTMLImageElement> & {
    width?: string | number | undefined;
    height?: string | number | undefined;
  };

const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <img
      className={`max-w-[300px] ${className}`}
      src={icon}
      alt="Logo"
      width={width}
      height={height}
    />
  );
};

export default Logo;

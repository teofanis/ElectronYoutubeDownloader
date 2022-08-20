interface LogoProps {
  children: React.ReactNode;
}

const Logo = ({ children }: LogoProps) => {
  return <div>{children}</div>;
};

export default Logo;

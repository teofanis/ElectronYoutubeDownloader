// eslint-disable-next-line react/prop-types

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div className="flex flex-wrap w-full">{children}</div>;
};

export default Layout;

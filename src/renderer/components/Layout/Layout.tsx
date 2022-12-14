// eslint-disable-next-line react/prop-types

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-wrap w-full bg-primary-black overflow-x-hidden">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;

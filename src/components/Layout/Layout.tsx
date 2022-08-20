// eslint-disable-next-line react/prop-types

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-wrap w-full h-[100vh] bg-primary-black">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;

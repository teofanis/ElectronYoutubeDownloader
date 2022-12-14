import { Downloader, Heading, Layout, Logo } from 'renderer/components';

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col mt-[10%]">
        <div className="flex items-center justify-center space-x-4">
          <Logo className="h-[125px]" />
          <Heading>Youtube Downloader</Heading>
        </div>

        <Downloader />
      </div>
    </Layout>
  );
};

export default Home;

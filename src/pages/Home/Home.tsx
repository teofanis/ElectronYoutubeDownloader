import { Heading, Layout } from 'components';
import icon from '../../../assets/icon.png';

const Home = () => {
  return (
    <Layout>
      <img className="max-w-[300px]" src={icon} alt="Logo" />
      <Heading>Youtube Downloader</Heading>
    </Layout>
  );
};

export default Home;

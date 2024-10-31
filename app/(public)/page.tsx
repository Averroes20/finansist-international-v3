import AboutUs from '@/components/AboutUs';
import Careers from '@/components/Careers';
import Feedback from '@/components/Feedback';
import Intro from '@/components/Intro';
import LatestNews from '@/components/LatestNews';
import Portfolio from '@/components/Portfolio';
import Profile from '@/components/Profile';
import Services from '@/components/Services';
import dynamic from 'next/dynamic';

const ButtonContact = dynamic(() => import('@/components/common/ButtonContact'));

const Home = () => {
  return (
    <div className="px-5 md:px-0">
      <Intro />
      <Profile />
      <AboutUs />
      <Services />
      <Portfolio />
      <Feedback />
      <LatestNews />
      <Careers />
      <ButtonContact className="fixed bottom-5 right-5 md:hidden" />
    </div>
  );
};

export default Home;

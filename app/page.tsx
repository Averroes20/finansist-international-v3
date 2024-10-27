import AboutUs from '@/components/AboutUs';
import Careers from '@/components/Careers';
import Feedback from '@/components/Feedback';
import { Whatsapp } from '@/components/icons/social-media';
import Intro from '@/components/Intro';
import LatestNews from '@/components/LatestNews';
import Portfolio from '@/components/Portfolio';
import Profile from '@/components/Profile';
import Services from '@/components/Services';
import { Button } from '@/components/ui/button';

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
      <Button className="px-4 py-2 fixed bottom-5 right-5 md:hidden items-center text-sm self-start bg-green-500 text-white hover:bg-green-600 rounded-full">
        <Whatsapp />
        Consult With Us
      </Button>
    </div>
  );
};

export default Home;

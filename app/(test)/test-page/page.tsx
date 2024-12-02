import dynamic from 'next/dynamic';
const LottieAnimation = dynamic(() => import('../components/LottieAnimation'), {
  ssr: false,
});

const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js with Lottie Web</h1>
      <LottieAnimation animationPath="/animate/profit.json" />
    </div>
  );
};

export default App;

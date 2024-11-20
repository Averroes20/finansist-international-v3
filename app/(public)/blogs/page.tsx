import dynamic from 'next/dynamic';

const Blog = dynamic(() => import('./Blog'));

export const metadata = {
  title: 'Blogs | Finansist International',
  description: 'Blog of Finansist International',
};

const Blogs = () => {
  return (
    <main className="px-5 min-h-screen">
      <Blog />
    </main>
  );
};

export default Blogs;

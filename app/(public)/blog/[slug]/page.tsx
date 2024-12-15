import { auth } from '@/auth';
import { getBlog } from '@/lib/action/blog';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const DetailBlog = dynamic(() => import('./DetailBlog'));

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const blog = await getBlog(params.slug);
  if (!blog) return {};
  const title = blog.title ? blog.title : 'Blogs | Finansist International';
  const desc = blog.resume ? blog.resume : 'Discover more about our blogs at Finansist International.';
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      type: 'website',
      locale: 'en_US',
      url: `https://finansist-international-beta.vercel.app/blog/${params.slug}`,
      siteName: 'Finansist International',
      images: [
        {
          url: blog.cover,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

const Detail = async ({ params }: Props) => {
  const blog = await getBlog(params.slug);
  const session = await auth();

  return <DetailBlog data={blog} session={session} />;
};

export default Detail;

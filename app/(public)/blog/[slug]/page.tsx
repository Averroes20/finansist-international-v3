import { auth } from '@/auth';
import { DOMAIN_WEB } from '@/constants/env';
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
  // const keywords = blog.keywords ? blog.keywords.join(', ') : 'finance, blogs, Finansist International';
  const author = blog.author ? blog.author : 'Finansist International';

  return {
    metadataBase: new URL(DOMAIN_WEB as string),
    title: title,
    description: desc,
    // keywords: keywords,
    authors: [{ name: author }],
    openGraph: {
      title: title,
      description: desc,
      type: 'article',
      locale: 'en_US',
      url: `${DOMAIN_WEB}/blog/${params.slug}`,
      siteName: 'Finansist International',
      images: [
        {
          url: `${blog.cover}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
      images: [`${blog.cover}`],
    },
  };
};

const Detail = async ({ params }: Props) => {
  const blog = await getBlog(params.slug);
  const session = await auth();

  return <DetailBlog data={blog} session={session} />;
};

export default Detail;

import React from 'react';
import { Metadata } from 'next';

type Props = {
  params: {
    id: number;
  };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  return {
    title: `Blog Detail ${params.id}`,
  };
};

const DetailBlog = ({ params }: Props) => {
  return <div>DetailBlog id {params.id}</div>;
};

export default DetailBlog;

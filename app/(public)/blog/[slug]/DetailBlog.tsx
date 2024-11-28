'use client';
import { createComment } from '@/action/comment';
import ActionDelete from '@/components/common/ActionDelete';
import CommentForm from '@/components/common/CommentForm';
import { BlogWithComments } from '@/lib/type/blog';
import { CommentType } from '@/lib/validation/schema-form-comment';
import { formatDate, formatDateTime, formatTime } from '@/utils/format-date';
import createDOMPurify from 'dompurify';
import { CalendarDaysIcon, CircleUser, Clock, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import SkeletonLoading from './loading';

type Props = {
  data: BlogWithComments;
};
const DetailBlog: React.FC<Props> = ({ data }) => {
  const [cleanHTML, setCleanHTML] = useState('');

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    setCleanHTML(DOMPurify.sanitize(data.article));
  }, [data.article]);

  const handleSubmit = useCallback(
    async (formData: CommentType) => {
      try {
        await createComment({ ...formData, blogId: data?.id });
        alert('Comment created successfully');
      } catch (error) {
        alert(`Failed to create comment: ${error instanceof Error && error.message}`);
      }
    },
    [data?.id]
  );

  if (!data) {
    return <SkeletonLoading />;
  }

  return (
    <main className="px-5 min-h-[90vh] max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl py-6">{data.title}</h1>
      <div className="flex flex-wrap gap-7 border-y border-dashed border-gray-400 p-2">
        <span className="flex gap-2 items-center">
          <CircleUser size={18} className="text-gray-600" />
          <p className="text-sm text-gray-600">{data.author}</p>
        </span>
        <span className="flex gap-2 items-center">
          <CalendarDaysIcon size={18} className="text-gray-600" />
          <p className="text-sm text-gray-600">{data.createdAt && formatDate(data.createdAt.toLocaleString())}</p>
        </span>
        <span className="flex gap-2 items-center">
          <Clock size={18} className="text-gray-600" />
          <p className="text-sm text-gray-600">{data.createdAt && formatTime(data.createdAt.toLocaleString())}</p>
        </span>
        <span className="flex gap-2 items-center">
          <MessageCircleMore size={18} className="text-gray-600" />
          <p className="text-sm text-gray-600">{data.sumComments > 0 ? `${data.sumComments} comments` : 'No comments'}</p>
        </span>
      </div>
      <div>
        {(data.cover || data.title) && <Image src={data.cover} alt={data.title} width={640} height={640} className="w-full object-cover mt-4" />}
      </div>
      <article dangerouslySetInnerHTML={{ __html: cleanHTML }} className="py-5 prose prose-lg max-w-full" />
      <div className="mt-10 py-5">
        <div className="space-y-3">
          <p className="text-2xl">Leave a Reply</p>
          <p>
            Your email address will not be published. Required fields are marked <span className="text-destructive">*</span>
          </p>
        </div>
        <CommentForm onSubmit={handleSubmit} />
        <div className="space-y-2">
          {data.comments &&
            data.comments.map((comment) => (
              <div key={comment.id} className="border p-4 rounded-md space-y-2">
                <div className="flex flex-col space-y-1 md:flex-row md:justify-between md:items-center md:space-x-3">
                  <b>{comment.name}</b>
                  <p className="text-sm md:text-xs text-gray-600">{formatDateTime(comment.createdAt.toLocaleString())}</p>
                </div>
                <div className="flex justify-between items-end">
                  <p className="md:px-5">{comment.content}</p>
                  <span className="w-5 h-5">
                    <ActionDelete
                      title="Delete"
                      description="Are you sure you want to delete this comment?"
                      onClick={() => {
                        console.log(comment.id);
                      }}
                    />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default DetailBlog;

'use client';
import ActionDelete from '@/components/common/ActionDelete';
import CommentForm from '@/components/comment/CommentForm';
import { createComment, deleteComment } from '@/lib/action/comment';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
};
const DetailBlog: React.FC<Props> = ({ data, session }) => {
  const [cleanHTML, setCleanHTML] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    setCleanHTML(DOMPurify.sanitize(data.article));
  }, [data.article]);

  const handleSubmit = useCallback(
    async (formData: CommentType) => {
      'server only';
      try {
        setIsLoading(true);
        const form = new FormData();
        const payload = {
          name: formData.name,
          email: formData.email,
          content: formData.comment,
          blog_id: data.id,
        };
        form.append('payload', JSON.stringify(payload));
        await createComment(form, data?.slug);
        alert('Comment created successfully');
      } catch (error) {
        alert(`Failed to create comment: ${error instanceof Error && error.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [data?.id, data?.slug]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      'server only';
      try {
        await deleteComment(id, data.slug);
        alert('Comment deleted successfully');
      } catch (error) {
        alert(`Failed to delete comment: ${error instanceof Error && error.message}`);
      }
    },
    [data.slug]
  );

  if (!data) {
    return <SkeletonLoading />;
  }

  return (
    <main className="px-5 min-h-[90vh] max-w-4xl mx-auto pt-20">
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
        <CommentForm onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="space-y-2">
          {data.comments?.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-md space-y-2">
              <div className="flex flex-col space-y-1 md:flex-row md:justify-between md:items-center md:space-x-3">
                <b>{comment.name}</b>
                <p className="text-sm md:text-xs text-gray-600">{formatDateTime(comment.createdAt.toLocaleString())}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="md:px-5">{comment.content}</p>
                {session && (
                  <span className="w-5 h-5">
                    <ActionDelete
                      title="Delete"
                      description="Are you sure you want to delete this comment?"
                      onClick={() => handleDelete(comment.id)}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DetailBlog;

'use client';
import { createReview, deleteReview, fetchReviews, updateReview } from '@/action/review';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Review } from '@/lib/type/review';
import { ReviewType } from '@/lib/validation/schema-form-review';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));
const ReviewForm = dynamic(() => import('@/components/common/ReviewForm'));

const PageReview = () => {
  const [review, setReview] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewId, setReviewId] = useState<number | null>(null);

  const fetchReview = useCallback(async () => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(title && { title }),
    }).toString();
    const response = await fetchReviews(query);
    setReview(response.data);
    setTotalPages(response.meta.totalPages);
  }, [page, limit, title]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteReview(id);
        fetchReview();
      } catch (error) {
        console.error(error);
        alert(`Failed to delete review: ${error instanceof Error && error.message}`);
      }
    },
    [fetchReview]
  );

  const handleAdd = useCallback(
    async (data: ReviewType) => {
      try {
        await createReview(data);
        fetchReview();
      } catch (error) {
        console.error(error);
        alert(`Failed to create review: ${error instanceof Error && error.message}`);
      }
    },
    [fetchReview]
  );

  const handleEdit = useCallback(
    async (data: ReviewType) => {
      if (!reviewId) return;
      try {
        await updateReview(reviewId, data);
        fetchReview();
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to edit review: ${error instanceof Error && error.message}`);
      }
    },
    [fetchReview, reviewId]
  );

  return (
    <>
      <div className="space-y-4">
        <h2 className="tracking-tight first:mt-0 text-3xl font-bold">Portfolio</h2>
        <p className="text-gray-500">Welcome to your portfolio</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Input placeholder="Search..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <ReviewForm onSubmit={handleAdd} title="Add" description="Add a new review" trigger={<Button className="">Add Review</Button>} />
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="min-w-[250px]">Name</TableHead>
              <TableHead className="min-w-[150px]">Company</TableHead>
              <TableHead className="min-w-[200px]">Review</TableHead>
            </TableRow>
          </TableHeader>
          {review.length > 0 ? (
            review.map((item, index) => (
              <TableBody key={item.id}>
                <TableRow className="hover:bg-gray-100 border-b-2 items-center border-slate-900">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.review}</TableCell>
                  <TableCell>
                    <div className="flex gap-3 self-center">
                      <ReviewForm
                        onSubmit={handleEdit}
                        data={{
                          name: item.name,
                          company: item.company,
                          review: item.review,
                        }}
                        title="Edit"
                        description="Edit portfolio details"
                        trigger={<PenBox className="cursor-pointer" size={20} onClick={() => setReviewId(item.id)} />}
                      />
                      <ActionDelete title="Delete" description="Are you sure you want to delete this review?" onClick={() => handleDelete(item.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center font-bold text-gray-500 text-md">
                  No blog found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex justify-between items-center my-4">
        <Button disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
          Next
        </Button>
      </div>
    </>
  );
};

export default PageReview;

'use client';
import HeaderAdmin from '@/components/common/HeaderAdmin';
import PaginationComponent from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { createReview, deleteReview, getReviews, updateReview } from '@/lib/action/review';
import { Review } from '@/lib/type/review';
import { ReviewType } from '@/lib/validation/schema-form-review';
import { PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

const ActionDelete = dynamic(() => import('@/components/common/ActionDelete'));
const ReviewForm = dynamic(() => import('@/components/review/ReviewForm'));

const limit = 10;
const PageReview = () => {
  const [review, setReview] = useState<Review[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
  });
  const [company, setCompany] = useState('');
  const [reviewId, setReviewId] = useState<number | null>(null);
  const queryCompany = useDebounce(company, 500);

  const fetchReview = useCallback(async () => {
    const {
      data,
      meta: { totalPages },
    } = await getReviews({ page: meta.page, limit, companyName: queryCompany });
    setReview(data);
    setMeta({ page: meta.page, totalPages: totalPages ?? 1 });
  }, [meta.page, queryCompany]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handleAdd = useCallback(async (data: ReviewType) => {
    try {
      await createReview(data);
    } catch (error) {
      console.error(error);
      alert(`Failed to create review: ${error instanceof Error && error.message}`);
    }
  }, []);

  const handleEdit = useCallback(
    async (data: ReviewType) => {
      if (!reviewId) return;
      try {
        await updateReview(reviewId, data);
      } catch (error) {
        console.error(error instanceof Error && error.message);
        alert(`Failed to edit review: ${error instanceof Error && error.message}`);
      }
    },
    [reviewId]
  );

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteReview(id);
    } catch (error) {
      console.error(error);
      alert(`Failed to delete review: ${error instanceof Error && error.message}`);
    }
  }, []);
  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <HeaderAdmin title="Reviews" description="Manage reviews" />
      <div className="flex flex-col md:flex-row gap-4 my-7">
        <Input placeholder="Search..." value={company} onChange={(e) => setCompany(e.target.value)} />
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
      <PaginationComponent meta={meta} handlePageChange={handlePageChange} />
    </>
  );
};

export default PageReview;

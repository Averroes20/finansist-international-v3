export interface Review {
  id: number;
  name: string;
  company: string;
  review: string;
  country: string;
}

export interface ReviewListResponse {
  data: Review[];
  meta: {
    page: number;
    limit: number | null;
    totalPages: number | null;
    totalCount: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserListResponse {
  data: User[];
  meta: {
    page: number;
    limit: number | null;
    totalPages: number | null;
    totalCount: number;
  };
}

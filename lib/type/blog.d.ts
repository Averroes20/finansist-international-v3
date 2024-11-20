import { Comment } from './comment';

export interface Blog {
  id: number;
  title: string;
  resume: string;
  article: string;
  author: string;
  category: string;
  cover: string;
  slug: string;
  sumComments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogListResponse {
  data: Blog[];
  meta: BlogMeta;
  message?: string;
}
export interface BlogMeta {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

type BlogWithComments = {
  comments: Comment[];
} & Blog;

export interface BlogResponse {
  data: BlogWithComments;
  message?: string;
}

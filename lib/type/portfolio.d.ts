export interface Portfolio {
  id: number;
  software: string | null;
  country: string;
  description: string;
  companyName: string;
  companyLogo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioListResponse {
  data: Portfolio[];
  meta: {
    page: number;
    limit: number;
    totalPages: number | null;
    totalCount: number;
  };
}

export interface Portfolio {
  id: number;
  software?: string;
  country: string;
  description: string;
  companyName: string;
  companyLogo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioListResponse {
  data: Portfolio[];
  meta: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
  };
}

import { PortfolioListResponse } from '@/lib/type/portfolio';
import { PortfolioType } from '@/lib/validation/schema-form-portfolio';

export const createPortfolio = async (data: PortfolioType) => {
  const formData = new FormData();
  formData.append('companyName', data.companyName);
  formData.append('country', data.country);
  formData.append('description', data.description);

  if (data.software) {
    formData.append('software', data.software as unknown as string);
  }

  if (data.companyLogo) {
    formData.append('companyLogo', data.companyLogo);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create portfolio');
  }

  return response.json();
};

export const updatePortfolio = async (id: number, data: PortfolioType) => {
  const formData = new FormData();
  formData.append('companyName', data.companyName);
  formData.append('country', data.country);
  formData.append('description', data.description);

  if (data.software) {
    formData.append('software', data.software as unknown as string);
  }

  if (data.companyLogo) {
    formData.append('companyLogo', data.companyLogo);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update portfolio');
  }

  return response.json();
};

export const deletePortfolio = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete portfolio');
  }
};

export const fetchPortfolios = async (query: string): Promise<PortfolioListResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio?${query}`, {
    cache: 'no-cache',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch portfolios');
  }
  const data = await response.json();
  return data;
};

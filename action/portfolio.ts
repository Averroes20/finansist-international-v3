'server only';
import { PortfolioListResponse } from '@/lib/type/portfolio';
import { PortfolioType } from '@/lib/validation/schema-form-portfolio';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL is missing');
}

const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Request Error: ${error}`);
    throw error;
  }
};

const createFormData = (data: PortfolioType): FormData => {
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

  return formData;
};

export const createPortfolio = async (data: PortfolioType) => {
  const formData = createFormData(data);
  return await apiRequest(`${API_BASE_URL}/api/portfolio`, {
    method: 'POST',
    body: formData,
  });
};

export const updatePortfolio = async (id: number, data: PortfolioType) => {
  const formData = createFormData(data);
  return await apiRequest(`${API_BASE_URL}/api/portfolio/${id}`, {
    method: 'PUT',
    body: formData,
  });
};

export const deletePortfolio = async (id: number) => {
  await apiRequest(`${API_BASE_URL}/api/portfolio/${id}`, {
    method: 'DELETE',
  });
};

export const fetchPortfolios = async (query: string): Promise<PortfolioListResponse> => {
  return await apiRequest(`${API_BASE_URL}/api/portfolio?${query}`, {
    cache: 'no-cache',
  });
};

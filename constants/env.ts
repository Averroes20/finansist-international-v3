const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL is missing');
}

export default API_BASE_URL;

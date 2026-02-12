export interface PriceService {
  id: number;
  code: string;
  sort: number;
  fee: number;
  annual_fee: number;
  is_discount: boolean;
  payment_type: 'MONTHLY' | 'ONE_TIME' | 'CUSTOM';
}

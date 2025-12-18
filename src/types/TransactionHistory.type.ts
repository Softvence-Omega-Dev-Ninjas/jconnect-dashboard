interface SellerInfo {
  full_name: string;
  email: string;
  id: string;
}
export interface Payment {
  id: string;
  orderCode: string;
  amount: number;
  seller_amount: number;
  PlatfromRevinue: number;
  stripeFee: number;
  status: string;
  createdAt: string;
  seller: SellerInfo;
}

export interface DisplayPayment {
  id: string;
  orderCode: string;
  amount: number;
  netSeller: number;
  PlatfromRevinue: number;
  status: string;
  date: string;
  sellerUsername: string;
}
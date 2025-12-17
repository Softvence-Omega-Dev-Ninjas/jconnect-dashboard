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


export interface TransactionSeller {
  id: string;
  full_name: string;
  email: string;
  profilePhoto: string | null;
  phone: string;
  is_terms_agreed: boolean;
  withdrawn_amount: number;
}


export interface TransactionDetailsData {
  id: string;
  orderCode: string;
  amount: number;
  seller_amount: number;
  PlatfromRevinue: number;
  stripeFee: number;
  status: "RELEASED" | "PENDING" | "IN_PROGRESS" | "CANCELLED" | "PROCESSING";
  buyerId: string;
  sessionId: string | null;
  sellerId: string;
  sellerIdStripe: string | null;
  serviceId: string;
  paymentIntentId: string | null;
  buyerPay: number;
  platformFee: number;
  platformFee_percents: number;
  deliveryDate: string | null;
  createdAt: string;
  updatedAt: string;
  isReleased: boolean;
  releasedAt: string | null;
  proofUrl: string[];
  proofSubmittedAt: string;
  seller: TransactionSeller;
}


export interface TransactionDetailsResponse {
  success: boolean;
  message: string;
  data: TransactionDetailsData;
}
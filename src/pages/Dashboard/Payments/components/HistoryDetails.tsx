import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  ExternalLink,
  DollarSign,
  CreditCard,
  Receipt,
  Mail,
  Phone,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingCart,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import StatusBadge from "@/components/Shared/StatusBadge/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTransactionDetailsQuery } from "@/redux/features/payment/paymentApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isLoading, error } = useGetTransactionDetailsQuery(id);
  const transaction = data?.data;

  const openImage = (imageUrl: string, index: number) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (transaction?.proofUrl && currentImageIndex < transaction.proofUrl.length - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(transaction.proofUrl[nextIndex]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      const prevIndex = currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(transaction?.proofUrl?.[prevIndex] || null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50/50">
        <LoadingSpinner />
      </div>
    );

  if (error || !transaction)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-500">
        <Receipt className="w-16 h-16 mb-4 opacity-20" />
        <h2 className="text-xl font-bold">Transaction Not Found!</h2>
        <Button variant="link" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );

  const STATUS_COLOR_MAP = {
    RELEASED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formattedDate = formatDate(transaction.createdAt);
  const formattedUpdatedDate = formatDate(transaction.updatedAt);
  const formattedProofDate = formatDate(transaction.proofSubmittedAt);
  const formattedDeliveryDate = formatDate(transaction.deliveryDate);
  const formattedReleasedDate = formatDate(transaction.releasedAt);

  // Get data from backend response
  const buyerServicePrice = transaction.buyer?.servicePrice || transaction.amount || 0;
  const buyerPlatformFeePlus = transaction.buyer?.platformFeePlus || 0;
  const buyerPays = transaction.buyer?.buyerPays || transaction.buyerPay || 0;
  const buyerStripeFee = transaction.buyer?.stripeFee || 0;
  const buyerServicePriceMinus = transaction.buyer?.servicePriceMinus || buyerServicePrice;
  const buyerPlatformRevenue = transaction.buyer?.platformRevenue || 0;

  const sellerServicePrice = transaction.seller?.servicePrice || transaction.amount || 0;
  const sellerPlatformFee = transaction.seller?.platformFee || transaction.platformFee || 0;
  const sellerAmount = transaction.seller?.sellerAmount || transaction.seller_amount || 0;
  const sellerPlatformRevenue = transaction.seller?.platformRevenue || sellerPlatformFee;

  const platformFeePercent = transaction.platformFee_percents || 0;

  // Total platform revenue
  const totalRevenue = buyerPlatformRevenue + sellerPlatformRevenue;

  // Calculate total revenue percentage based on service price
  const totalRevenuePercentage = buyerServicePrice > 0
    ? ((totalRevenue / buyerServicePrice) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-gray-50/30 pb-12">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-red-600 transition-all group w-fit"
          >
            <div className="p-2 rounded-full group-hover:bg-red-50 mr-2 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to History</span>
          </button>

          <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Status
            </span>
            <StatusBadge
              status={transaction.status}
              colorMap={STATUS_COLOR_MAP}
              fallbackColor="bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {/* Order Details - Full Width */}
        <div className="flex flex-col gap-6">
          {/* Order Primary Card */}
          <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-xl shadow-gray-200/50 rounded-3xl">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-gray-800">
                      Order Details
                    </CardTitle>
                    <p className="text-gray-400 text-sm font-medium">
                      Manage and view order specifics
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2 rounded-xl border border-dashed border-gray-200">
                  <span className="text-xs block text-gray-400 font-bold uppercase">
                    Order Code
                  </span>
                  <span className="font-mono font-bold text-red-600">
                    {transaction.orderCode}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
              <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <CreditCard className="w-3 h-3 mr-2" /> Transaction ID
                </div>
                <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                  {transaction.id}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3 mr-2" /> Created Date
                </div>
                <p className="font-bold text-gray-800 text-sm">{formattedDate}</p>
              </div>

              {transaction.paymentIntentId && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <CreditCard className="w-3 h-3 mr-2" /> Payment Intent ID
                  </div>
                  <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                    {transaction.paymentIntentId}
                  </p>
                </div>
              )}

              {transaction.serviceId && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Package className="w-3 h-3 mr-2" /> Service ID
                  </div>
                  <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                    {transaction.serviceId}
                  </p>
                </div>
              )}

              {transaction.buyerId && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <User className="w-3 h-3 mr-2" /> Buyer ID
                  </div>
                  <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                    {transaction.buyerId}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <Clock className="w-3 h-3 mr-2" /> Last Updated
                </div>
                <p className="font-bold text-gray-800 text-sm">{formattedUpdatedDate}</p>
              </div>

              {transaction.proofSubmittedAt && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3 mr-2" /> Proof Submitted
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{formattedProofDate}</p>
                </div>
              )}

              {transaction.deliveryDate && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Package className="w-3 h-3 mr-2" /> Delivery Date
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{formattedDeliveryDate}</p>
                </div>
              )}

              {transaction.releasedAt && (
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3 mr-2" /> Released Date
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{formattedReleasedDate}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2 h-fit">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3 mr-2" /> Release Status
                </div>
                <div className="flex items-center gap-2">
                  {transaction.isReleased ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Released
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-500" />
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        Not Released
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proof Section */}
          <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg font-bold flex items-center text-gray-700">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" />
                Submission Proof
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {transaction.proofUrl && transaction.proofUrl.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {transaction.proofUrl.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => openImage(url, index)}
                      className="group relative block aspect-square rounded-2xl overflow-hidden border-4 border-gray-50 hover:border-red-100 transition-all shadow-sm cursor-pointer"
                    >
                      <img
                        src={url}
                        alt="Proof"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="text-white w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 italic">No proof submitted yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Buyer and Seller Information - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buyer Information Card */}
          {transaction.buyer && (
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-blue-700">
                  <ShoppingCart className="w-5 h-5" />
                  Buyer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  {transaction.buyer.profilePhoto ? (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-blue-100">
                      <img
                        src={transaction.buyer.profilePhoto}
                        alt={transaction.buyer.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-100">
                      <User className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-gray-900 leading-tight truncate">
                      {transaction.buyer.full_name || "N/A"}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{transaction.buyer.email || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-3 bg-gray-50 p-3 sm:p-4 rounded-xl text-xs sm:text-sm">
                  {transaction.buyer.phone && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Phone:</span>
                      </div>
                      <span className="font-bold text-gray-700 truncate">{transaction.buyer.phone}</span>
                    </div>
                  )}
                  {transaction.buyer.email && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Email:</span>
                      </div>
                      <span className="font-medium text-gray-700 truncate text-xs">{transaction.buyer.email}</span>
                    </div>
                  )}
                  {transaction.buyer.id && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-500">Buyer ID:</span>
                      <span className="font-mono text-xs text-gray-600 truncate">{transaction.buyer.id}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-500">Total Payout:</span>
                    <span className="font-bold text-green-600">
                      ${((transaction.buyer.withdrawn_amount || 0) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-500">Terms Agreed:</span>
                    {transaction.buyer.is_terms_agreed ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        Yes
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        No
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Buyer Revenue Calculation */}
                <div className="pt-4 border-t border-gray-200 space-y-3 bg-blue-50/30 p-4 rounded-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                    Revenue from Buyer
                  </div>
                  {buyerServicePrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Service Price:</span>
                      <span className="font-bold text-gray-800">${(buyerServicePrice / 100).toFixed(2)}</span>
                    </div>
                  )}
                  {platformFeePercent > 0 && buyerPlatformFeePlus > 0 && (
                    <>
                      <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-sm">Platform Fee:</span>
                          <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                            {platformFeePercent}%
                          </span>
                        </div>
                        <span className="font-bold text-blue-600">+${(buyerPlatformFeePlus / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                        <span className="text-gray-700 text-sm font-semibold">Total Buyer Pays:</span>
                        <span className="font-bold text-blue-700">${(buyerPays / 100).toFixed(2)}</span>
                      </div>
                      {transaction.status === "RELEASED" && buyerStripeFee > 0 && (
                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                          <span className="text-gray-600 text-sm">Stripe Fee:</span>
                          <span className="font-bold text-red-600">-${(buyerStripeFee / 100).toFixed(2)}</span>
                        </div>
                      )}
                      {transaction.status === "RELEASED" && buyerServicePriceMinus > 0 && (
                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                          <span className="text-gray-700 text-sm font-semibold">Service Price (After Stripe Fee):</span>
                          <span className="font-bold text-blue-700">${(buyerServicePriceMinus / 100).toFixed(2)}</span>
                        </div>
                      )}
                      {buyerPlatformRevenue > 0 && (
                        <div className="flex justify-between items-center pt-2 border-t-2 border-blue-300">
                          <span className="text-blue-700 text-sm font-bold">Platform Revenue:</span>
                          <span className="font-bold text-emerald-600">+${(buyerPlatformRevenue / 100).toFixed(2)}</span>
                        </div>
                      )}
                    </>
                  )}
                  {platformFeePercent === 0 && (
                    <div className="text-center py-2 text-gray-500 text-sm">No platform fee from buyer</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seller Information Card */}
          <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
            <CardHeader className="bg-red-50/50 border-b border-red-100">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-red-700">
                <User className="w-5 h-5" />
                Seller Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-3 sm:gap-4">
                {transaction.seller?.profilePhoto ? (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-100">
                    <img
                      src={transaction.seller.profilePhoto}
                      alt={transaction.seller.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-100">
                    <User className="text-red-600 w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 leading-tight truncate">
                    {transaction.seller?.full_name || "N/A"}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{transaction.seller?.email || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3 bg-gray-50 p-3 sm:p-4 rounded-xl text-xs sm:text-sm">
                {transaction.seller?.phone && (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Phone:</span>
                    </div>
                    <span className="font-bold text-gray-700 truncate">{transaction.seller.phone}</span>
                  </div>
                )}
                {transaction.seller?.email && (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Email:</span>
                    </div>
                    <span className="font-medium text-gray-700 truncate text-xs">{transaction.seller.email}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-500">Total Payout:</span>
                  <span className="font-bold text-green-600">
                    ${((transaction.seller?.withdrawn_amount || 0) / 100).toFixed(2)}
                  </span>
                </div>
                {transaction.seller?.id && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-500">Seller ID:</span>
                    <span className="font-mono text-xs text-gray-600 truncate">{transaction.seller.id}</span>
                  </div>
                )}
                {transaction.sellerIdStripe && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-500">Stripe ID:</span>
                    <span className="font-mono text-xs text-gray-600 truncate">{transaction.sellerIdStripe}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-500">Terms Agreed:</span>
                  {transaction.seller?.is_terms_agreed ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      Yes
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                      No
                    </Badge>
                  )}
                </div>
              </div>

              {/* Seller Revenue Calculation */}
              <div className="pt-4 border-t border-gray-200 space-y-3 bg-red-50/30 p-4 rounded-xl">
                <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
                  Revenue from Seller
                </div>
                {sellerServicePrice > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Service Price:</span>
                    <span className="font-bold text-gray-800">${(sellerServicePrice / 100).toFixed(2)}</span>
                  </div>
                )}
                {platformFeePercent > 0 && sellerPlatformFee > 0 && (
                  <>
                    <div className="flex justify-between items-center pt-2 border-t border-red-200">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm">Platform Fee:</span>
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          {platformFeePercent}%
                        </span>
                      </div>
                      <span className="font-bold text-red-600">-${(sellerPlatformFee / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-red-200">
                      <span className="text-gray-700 text-sm font-semibold">Seller Receives:</span>
                      <span className="font-bold text-red-700">${(sellerAmount / 100).toFixed(2)}</span>
                    </div>
                    {sellerPlatformRevenue > 0 && (
                      <div className="flex justify-between items-center pt-2 border-t-2 border-red-300">
                        <span className="text-red-700 text-sm font-bold">Platform Revenue:</span>
                        <span className="font-bold text-emerald-600">+${(sellerPlatformRevenue / 100).toFixed(2)}</span>
                      </div>
                    )}
                  </>
                )}
                {sellerPlatformFee === 0 && (
                  <div className="text-center py-2 text-gray-500 text-sm">No platform fee from seller</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Total Client Revenue Summary */}
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-linear-to-br from-gray-900 to-gray-800 text-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                    Client Total Revenue
                  </p>
                  <p className="text-4xl font-black">${(totalRevenue / 100).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Revenue from Buyer:</span>
                  <span className="font-bold text-blue-400">${(buyerPlatformRevenue / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Revenue from Seller:</span>
                  <span className="font-bold text-red-400">${(sellerPlatformRevenue / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-emerald-400 text-sm font-semibold">Total Revenue:</span>
                  <span className="text-emerald-400 text-lg font-bold">${(totalRevenue / 100).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {totalRevenuePercentage}% of service price (${(buyerServicePrice / 100).toFixed(2)})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Modal */}
      {selectedImage && transaction?.proofUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {transaction.proofUrl.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={currentImageIndex === 0}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={currentImageIndex === transaction.proofUrl.length - 1}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <div
            className="max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt={`Proof ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {transaction.proofUrl.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {transaction.proofUrl.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryDetails;
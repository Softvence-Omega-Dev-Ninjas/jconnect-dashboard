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
} from "lucide-react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import StatusBadge from "@/components/Shared/StatusBadge/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTransactionDetailsQuery } from "@/redux/features/payment/paymentApi";
import { Button } from "@/components/ui/button";

const HistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTransactionDetailsQuery(id);
  const transaction = data?.data;

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

  const formattedDate = new Date(transaction.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE: Main Info (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Order Primary Card */}
            <Card className="overflow-hidden border-none shadow-xl shadow-gray-200/50 rounded-3xl">
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

              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <CreditCard className="w-3 h-3 mr-2" /> Transaction ID
                  </div>
                  <p className="font-mono text-xs text-gray-600 break-all leading-relaxed">
                    {transaction.id}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2">
                  <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3 mr-2" /> Date & Time
                  </div>
                  <p className="font-bold text-gray-800">{formattedDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Proof Section */}
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white ">
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
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative block aspect-square rounded-2xl overflow-hidden border-4 border-gray-50 hover:border-red-100 transition-all shadow-sm"
                      >
                        <img
                          src={url}
                          alt="Proof"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="text-white w-6 h-6" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 italic">
                      No proof submitted yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE: Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Financial Summary Card */}
            <Card className="border-none shadow-2xl rounded-3xl bg-gray-900 text-white overflow-hidden">
              <div className="p-6 space-y-6 relative">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl" />

                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Finance Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      Gross Amount
                    </span>
                    <span className="font-bold text-lg">
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center group">
                    <div className="flex items-center text-gray-400 group-hover:text-gray-300">
                      <span className="mr-2">Platform Fee</span>
                      <span className="text-[10px] bg-red-900/50 text-red-400 px-2 py-0.5 rounded-full border border-red-800/50">
                        {transaction.platformFee_percents}%
                      </span>
                    </div>
                    <span className="text-red-400 font-medium">
                      -${transaction.PlatfromRevinue.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center group">
                    <span className="text-gray-400 group-hover:text-gray-300">
                      Stripe Processing
                    </span>
                    <span className="text-red-400 font-medium">
                      -${transaction.stripeFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-1">
                          Net Earnings
                        </p>
                        <p className="text-4xl font-black">
                          ${transaction.seller_amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Seller Contact Card */}
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-100">
                    <User className="text-red-600 w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">
                      {transaction.seller.full_name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {transaction.seller.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-xl text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-bold text-gray-700">
                      {transaction.seller.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Payout:</span>
                    <span className="font-bold text-green-600">
                      ${transaction.seller.withdrawn_amount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;

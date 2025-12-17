// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Calendar, User,FileText, CheckCircle2, ExternalLink } from "lucide-react";
// // import { useGetTransactionDetailsQuery } from "@/redux/features/payment/paymentApi";
// import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
// import StatusBadge from "@/components/Shared/StatusBadge/StatusBadge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const HistoryDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   console.log(id)

// //   const { data, isLoading, error } = useGetTransactionDetailsQuery(id);
//   const transaction = data?.data;

//   if (isLoading) return <div className="flex h-screen items-center justify-center"><LoadingSpinner /></div>;
//   if (error || !transaction) return <div className="text-center py-20 text-red-500 font-bold">Transaction Not Found!</div>;

//   const STATUS_COLOR_MAP = {
//     RELEASED: "bg-green-100 text-green-700 border-green-200",
//     PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
//     IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
//     CANCELLED: "bg-red-100 text-red-700 border-red-200",
//   };

//   const formattedDate = new Date(transaction.createdAt).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
//       {/* Header with Back Button */}
//       <div className="flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           <span className="font-medium">Back to History</span>
//         </button>
//         <div className="flex gap-2">
//             <StatusBadge status={transaction.status} colorMap={STATUS_COLOR_MAP} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* Left Side: Order & Payment Info */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="shadow-sm border-none bg-white">
//             <CardHeader className="border-b pb-4">
//               <div className="flex justify-between items-center">
//                 <CardTitle className="text-xl font-bold flex items-center">
//                   <FileText className="w-5 h-5 mr-2 text-red-600" />
//                   Order Information
//                 </CardTitle>
//                 <span className="text-sm text-gray-500 font-mono">#{transaction.orderCode}</span>
//               </div>
//             </CardHeader>
//             <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-1">
//                 <p className="text-sm text-gray-500">Transaction ID</p>
//                 <p className="font-medium text-xs break-all text-gray-800">{transaction.id}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-sm text-gray-500">Creation Date</p>
//                 <div className="flex items-center font-medium">
//                   <Calendar className="w-4 h-4 mr-2 text-gray-400" />
//                   {formattedDate}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Proof of Work / Attachment */}
//           <Card className="shadow-sm border-none bg-white">
//             <CardHeader className="border-b pb-4">
//               <CardTitle className="text-lg font-bold flex items-center">
//                 <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
//                 Proof of Delivery
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               {transaction.proofUrl && transaction.proofUrl.length > 0 ? (
//                 <div className="flex flex-wrap gap-4">
//                    {transaction.proofUrl.map((url, index) => (
//                       <a key={index} href={url} target="_blank" rel="noreferrer" className="group relative">
//                         <img
//                           src={url}
//                           alt="Proof"
//                           className="w-32 h-32 object-cover rounded-lg border-2 border-gray-100 group-hover:opacity-75 transition"
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                            <ExternalLink className="text-white w-6 h-6" />
//                         </div>
//                       </a>
//                    ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400 italic">No proof submitted yet.</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side: Seller & Summary */}
//         <div className="space-y-6">
//           {/* Summary Card */}
//           <Card className="shadow-md border-none bg-red-600 text-white">
//             <CardHeader>
//               <CardTitle className="text-lg">Financial Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between border-b border-red-500 pb-2">
//                 <span>Total Amount</span>
//                 <span className="font-bold">${transaction.amount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between border-b border-red-500 pb-2">
//                 <span>Platform Revenue</span>
//                 <span>-${transaction.PlatfromRevinue.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between border-b border-red-500 pb-2 text-red-100 text-sm">
//                 <span>Stripe Fee</span>
//                 <span>-${transaction.stripeFee.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between pt-2 text-xl font-bold">
//                 <span>Net Seller</span>
//                 <span>${transaction.seller_amount.toFixed(2)}</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Seller Card */}
//           <Card className="shadow-sm border-none bg-white">
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg font-bold">Seller Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-red-600">
//                    {transaction.seller.profilePhoto ? (
//                      <img src={transaction.seller.profilePhoto} className="rounded-full" />
//                    ) : (
//                      <User className="w-6 h-6" />
//                    )}
//                 </div>
//                 <div>
//                   <p className="font-bold text-gray-800">{transaction.seller.full_name}</p>
//                   <p className="text-xs text-gray-500">{transaction.seller.email}</p>
//                 </div>
//               </div>
//               <div className="text-sm pt-2 space-y-2">
//                  <div className="flex justify-between">
//                     <span className="text-gray-500">Phone:</span>
//                     <span className="font-medium">{transaction.seller.phone}</span>
//                  </div>
//                  <div className="flex justify-between">
//                     <span className="text-gray-500">Withdrawn:</span>
//                     <span className="font-medium text-green-600">${transaction.seller.withdrawn_amount}</span>
//                  </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default HistoryDetails;

import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  ExternalLink,
  DollarSign,
  ShieldCheck,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATIC_DATA = {
  id: "3816b1f4-233d-4bc0-a85f-a191279d0605",
  orderCode: "ORD-1765922410821",
  amount: 5000,
  seller_amount: 4500,
  PlatfromRevinue: 400,
  stripeFee: 100,
  status: "RELEASED",
  createdAt: "2025-12-16T22:00:10.823Z",
  proofUrl: [
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
  ],
  seller: {
    full_name: "John Artist",
    email: "john@example.com",
    phone: "+8801712345678",
    withdrawn_amount: 0,
  },
};

const HistoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const data = STATIC_DATA;

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b pb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="hover:bg-red-50 text-gray-600 hover:text-red-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Status:</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
            {data.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info Card */}
          <Card className="border-none shadow-sm bg-linear-to-tr from-white to-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Hash className="w-5 h-5 mr-2 text-red-600" />
                Transaction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                  Order Code
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {data.orderCode}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                  Created At
                </p>
                <div className="flex items-center text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-red-400" />
                  {formattedDate}
                </div>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider">
                  Transaction ID
                </p>
                <p className="text-sm font-mono bg-white p-2 border rounded text-gray-600">
                  {data.id}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Proof Section */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" />
                Proof of Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-gray-200 p-2">
                <img
                  src={data.proofUrl[0]}
                  alt="Proof"
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={data.proofUrl[0]}
                    target="_blank"
                    className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center shadow-lg"
                  >
                    View Full Image <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Financials & Seller */}
        <div className="space-y-6">
          {/* Financial Breakdown Card */}
          <Card className="border-none shadow-xl bg-gray-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-white/70 text-sm uppercase tracking-widest font-bold">
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="flex justify-between items-center text-gray-400">
                <span>Total Budget</span>
                <span className="text-white font-semibold">
                  ${data.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Platform Fee</span>
                <span className="text-red-400">
                  -${data.PlatfromRevinue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-400 text-xs italic">
                <span>Payment Gateway (Stripe)</span>
                <span>-${data.stripeFee.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-xs text-green-400 font-bold uppercase">
                    Seller Receives
                  </p>
                  <p className="text-3xl font-black">
                    ${data.seller_amount.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500 mb-1" />
              </div>
            </CardContent>
          </Card>

          {/* Seller Contact Card */}
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <div className="h-2 bg-red-600" />
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-100">
                  <User className="text-red-600 w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">
                    {data.seller.full_name}
                  </h4>
                  <p className="text-xs text-gray-500">{data.seller.email}</p>
                </div>
              </div>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-bold text-gray-700">
                    {data.seller.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Payout:</span>
                  <span className="font-bold text-green-600">
                    ${data.seller.withdrawn_amount}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-red-100 text-red-600 hover:bg-red-50 font-bold"
              >
                Contact Seller
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;

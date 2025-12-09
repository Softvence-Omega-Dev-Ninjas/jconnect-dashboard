import { useParams, useNavigate } from "react-router-dom";
import { X, Image as ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Separator } from "@/components/ui/separator";


const DisputeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCloseCase = () => {
    console.log("Closing case:", id);
    navigate("/disputes");
  };

  const handleProceedAdjustment = () => {
    console.log("Processing adjustment");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mt-10">
        <PageHeading title="Dispute " />
        <button
          onClick={handleCloseCase}
          className="px-4 py-2 btn-primary text-sm font-medium rounded flex items-center gap-2"
        >
          <span>Close Case</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className=" bg-white rounded-2xl py-5">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Original Complaint */}
          <div className="">
            <h2 className="text-xl font-bold mb-4 text-center">
              Original Complaint
            </h2>

            <div className="p-2 md:p-6 rounded-2xl border space-y-2 mb-6 font-medium">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer</span>
                <span className="font-medium">@djnovax</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seller</span>
                <span className="font-medium">@djkinseki</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Case ID</span>
                <span className="font-medium">Disp#1088</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium">#DJCX29381</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-gray-600">Issue Type</span>
                <span className="font-medium">Promotion Not Posted</span>
              </div>
              <Separator className="my-5"/>
              <div>
                <h3 className="font-bold text-xl mb-2">Customer Statements</h3>
                <p className=" font-medium leading-relaxed">
                  Hi, I booked a shoutout for my new track under Order
                  #DJCX29381. The post wasn't published on your profile within
                  the agreed time. I've checked your page but couldn't find the
                  promotion. Please let me know if there's been a delay or
                  process a refund.
                </p>
              </div>
            </div>
          </div>

          {/* Financial Adjustment */}
          <div className="">
            <h2 className="text-xl font-bold mb-4 text-center">
              Financial Adjustment
            </h2>

            <div className="p-2 md:p-6 rounded-2xl border space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">
                    Adjustment Type
                  </label>
                  <Select defaultValue="full-refund">
                    <SelectTrigger className="rounded-md w-full p-5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-refund">Full Refund</SelectItem>
                      <SelectItem value="partial-refund">
                        Partial Refund
                      </SelectItem>
                      <SelectItem value="no-refund">No Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block font-medium mb-2">Amount</label>
                  <input
                    type="text"
                    defaultValue="$0.00"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                </div>
              </div>

              <Separator className="my-6"/>

              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">Total Order Cost: $50.00</span>
                <button
                  onClick={handleProceedAdjustment}
                  className="px-6 py-2 btn-primary text-sm font-medium rounded"
                >
                  Proceed Adjustment
                </button>
              </div>
            </div>
          </div>

          {/* Evidence Attachments */}
          <div className="">
            <h2 className="text-xl font-bold mb-4 text-center">
              Evidence Attachments
            </h2>

            <div className="p-2 md:p-6 rounded-2xl border">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeView;

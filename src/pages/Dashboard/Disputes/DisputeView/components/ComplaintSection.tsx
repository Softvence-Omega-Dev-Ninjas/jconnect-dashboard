import { Separator } from "@/components/ui/separator";
import { DisputeResponse } from "@/redux/features/disputes/disputesApi";

interface ComplaintSectionProps {
  dispute: DisputeResponse;
}

const ComplaintSection = ({ dispute }: ComplaintSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Original Complaint</h2>
      <div className="p-2 md:p-6 rounded-2xl border space-y-2 mb-6 font-medium">
        <div className="flex justify-between">
          <span className="text-gray-600">Customer</span>
          <span className="font-medium">{dispute.user.full_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Email</span>
          <span className="font-medium">{dispute.user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone</span>
          <span className="font-medium">{dispute.user.phone || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Case ID</span>
          <span className="font-medium">{dispute.order.orderCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Order ID</span>
          <span className="font-medium">{dispute.order.orderCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span className="font-medium">{dispute.status}</span>
        </div>
        <Separator className="my-5" />
        <div>
          <h3 className="font-bold text-xl mb-2">Customer Statements</h3>
          <p className="font-medium leading-relaxed">{dispute.description}</p>
        </div>
        {dispute.resolution && (
          <div>
            <h3 className="font-bold text-xl mb-2">Resolution</h3>
            <p className="font-medium leading-relaxed">{dispute.resolution}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintSection;

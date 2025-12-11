import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { useGetDisputeByIdQuery } from "@/redux/features/disputes/disputesApi";
import ComplaintSection from "./components/ComplaintSection";
import FinancialAdjustment from "./components/FinancialAdjustment";
import EvidenceAttachments from "./components/EvidenceAttachments";

const DisputeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: dispute, isLoading, error } = useGetDisputeByIdQuery(id!);

  const handleCloseCase = () => {
    console.log("Closing case:", id);
    navigate("/disputes");
  };

  const handleProceedAdjustment = () => {
    console.log("Processing adjustment");
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error || !dispute)
    return <div className="p-6">Error loading dispute</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mt-10">
        <PageHeading title="Dispute" />
        <button
          onClick={handleCloseCase}
          className="px-4 py-2 btn-primary text-xl font-medium rounded flex items-center gap-2 hover:cursor-pointer"
        >
          <span>Close Case</span>
          <X className="w-5 h-5 border rounded-full" />
        </button>
      </div>

      <div className="bg-white rounded-2xl py-5">
        <div className="space-y-6 max-w-4xl mx-auto">
          <ComplaintSection dispute={dispute} />
          <FinancialAdjustment
            orderAmount={dispute.order.amount}
            onProceedAdjustment={handleProceedAdjustment}
          />
          <EvidenceAttachments proofs={dispute.proofs} />
        </div>
      </div>
    </div>
  );
};

export default DisputeView;

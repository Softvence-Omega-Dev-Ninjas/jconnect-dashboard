/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { X, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import {
  useGetDisputeByIdQuery,
  useUpdateDisputeStatusMutation,
} from "@/redux/features/disputes/disputesApi";
import ComplaintSection from "./components/ComplaintSection";
import EvidenceAttachments from "./components/EvidenceAttachments";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import ApiErrorMessage from "@/components/Shared/ApiErrorMessage/ApiErrorMessage";

const DisputeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: dispute,
    isLoading,
    isError,
  } = useGetDisputeByIdQuery(id as string);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateDisputeStatusMutation();

  const handleAction = async (newStatus: "RESOLVED" | "REJECTED") => {
    const amount = dispute?.order?.amount ?? 0;
    const resolution =
      newStatus === "RESOLVED"
        ? `Refund of ৳${amount} has been processed to buyer`
        : "The dispute has been rejected after review.";

    if (window.confirm(`Are you sure you want to ${newStatus} this case?`)) {
      try {
        await updateStatus({
          id: id as string,
          status: newStatus,
          resolution,
        }).unwrap();

        alert(`Case successfully ${newStatus.toLowerCase()}!`);
        if (newStatus === "REJECTED") navigate("/disputes");
      } catch (err: any) {
        console.error("Update Error:", err);
        if (err?.status === 401) {
          alert("Your session expired. Please login again.");
        } else {
          alert(`Failed: ${err?.data?.message || "Unknown error occurred"}`);
        }
      }
    }
  };

  if (isLoading)
    return (
      <LoadingSpinner/>
    );
  if (isError || !dispute)
    return (
      <ApiErrorMessage  fallbackMessage="Dispute not"/>
    );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-10 gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/disputes")}
            className="p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <PageHeading title={`Case: ${dispute.order?.orderCode ?? "N/A"}`} />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleAction("RESOLVED")}
            disabled={isUpdating || dispute.status !== "UNDER_REVIEW"}
            className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-emerald-700 disabled:bg-gray-200"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isUpdating ? "Resolving..." : "Resolve"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleAction("REJECTED")}
            disabled={isUpdating || dispute.status !== "UNDER_REVIEW"}
            className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-red-700 disabled:bg-gray-200"
          >
            <X className="w-4 h-4" />
            <span>{isUpdating ? "Closing..." : "Case Close"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div
          className={`p-4 text-center text-sm font-bold border-b ${
            dispute.status === "REJECTED"
              ? "bg-red-50 text-red-600"
              : dispute.status === "RESOLVED"
              ? "bg-green-50 text-green-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          <AlertCircle className="w-4 h-4 inline-block mr-1" />
          Status: {dispute.status.replace("_", " ")}
        </div>

        <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">
          <ComplaintSection dispute={dispute} />
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Evidence Documents
            </h3>
            <EvidenceAttachments proofs={dispute.proofs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeView;

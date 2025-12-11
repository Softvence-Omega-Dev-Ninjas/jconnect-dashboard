import { Image as ImageIcon } from "lucide-react";

interface EvidenceAttachmentsProps {
  proofs: string[];
}

const EvidenceAttachments = ({ proofs }: EvidenceAttachmentsProps) => {
  return (
    <div className="p-2 md:p-6 rounded-2xl border">
      <h2 className="text-xl md:text-3xl font-bold mb-7 text-center">
        Evidence Attachments
      </h2>
      {proofs && proofs.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {proofs.map((proof, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <img
                src={proof}
                alt={`Evidence ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No evidence attachments available
        </div>
      )}
    </div>
  );
};

export default EvidenceAttachments;

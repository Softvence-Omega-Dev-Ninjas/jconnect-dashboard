import React from "react";
import { ArrowLeft, Lock } from "lucide-react";

interface PageHeaderProps {
  onBack: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onBack }) => {
  return (
    <header className="flex flex-col items-center py-4 space-y-6 mb-8">
      <div className="flex items-center w-full">
        <button className="text-black text-left" onClick={onBack}>
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-black mx-auto transform -translate-x-3">
          Forgot Password
        </h1>
      </div>
      <div className="bg-white p-6 rounded-lg text-center space-y-4 border border-gray-100">
        <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <p className="text-lg text-black">
          Select which contact details should we use to reset your password
        </p>
      </div>
    </header>
  );
};

export default PageHeader;

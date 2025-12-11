import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FinancialAdjustmentProps {
  orderAmount: number;
  onProceedAdjustment: () => void;
}

const FinancialAdjustment = ({ orderAmount, onProceedAdjustment }: FinancialAdjustmentProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Financial Adjustment</h2>
      <div className="p-2 md:p-6 rounded-2xl border space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Adjustment Type</label>
            <Select defaultValue="full-refund">
              <SelectTrigger className="rounded-md w-full p-5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-refund">Full Refund</SelectItem>
                <SelectItem value="partial-refund">Partial Refund</SelectItem>
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
        <Separator className="my-6" />
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">Total Order Cost: ৳{orderAmount}</span>
          <button
            onClick={onProceedAdjustment}
            className="px-6 py-2 btn-primary text-sm font-medium rounded"
          >
            Proceed Adjustment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialAdjustment;

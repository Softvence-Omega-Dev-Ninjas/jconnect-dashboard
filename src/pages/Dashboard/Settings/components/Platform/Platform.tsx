import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Platform = () => {
  return (
    <>
    <PageHeading title='Platform configuration'/>
      <div className=" space-y-7 bg-white rounded-lg shadow-md mt-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-1.5">
            <Label htmlFor="fee" className="font-medium">
              Platform Fee(%)
            </Label>
            <Input
              type="number"
              id="fee"
              className="border-red-600"
              placeholder="Platform Fee"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fee" className="font-medium">
              Minimum Payout Threshold
            </Label>
            <Input
              type="number"
              id="fee"
              className="border-red-600"
              placeholder="$20"
            />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button className="bg-white border border-red-600 text-red-600">Reset</Button>
          <Button className="btn-primary">Save Changes</Button>
        </div>
        <div className="">
          <p className="text-gray-400 text-center ">
            Changes affect all users globally. Review carefully before saving.
          </p>
        </div>
      </div>
    </>
  );
};

export default Platform;

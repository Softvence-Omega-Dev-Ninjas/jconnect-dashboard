import { useState, useEffect } from "react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetPlatformSettingsQuery,
  useUpdatePlatformSettingsMutation,
} from "@/redux/features/settings/settingsApi";
import { toast } from "sonner";

const Platform = () => {
  const { data, isLoading } = useGetPlatformSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdatePlatformSettingsMutation();

  const [formData, setFormData] = useState({
    platformFee_percents: 0,
    minimum_payout: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        platformFee_percents: data.platformFee_percents,
        minimum_payout: data.minimum_payout,
      });
    }
  }, [data]);

  const handleReset = () => {
    if (data) {
      setFormData({
        platformFee_percents: data.platformFee_percents,
        minimum_payout: data.minimum_payout,
      });
    }
  };

  const handleSave = async () => {
    // console.log(formData);
    try {
      await updateSettings(formData).unwrap();
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Failed to update settings");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <PageHeading title="Platform configuration" />
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
              value={formData.platformFee_percents}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  platformFee_percents: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="payout" className="font-medium">
              Minimum Payout Threshold
            </Label>
            <Input
              type="number"
              id="payout"
              className="border-red-600"
              placeholder="$20"
              value={formData.minimum_payout}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minimum_payout: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button
            onClick={handleReset}
            className="bg-white border border-red-600 text-red-600"
          >
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isUpdating} className="btn-primary">
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
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

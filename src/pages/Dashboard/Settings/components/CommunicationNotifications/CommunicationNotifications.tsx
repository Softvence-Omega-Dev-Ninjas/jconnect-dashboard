import { useEffect, useState } from "react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import { toast } from "sonner";
import {
  NotificationSetting,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/redux/features/settings/settingsApi";
import { notificationItems } from "./NotificationItems/NotificationItems";

const CommunicationNotifications = () => {
  const { data: apiResponse, isLoading } = useGetNotificationSettingsQuery();

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateNotificationSettingsMutation();

  const [localSettings, setLocalSettings] =
    useState<NotificationSetting | null>(null);

  useEffect(() => {
    if (apiResponse?.data && apiResponse.data.length > 0) {
      setLocalSettings(apiResponse.data[0]);
    }
  }, [apiResponse]);

  if (isLoading || !localSettings) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const syncWithBackend = async (
    updatedFields: Partial<NotificationSetting>
  ) => {
    try {
      await updateSettings(updatedFields).unwrap();
      toast.success("Notification settings updated");
    } catch (error) {
      console.error("Notification Sync Error:", error);
      toast.error("Failed to sync settings with server");
    }
  };

  const isMasterActive = localSettings.email && localSettings.message;

  const handleMasterToggle = (val: boolean) => {
    const updatedState = {
      ...localSettings,
      email: val,
      userUpdates: val,
      serviceCreate: val,
      review: val,
      post: val,
      message: val,
      userRegistration: val,
      Service: val,
    };

    setLocalSettings(updatedState);
    syncWithBackend(updatedState);
  };

  const handleIndividualToggle = (
    key: keyof NotificationSetting,
    val: boolean
  ) => {
    const updatedState = { ...localSettings, [key]: val };
    setLocalSettings(updatedState);
    syncWithBackend({ [key]: val });
  };

  return (
    <>
      <PageHeading title="Communication & Notifications" />

      <div
        className={`max-w-4xl space-y-8 mt-6 transition-opacity duration-500 ${
          isUpdating ? "opacity-70" : "opacity-100"
        }`}
      >
        <div className="bg-linear-to-r from-red-50 to-white p-6 rounded-2xl border border-red-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-bold text-gray-800">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-500 font-medium italic">
                Enable or disable all notification types at once
              </p>
            </div>
            <Switch
              checked={isMasterActive}
              onCheckedChange={handleMasterToggle}
              className="data-[state=checked]:bg-red-600"
              disabled={isUpdating}
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-300 ${
            !isMasterActive ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          {notificationItems.map((item) => (
            <div key={item.key} className="group">
              <div className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4 bg-white hover:border-red-200 hover:shadow-md transition-all">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-gray-700 group-hover:text-red-600 transition-colors">
                    {item.label}
                  </Label>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {localSettings[item.key as keyof NotificationSetting]
                      ? "Receiving alerts"
                      : "Alerts muted"}
                  </p>
                </div>
                <Switch
                  checked={
                    !!localSettings[item.key as keyof NotificationSetting]
                  }
                  onCheckedChange={(val) =>
                    handleIndividualToggle(
                      item.key as keyof NotificationSetting,
                      val
                    )
                  }
                  className="data-[state=checked]:bg-red-600 shadow-inner"
                  disabled={isUpdating}
                />
              </div>
            </div>
          ))}
        </div>
        {isUpdating && (
          <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold animate-bounce shadow-2xl">
            Saving changes...
          </div>
        )}
      </div>
    </>
  );
};

export default CommunicationNotifications;

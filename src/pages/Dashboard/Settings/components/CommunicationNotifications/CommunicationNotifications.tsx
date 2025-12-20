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
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const CommunicationNotifications = () => {
  const { data: apiResponse, isLoading, error } = useGetNotificationSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateNotificationSettingsMutation();
  const [localSettings, setLocalSettings] =
    useState<NotificationSetting | null>(null);

  useEffect(() => {
    if (apiResponse?.data) {
      setLocalSettings(apiResponse.data);
    }
  }, [apiResponse]);

  if(error){
    return <NoDataFound dataTitle="Notification Data" />
  }

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
    } catch (error) {
      console.error("Sync Error:", error);
      toast.error("Failed to sync settings");
    }
  };

  const isMasterActive = notificationItems.some(
    (item) => localSettings[item.key as keyof NotificationSetting] === true
  );

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
    toast.success(
      val ? "All notifications enabled" : "All notifications disabled"
    );
  };
  const handleIndividualToggle = (
    key: keyof NotificationSetting,
    val: boolean
  ) => {
    const updatedState = { ...localSettings, [key]: val };
    setLocalSettings(updatedState);
    syncWithBackend(updatedState);

    const notificationName =
      notificationItems.find((item) => item.key === key)?.label || key;
    toast.success(`${notificationName} ${val ? "enabled" : "disabled"}`);
  };

  

  return (
    <>
      <PageHeading title="Communication & Notifications" />

      <div
        className={`space-y-8 mt-6 transition-opacity duration-200 ${
          isUpdating ? "opacity-75" : "opacity-100"
        }`}
      >
        {/* Master Control Switch */}
        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-lg font-bold text-gray-800">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-500">
                Enable or disable all notifications at once
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notificationItems.map((item) => {
            const isActive =
              !!localSettings[item.key as keyof NotificationSetting];

            return (
              <div key={item.key} className="group">
                <div className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4 bg-white hover:border-red-200 hover:shadow-md transition-all duration-200">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold text-gray-700 cursor-pointer">
                      {item.label}
                    </Label>
                    <p
                      className={`text-xs font-medium ${
                        isActive ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {isActive ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={(val) =>
                      handleIndividualToggle(
                        item.key as keyof NotificationSetting,
                        val
                      )
                    }
                    className="data-[state=checked]:bg-red-600"
                    disabled={isUpdating}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommunicationNotifications;

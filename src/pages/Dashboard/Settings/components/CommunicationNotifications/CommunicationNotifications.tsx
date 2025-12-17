import { useState } from "react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const CommunicationNotifications = () => {
  const [notifications, setNotifications] = useState({
    payment: true,
    orderCompleted: true,
    disputeUpdate: true,
    refundIssued: true,
    accountSuspension: true,
    pushNotifications: true,
  });

  return (
    <>
      <PageHeading title="Communication & Notifications" />
      <div className="space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="font-medium">Payment</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.payment}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, payment: val })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Order CompletedQ</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.orderCompleted}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, orderCompleted: val })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Dispute Update</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.disputeUpdate}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, disputeUpdate: val })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Refund Issued</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.refundIssued}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, refundIssued: val })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Account Suspension Notice</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.accountSuspension}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, accountSuspension: val })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Push Notifications</Label>
            <div className="flex items-center justify-between border border-red-600 rounded-md px-4 py-2">
              <span className="text-sm">Active</span>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(val) =>
                  setNotifications({ ...notifications, pushNotifications: val })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunicationNotifications;

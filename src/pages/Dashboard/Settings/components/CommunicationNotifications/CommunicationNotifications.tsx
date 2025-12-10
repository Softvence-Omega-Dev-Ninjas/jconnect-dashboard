import { useState } from "react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
  });

  return (
    <>
      <PageHeading title="Communication & Notifications" />
      <div className="space-y-7 bg-white rounded-lg shadow-md p-6 mt-4">
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

        <div className="border border-gray-300 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-xl">Announcement Banner</h3>
          <div className="space-y-1.5">
            <Input
              placeholder="Title"
              className="border-red-600"
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Textarea
              placeholder="Enter announcement here"
              className="border-red-600 min-h-[100px]"
              value={announcement.message}
              onChange={(e) =>
                setAnnouncement({ ...announcement, message: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="btn-primary">Save Announcement</Button>
        </div>

        <div>
          <p className="text-gray-400 text-center">
            Manage automated messages and system-wide announcements.
          </p>
        </div>
      </div>
    </>
  );
};

export default CommunicationNotifications;

import { useState } from "react";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddAdminModal from "./components/AddAdminModal";

const AdminRoleManagement = () => {
  const [roles, setRoles] = useState({
    superAdmin: "Full Control",
    financeAdmin: "Payments, Refunds, Payouts",
    supportAdmin: "Disputes, User moderation",
    analyst: "View analytics",
  });

  const handleReset = () => {
    setRoles({
      superAdmin: "Full Control",
      financeAdmin: "Payments, Refunds, Payouts",
      supportAdmin: "Disputes, User moderation",
      analyst: "View analytics",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeading title="Admin Role Management" />
        <AddAdminModal />
      </div>
      <div className="space-y-7 bg-white rounded-lg shadow-md p-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="font-medium">Super Admin</Label>
            <Select
              value={roles.superAdmin}
              onValueChange={(val) => setRoles({ ...roles, superAdmin: val })}
            >
              <SelectTrigger className="border-red-600 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Control">Full Control</SelectItem>
                <SelectItem value="Limited Access">Limited Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Finance Admin</Label>
            <Select
              value={roles.financeAdmin}
              onValueChange={(val) => setRoles({ ...roles, financeAdmin: val })}
            >
              <SelectTrigger className="border-red-600  w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payments, Refunds, Payouts">
                  Payments, Refunds, Payouts
                </SelectItem>
                <SelectItem value="View Only">View Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Support Admin</Label>
            <Select
              value={roles.supportAdmin}
              onValueChange={(val) => setRoles({ ...roles, supportAdmin: val })}
            >
              <SelectTrigger className="border-red-600  w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disputes, User moderation">
                  Disputes, User moderation
                </SelectItem>
                <SelectItem value="View Only">View Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="font-medium">Analyst</Label>
            <Select
              value={roles.analyst}
              onValueChange={(val) => setRoles({ ...roles, analyst: val })}
            >
              <SelectTrigger className="border-red-600 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="View analytics">View analytics</SelectItem>
                <SelectItem value="Full Analytics">Full Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleReset}
            className="bg-white border border-red-600 text-red-600 hover:bg-red-50"
          >
            Default
          </Button>
          <Button className="btn-primary">
            Save Changes
          </Button>
        </div>

        <div>
          <p className="text-gray-400 text-center">
            Assign roles carefully. Every admin action is logged in the system
            for security.
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminRoleManagement;

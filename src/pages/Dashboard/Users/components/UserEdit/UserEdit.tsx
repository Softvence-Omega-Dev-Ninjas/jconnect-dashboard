import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  UpdateUserPayload,
} from "@/redux/features/users/usersApi";

import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

interface EditFormState {
  full_name: string;
  email: string;
  phone: string;
  pinCode: number | null;
  isActive: boolean;
  isVerified: boolean;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  profilePhoto: string | null;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id || "";
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<EditFormState>({
    full_name: "",
    email: "",
    phone: "",
    pinCode: null,
    isActive: false,
    isVerified: false,
    role: "USER",
    profilePhoto: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        pinCode: user.pinCode || null,
        isActive: user.isActive,
        isVerified: user.isVerified,
        role: user.role as "SUPER_ADMIN" | "ADMIN" | "USER",
        profilePhoto: user.profilePhoto || null,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: UpdateUserPayload = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      pinCode: formData.pinCode,
      isActive: formData.isActive,
      isVerified: formData.isVerified,
      role: formData.role,
      profilePhoto: formData.profilePhoto,
    };

    try {
      await updateUser({
        id: userId,
        data: updatedFields,
      }).unwrap();

      toast.success("User updated successfully!");

      navigate(`/users/${userId}`);
    } catch (updateError) {
      console.error("User update failed:", updateError);
      toast.error("Failed to update user.");
    }
  };

  if (isLoading)
    return <LoadingSpinner message="Loading user data for editing..." />;

  if (error)
    return (
      <NoDataFound
        dataTitle="User"
        noDataText="Error loading user data for editing."
      />
    );

  if (!user)
    return (
      <NoDataFound
        dataTitle="User"
        noDataText={`User with ID "${userId}" not found.`}
      />
    );

  const isSuperAdmin = user.role === "SUPER_ADMIN";

  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl">Profile Update: <span className="font-bold">{` ${user.full_name}`}</span></h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl space-y-6 border-t-4 border-[#BD001F] w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pinCode">Pin Code</Label>

            <Input
              id="pinCode"
              type="number"
              value={formData.pinCode === null ? "" : formData.pinCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pinCode: parseInt(e.target.value) || null,
                }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12  gap-6 pt-4 border-t">
          <div className="flex flex-col md:flex-row items-center col-span-8 gap-6">
            <div className="flex  items-center gap-3">
              <Label htmlFor="isActive">Account Status (Active)</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
                disabled={isSuperAdmin}
              />
            </div>

            <div className="flex items-center gap-3">
              <Label htmlFor="isVerified">Email Verified</Label>
              <Switch
                id="isVerified"
                checked={formData.isVerified}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isVerified: checked }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3  col-span-4 w-[200px] ">
            <Label htmlFor="role">User Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "SUPER_ADMIN" | "ADMIN" | "USER") =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
              disabled={isSuperAdmin}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>

                {user.role === "SUPER_ADMIN" && (
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="profilePhoto">Profile Photo URL</Label>
          <Input
            id="profilePhoto"
            value={formData.profilePhoto || ""}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isUpdating}
           className="w-full py-3 rounded text-white font-bold
         bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
         shadow-[0_4px_12px_rgba(0,0,0,0.35)]
         hover:opacity-95 transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

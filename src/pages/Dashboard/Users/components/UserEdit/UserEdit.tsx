/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Image, Loader2, UploadCloud } from "lucide-react";
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
import Cookies from "js-cookie";

interface EditFormState {
  full_name: string;
  email: string;
  phone: string;
  pinCode: number | undefined;
  isActive: boolean;
  isVerified: boolean;
  role: "SUPER_ADMIN" | "ADMIN" | "ARTIST";
  profilePhoto: string | undefined;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id || "";
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, { skip: !userId });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<EditFormState>({
    full_name: "",
    email: "",
    phone: "",
    pinCode: undefined,
    isActive: false,
    isVerified: false,
    role: "ARTIST",
    profilePhoto: undefined,
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        pinCode: user.pinCode || undefined,
        isActive: user.isActive,
        isVerified: user.isVerified,
        role: user.role as EditFormState["role"],
        profilePhoto: user.profilePhoto || undefined,
      });
    }
  }, [user]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      setIsUploading(true);
      const response = await fetch(
        "https://jconnect-server.saikat.com.bd/aws-file-upload-additional-all/upload-image-single",
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const result = await response.json();

      if (result.file) {
        setFormData((prev) => ({ ...prev, profilePhoto: result.file }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading)
      return toast.warning("Please wait for image to finish uploading");

    const updatedFields: UpdateUserPayload = {
      ...formData,
      pinCode: formData.pinCode ?? undefined,
    };

    try {
      await updateUser({ id: userId, data: updatedFields }).unwrap();
      toast.success("User updated successfully!");
      navigate(`/users/${userId}`);
    } catch {
      toast.error(`Failed to update user`);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading user data..." />;
  if (error || !user)
    return <NoDataFound dataTitle="User" noDataText="User not found." />;

  const currentUserRole = Cookies.get("role");
  const isCurrentUserSuperAdmin = currentUserRole === "SUPER_ADMIN";
  const isEditingUserSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto">
      <div className="relative flex items-center mb-2 w-full min-h-[50px]">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 flex items-center text-gray-500 hover:text-red-600 transition-all group cursor-pointer"
        >
          <div className="p-2 rounded-full group-hover:bg-red-50 mr-2 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold hidden sm:inline">Back to user</span>
        </button>

        <h1 className="text-2xl md:text-4xl font-bold text-center w-full text-gray-800">
          Update Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl space-y-6 border-t-4 border-[#BD001F] w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              disabled={isEditingUserSuperAdmin}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!isEditingUserSuperAdmin && formData.role !== "ARTIST"}
            />
          </div>

          {/* Profile Picture Upload Section */}
          <div className="md:col-span-2 space-y-3">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-5 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-red-300 transition-colors bg-gray-50/50">
              {/* Preview Image */}
              <div className="relative w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 shrink-0">
                {formData.profilePhoto ? (
                  <img
                    src={formData.profilePhoto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Image />
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1 space-y-2">
                <div className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 px-2 py-2 rounded-lg border border-red-100 w-fit hover:bg-red-100 transition">
                    <UploadCloud className="w-4 h-4" />
                    {isUploading ? "Uploading..." : "Change Photo"}
                  </div>
                </div>
                <p className="hidden sm:flex text-[10px] text-gray-400 font-medium">
                  Supported formats: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Other fields... (Phone, PinCode, Status, Role) */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              id="pinCode"
              type="number"
              value={formData.pinCode ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pinCode: parseInt(e.target.value) || undefined,
                }))
              }
            />
          </div>
        </div>

        {/* Status & Role Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t">
          <div className="flex flex-col md:flex-row items-center col-span-8 gap-6">
            <div className="flex items-center gap-3">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(val) =>
                  setFormData((prev) => ({ ...prev, isActive: val }))
                }
                disabled={isEditingUserSuperAdmin}
              />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="isVerified">Verified</Label>
              <Switch
                id="isVerified"
                checked={formData.isVerified}
                onCheckedChange={(val) =>
                  setFormData((prev) => ({ ...prev, isVerified: val }))
                }
                disabled={isEditingUserSuperAdmin}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-4">
            <Label htmlFor="role">Role</Label>
            {isCurrentUserSuperAdmin ? (
              <Select
                value={formData.role}
                onValueChange={(val: any) =>
                  setFormData((p) => ({ ...p, role: val }))
                }
                disabled={isEditingUserSuperAdmin}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPER_ADMIN">SUPER ADMIN</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="ARTIST">ARTIST</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <span className="px-3 py-1 bg-gray-100 rounded border text-sm font-bold">
                {formData.role}
              </span>
            )}
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isUpdating || isUploading}
            className="w-full py-4 rounded-xl text-white font-bold bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)] shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

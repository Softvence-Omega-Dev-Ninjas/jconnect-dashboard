/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Image, Loader2, UploadCloud } from "lucide-react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
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
import { useSelector } from "react-redux";
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

  const { user: loggedInUser } = useSelector((state: any) => state.auth);

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
        role: (user.role as string).toUpperCase() as EditFormState["role"],
        profilePhoto: user.profilePhoto || undefined,
      });
    }
  }, [user]);

  const loggedInUserId =
    (loggedInUser as any)?._id || (loggedInUser as any)?.id;
  const targetUserId = (user as any)?._id || (user as any)?.id;

  const isCurrentUserSuperAdmin = loggedInUser?.role === "SUPER_ADMIN";
  const isCurrentUserAdmin = loggedInUser?.role === "ADMIN";
  const isSelf = loggedInUserId === targetUserId;

  const canEdit = isCurrentUserSuperAdmin || (isCurrentUserAdmin && isSelf);
  const isFieldDisabled = !canEdit;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isFieldDisabled) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      setIsUploading(true);

      const baseUrl = (import.meta as any).env.VITE_API_URL;
      const token = Cookies.get("token");
      const response = await fetch(
        `${baseUrl}/aws-file-upload-additional-all/upload-image-single`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadFormData,
        },
      );
      const result = await response.json();
      if (result.file) {
        setFormData((prev) => ({ ...prev, profilePhoto: result.file }));
        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
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
    if (isUploading) return toast.warning("Wait for image upload");

    try {
      await updateUser({ id: userId, data: formData }).unwrap();
      toast.success("User updated successfully!");
      navigate(`/users/${userId}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user.");
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading user data..." />;
  if (error || !user)
    return <NoDataFound dataTitle="User" noDataText="User not found." />;

  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative flex items-center mb-6 w-full min-h-[50px]">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 flex items-center text-gray-500 hover:text-red-600 transition-all group cursor-pointer"
        >
          <div className="p-2 rounded-full group-hover:bg-red-50 mr-2 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold hidden sm:inline">Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center w-full text-gray-800">
          Update Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl space-y-6 border-t-4 border-[#BD001F] w-full"
      >
        {!canEdit && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-lg text-sm text-center font-medium">
            Only Super Admin can update profile.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              disabled={isFieldDisabled}
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
              disabled={isFieldDisabled}
              required
            />
          </div>

          {/* Profile Photo Section */}
          <div className="md:col-span-2 space-y-3">
            <Label>Profile Picture</Label>
            <div
              className={`flex items-center gap-5 p-4 border-2 border-dashed rounded-xl ${
                isFieldDisabled
                  ? "bg-gray-50 border-gray-100 opacity-60"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
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

              {!isFieldDisabled && (
                <div className="flex-1 space-y-2">
                  <div className="relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center gap-1 text-sm font-semibold text-red-600 bg-red-50 px-2 py-2 rounded-lg border border-red-100 w-fit">
                      <UploadCloud className="w-4 h-4" /> Change Photo
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 italic hidden md:flex">
                    Supports: JPG, PNG, GIF, WEBP, SVG, HEIC (Max 2MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isFieldDisabled}
            />
          </div>
          <div>
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              id="pinCode"
              type="number"
              value={formData.pinCode ?? ""}
              disabled={isFieldDisabled}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
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
                  setFormData((p) => ({ ...p, isActive: val }))
                }
                disabled={isFieldDisabled}
              />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="isVerified">Verified</Label>
              <Switch
                id="isVerified"
                checked={formData.isVerified}
                onCheckedChange={(val) =>
                  setFormData((p) => ({ ...p, isVerified: val }))
                }
                disabled={isFieldDisabled}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-4">
            <Label htmlFor="role">Role</Label>
            {isCurrentUserSuperAdmin && !isSelf ? (
              <Select
                value={formData.role}
                onValueChange={(val: any) =>
                  setFormData((p) => ({ ...p, role: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <select name={formData.role} />
                  <SelectValue placeholder="Select a role" />
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
            disabled={isUpdating || isUploading || isFieldDisabled}
            className="w-full py-4 rounded-xl text-white font-bold bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)] shadow-lg disabled:opacity-50"
          >
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

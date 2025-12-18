import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/features/users/usersApi";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  ContactRound,
  Loader2,
  Image,
} from "lucide-react";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

const SingleUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id || "";

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (error instanceof Error || !user) {
    return <NoDataFound dataTitle="No user details. Please try again later." />;
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return (
      new Date(dateString).toLocaleDateString() +
      " " +
      new Date(dateString).toLocaleTimeString()
    );
  };

  const getStatusBadge = (isActive: boolean) => (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={`text-xs ${
        isActive
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-400 hover:bg-gray-500"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeading title={`User Details: ${user.full_name}`} />

      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border-t-4 border-red-600 overflow-scroll sm:overflow-visible">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 shrink-0">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image />
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mr-2">
              {user.full_name}
            </h2>
            <p className="hidden md:flex text-sm text-gray-500">
              User ID: {user.id}
            </p>
          </div>
        </div>
        <div className="space-x-1 flex">
          {getStatusBadge(user.isActive)}
          <Badge
            variant="outline"
            className="ml-2 text-xs border-red-600 text-red-600"
          >
            {user.role}
          </Badge>
        </div>
      </div>

      {/* --- Primary Contact and Status Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg overflow-scroll sm:overflow-visible">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Information
            </CardTitle>
            <ContactRound />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              {user.phone || "Phone Not Provided"}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg overflow-scroll sm:overflow-visible">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verification Status
            </CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p
              className={`text-lg font-semibold ${
                user.isVerified ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {user.isVerified ? "Verified" : "Unverified"}
            </p>
            <p className="text-sm text-gray-600">
              {user.is_terms_agreed ? "Agreed to Terms" : "Terms Pending"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg overflow-scroll sm:overflow-visible">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Dates</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="text-sm">
            <p className="font-medium text-gray-700">
              Joined: {formatDate(user.created_at)}
            </p>
            <p className="text-gray-600">
              Last Login: {formatDate(user.last_login_at)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Additional Details (Optional) --- */}
      <Card className="shadow-lg overflow-scroll sm:overflow-visible">
        <CardHeader>
          <CardTitle className="text-lg">
            Financial & Technical Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Role Provider</p>
              <p className="font-medium text-gray-700">
                {user.auth_provider || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Withdrawals</p>
              <p className="font-medium text-gray-700">
                ${user.withdrawn_amount?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Login Attempts</p>
              <p className="font-medium text-gray-700">{user.login_attempts}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Pin Code</p>
              <p className="font-medium text-gray-700">
                {user.pinCode || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUserDetail;

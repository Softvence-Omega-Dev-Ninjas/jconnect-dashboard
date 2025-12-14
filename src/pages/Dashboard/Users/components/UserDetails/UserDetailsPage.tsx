import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/features/users/usersApi";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
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
    return (
      <LoadingSpinner message="Loading user details..." />
    );
  }

  if (error instanceof Error || !user) {
    return (
      <NoDataFound dataTitle="No user details. Please try again later." />
    );
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
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.full_name}
            </h2>
            <p className="text-sm text-gray-500">User ID: {user.id}</p>
          </div>
        </div>
        <div className="space-y-1">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <Card className="shadow-lg overflow-scroll sm:overflow-visible">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contact Information
            </CardTitle>
            <Mail className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-semibold">{user.email}</p>
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

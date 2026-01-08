import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/features/users/usersApi";
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
  ArrowLeft,
  Star,
  Users,
  DollarSign,
  MapPin,
  Hash,
  Briefcase,
  CreditCard,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

const SingleUserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id || "";
  const [showAllServices, setShowAllServices] = useState(false);

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
      className={`text-xs ${isActive
        ? "bg-green-500 hover:bg-green-600"
        : "bg-gray-400 hover:bg-gray-500"
        }`}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData = user as any;
  const services = userData?.services || [];
  const profile = userData?.profile || {};
  const averageRating = userData?.averageRating || 0;
  const totalReviews = userData?.totalReviews || 0;

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      <div className="">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-red-600 transition-all group w-fit"
        >
          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-red-50 mr-2 transition-colors">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-sm sm:text-base font-semibold">Back to User</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-3 sm:p-4 rounded-lg shadow-md border-t-4 border-red-600 gap-3 sm:gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 shrink-0">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Image className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-4 h-4 sm:w-6 sm:h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              {user.full_name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              <span className="sm:hidden">ID: {user.id.slice(0, 8)}...</span>
              <span className="hidden sm:inline">User ID: {user.id}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-1 sm:space-x-1 shrink-0">
          {getStatusBadge(user.isActive)}
          <Badge
            variant="outline"
            className="text-xs border-red-600 text-red-600 whitespace-nowrap"
          >
            {user.role}
          </Badge>
        </div>
      </div>

      {/* --- Stats Section --- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {userData.followerCount || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-gray-500">Following</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {userData.followingCount || 0}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {averageRating.toFixed(1)} <span className="text-sm text-gray-500">({totalReviews})</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <p className="text-xs text-gray-500">Withdrawn</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              ${(user.withdrawn_amount || 0).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Contact and Verification Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Contact Information
            </CardTitle>
            <ContactRound className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 shrink-0" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-1.5 min-w-0">
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 shrink-0" />
              <p className="text-sm sm:text-base font-semibold truncate">{user.email}</p>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 shrink-0" />
              <span className="truncate">{user.phone || "Phone Not Provided"}</span>
            </div>
            {userData.location && (
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 shrink-0" />
                <span className="truncate">{userData.location}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Verification Status
            </CardTitle>
            <Shield className="h-4 w-4 sm:w-5 sm:h-5 text-gray-500 shrink-0" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              {user.isVerified ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-yellow-500" />
              )}
              <p className={`text-sm font-semibold ${user.isVerified ? "text-green-600" : "text-yellow-600"}`}>
                {user.isVerified ? "Email Verified" : "Email Unverified"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {user.phoneVerified ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <p className={`text-sm ${user.phoneVerified ? "text-green-600" : "text-gray-500"}`}>
                {user.phoneVerified ? "Phone Verified" : "Phone Unverified"}
              </p>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500">Validation Type</p>
              <p className="text-sm font-medium text-gray-700">{user.validation_type || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Terms Agreement</p>
              <p className="text-sm font-medium text-gray-700">
                {user.is_terms_agreed ? "Agreed" : "Pending"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Account Dates</CardTitle>
            <Calendar className="h-4 w-4 sm:w-5 sm:h-5 text-gray-500 shrink-0" />
          </CardHeader>
          <CardContent className="text-xs sm:text-sm space-y-2">
            <div>
              <p className="text-gray-500">Joined</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {formatDate(user.created_at)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Last Login</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {formatDate(user.last_login_at)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {formatDate(user.updated_at)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Profile Information --- */}
      {profile && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.short_bio && (
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-1">Bio</p>
                <p className="text-sm sm:text-base text-gray-700">{profile.short_bio}</p>
              </div>
            )}
            {userData.hashTags && userData.hashTags.length > 0 && (
              <div>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  Hashtags
                </p>
                <div className="flex flex-wrap gap-2">
                  {userData.hashTags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* --- Services Section --- */}
      {services.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              Services ({services.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllServices ? services : services.slice(0, 4)).map((service: {
                id: string;
                serviceName: string;
                description?: string;
                serviceType: string;
                price: number;
                currency?: string;
                isCustom?: boolean;
                socialLogo?: string;
              }) => (
                <div
                  key={service.id}
                  className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 flex-1">
                      {service.serviceName}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ml-2 ${service.serviceType === "SERVICE"
                        ? "border-blue-500 text-blue-600"
                        : "border-purple-500 text-purple-600"
                        }`}
                    >
                      {service.serviceType === "SERVICE" ? "Service" : "Social Post"}
                    </Badge>
                  </div>
                  {service.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-semibold text-gray-900">
                        ${(service.price / 100).toFixed(2)} {service.currency?.toUpperCase()}
                      </span>
                    </div>
                    {service.isCustom && (
                      <Badge variant="outline" className="text-xs">
                        Custom
                      </Badge>
                    )}
                  </div>
                  {service.socialLogo && service.socialLogo !== "SELECT" && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {service.socialLogo}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {services.length > 4 && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="px-4 py-2 bg-[#BD001F] text-white text-sm font-medium rounded-lg hover:bg-[#8A0013] transition-colors"
                >
                  {showAllServices ? "Show Less" : `See All (${services.length - 4} more)`}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* --- Payment & Stripe Information --- */}
      {(userData.customerIdStripe || userData.sellerIDStripe || userData.stripeAccountId) && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              Payment & Stripe Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              {userData.customerIdStripe && (
                <div className="space-y-1">
                  <p className="text-gray-500">Customer ID (Stripe)</p>
                  <p className="font-medium text-gray-700 font-mono text-xs break-all">
                    {userData.customerIdStripe}
                  </p>
                </div>
              )}
              {userData.sellerIDStripe && (
                <div className="space-y-1">
                  <p className="text-gray-500">Seller ID (Stripe)</p>
                  <p className="font-medium text-gray-700 font-mono text-xs break-all">
                    {userData.sellerIDStripe}
                  </p>
                </div>
              )}
              {userData.stripeAccountId && (
                <div className="space-y-1">
                  <p className="text-gray-500">Stripe Account ID</p>
                  <p className="font-medium text-gray-700 font-mono text-xs break-all">
                    {userData.stripeAccountId}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* --- Technical Information --- */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            Technical Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Auth Provider</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {user.auth_provider || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Login Status</p>
              <p className="font-medium text-gray-700">
                {userData.isLogin ? (
                  <span className="text-green-600">Logged In</span>
                ) : (
                  <span className="text-gray-500">Logged Out</span>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Login Attempts</p>
              <p className="font-medium text-gray-700">{userData.login_attempts || 0}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Pin Code</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {userData.pinCode || "Not Set"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Account Status</p>
              <p className="font-medium text-gray-700">
                {userData.isDeleted ? (
                  <span className="text-red-600">Deleted</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Google ID</p>
              <p className="font-medium text-gray-700 wrap-break-word">
                {userData.googleId || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUserDetail;

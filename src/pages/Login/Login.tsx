import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import type { LoginRequest } from "@/redux/features/auth/authTypes";
import { toast } from "sonner";

type FormValues = LoginRequest & {
  remember?: boolean;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: false },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res?.success && res.data) {
        const token = res.data.token;
        const role = res.data.user?.role || "";

        const secureFlag =
          typeof window !== "undefined" &&
          window.location.protocol === "https:";

        // Set token cookie
        Cookies.set("token", token, {
          expires: 7,
          path: "/",
          sameSite: "Lax",
          secure: secureFlag,
        });

        // Set role cookie
        Cookies.set("role", role, {
          expires: 7,
          path: "/",
          sameSite: "Lax",
          secure: secureFlag,
        });
        // Store user in Redux
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.token,
          })
        );

        // Navigate
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (err) {
      const error = err as { data?: { message?: string }; message?: string };
      const msg =
        error?.data?.message ||
        error?.message ||
        "Login error. Please try again.";
      console.error("Login error:", err);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg py-10 px-4 md:py-24 md:px-12 w-full max-w-lg border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#1E1E1E] mb-2">
            Login to Account
          </h1>
          <p className="text-sm text-[#2B2B2B]">
            Please enter your email and password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-[1.20rem] font-bold text-[#2B2B2B] mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-[1.20rem] font-bold text-[#2B2B2B]"
              >
                Password
              </label>
              <button onClick={(e)=>{
                e.preventDefault();
                navigate('/forgot-password')
              }} className="text-base font-bold text-[#666161] hover:underline cursor-pointer">
                Forget Password?
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 pr-12"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#6B6B6B] text-sm mb-6">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 "
              {...register("remember")}
            />
            <label htmlFor="remember">Remember Password</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded text-white font-bold
         bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
         shadow-[0_4px_12px_rgba(0,0,0,0.35)]
         hover:opacity-95 transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

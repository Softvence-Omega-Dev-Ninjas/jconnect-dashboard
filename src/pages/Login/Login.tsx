import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

type LoginResponse = {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: {
      role: string;
      [k: string]: any;
    };
    [k: string]: any;
  };
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: false },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      // replace URL with your real login endpoint
      const res = await axios.post<LoginResponse>("http://103.174.189.183:5050/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data?.success && res.data.data) {
        const token = res.data.data.token;
        const role = res.data.data.user?.role || "";

        // use secure flag only on HTTPS
        const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:";

        // set token cookie 
        Cookies.set("token", token, {
          expires: 7,
          path: "/",
          sameSite: "Lax",
          secure: secureFlag,
        });

        // set role cookie (7 days) 
        Cookies.set("role", role, {
          expires: 7,
          path: "/",
          sameSite: "Lax",
          secure: secureFlag,
        });

        // navigate based on role
        if (role === "SUPER_ADMIN") {
          navigate("/");
        } else if (role === "ADMIN") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        alert(res.data?.message || "Login failed");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login error. Check console for details.";
      console.error("Login error:", err);
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg py-10 px-4 md:py-24 md:px-12 w-full max-w-lg border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#1E1E1E] mb-2">Login to Account</h1>
          <p className="text-sm text-[#2B2B2B]">Please enter your email and password to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <label htmlFor="email" className="block text-[1.20rem] font-bold text-[#2B2B2B] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-[1.20rem] font-bold text-[#2B2B2B]">
                Password
              </label>
              <a className="text-base font-bold text-[#666161] hover:underline cursor-pointer">Forget Password?</a>
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
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center gap-2 text-[#6B6B6B] text-sm mb-6">
            <input id="remember" type="checkbox" className="w-4 h-4 " {...register("remember")} />
            <label htmlFor="remember">Remember Password</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded text-white font-bold
         bg-[linear-gradient(135deg,#7A0012_0%,#FF1845_50%,#D41436_60%,#7A0012_100%)]
         shadow-[0_4px_12px_rgba(0,0,0,0.35)]
         hover:opacity-95 transition duration-200 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

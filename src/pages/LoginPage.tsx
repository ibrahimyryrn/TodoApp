import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "../utils/cookies";
import { useDispatch } from "react-redux";
import { setuserId } from "../redux/userIdSlice";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        "https://oznnkyasreusdkcvhggc.supabase.co/auth/v1/token?grant_type=password",
        {
          email,
          password,
        },
        {
          headers: {
            apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data.error) {
        if (response.data.error.message.includes("Invalid login credentials")) {
          alert("Invalid credentials, please try again.");
        } else if (response.data.error.message.includes("No user found")) {
          alert("No account found with this email. Please sign up.");
        }
      } else {
        console.log("User logged in:", response.data.user);
        if (response.data.access_token) {
          // console.log("login page", response.data.access_token);
          dispatch(setuserId(response.data.user.id));
          setAuthData(response.data.access_token, response.data.user.id); // Token'ı cookie'ye kaydedin
        }

        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

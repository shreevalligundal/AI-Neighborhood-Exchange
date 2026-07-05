import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await login(formData.email, formData.password);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "Invalid email or password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-blue-600">
              🏘 AI Neighborhood Exchange
            </h1>

            <p className="mt-3 text-gray-500">
              Welcome Back
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-3">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-3">

                <FaLock className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-xl font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="mt-6 text-center">

            <span className="text-gray-500">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="text-blue-600 ml-2 font-semibold hover:underline"
            >
              Register
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
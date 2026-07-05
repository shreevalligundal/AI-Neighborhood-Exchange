import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "Registration failed";

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
              Create Your Account
            </p>

          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <div className="flex items-center border rounded-xl px-3">
                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  className="w-full p-3 outline-none"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  placeholder="Enter password"
                  className="w-full p-3 outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <div className="flex items-center border rounded-xl px-3">
                <FaLock className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full p-3 outline-none"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <div className="mt-6 text-center">

            <span className="text-gray-500">
              Already have an account?
            </span>

            <Link
              to="/login"
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;
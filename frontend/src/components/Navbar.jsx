import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
  FaInbox,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          🏘 AI Neighborhood Exchange
        </h1>

        <div className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/items"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaBoxOpen />
            Browse Items
          </Link>

          <Link
            to="/my-items"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaBoxOpen />
            My Items
          </Link>

          <Link
            to="/create-item"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaPlusCircle />
            Add Item
          </Link>

          <Link
            to="/sent-requests"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaClipboardList />
            Sent Requests
          </Link>
          <Link
            to="/received-requests"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaInbox />
            Received Requests
          </Link>
          
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaUser />
            Profile
          </Link>

          <span className="font-semibold">
            {user?.full_name}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
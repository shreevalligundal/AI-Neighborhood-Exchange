import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-blue-700">
            Welcome 👋
          </h1>

          <p className="mt-3 text-xl">
            Hello,
            <span className="font-semibold text-blue-600">
              {" "}
              {user?.full_name}
            </span>
          </p>

          <p className="mt-2 text-gray-600">
            Welcome to the AI Neighborhood Exchange Platform.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600">
              📦 My Items
            </h2>

            <p className="mt-3 text-gray-500">
              View and manage your shared items.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-600">
              🤝 Exchange Requests
            </h2>

            <p className="mt-3 text-gray-500">
              View received and sent requests.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-purple-600">
              👤 Profile
            </h2>

            <p className="mt-3 text-gray-500">
              Update your profile information.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import RequestGrid from "../components/RequestGrid";

import exchangeService from "../services/exchangeService";

function ReceivedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await exchangeService.getReceivedRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load received requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await exchangeService.acceptRequest(requestId);

      toast.success("Request accepted successfully.");

      fetchRequests();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
        "Unable to accept request."
      );
    }
  };

  const handleReject = async (requestId) => {
    try {
      await exchangeService.rejectRequest(requestId);

      toast.success("Request rejected.");

      fetchRequests();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
        "Unable to reject request."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Received Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Manage exchange requests received for your items.
          </p>

        </div>

        {loading ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">
              Loading requests...
            </h2>
          </div>
        ) : (
          <RequestGrid
            requests={requests}
            showOwnerActions
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

      </div>
    </>
  );
}

export default ReceivedRequests;
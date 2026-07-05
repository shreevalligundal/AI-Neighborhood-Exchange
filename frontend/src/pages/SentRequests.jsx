import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import RequestGrid from "../components/RequestGrid";

import exchangeService from "../services/exchangeService";

function SentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await exchangeService.getSentRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load sent requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancel = async (requestId) => {
    const confirmCancel = window.confirm(
      "Cancel this exchange request?"
    );

    if (!confirmCancel) return;

    try {
      await exchangeService.cancelRequest(requestId);

      toast.success("Request cancelled.");

      fetchRequests();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
        "Unable to cancel request."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Sent Requests
          </h1>

          <p className="text-gray-600 mt-2">
            Track all exchange requests you have sent.
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
            showCancel
            onCancel={handleCancel}
          />
        )}

      </div>
    </>
  );
}

export default SentRequests;
import {
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

function RequestCard({
  request,
  showCancel = false,
  showOwnerActions = false,
  onCancel,
  onAccept,
  onReject,
}) {
  const getStatusBadge = () => {
    switch (request.status) {
      case "Pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <FaClock />
            Pending
          </span>
        );

      case "Accepted":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <FaCheckCircle />
            Accepted
          </span>
        );

      case "Rejected":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <FaTimesCircle />
            Rejected
          </span>
        );

      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {request.status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">

      <h2 className="text-xl font-bold mb-4">
        Item ID
      </h2>

      <p className="text-gray-700 break-all mb-5">
        {request.item_id}
      </p>

      <div className="space-y-3">

        <div>
          <p className="font-semibold">
            Message
          </p>

          <p className="text-gray-600">
            {request.message}
          </p>
        </div>

        <div>
          <p className="font-semibold mb-2">
            Status
          </p>

          {getStatusBadge()}
        </div>

        <div>
          <p className="font-semibold">
            Requested On
          </p>

          <p className="text-gray-600">
            {new Date(request.created_at).toLocaleString()}
          </p>
        </div>

      </div>

      {/* Sent Requests */}

      {showCancel && request.status === "Pending" && (

        <button
          onClick={() => onCancel(request.id)}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
        >
          Cancel Request
        </button>

      )}

      {/* Received Requests */}

      {showOwnerActions && request.status === "Pending" && (

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => onAccept(request.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Accept
          </button>

          <button
            onClick={() => onReject(request.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Reject
          </button>

        </div>

      )}

    </div>
  );
}

export default RequestCard;
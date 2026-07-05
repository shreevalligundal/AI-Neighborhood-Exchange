import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaTag,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import exchangeService from "../services/exchangeService";

function ItemCard({
  item,
  showActions = false,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleExchangeRequest = async () => {
    console.log("Exchange button clicked", item);
  try {
    await exchangeService.sendRequest({
      item_id: item.id,
      message: "I would like to exchange this item.",
    });

    toast.success("Exchange request sent successfully!");
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.detail ||
      "Failed to send exchange request."
    );
  }
};

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src={
          item.image_url && item.image_url.trim() !== ""
            ? item.image_url
            : "https://placehold.co/600x400?text=No+Image"
        }
        alt={item.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold mb-2">
          {item.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {item.description}
        </p>

        <div className="space-y-2 text-sm">

          <p className="flex items-center gap-2">
            <FaTag />
            <strong>Category:</strong> {item.category}
          </p>

          <p className="flex items-center gap-2">
            <FaBoxOpen />
            <strong>Condition:</strong> {item.condition}
          </p>

          <p className="flex items-center gap-2">
            <FaExchangeAlt />
            <strong>Exchange:</strong> {item.exchange_type}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <strong>Location:</strong>{" "}
            {item.location || "Not specified"}
          </p>

        </div>

        <div className="mt-5 flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              item.status === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.status}
          </span>

          {showActions ? (
            <div className="flex gap-2">

              <button
                onClick={() => navigate(`/edit-item/${item.id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>

            </div>
          ) : (
            <button
              onClick={handleExchangeRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Request Exchange
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default ItemCard;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import itemService from "../services/itemService";

function EditItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    exchange_type: "",
    image_url: "",
    location: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await itemService.getItemById(itemId);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          condition: data.condition || "",
          exchange_type: data.exchange_type || "",
          image_url: data.image_url || "",
          location: data.location || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await itemService.updateItem(itemId, formData);

      toast.success("Item updated successfully!");

      navigate("/my-items");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-semibold">Loading item...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Item Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Condition</option>
            <option>New</option>
            <option>Like New</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Old</option>
          </select>

          <select
            name="exchange_type"
            value={formData.exchange_type}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">Exchange Type</option>
            <option>Exchange</option>
            <option>Borrow</option>
            <option>Donate</option>
          </select>

          <input
            type="text"
            name="image_url"
            placeholder="Image URL (Optional)"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location (Optional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Item"}
          </button>

        </form>

      </div>
    </>
  );
}

export default EditItem;
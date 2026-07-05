import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import itemService from "../services/itemService";
import aiService from "../services/aiService";
import cloudinaryService from "../services/cloudinaryService";

function CreateItem() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    exchange_type: "",
    image_url: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleGenerateDescription = async () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.condition
    ) {
      toast.error(
        "Please enter Title, Category and Condition first."
      );
      return;
    }

    try {
      setAiLoading(true);

      const response =
        await aiService.generateDescription({
          title: formData.title,
          category: formData.category,
          condition: formData.condition,
        });

      setFormData((prev) => ({
        ...prev,
        description: response.description,
      }));

      toast.success("AI description generated!");
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate AI description.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageUrl = "";

      if (selectedImage) {
        imageUrl =
          await cloudinaryService.uploadImage(
            selectedImage
          );
      }

      await itemService.createItem({
        ...formData,
        image_url: imageUrl,
      });

      toast.success("Item added successfully!");

      navigate("/items");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add New Item
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={aiLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
            >
              {aiLoading
                ? "Generating..."
                : "✨ Generate AI Description"}
            </button>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

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

          <div>

            <label className="block font-medium mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 h-60 w-full object-cover rounded-lg border"
              />
            )}

          </div>

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
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Adding Item..." : "Add Item"}
          </button>

        </form>

      </div>
    </>
  );
}

export default CreateItem;
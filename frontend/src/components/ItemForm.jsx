import { useState } from "react";

function ItemForm({
  initialValues,
  onSubmit,
  buttonText,
  loading,
}) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={submitForm} className="space-y-5">

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

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border rounded-lg p-3"
      >
        <option value="">Select Category</option>
        <option>Books</option>
        <option>Electronics</option>
        <option>Furniture</option>
        <option>Sports</option>
        <option>Clothing</option>
        <option>Stationery</option>
        <option>Kitchen</option>
        <option>Others</option>
      </select>

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
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Saving..." : buttonText}
      </button>

    </form>
  );
}

export default ItemForm;

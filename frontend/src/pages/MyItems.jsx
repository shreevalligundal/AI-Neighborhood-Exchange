import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import ItemGrid from "../components/ItemGrid";
import itemService from "../services/itemService";

function MyItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyItems = async () => {
    try {
      const data = await itemService.getMyItems();
      setItems(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await itemService.deleteItem(itemId);

      toast.success("Item deleted successfully!");

      fetchMyItems();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            My Items
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all the items you have listed.
          </p>

        </div>

        {loading ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">
              Loading your items...
            </h2>
          </div>
        ) : (
          <ItemGrid
            items={items}
            showActions={true}
            onDelete={handleDelete}
          />
        )}

      </div>
    </>
  );
}

export default MyItems;
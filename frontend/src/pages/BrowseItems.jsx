import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ItemGrid from "../components/ItemGrid";
import itemService from "../services/itemService";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Browse Items
          </h1>

          <p className="text-gray-600 mt-2">
            Explore items shared by your neighborhood.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">
              Loading items...
            </h2>
          </div>
        ) : (
          <ItemGrid items={items} />
        )}
      </div>
    </>
  );
}

export default BrowseItems;
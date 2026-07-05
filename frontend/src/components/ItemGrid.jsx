import ItemCard from "./ItemCard";

function ItemGrid({
  items,
  showActions = false,
  onDelete,
}) {
  if (!items.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-3">
          No Items Available
        </h2>

        <p className="text-gray-600">
          There are no items to display.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          showActions={showActions}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
import RequestCard from "./RequestCard";

function RequestGrid({
  requests,
  showCancel = false,
  showOwnerActions = false,
  onCancel,
  onAccept,
  onReject,
}) {
  if (!requests.length) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold mb-3">
          No Requests Found
        </h2>

        <p className="text-gray-600">
          No exchange requests available.
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
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          showCancel={showCancel}
          showOwnerActions={showOwnerActions}
          onCancel={onCancel}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

export default RequestGrid;
from datetime import datetime


def create_exchange_document(
    item_id: str,
    owner_id: str,
    requester_id: str,
    message: str
):
    """
    Creates a MongoDB exchange request document.
    """

    return {

        "item_id": item_id,

        "owner_id": owner_id,

        "requester_id": requester_id,

        "message": message,

        "status": "Pending",

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()
    }
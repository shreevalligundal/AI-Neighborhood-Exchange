from datetime import datetime
from bson import ObjectId

from app.core.database import get_database
from app.models.exchange_model import create_exchange_document
from app.schemas.exchange_schema import ExchangeRequestCreate


# -------------------------------------------------------
# Send Exchange Request
# -------------------------------------------------------

async def send_exchange_request(
    exchange: ExchangeRequestCreate,
    current_user: dict
):

    database = get_database()

    # Check whether the item exists
    item = await database.items.find_one(
        {
            "_id": ObjectId(exchange.item_id)
        }
    )

    if not item:
        raise ValueError("Item not found.")

    # Prevent requesting your own item
    if item["owner_id"] == str(current_user["_id"]):
        raise ValueError("You cannot request your own item.")

    # Item must be available
    if item["status"] != "Available":
        raise ValueError("Item is not available.")

    # Prevent duplicate pending requests
    existing_request = await database.exchange_requests.find_one(
        {
            "item_id": exchange.item_id,
            "requester_id": str(current_user["_id"]),
            "status": "Pending"
        }
    )

    if existing_request:
        raise ValueError("Exchange request already sent.")

    exchange_document = create_exchange_document(
        item_id=exchange.item_id,
        owner_id=item["owner_id"],
        requester_id=str(current_user["_id"]),
        message=exchange.message
    )

    result = await database.exchange_requests.insert_one(
        exchange_document
    )

    created_request = await database.exchange_requests.find_one(
        {
            "_id": result.inserted_id
        }
    )

    return created_request


# -------------------------------------------------------
# Get Received Requests
# -------------------------------------------------------

async def get_received_requests(
    current_user: dict
):

    database = get_database()

    requests = await database.exchange_requests.find(
        {
            "owner_id": str(current_user["_id"])
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)

    return requests


# -------------------------------------------------------
# Get Sent Requests
# -------------------------------------------------------

async def get_sent_requests(
    current_user: dict
):

    database = get_database()

    requests = await database.exchange_requests.find(
        {
            "requester_id": str(current_user["_id"])
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)

    return requests


# -------------------------------------------------------
# Accept Exchange Request
# -------------------------------------------------------

async def accept_request(
    request_id: str,
    current_user: dict
):

    database = get_database()

    exchange_request = await database.exchange_requests.find_one(
        {
            "_id": ObjectId(request_id),
            "owner_id": str(current_user["_id"])
        }
    )

    if not exchange_request:
        raise ValueError("Exchange request not found.")

    if exchange_request["status"] != "Pending":
        raise ValueError("Request has already been processed.")

    await database.exchange_requests.update_one(
        {
            "_id": ObjectId(request_id)
        },
        {
            "$set": {
                "status": "Accepted",
                "updated_at": datetime.utcnow()
            }
        }
    )

    await database.items.update_one(
        {
            "_id": ObjectId(exchange_request["item_id"])
        },
        {
            "$set": {
                "status": "Reserved",
                "updated_at": datetime.utcnow()
            }
        }
    )

    return {
        "message": "Exchange request accepted successfully."
    }


# -------------------------------------------------------
# Reject Exchange Request
# -------------------------------------------------------

async def reject_request(
    request_id: str,
    current_user: dict
):

    database = get_database()

    exchange_request = await database.exchange_requests.find_one(
        {
            "_id": ObjectId(request_id),
            "owner_id": str(current_user["_id"])
        }
    )

    if not exchange_request:
        raise ValueError("Exchange request not found.")

    if exchange_request["status"] != "Pending":
        raise ValueError("Request has already been processed.")

    await database.exchange_requests.update_one(
        {
            "_id": ObjectId(request_id)
        },
        {
            "$set": {
                "status": "Rejected",
                "updated_at": datetime.utcnow()
            }
        }
    )

    return {
        "message": "Exchange request rejected successfully."
    }


# -------------------------------------------------------
# Cancel Exchange Request
# -------------------------------------------------------

async def cancel_request(
    request_id: str,
    current_user: dict
):

    database = get_database()

    exchange_request = await database.exchange_requests.find_one(
        {
            "_id": ObjectId(request_id),
            "requester_id": str(current_user["_id"])
        }
    )

    if not exchange_request:
        raise ValueError("Exchange request not found.")

    if exchange_request["status"] != "Pending":
        raise ValueError("Only pending requests can be cancelled.")

    await database.exchange_requests.delete_one(
        {
            "_id": ObjectId(request_id)
        }
    )

    return {
        "message": "Exchange request cancelled successfully."
    }
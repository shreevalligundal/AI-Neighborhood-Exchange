from datetime import datetime


def create_item_document(
    owner_id: str,
    title: str,
    description: str,
    category: str,
    condition: str,
    exchange_type: str,
    image_url: str = "",
    location: str = ""
):
    """
    Creates a MongoDB item document.
    """

    return {

        "owner_id": owner_id,

        "title": title,

        "description": description,

        "category": category,

        "condition": condition,

        "exchange_type": exchange_type,

        "image_url": image_url,

        "location": location,

        "status": "Available",

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()
    }
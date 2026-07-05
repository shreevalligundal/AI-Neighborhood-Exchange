from datetime import datetime
from bson import ObjectId

from app.core.database import get_database
from app.models.item_model import create_item_document
from app.schemas.item_schema import ItemCreate, ItemUpdate


# -------------------------------------------------------
# Create Item
# -------------------------------------------------------

async def create_item(item: ItemCreate, current_user: dict):

    database = get_database()

    item_document = create_item_document(
        owner_id=str(current_user["_id"]),
        title=item.title,
        description=item.description,
        category=item.category,
        condition=item.condition,
        exchange_type=item.exchange_type,
        image_url=item.image_url,
        location=item.location
    )

    result = await database.items.insert_one(item_document)

    return await database.items.find_one(
        {"_id": result.inserted_id}
    )


# -------------------------------------------------------
# Get All Available Items
# -------------------------------------------------------

async def get_all_items():

    database = get_database()

    return await database.items.find(
        {
            "status": "Available"
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)


# -------------------------------------------------------
# Get My Items
# -------------------------------------------------------

async def get_my_items(current_user: dict):

    database = get_database()

    return await database.items.find(
        {
            "owner_id": str(current_user["_id"])
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)


# -------------------------------------------------------
# Get Single Item
# -------------------------------------------------------

async def get_item_by_id(item_id: str):

    database = get_database()

    item = await database.items.find_one(
        {
            "_id": ObjectId(item_id)
        }
    )

    if not item:
        raise ValueError("Item not found.")

    return item


# -------------------------------------------------------
# Get Items By Category
# -------------------------------------------------------

async def get_items_by_category(category: str):

    database = get_database()

    return await database.items.find(
        {
            "category": {
                "$regex": f"^{category}$",
                "$options": "i"
            },
            "status": "Available"
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)


# -------------------------------------------------------
# Search Items
# -------------------------------------------------------

async def search_items(keyword: str):

    database = get_database()

    return await database.items.find(
        {
            "title": {
                "$regex": keyword,
                "$options": "i"
            },
            "status": "Available"
        }
    ).sort(
        "created_at",
        -1
    ).to_list(length=None)


# -------------------------------------------------------
# Update Item
# -------------------------------------------------------

async def update_item(item_id: str, item: ItemUpdate, current_user: dict):

    database = get_database()

    existing_item = await database.items.find_one(
        {
            "_id": ObjectId(item_id),
            "owner_id": str(current_user["_id"])
        }
    )

    if not existing_item:
        raise ValueError("Item not found.")

    update_data = item.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    update_data["updated_at"] = datetime.utcnow()

    await database.items.update_one(
        {
            "_id": ObjectId(item_id)
        },
        {
            "$set": update_data
        }
    )

    return await database.items.find_one(
        {
            "_id": ObjectId(item_id)
        }
    )


# -------------------------------------------------------
# Delete Item
# -------------------------------------------------------

async def delete_item(item_id: str, current_user: dict):

    database = get_database()

    existing_item = await database.items.find_one(
        {
            "_id": ObjectId(item_id),
            "owner_id": str(current_user["_id"])
        }
    )

    if not existing_item:
        raise ValueError("Item not found.")

    await database.items.delete_one(
        {
            "_id": ObjectId(item_id)
        }
    )

    return {
        "message": "Item deleted successfully."
    }

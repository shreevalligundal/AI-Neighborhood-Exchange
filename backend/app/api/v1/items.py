from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.dependencies import get_current_user

from app.schemas.item_schema import (
    ItemCreate,
    ItemUpdate,
    ItemResponse
)


from app.services.item_service import (
    create_item,
    get_all_items,
    get_my_items,
    get_item_by_id,
    get_items_by_category,
    search_items,
    update_item,
    delete_item
)
router = APIRouter(
    prefix="/items",
    tags=["Items"]
)


# -------------------------------------------------------
# Helper Function
# -------------------------------------------------------

def item_response(item):

    return ItemResponse(
        id=str(item["_id"]),
        owner_id=item["owner_id"],
        title=item["title"],
        description=item["description"],
        category=item["category"],
        condition=item["condition"],
        exchange_type=item["exchange_type"],
        image_url=item["image_url"],
        location=item["location"],
        status=item["status"],
        created_at=item["created_at"]
    )


# -------------------------------------------------------
# Create Item
# -------------------------------------------------------

@router.post(
    "",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_new_item(
    item: ItemCreate,
    current_user=Depends(get_current_user)
):

    created_item = await create_item(item, current_user)

    return item_response(created_item)


# -------------------------------------------------------
# Get All Available Items
# -------------------------------------------------------

@router.get(
    "",
    response_model=list[ItemResponse]
)
async def fetch_all_items():

    items = await get_all_items()

    return [item_response(item) for item in items]


# -------------------------------------------------------
# Get My Items
# -------------------------------------------------------

@router.get(
    "/my-items",
    response_model=list[ItemResponse]
)
async def fetch_my_items(
    current_user=Depends(get_current_user)
):

    items = await get_my_items(current_user)

    return [item_response(item) for item in items]

# -------------------------------------------------------
# Get Single Item
# -------------------------------------------------------

@router.get(
    "/details/{item_id}",
    response_model=ItemResponse
)
async def fetch_single_item(item_id: str):

    try:

        item = await get_item_by_id(item_id)

        return item_response(item)

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
# -------------------------------------------------------
# Get Items By Category
# -------------------------------------------------------

@router.get(
    "/category/{category}",
    response_model=list[ItemResponse]
)
async def fetch_items_by_category(category: str):

    items = await get_items_by_category(category)

    return [item_response(item) for item in items]


# -------------------------------------------------------
# Search Items
# -------------------------------------------------------

@router.get(
    "/search",
    response_model=list[ItemResponse]
)
async def search(
    keyword: str = Query(...)
):

    items = await search_items(keyword)

    return [item_response(item) for item in items]


# -------------------------------------------------------
# Update Item
# -------------------------------------------------------

@router.put(
    "/{item_id}",
    response_model=ItemResponse
)
async def edit_item(
    item_id: str,
    item: ItemUpdate,
    current_user=Depends(get_current_user)
):

    try:

        updated_item = await update_item(
            item_id,
            item,
            current_user
        )

        return item_response(updated_item)

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


# -------------------------------------------------------
# Delete Item
# -------------------------------------------------------

@router.delete("/{item_id}")
async def remove_item(
    item_id: str,
    current_user=Depends(get_current_user)
):

    try:

        return await delete_item(
            item_id,
            current_user
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
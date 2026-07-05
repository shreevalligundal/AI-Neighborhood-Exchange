from app.core.database import get_database


# -------------------------------------------------------
# Get Current User Profile
# -------------------------------------------------------

async def get_user_profile(user_id: str):

    database = get_database()

    user = await database.users.find_one(
        {"_id": user_id}
    )

    return user


# -------------------------------------------------------
# Update User Profile
# -------------------------------------------------------

async def update_user_profile(
    current_user: dict,
    update_data: dict
):

    database = get_database()

    await database.users.update_one(
        {"_id": current_user["_id"]},
        {
            "$set": update_data
        }
    )

    updated_user = await database.users.find_one(
        {"_id": current_user["_id"]}
    )

    return updated_user
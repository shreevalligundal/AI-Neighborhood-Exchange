from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.user_schema import (
    UserResponse,
    UserUpdate
)
from app.services.user_service import (
    update_user_profile
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# -------------------------------------------------------
# Get Current User
# -------------------------------------------------------

@router.get(
    "/me",
    response_model=UserResponse
)
async def get_current_profile(
    current_user=Depends(get_current_user)
):

    return UserResponse(
        id=str(current_user["_id"]),
        full_name=current_user["full_name"],
        email=current_user["email"],
        created_at=current_user["created_at"]
    )


# -------------------------------------------------------
# Update Current User
# -------------------------------------------------------

@router.put(
    "/me",
    response_model=UserResponse
)
async def update_profile(
    user: UserUpdate,
    current_user=Depends(get_current_user)
):

    update_data = user.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    updated_user = await update_user_profile(
        current_user,
        update_data
    )

    return UserResponse(
        id=str(updated_user["_id"]),
        full_name=updated_user["full_name"],
        email=updated_user["email"],
        created_at=updated_user["created_at"]
    )
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.user_schema import (
    UserRegister,
    UserResponse,
    Token,
    UserLogin
)

from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# -------------------------------------------------------
# Register User
# -------------------------------------------------------

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def register(user: UserRegister):

    try:

        created_user = await register_user(user)

        return UserResponse(
            id=str(created_user["_id"]),
            full_name=created_user["full_name"],
            email=created_user["email"],
            created_at=created_user["created_at"]
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# -------------------------------------------------------
# Login User (OAuth2 Compatible)
# -------------------------------------------------------

@router.post(
    "/login",
    response_model=Token
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):

    try:

        user = UserLogin(
            email=form_data.username,
            password=form_data.password
        )

        return await login_user(user)

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
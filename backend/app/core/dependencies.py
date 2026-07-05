from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.security import decode_access_token
from app.core.database import get_database

# -------------------------------------------------------
# OAuth2 Scheme
# -------------------------------------------------------

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


# -------------------------------------------------------
# Get Current Authenticated User
# -------------------------------------------------------

async def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    """
    Validate JWT token and return the authenticated user.
    """

    # Decode JWT
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )

    # Get email from token payload
    email = payload.get("sub")

    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token."
        )

    # Get database instance
    database = get_database()

    # Find user in MongoDB
    user = await database.users.find_one(
        {"email": email}
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return user
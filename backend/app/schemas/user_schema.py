from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# -------------------------------------------------------
# Register
# -------------------------------------------------------

class UserRegister(BaseModel):

    full_name: str = Field(
        ...,
        min_length=3,
        max_length=50
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=32
    )


# -------------------------------------------------------
# Login
# -------------------------------------------------------

class UserLogin(BaseModel):

    email: EmailStr
    password: str


# -------------------------------------------------------
# Update Profile
# -------------------------------------------------------

class UserUpdate(BaseModel):

    full_name: Optional[str] = None

    phone_number: Optional[str] = None

    address: Optional[str] = None


# -------------------------------------------------------
# User Response
# -------------------------------------------------------

class UserResponse(BaseModel):

    id: str

    full_name: str

    email: EmailStr

    created_at: datetime


# -------------------------------------------------------
# JWT Token
# -------------------------------------------------------

class Token(BaseModel):

    access_token: str

    token_type: str
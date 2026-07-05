from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# -------------------------------------------------------
# Create Item
# -------------------------------------------------------

class ItemCreate(BaseModel):

    title: str = Field(
        ...,
        min_length=3,
        max_length=100
    )

    description: str = Field(
        ...,
        min_length=10,
        max_length=1000
    )

    category: str

    condition: str

    exchange_type: str

    image_url: Optional[str] = ""

    location: Optional[str] = ""


# -------------------------------------------------------
# Update Item
# -------------------------------------------------------

class ItemUpdate(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    category: Optional[str] = None

    condition: Optional[str] = None

    exchange_type: Optional[str] = None

    image_url: Optional[str] = None

    location: Optional[str] = None


# -------------------------------------------------------
# Item Response
# -------------------------------------------------------

class ItemResponse(BaseModel):

    id: str

    owner_id: str

    title: str

    description: str

    category: str

    condition: str

    exchange_type: str

    image_url: str

    location: str

    status: str

    created_at: datetime
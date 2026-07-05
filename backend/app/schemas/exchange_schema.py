from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


# -------------------------------------------------------
# Create Exchange Request
# -------------------------------------------------------

class ExchangeRequestCreate(BaseModel):

    item_id: str

    message: str = Field(
        ...,
        min_length=5,
        max_length=300
    )


# -------------------------------------------------------
# Update Exchange Request
# -------------------------------------------------------

class ExchangeRequestUpdate(BaseModel):

    status: str


# -------------------------------------------------------
# Exchange Response
# -------------------------------------------------------

class ExchangeResponse(BaseModel):

    id: str

    item_id: str

    owner_id: str

    requester_id: str

    message: str

    status: str

    created_at: datetime
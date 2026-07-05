from fastapi import APIRouter

from app.ai.ai_service import generate_item_description

from app.schemas.ai_schema import (
    GenerateDescriptionRequest,
    GenerateDescriptionResponse,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# -------------------------------------------------------
# Generate Item Description
# -------------------------------------------------------

@router.post(
    "/generate-description",
    response_model=GenerateDescriptionResponse,
)
async def generate_description(
    request: GenerateDescriptionRequest,
):

    description = await generate_item_description(
        title=request.title,
        category=request.category,
        condition=request.condition,
    )

    return GenerateDescriptionResponse(
        description=description
    )
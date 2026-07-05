from pydantic import BaseModel


# -------------------------------------------------------
# Generate Description Request
# -------------------------------------------------------

class GenerateDescriptionRequest(BaseModel):

    title: str

    category: str

    condition: str


# -------------------------------------------------------
# Generate Description Response
# -------------------------------------------------------

class GenerateDescriptionResponse(BaseModel):

    description: str
    
from app.ai.gemini import model
from app.ai.prompts import DESCRIPTION_PROMPT


async def generate_item_description(
    title: str,
    category: str,
    condition: str
):
    """
    Generate an AI-powered item description using Gemini.
    """

    prompt = DESCRIPTION_PROMPT.format(
        title=title,
        category=category,
        condition=condition
    )

    try:
        response = model.generate_content(prompt)

        if (
            response
            and hasattr(response, "text")
            and response.text
        ):
            return response.text.strip()

        return (
            "Unable to generate description at the moment."
        )

    except Exception as e:
        print("Gemini Error:", e)

        return (
            "Unable to generate description at the moment."
        )
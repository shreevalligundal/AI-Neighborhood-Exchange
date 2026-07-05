DESCRIPTION_PROMPT = """
You are an assistant for a neighborhood item exchange platform.

Generate a short, professional item description.

Requirements:
- 40 to 80 words
- Friendly and natural tone
- Mention the condition
- Mention the category naturally
- Do not invent specifications
- Do not use bullet points
- Return only the description.

Item Title:
{title}

Category:
{category}

Condition:
{condition}
"""
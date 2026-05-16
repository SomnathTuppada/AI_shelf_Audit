import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_product_with_ai(product):

    prompt = f"""
    You are an AI commerce auditor.

    Analyze this product and evaluate:

    1. Trustworthiness
    2. Clarity
    3. AI recommendation confidence
    4. Missing important information
    5. Ambiguity in description

    Product Data:
    {product}

    Return concise analysis.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content
import os
import json

from groq import Groq
from dotenv import load_dotenv

from app.models.ai_response_model import (
    AIAnalysisResponse
)

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_product_with_ai(product):

    prompt = f"""
    You are an expert AI commerce auditor.

    Your job is to evaluate how trustworthy,
    clear, and recommendation-ready a product is
    for AI shopping assistants and ecommerce platforms.

    You are NOT a general chatbot.

    You must think like:
    - Amazon marketplace auditor
    - AI shopping recommendation engine
    - ecommerce trust evaluator

    Analyze the product carefully.

    Focus heavily on:
    1. Trust signals
    2. Product clarity
    3. Missing information
    4. Recommendation confidence
    5. Ambiguity
    6. Customer purchase confidence

    IMPORTANT RULES:
    - Be critical and analytical
    - Do NOT praise weak products
    - Missing warranty/reviews/shipping should reduce trust
    - Short descriptions should increase ambiguity
    - Missing return policy should reduce recommendation confidence

    Return ONLY valid JSON.

    Required JSON structure:

    {{
    "trust_score": float between 0 and 1,
    "ai_confidence": float between 0 and 1,
    "ambiguity_level": "LOW | MEDIUM | HIGH",
    "missing_information": [
        "item1",
        "item2"
    ],
    "summary": "Professional audit summary"
    }}

    Product Data:
    {product}
    """

    try:

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )

        ai_response = (
            response
            .choices[0]
            .message
            .content
        )

        parsed_json = json.loads(ai_response)

        validated_response = (
            AIAnalysisResponse(**parsed_json)
        )

        return validated_response.dict()

    except Exception as error:

        print("AI ANALYSIS ERROR:", error)

        return {
            "trust_score": 50,
            "ai_confidence": 50,
            "ambiguity_level": "MEDIUM",
            "missing_information": [],
            "summary": "AI analysis unavailable"
        }
from fastapi import APIRouter

from app.models.product_model import Product
from app.scoring.scoring_engine import calculate_score

router = APIRouter()


@router.post("/analyze")
def analyze_product(product: Product):

    result = calculate_score(product)

    return {
        "product": product.product_name,
        "analysis": result
    }
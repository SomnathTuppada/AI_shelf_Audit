from app.models.product_model import Product
from app.services.ai_analysis import analyze_product_with_ai


def calculate_score(product: Product):

    clarity_score = 100
    trust_score = 100
    completeness_score = 100

    issues = []
    recommendations = []

    # WARRANTY
    if not product.warranty:

        trust_score -= 20
        completeness_score -= 10

        issues.append({
            "message": "Missing warranty information",
            "severity": "HIGH",
            "impact_score": 25
        })

        recommendations.append(
            "Add warranty details to improve trust"
        )

    # SHIPPING
    if not product.shipping_info:

        clarity_score -= 10
        completeness_score -= 10

        issues.append({
            "message": "Missing shipping information",
            "severity": "MEDIUM",
            "impact_score": 15
        })

        recommendations.append(
            "Include shipping details"
        )

    # REVIEWS
    if len(product.reviews) == 0:

        trust_score -= 30

        issues.append({
            "message": "No customer reviews available",
            "severity": "HIGH",
            "impact_score": 30
        })

        recommendations.append(
            "Collect customer reviews"
        )

    # DESCRIPTION
    if len(product.description) < 20:

        clarity_score -= 20

        issues.append({
            "message": "Product description too short",
            "severity": "LOW",
            "impact_score": 10
        })

        recommendations.append(
            "Expand product description"
        )

    # SORT ISSUES
    issues = sorted(
        issues,
        key=lambda x: x["impact_score"],
        reverse=True
    )

    # FINAL SCORE
    overall_score = int(
        (clarity_score * 0.3)
        + (trust_score * 0.4)
        + (completeness_score * 0.3)
    )

    # AI ANALYSIS
    ai_analysis = analyze_product_with_ai(
        product.dict()
    )

    return {

        "overall_score": max(overall_score, 0),

        "clarity_score": max(clarity_score, 0),

        "trust_score": max(trust_score, 0),

        "completeness_score": max(completeness_score, 0),

        "issues": issues,

        "recommendations": recommendations,

        "ai_analysis": ai_analysis
    }
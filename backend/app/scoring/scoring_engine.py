from app.models.product_model import Product


def calculate_score(product: Product):

    clarity_score = 100
    trust_score = 100
    completeness_score = 100

    issues = []
    recommendations = []

    # WARRANTY CHECK
    if not product.warranty:
        trust_score -= 20
        completeness_score -= 10

        issues.append("Missing warranty information")
        recommendations.append("Add warranty details")

    # SHIPPING CHECK
    if not product.shipping_info:
        clarity_score -= 10
        completeness_score -= 10

        issues.append("Missing shipping information")
        recommendations.append("Include shipping details")

    # REVIEWS CHECK
    if len(product.reviews) == 0:
        trust_score -= 30

        issues.append("No customer reviews available")
        recommendations.append("Collect customer reviews")

    # DESCRIPTION QUALITY
    if len(product.description) < 20:
        clarity_score -= 20

        issues.append("Product description too short")
        recommendations.append("Expand product description")

    # FINAL WEIGHTED SCORE
    overall_score = int(
        (clarity_score * 0.3)
        + (trust_score * 0.4)
        + (completeness_score * 0.3)
    )

    return {
        "overall_score": max(overall_score, 0),

        "clarity_score": max(clarity_score, 0),
        "trust_score": max(trust_score, 0),
        "completeness_score": max(completeness_score, 0),

        "issues": issues,
        "recommendations": recommendations
    }
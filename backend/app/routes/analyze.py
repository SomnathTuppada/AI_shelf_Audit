from fastapi import APIRouter

router = APIRouter()


@router.get("/mock-analysis")
def mock_analysis():

    return {
        "overall_score": 65,
        "clarity_score": 70,
        "trust_score": 50,
        "completeness_score": 80,

        "issues": [
            "Missing warranty information",
            "Missing shipping information",
            "No customer reviews available"
        ],

        "recommendations": [
            "Add warranty details",
            "Include shipping details",
            "Collect customer reviews"
        ]
    }
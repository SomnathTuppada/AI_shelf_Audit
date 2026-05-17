from pydantic import BaseModel
from typing import List

from app.models.issue_model import Issue
from app.models.recommendation_model import Recommendation

class AnalysisResult(BaseModel):

    overall_score: int

    clarity_score: int
    trust_score: int
    completeness_score: int

    issues: List[Issue]

    recommendations: List[Recommendation]
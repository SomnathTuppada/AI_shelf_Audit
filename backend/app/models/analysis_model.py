from pydantic import BaseModel
from typing import List


class AnalysisResult(BaseModel):

    overall_score: int

    clarity_score: int
    trust_score: int
    completeness_score: int

    issues: List[str]
    recommendations: List[str]
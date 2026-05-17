from pydantic import BaseModel
from typing import List


class AIAnalysisResponse(BaseModel):

    trust_score: float

    ai_confidence: float

    ambiguity_level: str

    missing_information: List[str]

    summary: str
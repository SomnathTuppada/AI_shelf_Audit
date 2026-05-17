from pydantic import BaseModel


class Recommendation(BaseModel):

    message: str

    priority: str

    impact_score: int
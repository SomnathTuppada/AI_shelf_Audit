from pydantic import BaseModel


class Issue(BaseModel):

    message: str
    severity: str
    impact_score: int
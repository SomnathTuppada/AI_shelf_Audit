from pydantic import BaseModel
from typing import List, Optional


class Product(BaseModel):
    product_name: str
    description: str
    price: float
    category: str

    warranty: Optional[str] = None
    shipping_info: Optional[str] = None
    return_policy: Optional[str] = None

    reviews: List[str] = []
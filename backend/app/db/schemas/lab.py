from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LabTestBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[int] = None

class LabTestCreate(LabTestBase):
    pass

class LabTestRead(LabTestBase):
    id: int
    class Config:
        from_attributes = True

class LabOrderBase(BaseModel):
    patient_id: int
    test_id: int
    status: Optional[str] = "pending"

class LabOrderCreate(LabOrderBase):
    pass

class LabOrderRead(LabOrderBase):
    id: int
    ordered_at: datetime
    class Config:
        from_attributes = True

class LabResultBase(BaseModel):
    order_id: int
    result: Optional[str] = None

class LabResultCreate(LabResultBase):
    pass

class LabResultRead(LabResultBase):
    id: int
    reported_at: datetime
    class Config:
        from_attributes = True 
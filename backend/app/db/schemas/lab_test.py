from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class LabTestBase(BaseModel):
    test_type: str
    test_date: date
    notes: Optional[str] = None

class LabTestCreate(LabTestBase):
    patient_id: int

class LabTestUpdate(BaseModel):
    test_date: Optional[date] = None
    notes: Optional[str] = None

class LabTestResponse(LabTestBase):
    id: int
    patient_id: int
    doctor_id: int
    status: str
    created_at: datetime
    completed_date: Optional[datetime] = None

    class Config:
        from_attributes = True 
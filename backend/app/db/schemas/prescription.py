from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PrescriptionBase(BaseModel):
    medications: str
    notes: Optional[str] = None

class PrescriptionCreate(PrescriptionBase):
    patient_id: int
    doctor_id: int

class PrescriptionUpdate(BaseModel):
    medications: Optional[str] = None
    notes: Optional[str] = None

class PrescriptionRead(PrescriptionBase):
    id: int
    patient_id: int
    doctor_id: int
    date_issued: datetime

    class Config:
        from_attributes = True 
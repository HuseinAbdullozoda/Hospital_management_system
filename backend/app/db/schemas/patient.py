from pydantic import BaseModel
from typing import Optional

class PatientBase(BaseModel):
    medical_history: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    emergency_contact: Optional[str] = None

class PatientCreate(PatientBase):
    user_id: int

class PatientUpdate(PatientBase):
    pass

class PatientRead(PatientBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True 
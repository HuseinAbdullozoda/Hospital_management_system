from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AppointmentBase(BaseModel):
    scheduled_time: datetime
    status: Optional[str] = "scheduled"
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    patient_id: int
    doctor_id: int

class AppointmentUpdate(BaseModel):
    scheduled_time: Optional[datetime] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class AppointmentRead(AppointmentBase):
    id: int
    patient_id: int
    doctor_id: int

    class Config:
        from_attributes = True 
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.appointment import AppointmentCreate, AppointmentRead, AppointmentUpdate
from app.db.models.appointment import Appointment
from app.core.dependencies import get_db, require_roles
from typing import List
from datetime import datetime

router = APIRouter(prefix="/appointments", tags=["appointments"])

@router.get("/", response_model=List[AppointmentRead])
def list_appointments(db: Session = Depends(get_db), user=Depends(require_roles("admin", "doctor", "hospital_admin", "patient"))):
    # Admin, doctor, hospital admin see all; patient sees their own
    if user.role == "patient":
        return db.query(Appointment).filter(Appointment.patient_id == user.id).all()
    elif user.role == "doctor":
        return db.query(Appointment).filter(Appointment.doctor_id == user.id).all()
    return db.query(Appointment).all()

@router.post("/", response_model=AppointmentRead)
def create_appointment(appt: AppointmentCreate, db: Session = Depends(get_db), user=Depends(require_roles("patient"))):
    # Only patients can create
    new_appt = Appointment(**appt.dict())
    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)
    return new_appt

@router.put("/{appointment_id}", response_model=AppointmentRead)
def update_appointment(appointment_id: int, update: AppointmentUpdate, db: Session = Depends(get_db), user=Depends(require_roles("doctor", "patient", "hospital_admin"))):
    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    # Patient can only update their own, doctor their own
    if user.role == "patient" and appt.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if user.role == "doctor" and appt.doctor_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(appt, key, value)
    db.commit()
    db.refresh(appt)
    return appt

@router.delete("/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "patient"))):
    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    if user.role == "patient" and appt.patient_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    db.delete(appt)
    db.commit()
    return {"ok": True}

@router.get("/available-slots")
def get_available_slots():
    # Placeholder: implement slot logic
    return {"slots": []} 
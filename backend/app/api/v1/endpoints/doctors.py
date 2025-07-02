from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.doctor import DoctorCreate, DoctorRead, DoctorUpdate
from app.db.models.doctor import Doctor
from app.core.dependencies import get_db, require_roles
from typing import List

router = APIRouter(prefix="/doctors", tags=["doctors"])

@router.get("/", response_model=List[DoctorRead])
def list_doctors(db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "patient"))):
    return db.query(Doctor).all()

@router.get("/{doctor_id}", response_model=DoctorRead)
def get_doctor(doctor_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "patient", "doctor"))):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    if user.role == "doctor" and doctor.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return doctor

@router.put("/{doctor_id}", response_model=DoctorRead)
def update_doctor(doctor_id: int, update: DoctorUpdate, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "doctor"))):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    if user.role == "doctor" and doctor.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(doctor, key, value)
    db.commit()
    db.refresh(doctor)
    return doctor

@router.get("/{doctor_id}/schedule")
def get_doctor_schedule(doctor_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "doctor"))):
    # Placeholder: implement schedule logic
    return {"doctor_id": doctor_id, "schedule": []}

@router.put("/{doctor_id}/schedule")
def update_doctor_schedule(doctor_id: int, db: Session = Depends(get_db), user=Depends(require_roles("doctor", "hospital_admin"))):
    # Placeholder: implement update schedule logic
    return {"doctor_id": doctor_id, "schedule": []} 
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.patient import PatientCreate, PatientRead, PatientUpdate
from app.db.models.patient import Patient
from app.core.dependencies import get_db, require_roles
from typing import List

router = APIRouter(prefix="/patients", tags=["patients"])

@router.get("/", response_model=List[PatientRead])
def list_patients(db: Session = Depends(get_db), user=Depends(require_roles("admin", "doctor", "hospital_admin"))):
    return db.query(Patient).all()

@router.get("/{patient_id}", response_model=PatientRead)
def get_patient(patient_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "doctor", "hospital_admin", "patient"))):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    # Only allow patient to access their own record
    if user.role == "patient" and patient.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return patient

@router.put("/{patient_id}", response_model=PatientRead)
def update_patient(patient_id: int, update: PatientUpdate, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin", "patient"))):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    if user.role == "patient" and patient.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(patient, key, value)
    db.commit()
    db.refresh(patient)
    return patient

@router.post("/{patient_id}/medical-history", response_model=PatientRead)
def add_medical_history(patient_id: int, update: PatientUpdate, db: Session = Depends(get_db), user=Depends(require_roles("doctor", "hospital_admin"))):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    if update.medical_history:
        patient.medical_history = update.medical_history
        db.commit()
        db.refresh(patient)
    return patient 
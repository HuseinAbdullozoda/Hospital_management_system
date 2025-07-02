from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.prescription import PrescriptionCreate, PrescriptionRead, PrescriptionUpdate
from app.db.models.prescription import Prescription
from app.core.dependencies import get_db, require_roles
from typing import List
from datetime import datetime

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

@router.get("/", response_model=List[PrescriptionRead])
def list_prescriptions(db: Session = Depends(get_db), user=Depends(require_roles("admin", "doctor", "hospital_admin", "patient"))):
    if user.role == "patient":
        return db.query(Prescription).filter(Prescription.patient_id == user.id).all()
    elif user.role == "doctor":
        return db.query(Prescription).filter(Prescription.doctor_id == user.id).all()
    return db.query(Prescription).all()

@router.post("/", response_model=PrescriptionRead)
def create_prescription(pres: PrescriptionCreate, db: Session = Depends(get_db), user=Depends(require_roles("doctor"))):
    new_pres = Prescription(**pres.dict(), date_issued=datetime.utcnow())
    db.add(new_pres)
    db.commit()
    db.refresh(new_pres)
    return new_pres

@router.put("/{prescription_id}", response_model=PrescriptionRead)
def update_prescription(prescription_id: int, update: PrescriptionUpdate, db: Session = Depends(get_db), user=Depends(require_roles("doctor", "hospital_admin"))):
    pres = db.query(Prescription).filter(Prescription.id == prescription_id).first()
    if not pres:
        raise HTTPException(status_code=404, detail="Prescription not found")
    if user.role == "doctor" and pres.doctor_id != user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(pres, key, value)
    db.commit()
    db.refresh(pres)
    return pres

@router.get("/{prescription_id}/pdf")
def get_prescription_pdf(prescription_id: int):
    # Placeholder: implement PDF generation
    return {"pdf_url": f"/static/prescriptions/{prescription_id}.pdf"}

@router.get("/patients/{patient_id}", response_model=List[PrescriptionRead])
def get_patient_prescriptions(patient_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "doctor", "hospital_admin", "patient"))):
    if user.role == "patient" and user.id != patient_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return db.query(Prescription).filter(Prescription.patient_id == patient_id).all() 
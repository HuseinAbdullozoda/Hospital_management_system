from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    date_issued = Column(DateTime, default=datetime.datetime.utcnow)
    medications = Column(Text)  # JSON or comma-separated list
    notes = Column(Text)
    patient = relationship("Patient")
    doctor = relationship("Doctor") 
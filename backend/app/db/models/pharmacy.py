from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Medicine(Base):
    __tablename__ = "medicines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Integer)
    stock = Column(Integer, default=0)
    expiry_date = Column(DateTime)
    is_available = Column(Boolean, default=True)
    category = Column(String(50))
    manufacturer = Column(String(100))
    created_by = Column(Integer, ForeignKey("users.id"))

class PharmacyOrder(Base):
    __tablename__ = "pharmacy_orders"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String(30), default="pending")
    ordered_at = Column(DateTime, default=datetime.datetime.utcnow)
    patient = relationship("Patient")
    medicine = relationship("Medicine")

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    quantity = Column(Integer, default=0)
    expiry_date = Column(Date)
    batch_number = Column(String(50))
    medicine = relationship("Medicine") 
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class LabTest(Base):
    __tablename__ = "lab_tests"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Integer)

class LabOrder(Base):
    __tablename__ = "lab_orders"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("lab_tests.id"), nullable=False)
    status = Column(String(30), default="pending")
    ordered_at = Column(DateTime, default=datetime.datetime.utcnow)
    patient = relationship("Patient")
    test = relationship("LabTest")

class LabResult(Base):
    __tablename__ = "lab_results"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("lab_orders.id"), nullable=False)
    result = Column(Text)
    reported_at = Column(DateTime, default=datetime.datetime.utcnow)
    order = relationship("LabOrder") 
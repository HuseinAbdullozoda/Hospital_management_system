from app.db.models.user import Base
from app.db.models.user import User
from app.db.models.patient import Patient
from app.db.models.doctor import Doctor
from app.db.models.appointment import Appointment
from app.db.models.prescription import Prescription
from app.db.models.lab import LabTest, LabOrder, LabResult
from app.db.models.pharmacy import Medicine, PharmacyOrder, Inventory
from app.db.models.hospital import Hospital, Department, Staff
from app.db.session import engine

if __name__ == "__main__":
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Done.") 
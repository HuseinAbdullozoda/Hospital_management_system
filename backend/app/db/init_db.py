from app.db.models.user import Base
from app.db.models.user import User
from app.db.models.patient import Patient
from app.db.models.doctor import Doctor
from app.db.session import engine

if __name__ == "__main__":
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Done.") 
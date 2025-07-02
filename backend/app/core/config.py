import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SQLITE_DB_URL = os.getenv("SQLITE_DB_URL", "sqlite:///./hms_tajikistan.db")
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return self.SQLITE_DB_URL

settings = Settings() 
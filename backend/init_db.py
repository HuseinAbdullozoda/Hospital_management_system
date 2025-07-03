from sqlalchemy import create_engine, text
from app.core.config import settings
from app.db.models.user import Base
from app.db.session import engine

def init_db():
    """Initialize the database with new schema"""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
        # Check if we need to add new columns to existing users table
        with engine.connect() as conn:
            # Check if new columns exist
            result = conn.execute(text("PRAGMA table_info(users)"))
            columns = [row[1] for row in result.fetchall()]
            
            # Add missing columns if they don't exist
            if 'phone' not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN phone VARCHAR(20)"))
                print("✅ Added 'phone' column to users table")
            
            if 'date_of_birth' not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN date_of_birth DATE"))
                print("✅ Added 'date_of_birth' column to users table")
            
            if 'gender' not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN gender VARCHAR(10)"))
                print("✅ Added 'gender' column to users table")
            
            if 'address' not in columns:
                conn.execute(text("ALTER TABLE users ADD COLUMN address VARCHAR(255)"))
                print("✅ Added 'address' column to users table")
            
            # Remove username column if it exists (since we're using email for auth)
            if 'username' in columns:
                # Note: SQLite doesn't support DROP COLUMN directly
                # We'll leave it for now to avoid data loss
                print("⚠️  'username' column exists but will be ignored (using email for auth)")
            
            conn.commit()
        
        print("✅ Database initialization completed!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {str(e)}")
        raise

if __name__ == "__main__":
    init_db() 
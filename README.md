# 🏥 Hospital Management System

A comprehensive full-stack hospital management system built with Next.js 14 frontend and FastAPI backend, featuring role-based access control and complete healthcare workflow management.

## ✨ Features

### 🔐 Authentication & User Management
- **Multi-role Authentication**: Patient, Doctor, Lab Technician, Pharmacist, Hospital Admin, System Admin
- **JWT-based Security**: Secure token-based authentication
- **Password Management**: Change password functionality with validation
- **User Profiles**: Complete user profile management

### 👥 Role-Based Access Control
- **Patient Portal**: Book appointments, view medical history, chat with doctors
- **Doctor Dashboard**: Manage patients, appointments, prescriptions
- **Lab Technician**: Process lab tests, generate reports, manage inventory
- **Pharmacist**: Manage medicine inventory, process orders, export data
- **Hospital Admin**: Oversee hospital operations, manage staff, view reports
- **System Admin**: Platform-wide management, hospital approvals

### 📅 Appointment Management
- **Smart Scheduling**: Book, reschedule, and cancel appointments
- **Status Tracking**: Real-time appointment status updates
- **Doctor-Patient Communication**: Integrated chat system
- **Reminder System**: Email and SMS notifications

### 🔬 Laboratory Management
- **Test Management**: Create, track, and complete lab tests
- **Report Generation**: Automated test report generation
- **Inventory Tracking**: Lab equipment and supplies management
- **Patient Information**: Quick access to patient details

### 💊 Pharmacy Management
- **Medicine Inventory**: Complete medicine catalog management
- **Stock Management**: Low stock alerts and expiry notifications
- **Order Processing**: Patient medicine orders
- **Data Export**: Export pharmacy data and reports

### 🏥 Hospital Administration
- **Staff Management**: Doctor, nurse, and staff management
- **Department Management**: Hospital department organization
- **Performance Analytics**: Hospital metrics and reports
- **Approval Workflows**: Hospital and staff approval processes

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons
- **React Hook Form**: Form management
- **Zod**: Schema validation

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database (easily switchable to PostgreSQL/MySQL)
- **Alembic**: Database migrations
- **Pydantic**: Data validation
- **JWT**: JSON Web Token authentication
- **Passlib**: Password hashing

## 📁 Project Structure

```
Hospital-Management-System/
├── app/                          # Next.js frontend
│   ├── admin/                    # System admin pages
│   ├── auth/                     # Authentication pages
│   ├── doctor/                   # Doctor portal
│   ├── hospital-admin/           # Hospital admin portal
│   ├── lab/                      # Lab technician portal
│   ├── patient/                  # Patient portal
│   ├── pharmacist/               # Pharmacist portal
│   └── system-admin/             # System admin portal
├── backend/                      # FastAPI backend
│   ├── app/
│   │   ├── api/v1/              # API endpoints
│   │   ├── core/                # Core configuration
│   │   ├── db/                  # Database models and schemas
│   │   └── main.py              # FastAPI application
│   ├── alembic/                 # Database migrations
│   └── requirements.txt         # Python dependencies
├── components/                   # Reusable UI components
├── lib/                         # Utility functions and API client
└── public/                      # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create environment file:**
   Create a `.env` file in the backend directory:
   ```env
   SQLITE_DB_URL=sqlite:///./hms_tajikistan.db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_ALGORITHM=HS256
   HOST=0.0.0.0
   PORT=8000
   ```

6. **Initialize database:**
   ```bash
   python init_db.py
   ```

7. **Start backend server:**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔑 Default Users

After setting up the database, you can register users with different roles:

- **Patient**: Can book appointments, view medical history
- **Doctor**: Can manage patients and appointments
- **Lab Technician**: Can process lab tests
- **Pharmacist**: Can manage medicine inventory
- **Hospital Admin**: Can manage hospital operations
- **System Admin**: Can manage the entire platform

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `python init_db.py` - Initialize database
- `python -m uvicorn app.main:app --reload` - Start development server
- `alembic revision --autogenerate` - Generate migration
- `alembic upgrade head` - Apply migrations

## 🌟 Key Features Implemented

### ✅ Frontend
- Complete role-based dashboards
- Real-time form validation
- Interactive dialogs and modals
- Loading states and error handling
- Responsive design for all devices
- File upload and download functionality
- Toast notifications for user feedback

### ✅ Backend
- RESTful API with FastAPI
- JWT authentication and authorization
- Role-based access control
- Database models and relationships
- Input validation with Pydantic
- Error handling and logging
- File upload/download endpoints

### ✅ Database
- SQLite database (production-ready)
- Alembic migrations
- Proper relationships and constraints
- Data integrity and validation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **Role-Based Access**: Granular permission system
- **Input Validation**: Server-side validation with Pydantic
- **CORS Protection**: Cross-origin resource sharing protection
- **SQL Injection Prevention**: SQLAlchemy ORM protection

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Frontend Deployment
The Next.js application can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

### Backend Deployment
The FastAPI application can be deployed to:
- Railway
- Heroku
- DigitalOcean
- AWS EC2
- Google Cloud Platform

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the API documentation at `http://localhost:8000/docs`
2. Review the console logs for error messages
3. Ensure all environment variables are properly set
4. Verify database initialization completed successfully

## 🎯 Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with external healthcare systems
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations for data management
- [ ] Automated testing suite
- [ ] Performance optimization
- [ ] Advanced security features

---

**Built with ❤️ for better healthcare management**

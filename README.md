#  Hospital Management System

<img src="https://ibb.co/hJRgGdWN" alt="Project Logo" width="200"/>

A full-stack **Hospital Management System** built with **Django (Python)** on the backend and **React + Redux** on the frontend. This system streamlines hospital operations, including patient records, doctor scheduling, appointments, and department management.

---

## 📌 Features

- 🔐 User Authentication with JWT  
- 🧑‍⚕️ Role-based Dashboards (Admin, Doctor, Patient)  
- 📅 Appointment Scheduling  
- 📁 Patient Record Management  
- 🏥 Department & Staff Management  
- 📊 React + Redux for dynamic UI  
- 📡 Django REST Framework for APIs  
- 📱 Responsive design using Bootstrap  

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Redux, Redux-Form, Bootstrap  
- **Backend**: Django, Django REST Framework  
- **Database**: SQLite (can upgrade to PostgreSQL)  
- **Authentication**: JSON Web Token (JWT)  
- **Build Tools**: Webpack, npm  

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.8+  
- Node.js & npm  

---

### 🛠 Setup Instructions

#### 1. Create and Activate Virtual Environment

`python -m venv venv`  
`source venv/bin/activate` &nbsp;&nbsp; *(Windows: `venv\Scripts\activate`)*  

---

#### 2. Install Backend Dependencies and Initialize Database

`pip install -r requirements.txt`  
`python manage.py makemigrations`  
`python manage.py migrate`  
`python manage.py createsuperuser`  

---

#### 3. Install Frontend Dependencies

`npm install`  
`npm run-script build`  

⚠️ After every change in React components, run:  
`npm run-script build`  

---

### ▶️ Running the App

Start Django backend:  
`python manage.py runserver`  

(Optional) Run React dev server:  
`npm start`  

---

## 🧪 Using the System

- Visit: `http://localhost:8000/`  
- Log in via the superuser account you created  
- Access role-specific dashboards:
  - **Admin**: manage doctors, departments, patients  
  - **Doctor**: view patient history, appointments  
  - **Patient**: book appointments, view records  

---

## 📂 Project Structure Overview
        
        ├── manage.py
        ├── accounts/           # Authentication and user management
        ├── Patients/           # Patient data and appointments
        ├── Departments/        # Hospital departments and staff
        ├── src/                # React app source code
        ├── public/             # React public files
        ├── package.json
        ├── requirements.txt
        ├── db.sqlite3


## 🔐 Authentication Flow

- User logs in from the React frontend  
- JWT token is issued by Django and stored on the frontend  
- Protected API endpoints require the token in headers  

---

## 📈 Future Improvements

- Add nurse/lab roles  
- Add dashboard analytics (Chart.js, Recharts)  
- Enable chat system (WebSockets)  
- Integrate email/SMS reminders  
- Add calendar view for scheduling  
- Enable PDF export of records/prescriptions  

---

## 📄 License

This project is licensed under the **MIT License**.

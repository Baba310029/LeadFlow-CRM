# 🚀 LeadFlow CRM  
### Full-Stack MERN SaaS-Style Customer Relationship Management System

LeadFlow CRM is a production-structured, full-stack MERN application built to manage leads, track follow-ups, visualize performance metrics, and deliver a clean, modern SaaS dashboard experience.

This project demonstrates scalable architecture, modular frontend engineering, RESTful backend practices, and responsive UI design.

---
## 🎥 Live Demo

👉 [Watch Full Demo Video](https://github.com/Baba310029/LeadFlow-CRM/issues/1#issue-3972369789)
## 🌟 Core Features

### 📊 Executive Dashboard

- Real-time lead statistics
- KPI Cards:
  - Total Leads
  - New Leads
  - Contacted Leads
  - Converted Leads
- Automatic Conversion Rate calculation
- Interactive Pie Chart (Recharts)
- Recent Leads preview section
- Dark mode support
- Fully responsive layout

---

### 🗂 Lead Management

- Full CRUD Operations (Create, Read, Update, Delete)
- Status Workflow: new → contacted → converted
- Follow-up date tracking
- Follow-up classification:
  - Overdue
  - Today
  - Upcoming
- Drawer-based detail panel (SaaS-style UX)
- Notes timeline system
- Activity log UI structure
- Pagination
- Filtering by status
- Debounced search
- CSV export functionality

---

### 🎨 UI & UX Engineering

- Fully responsive (mobile + desktop)
- Modular layout architecture
- Sidebar navigation with active state detection
- Smooth drawer animations
- Dark mode with gradient background
- Clean component separation
- Context-based global state management
- TailwindCSS design system
- Optimistic UI updates

---

## 🏗 Architecture Overview

    LeadFlow-CRM/
     ├── backend/        → Express API + MongoDB
     ├── frontend/       → React + Vite + Tailwind
     └── README.md

---

## 🔧 Backend Architecture

### Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### Features
- RESTful API design
- Modular controller structure
- Middleware-based authentication
- Scalable folder architecture
- Clean separation (models / controllers / routes)

---

## 💻 Frontend Architecture

### Tech Stack
- React (Vite)
- TailwindCSS
- Recharts
- Lucide Icons
- Context API

### Features
- Global state via React Context API
- Modular layout system
- Drawer-based detail UX
- Computed KPI metrics
- Date-based follow-up classification logic
- Optimized filtering + debounced search
- Reusable UI component patterns
- Dark mode theme architecture

---

## 🧠 Technical Highlights

- Context-driven global state management
- Computed analytics (conversion rate, KPIs)
- Date-based follow-up classification logic
- Scalable component structure
- Optimized rendering patterns
- RESTful backend architecture
- Modular SaaS-style UI engineering

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- Recharts
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

### Other
- REST API
- Context API
- CSV export logic

---

## ⚙️ Running Locally

### 1️⃣ Clone Repository

    git clone https://github.com/YOUR_USERNAME/LeadFlow-CRM.git
    cd LeadFlow-CRM

---

### 2️⃣ Setup Backend

    cd backend
    npm install

Create a `.env` file inside backend folder:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

Run backend:

    npm run dev

---

### 3️⃣ Setup Frontend

    cd ../frontend
    npm install
    npm run dev

Open in browser:

    http://localhost:5173

---

## 🔮 Future Improvements

- Real-time updates using Socket.io
- Full activity logging system
- Multi-user role-based access control (RBAC)
- Deployment pipeline (Render / Vercel)
- KPI trend analytics
- Email notification system
- Role-based dashboard views

---

## 💼 Resume Summary

LeadFlow CRM demonstrates:

- Full-stack MERN development
- Scalable architecture design
- State management patterns
- REST API engineering
- Dashboard analytics implementation
- SaaS-style UI/UX architecture
- Modular frontend engineering

---

## 📌 Author

Babasree Bisai  
Full-Stack Developer | MERN Stack | System Builder

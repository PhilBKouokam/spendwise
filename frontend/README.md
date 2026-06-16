# SpendWise - Personal Finance Tracker

A full-stack expense tracker with JWT authentication, data visualization, dark mode, and AWS S3 receipt uploads.

**[Live Demo](https://your-vercel-link.vercel.app)** | **[Backend API](https://your-render-link.onrender.com)**

## ✨ Features

- **User Authentication** (Register/Login with JWT)
- **Full CRUD** for transactions
- **Dashboard** with:
  - Real-time balance cards
  - Spending by Category (donut chart)
  - Balance Trend (line chart)
- **Advanced Filtering** (by type, category, search)
- **Receipt Upload** to **AWS S3**
- **Dark/Light Mode** with system preference support
- Responsive design with Bootstrap

## 🛠 Tech Stack

**Frontend:** React + Vite, React Router, Context API, Recharts, Bootstrap  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT  
**Cloud:** AWS S3 (receipt storage)  
**Other:** Multer, dotenv, Vercel + Render deployment

## 📸 Screenshots

*(Add 4-5 screenshots here — light + dark mode, receipt feature, dashboard, etc.)*

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev

📝 What I Learned

Implementing secure file uploads with AWS S3
Managing complex state with React Context
Proper separation of concerns (controllers, routes, middleware)
Building production-like features (receipts, dark mode, filtering)
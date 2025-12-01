# FinTrack – Intelligent Personal Finance Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)

> **A full-stack MERN application designed to empower users with real-time financial tracking, interactive analytics, and role-based administrative control.**

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://fin-track-teal-two.vercel.app/]
- **Backend (Railway):** [https://fintrack-server-production-1a30.up.railway.app/api/v1/]

---

## 📸 Screenshots

<!--
TIP FOR YOU: Take screenshots of your app and save them in an 'assets' folder in your repo,
then link them here. Visuals are CRITICAL for recruiters!
-->

|                   **Dashboard Overview**                   |                    **Transaction Management**                    |
| :--------------------------------------------------------: | :--------------------------------------------------------------: |
| ![Dashboard](/client/src/assets/screenshots/dashboard.png) | ![Transactions](/client/src/assets/screenshots/transactions.png) |

|                   **Balance Charts**                   |                  **Admin Panel**                   |
| :----------------------------------------------------: | :------------------------------------------------: |
| ![Balance](/client/src/assets/screenshots/balance.png) | ![Admin](/client/src/assets/screenshots/admin.png) |

---

## 🌟 Key Features

### 🔐 **Authentication & Security**

- **Secure JWT Authentication:** Custom implementation of JSON Web Tokens for stateless, secure user sessions.
- **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for **Users** and **Admins**.
- **Protected Routes:** Middleware ensures sensitive data is only accessible to authorized users.

### 📊 **Dashboard & Analytics**

- **Real-Time Visualization:** Interactive charts using **Recharts** to visualize income vs. expenses and balance trends.
- **Financial Summaries:** Instant calculation of total balance, income, and expense totals.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.

### 💸 **Transaction Management**

- **CRUD Operations:** Users can easily add, view, edit, and delete income and expense records.
- **Categorization:** Transactions are categorized for better financial insights.
- **History Tracking:** Detailed list views with filtering capabilities.

### 🛡️ **Admin Capabilities**

- **User Management:** Admins can view all registered users and manage their roles.
- **System Stats:** Overview of total application usage and transaction volume.

---

## 🛠️ Tech Stack

### **Frontend (Client)**

- **Framework:** React.js (Vite)
- **State Management:** React Context API (`AuthContext`, `DataProvider`)
- **Styling:** Tailwind CSS & CSS Modules
- **Visualization:** Recharts
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### **Backend (Server)**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt.js
- **CORS:** Configured for secure cross-origin requests

### **DevOps & Deployment**

- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway
- **Version Control:** Git & GitHub

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/FinTrack.git
cd FinTrack
```

### 2. Backend Setup

Navigate to the server repository:
[GitHub Link](https://github.com/mustafa-bhatti/FinTrack-Server)

```bash
cd FinTrack-Server
npm install
```

Create a `.env` file in the server root:

```env
PORT=5002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Start the server:

```bash
npm start
```

### 3. Frontend Setup

Navigate to the client directory:

```bash
cd ../client
npm install
```

Create a `.env` file in the client root:

```env
VITE_API_BASE_URL=http://localhost:5002/api/v1
```

Start the React app:

```bash
npm run dev
```

---

## 🧠 What I Learned

_This project was a deep dive into full-stack architecture. Key takeaways included:_

1.  **State Management Complexity:** Managing global auth state and data synchronization across components using React Context without relying on external libraries like Redux.
2.  **Security Best Practices:** Implementing secure HTTP-only cookies (or local storage with safeguards) and handling JWT expiration gracefully.
3.  **Deployment Pipelines:** Solving CORS issues and environment variable management when deploying separate frontend and backend services on Vercel and Railway.
4.  **Data Visualization:** Transforming raw MongoDB data into meaningful, interactive charts for the user.

---

## 🔮 Future Improvements

- [ ] **Budget Goals:** Allow users to set monthly spending limits per category.
- [ ] **Export Data:** CSV/PDF export functionality for tax purposes.
- [ ] **Dark Mode:** System-wide dark/light theme toggle.
- [ ] **AI Insights:** Simple ML integration to predict future spending based on history.

---

## 📬 Contact

**Ghulam Mustafa Bhatti**  
Full Stack Developer  
[LinkedIn Profile](https://linkedin.com/in/mustafa-bhatti1)

Email: gmbhatti42@gmail.com

**Ahmed Bilal**  
Full Stack Developer  
[LinkedIn Profile](https://linkedin.com/in/ahmedbilal019)

Email: ahmed258bilal@gmail.com

---

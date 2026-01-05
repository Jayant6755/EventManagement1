# 🎉 Event Management System (Full Stack)

A **full-stack Event Management System** built to manage and display events efficiently.
The project uses **React + TypeScript** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 🚀 Live URLs

* **Frontend (Live App):** [https://event-management1-git-main-jayant6755s-projects.vercel.app/]


---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* React Query

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv
* CORS

---

## 📂 Project Structure

```
EventManagement/
│
├── frontend/     # React frontend
├── backend/      # Express backend
└── README.md
```

---

## ⚙️ Setup Instructions (Run Locally)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Jayant6755/EventManagement.git
cd EventManagement
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint Example

```http
GET /api/events
```

Returns all events stored in MongoDB.

---

## ✨ Features

* Full-stack architecture
* REST API integration
* MongoDB data fetching
* Environment-based configuration
* Deployed frontend and backend
* Clean and responsive UI

---

## 👨‍💻 Author

**Jayant Negi**
GitHub: [https://github.com/Jayant6755]

---

## 📄 License

This project is licensed under the **MIT License**.


# Mnemo — Your Second Brain

Mnemo is a second-brain web application that helps users capture, organize, and revisit knowledge from multiple sources such as YouTube, Twitter, and documents — all in one centralized place.

It is built with a **TypeScript + Node.js backend** and a **React (Vite) frontend**, focusing on security, performance, and a clean user experience.

## 🎥 Demo



---

## 🚀 Features

- 🧠 Centralized second-brain for notes & links
- 📦 Content management (add, view, share)
- 🔗 Share knowledge via public links
- 🔐 Authentication & protected routes
- 🌐 Public & private routes with access control
- 🎨 Modern UI powered by shadcn/ui & TailwindCSS
- 🌙 Dark mode support
- ⚡ Built with TypeScript for type safety

---

## 📂 Project Structure

```
mnemo-your-second-brain
├─ backend        # Node.js + Express + MongoDB (TypeScript)
│  ├─ src         # Source code
│  ├─ dist        # Compiled JS
│  ├─ .env        # Environment variables (create from .env.example)
│  └─ tsconfig.json
│
├─ frontend       # React + Vite + Tailwind + shadcn/ui
│  ├─ src         # Components, pages, store, utils
│  ├─ public      # Static assets
│  └─ vite.config.ts
│
└─ README.md

```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mnemo-your-second-brain.git
cd mnemo-your-second-brain
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # configure environment variables
npm start
```

Backend runs at: **http://localhost:3000**

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔑 Environment Variables

The backend requires a `.env` file. Use the provided `.env.example` as a reference.

```ini
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/mnemo

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
```

> ⚠️ Never commit your real `.env` file to GitHub. Only share `.env.example`.

---

## 🧠 Why Mnemo?

The human brain is great at thinking, not storing.  
Mnemo acts as an external memory system — a place to store ideas, resources, and knowledge so you can focus on learning and creating.

---

## 🛠 Tech Stack

**Backend:**

- Node.js, Express, TypeScript
- MongoDB (Mongoose)
- JWT Authentication

**Frontend:**

- React (Vite + TypeScript)
- TailwindCSS + shadcn/ui
- Zustand for state management
- React Router v6

---

## 👨‍💻 Author

**Kumar Gourav**  
MCA ’25 | Full Stack Developer  
Built as a portfolio project to explore modern full-stack architecture and product thinking.

---

## 📜 License

This project is licensed under the MIT License.

---

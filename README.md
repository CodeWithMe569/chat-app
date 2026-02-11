# 💬 Chat App — Full Stack Real-Time Messaging Platform

A modern real-time chat application built using the MERN ecosystem with WebSocket communication, authentication, and scalable architecture patterns.

This project focuses on clean system design, separation of concerns, and production-style folder organization.



## 🚀 Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Zustand / Redux
- Socket.io Client

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Socket.io
- JWT Authentication



## ✨ Features

- JWT Authentication
- Real-time messaging
- Chat rooms
- Persistent message storage
- Modular backend architecture
- Protected API routes
- Feature-based frontend architecture
- Reusable components
- Custom hooks for socket/chat logic



## 📂 Project Structure


chat-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── app.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── README.md




## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone <repo-url>
cd chat-app
```



### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```



### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```



## 🔌 Environment Variables

### Backend

| Variable    |        Description        |
|-------------|---------------------------|
| PORT        |         Server port       |
| MONGO_URI   | MongoDB connection string |
| JWT_SECRET  |       JWT signing key     |

### Frontend

| Variable     | Description     |
|--------------|-----------------|
| VITE_API_URL | Backend API URL |



## 🧠 Architecture Goals

- Scalable folder structure
- Feature modularization
- Clear separation of responsibilities
- Real-time system handling
- Reusable logic abstraction



## 🔮 Planned Improvements

- Typing indicators
- Message reactions
- File uploads
- Read receipts
- End-to-end encryption
- Deployment pipeline



## 👨‍💻 Author

Built as part of exploration into full-stack architecture, real-time systems, and scalable frontend design by Himanshu Tiwari.



## 📜 License

MIT License

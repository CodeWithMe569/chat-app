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

```
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
```



## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <repo-url> chat-app
cd chat-app
```



### 2. Backend Setup (API + WebSocket server)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=9000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Start the backend (Node + Socket.io):

```bash
npm run dev
```

By default the backend will run at `http://localhost:9000`.



### 3. Frontend Setup (React client)

```bash
cd frontend
npm install
```


Start the frontend (Vite dev server):

```bash
npm run dev
```

Vite will print a URL like `http://localhost:5173` (or similar). Open that in your browser.



## ▶️ Usage

1. **Start both servers**
   - Backend: from `backend/` → `npm run dev`
   - Frontend: from `frontend/` → `npm run dev`

2. **Register & login**
   - Visit the frontend URL (e.g. `http://localhost:5173`).
   - Create a new account via the registration form.
   - Log in; a JWT token is stored in `localStorage` and used automatically for API + WebSocket.

3. **Create or join rooms**
   - Use the sidebar to:
     - Create a new room with the **+** button.
     - Join an existing room by ID with the **join** button.

4. **Chat in real time**
   - Select a room to load its message history.
   - Send messages; they appear instantly on all connected clients in that room.
   - Unread badges in the sidebar show new messages for rooms you haven’t opened yet.
   - Read receipts indicate when other users have opened the room and seen your messages.


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
- End-to-end encryption
- Deployment pipeline



## 👨‍💻 Author

Built as part of exploration into full-stack architecture, real-time systems, and scalable frontend design by Himanshu Tiwari.



## 📜 License

MIT License

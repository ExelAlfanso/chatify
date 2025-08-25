# 💬 Chatify

A simple real-time chat application built with **Next.js, Socket.IO, and TypeScript**.  
Users can join chat rooms, send messages instantly, and see other participants in real-time.  
This project also implements **authentication with AuthContext**, ensuring only logged-in users can access chat rooms.

---

## ✨ Features
- 🔐 **Authentication** (Login, Logout, Register) with AuthContext  
- 💬 **Real-time messaging** powered by Socket.IO  
- 🏠 **Multiple chat rooms** — users can join different rooms  
- 👤 **User avatars** (with default avatar fallback)  
- 📜 **Message history** loaded from backend via REST API  
- 📡 **Connection status indicator** (green = connected, red = disconnected)  
- 🛡️ **PrivateRoute** protection for authenticated pages  

---

## 🛠️ Tech Stack
**Frontend:**
- [Next.js 13+](https://nextjs.org/) (App Router, TypeScript, React)  
- [Socket.IO Client](https://socket.io/) for real-time communication  
- [Tailwind CSS](https://tailwindcss.com/) for styling  
- [Lucide React](https://lucide.dev/) for icons  

**Backend:**
- [Node.js](https://nodejs.org/) / [Express](https://expressjs.com/)  
- [Socket.IO Server](https://socket.io/)  
- REST API for messages & authentication  
- Database (MongoDB / PostgreSQL / etc. — depending on your setup)  

---

## 🚀 Getting Started

## 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/chatify.git
cd chatify
```
## 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```
## 3️⃣ Setup environment variables
Create a .env.local file in the project root:

```env

NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```
(Adjust depending on your backend setup.)

## 4️⃣ Run the development server
```bash
npm run dev
# or
yarn dev
```
## 🔑 Authentication Flow

- Auth state managed with AuthContext (login, logout, register)
- JWT stored in cookies (or localStorage if preferred)
- PrivateRoute ensures only logged-in users can access chat pages
- Redirects:
  - /login → redirect to /home if already logged in
  - /chat/[roomID] → redirect to /login if not logged in

## 📂 Project Structure
```bash
/src
 ├── app/               # Next.js app router pages
 ├── components/        # Reusable UI components
 │    ├── Message.tsx   # Chat message component
 │    └── LoadingOverlay.tsx
 ├── context/           # AuthContext for auth state
 ├── lib/               # axios instance, socket setup
 └── styles/            # Tailwind styles
```

## ✅ To-Do / Future Improvements
- ✅ Add user typing indicator
- ✅ Show online user count per room
- 🔄 Add message reactions (👍 ❤️ 😂)
- 📷 Support image/file upload in chat
- 📱 Improve responsive design for mobile

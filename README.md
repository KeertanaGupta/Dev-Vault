# 🔐 Dev Vault  
### *A Developer’s Personal Library for Code Snippets, Knowledge, and Web-Sourced Insights.*

Dev Vault is a productivity-focused MERN application built for developers who constantly jump between tabs, tutorials, Stack Overflow threads, and half-written snippets. Instead of losing useful code in screenshots, bookmarks, and random notes, Dev Vault gives you a clean, structured, and searchable home for everything you discover.

It also includes a fully functional **Chrome Extension** that captures code from any website with a single click — and syncs instantly with your dashboard.

This project was built with one intention:

> **If developers had a “Notion for code”, how would it look?**  
> Dev Vault is the answer.

---
# 🔐 Authentication Screens
### ✨ Signup Page

<img width="1919" height="974" alt="Image" src="https://github.com/user-attachments/assets/b68234a9-588f-439e-a9c5-9cf559f6a59b" />

---
### 🔑 Login Page

<img width="1919" height="930" alt="Image" src="https://github.com/user-attachments/assets/90e35840-d48c-4670-bff3-54e3a1ecbea5" />

---

## 🌟 Why I Built Dev Vault

Every developer keeps hundreds of tiny code fixes, regex patterns, API calls, and useful snippets that they copy daily but forget just as quickly.  
Most of them get buried in:

- Bookmarks  
- Screenshots  
- Notepad files  
- Chat messages  
- Browser history  

I wanted a workflow tool that feels natural — something that captures snippets instantly without breaking focus.  
Dev Vault became that tool.

It’s **small, fast, practical**, and made specifically for **real developer life**.

---

# 🚀 Features That Actually Matter

### 🧠 Smart Snippet Management
- Create, edit, delete, and instantly search snippets  
- Add unlimited tags (Many-to-Many relationship)  
- Filter snippets in milliseconds  
- Clean, distraction-free reading experience  

### 🔗 Chrome Extension
- Select → Right-click → **“Save to Dev Vault”**  
- Auto-detects content type and generates a meaningful title  
- Real-time syncing — no manual refresh needed  

### 🔒 Robust Auth System
- JWT-based login & registration  
- HttpOnly cookies for security  
- BCrypt hashed passwords  

### 🎨 Developer-First UI/UX
- Minimal dark mode design  
- Responsive sidebar + grid layout  
- Smooth, subtle animations  
- Toast notifications (no intrusive popups)

---

# 🛠️ Tech Stack

### **Frontend**
- React.js (Vite)  
- CSS Modules  
- Axios  
- React Router DOM  

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MongoDB (Atlas)  
- Mongoose ODM  

### **Chrome Extension**
- Manifest V3  

---

# 🗄️ Database Design (DBMS Assignment Core)

Even though MongoDB is a NoSQL database, the design follows DBMS principles:  
**Normalization, Constraints, Indexing, and Relationship Mapping**

## 📘 ER Relationships
- **User → Snippets:** One-to-Many  
- **Snippets ↔ Tags:** Many-to-Many  

## 🧬 Collections

### **User**
- `_id` — ObjectId  
- `username` — String  
- `email` — String (unique)  
- `password` — Hashed  

### **Snippet**
- `_id`  
- `user` — ObjectId (ref: User)  
- `title`  
- `content`  
- `language`  
- `tags` — Array of ObjectIds (ref: Tag)  

### **Tag**
- `_id`  
- `name`  
- `user` — ObjectId  
- **Composite Unique Index:** `{ user, name }`  
  → prevents duplicate tags per user  

---

# ⚙️ Installation Guide

### **1. Clone the Repository**
```bash
git clone https://github.com/KeertanaGupta/Dev-Vault.git
cd Dev-Vault
````

---

### **2. Backend Setup**

```bash
cd backend
npm install
```

Create `.env` inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

---

### **3. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

### **4. Chrome Extension Setup**

1. Open Chrome → `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `extension/` folder
5. Pin the extension

---

# 📡 API Endpoints

| Method | Endpoint              | Purpose              | Access  |
| ------ | --------------------- | -------------------- | ------- |
| POST   | `/api/users/register` | Register new user    | Public  |
| POST   | `/api/users/login`    | Login & set cookie   | Public  |
| GET    | `/api/users/profile`  | Fetch logged-in user | Private |
| GET    | `/api/snippets`       | Get all snippets     | Private |
| POST   | `/api/snippets`       | Add new snippet      | Private |
| PUT    | `/api/snippets/:id`   | Update snippet       | Private |
| DELETE | `/api/snippets/:id`   | Delete snippet       | Private |
| GET    | `/api/tags`           | Get tags             | Private |

---

# 📸 Screenshots

### 🖥️ Dashboard (Dark Mode)

<img width="1919" height="936" alt="Image" src="https://github.com/user-attachments/assets/a134e366-aedb-4302-a645-2180c7ca0985" />

### 🔗 Chrome Extension

<img width="1919" height="976" alt="Image" src="https://github.com/user-attachments/assets/98be4c52-af5f-40f6-b6f0-08cfd8edf867" />

---

<img width="1917" height="322" alt="Image" src="https://github.com/user-attachments/assets/2834e924-808e-4b8e-abdf-be1d1f3c1614" />

---

# 🔮 Future Roadmap

* Syntax highlighting for all languages
* Public/Private snippet sharing
* VS Code extension integration
* AI-based snippet categorization
* Keyboard shortcut: Quick Add Snippet
* Folder system for advanced organization

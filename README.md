<h1> MERN Stack Authentication System</h1>

🚀 A complete **MERN stack authentication system** that demonstrates secure login, registration, email verification, and password reset functionalities.  
This project is built with a modern frontend (React 19 + TailwindCSS) and a robust backend (Node.js + Express + PostgreSQL), deployed fully on **Render**.  

🔗 **Live Demo:** [Click Here](https://mern-auth-frontend-l76j.onrender.com)

---

## 📌 Features

- 🔐 **User Authentication**  
  - Register a new account.  
  - Login with persistent sessions (7 days).  
  - Secure logout functionality.  

- 🛡️ **Security**  
  - Tokens are stored in **HTTP-only cookies** (hidden from browser, not accessible via JS).  
  - Session remains valid for **7 days** unless user logs out.  

- 📧 **Email Verification & Password Reset**  
  - Verify account via registered email using Nodemailer.  
  - Forgot password? Reset securely through email verification.  

- 👤 **Personalized Welcome Page**  
  - After login or registration, users are redirected to a **welcome page showing their name**.  

- 🎨 **Modern Frontend**  
  - Built with React 19, TailwindCSS, React Router DOM.  
  - State management with Redux.  
  - API requests handled with Axios.  

- 🗄 **Database**  
  - PostgreSQL for secure and reliable data storage.  

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- Cookies (HTTP-only, Secure)
- Nodemailer

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Redux
- TailwindCSS

### Deployment
- **Render** (both backend & frontend hosted via GitHub)

---

## 📂 Project Structure
<ul>mern-auth-system/ <br/>
<li>│── backend/ # Node.js + Express + PostgreSQL (Authentication APIs)</li>
<li>│── frontend/ # React 19 + Vite + Redux + TailwindCSS</li>
<li>│── README.md # Project documentation</li>
</ul>

<p>Thanks for visit!</p>

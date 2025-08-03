<p align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Samarpan Math Academy Logo" width="80" />
</p>

<h1 align="center">🎓 Samarpan Math Academy</h1>
<p align="center"><b>E-Learning Platform with AI-Powered Math Tools</b><br>
<i>Your all-in-one solution for mastering mathematics!</i>
</p>

<p align="center">
  <a href="https://samarpan-math-academy.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel" /></a>
  <a href="https://www.youtube.com/watch?v=-I-ZQTPgdJk"><img src="https://img.shields.io/badge/YouTube%20Demo-Watch%20Now-red?style=for-the-badge&logo=youtube" /></a>
  <a href="https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues"><img src="https://img.shields.io/github/issues/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge" /></a>
  <a href="https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/stargazers"><img src="https://img.shields.io/github/stars/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge" /></a>
  <a href="https://t.me/Samarpanacademy"><img src="https://img.shields.io/badge/Telegram-Join%20Now-blue?style=for-the-badge&logo=telegram" /></a>
</p>

---

## 🚀 Overview

**Samarpan Math Academy** is a modern MERN stack e-learning platform designed to empower students in their mathematics journey. It combines structured courses, interactive lectures, and advanced AI tools for a personalized and engaging learning experience.

---

## ✨ Features

- 🔒 **Secure Authentication**
  - Email OTP verification
  - Google Sign-In (OAuth 2.0)
  - Password reset via email
  - Role-based access (User, Admin, Super Admin)
- 📚 **Course Management**
  - Browse public courses
  - Detailed course descriptions
  - Student dashboard for enrolled courses
  - Payment integration with Razorpay
- 🎥 **Lecture & Progress Tracking**
  - Interactive video lectures
  - Track completion and progress
- 🤖 **AI-Powered Tools**
  - MCQ Quiz Generator (Google Gemini API)
  - Formula Generator (KaTeX rendering)
  - Personalized recommendations
  - AI-driven performance analysis
- 🛠️ **Admin Panel**
  - Dashboard with key statistics
  - Manage courses, lectures, user roles (Super Admin)
- 💻 **Modern & Responsive UI**
  - Built with React.js & Tailwind CSS
  - Animated, interactive, fully responsive design

---

## 🖥️ Tech Stack

| Frontend                | Backend                | Database       | AI Integration      |
|------------------------ |-----------------------|----------------|---------------------|
| React.js, Tailwind CSS  | Node.js, Express.js   | MongoDB Atlas  | Google Gemini API   |
| React Router DOM        | JWT, bcrypt, multer   | Mongoose       | KaTeX               |
| Axios, Recharts, KaTeX  | Nodemailer, Razorpay  |                |                     |
| Vite, React Hot Toast   | Google Auth Library   |                |                     |

---

## ⚡ Live Demo

- **Frontend:** [samarpan-math-academy](https://samarpan-math-academy.vercel.app)
- **YouTube Demo:** [youtube.com](https://www.youtube.com/watch?v=-I-ZQTPgdJk)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v8+)
- MongoDB Atlas account
- Google Cloud Project (OAuth & Gemini API)
- Razorpay account
- Gmail (App Password enabled)

### 1. Clone the Repository

```bash
git clone https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy.git
cd E-Learning-Platform-Samarpan-Math-Academy
```

### 2. Backend Setup

```bash
cd server
# Create .env file with your credentials
npm install
npm run dev
```

**Sample `.env` Variables:**
```
PORT=5000
DB="YOUR_MONGODB_ATLAS_URI"
JWT_SECRET="YOUR_VERY_STRONG_RANDOM_JWT_SECRET"
Activation_Secret="YOUR_ACTIVATION_SECRET"
Forgot_Secret="YOUR_FORGOT_PASSWORD_SECRET"
Password="YOUR_GMAIL_APP_PASSWORD"
Gmail="YOUR_GMAIL_ADDRESS"
Razorpay_Key="YOUR_RAZORPAY_KEY_ID"
Razorpay_Secret="YOUR_RAZORPAY_SECRET"
GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_OAUTH_CLIENT_SECRET"
frontendurl="http://localhost:5173"
JWT_EXPIRE=1h
```

### 3. Frontend Setup

```bash
cd ../frontend
# Create .env with your Google OAuth client ID
npm install
npm run dev
```

**Sample `.env` (Frontend):**
```
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"
```

### 4. Google Cloud Console Setup

- Add `http://localhost:5173` to "Authorized JavaScript origins" and "redirect URIs" for your OAuth Client.

---

## 🙋‍♂️ User Roles & Access

- **Student:** Register, log in, browse/enroll, watch lectures, use AI tools.
- **Admin:** Manage courses/lectures, view stats.
- **Super Admin:** All admin privileges + manage user roles.

---

## 🔍 Explore

- **AI Tools:** Generate quizzes, formulas, personalized recommendations, and performance analytics.
- **Course Enrollment:** Browse and unlock courses with secure payments.
- **Admin Panel:** Manage content and users.

---

## 🤝 Contributing

Contributions are welcome!  
If you find a bug or have a feature request, [open an issue](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues) or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact & Community

- 👨‍💻 Developer: [Shravan Kumar](https://github.com/SHRAVANKUMAR00)
- ✉️ Email: shravankumar00549@gmail.com
- 💬 Phone: +91 7827972277

---

<p align="center"><b>Empowering your mathematics journey with technology & AI!</b></p>

---



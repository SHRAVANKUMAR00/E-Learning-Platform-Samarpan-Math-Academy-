🎓 Samarpan Math Academy

📚 E-Learning Platform with AI-Powered Math Tools

Samarpan Math Academy is a modern MERN stack e-learning platform crafted to empower students in their mathematics journey. With structured courses, interactive lectures, and advanced AI integration, it delivers a personalized and engaging learning experience. From dynamic quizzes and instant formula generation to insightful performance analytics, Samarpan Math Academy is your all-in-one solution for mastering mathematics.

✨ Features

🔒 User Authentication & Authorization

📨 Secure registration with Email OTP verification

🔑 Standard login/logout functionality

🔁 Password reset via email

🌐 Google Sign-In (OAuth 2.0)

🛡️ Role-based access (User, Admin, Super Admin)

📚 Course Management

🔍 Browse all available courses (public)

📝 Detailed course descriptions

💳 Payment integration with Razorpay

🏠 Student dashboard for enrolled courses

🎥 Lecture & Progress Tracking

▶️ Access interactive video lectures

📈 Track lecture completion and course progress

🤖 AI-Powered Learning Tools

📝 Quiz Generator: Create MCQ quizzes on math topics and difficulty levels using Google Gemini API

🧮 Formula Generator: Instantly generate comprehensive math formula lists with KaTeX rendering

🎯 Personalized Recommendations: Tailored learning suggestions based on quiz performance

📊 Performance Analysis: AI-driven reports and visualizations of quiz history and progress

🛠️ Admin Panel

📊 Dashboard with key statistics (Courses, Lectures, Users)

➕➖ Manage (add/delete) courses and lectures

👑 Update user roles (Super Admin only)

💻 Modern & Responsive UI

⚛️ Built with React.js and Tailwind CSS

📱 Fully responsive and intuitive design

✨ Engaging animations and interactive elements

🚀 Live Demo
Experience the Samarpan Math Academy live!

🌐 Frontend: samarpan-math-academy.vercel.app

🎬 YouTube Demo: Watch on YouTube

💻 Technologies Used
🖥️ Frontend
⚛️ React.js

🔗 React Router DOM

🎨 Tailwind CSS

🌐 Axios

🔔 React Hot Toast

🖼️ React Icons

📊 Recharts

🧮 KaTeX

🔐 @react-oauth/google

⚡ Vite

🗄️ Backend
🟩 Node.js

🚂 Express.js

🍃 MongoDB & Mongoose

⚙️ dotenv

🔑 jsonwebtoken (JWT)

🔒 bcrypt

🔗 cors

📦 multer

✉️ nodemailer

💳 Razorpay

🌍 node-fetch

🛡️ google-auth-library

🗃️ Database
☁️ MongoDB Atlas

🤖 AI Integration
🧠 Google Gemini API

⚙️ Setup & Installation (Local)
To run this project locally, follow these steps:

Prerequisites
💻 Node.js (v18+)

📦 npm (v8+)

🍃 MongoDB Atlas Account (for database)

☁️ Google Cloud Project (for Google OAuth & Gemini API)

💳 Razorpay Account (for payments)

📧 Gmail Account (for Nodemailer - enable App Passwords)

1. Clone the Repository
git clone https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy.git
cd E-Learning-Platform-Samarpan-Math-Academy


2. Backend Setup (server directory)
cd server


Create .env file:
Create a file named .env in the server directory and add the following environment variables. Replace the placeholder values with your actual credentials.

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
frontendurl="http://localhost:5173" # For local development
JWT_EXPIRE=1h



Important: Ensure your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are from a "Web application" OAuth client ID in Google Cloud Console.

Important: For frontendurl, use http://localhost:5173 for local development. For deployed versions, this will be your Vercel URL.

Install Dependencies:

npm install



Run the Backend Server:

npm run dev



The server should start on http://localhost:5000.

3. Frontend Setup (frontend directory)
Open a new terminal and navigate to the frontend directory:

cd ../frontend



Create .env file:
Create a file named .env in the frontend directory and add your Google Client ID.

VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"



Important: This VITE_ prefix is crucial for Vite to expose the variable to the client-side.

Install Dependencies:

npm install



Run the Frontend Development Server:

npm run dev



The frontend should open in your browser, usually at http://localhost:5173.

4. Google Cloud Console Configuration (for Local Development)
For Google Login to work locally, you must configure your OAuth 2.0 Client ID in Google Cloud Console:

Go to Google Cloud Console > APIs & Services > Credentials.

Edit your "Web application" OAuth 2.0 Client ID.

Under "Authorized JavaScript origins", add:

http://localhost:5173

Under "Authorized redirect URIs" (if applicable for your specific flow), add:

http://localhost:5173

Save changes.

🚀 Usage
User Roles
Student: Can register, log in, browse all courses, enroll in courses (via Razorpay), watch lectures, use AI tools (Quiz Generator, Formula Generator, Recommendations, Performance Analysis).

Admin: Can manage courses (add/delete), manage lectures (add/delete), view admin dashboard stats.

Super Admin: Has all Admin privileges, plus can manage user roles.

Key Features to Explore
AI Tools: Navigate to the "AI Tools" section to generate quizzes, formulas, and get personalized recommendations/analysis.

Course Enrollment: Explore courses and proceed to payment to unlock lectures.

Admin Panel: Log in with an admin account to access course and user management.

🤝 Contributing
🙌 Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

📄 License
📝 This project is licensed under the MIT License.

📧 Contact
👨‍💻 Developer: Shravan Kumar 🐙 GitHub: SHRAVANKUMAR00

✉️ Email: msamarpan44@gmail.com

📞 Phone: +91 62012 12522

💬 WhatsApp Group: https://chat.whatsapp.com/Luru6pYkIqY0DU2Y2L3mode

✈️ Telegram Channel: https://t.me/Samarpanacademy

📘 Facebook: https://www.facebook.com/share/1DwhFgiFtW

📸 Instagram: https://instagram.com/m.k.yadav2000

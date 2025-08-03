Samarpan Math Academy
📚 E-Learning Platform with AI-Powered Math Tools
Samarpan Math Academy is a comprehensive MERN stack e-learning platform designed to empower students in their mathematics journey. It offers structured courses, interactive lectures, and integrates cutting-edge Artificial Intelligence to provide personalized learning experiences, including dynamic quizzes, instant formula generation, and performance analytics.

✨ Features
User Authentication & Authorization:

Secure user registration with Email OTP verification.

Standard login/logout functionality.

Password reset via email.

Google Sign-In (OAuth 2.0) for seamless registration/login.

Role-based access control (User, Admin).

Course Management:

Browse all available courses (publicly accessible).

Detailed course descriptions.

Payment integration with Razorpay for course subscriptions.

Student dashboard to view enrolled courses.

Lecture & Progress Tracking:

Access interactive video lectures for enrolled courses.

Track lecture completion and overall course progress.

🧠 AI-Powered Learning Tools:

Quiz Generator: Generate multiple-choice quizzes on specific math topics and difficulty levels (e.g., Algebra, JEE Level) using Google Gemini API.

Formula Generator: Instantly generate comprehensive lists of mathematical formulas for any chapter, class, or competitive level (with KaTeX rendering for beautiful display) using Google Gemini API.

Personalized Recommendations: Get tailored learning recommendations based on past quiz performance.

Performance Analysis: Receive detailed AI-driven reports and visualizations (charts) of quiz history and learning progress.

Admin Panel:

Dashboard with key statistics (Total Courses, Lectures, Users).

Manage (add/delete) courses.

Manage (add/delete) lectures for courses.

Update user roles (Super Admin only).

Modern & Responsive UI:

Built with React.js and Tailwind CSS for a clean, intuitive, and fully responsive user experience across all devices.

Engaging animations and interactive elements.

🚀 Live Demo
Experience the Samarpan Math Academy live!

Frontend: https://samarpan-math-academy.vercel.app

YouTube Demo: https://youtu.be/-I-ZQTPgdJk

💻 Technologies Used
Frontend
React.js: JavaScript library for building user interfaces.

React Router DOM: For client-side routing.

Tailwind CSS: Utility-first CSS framework for styling.

Axios: HTTP client for API requests.

React Hot Toast: For notifications.

React Icons: For vector icons.

Recharts: For data visualization (charts).

KaTeX: For rendering mathematical equations.

@react-oauth/google: For Google OAuth integration.

Vite: Frontend build tool.

Backend
Node.js: JavaScript runtime.

Express.js: Web framework for APIs.

MongoDB: NoSQL database.

Mongoose: ODM for MongoDB.

dotenv: For environment variables.

jsonwebtoken (JWT): For token-based authentication.

bcrypt: For password hashing.

cors: For Cross-Origin Resource Sharing.

multer: For handling file uploads.

nodemailer: For sending emails.

Razorpay: For payment gateway integration.

node-fetch: For making HTTP requests to external APIs.

google-auth-library: For Google ID token verification.

Database
MongoDB Atlas: Cloud-hosted MongoDB service.

AI Integration
Google Gemini API

🚀 Deployment
The project is deployed using a modern, scalable architecture:

Frontend: Hosted on Vercel

Deployed URL: https://samarpan-math-academy.vercel.app

Backend: Hosted on Render

Deployed URL: https://samarpan-guzg.onrender.com

Database: Hosted on MongoDB Atlas

⚙️ Setup & Installation (Local)
To run this project locally, follow these steps:

Prerequisites
Node.js (v18+)

npm (v8+)

MongoDB Atlas Account (for database)

Google Cloud Project (for Google OAuth & Gemini API)

Razorpay Account (for payments)

Gmail Account (for Nodemailer - enable App Passwords)

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
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License.

📧 Contact
For any questions or inquiries, please reach out to:

Developer: Shravan Kumar

GitHub: SHRAVANKUMAR00

Email: shravankumar46332@gamil.com

Phone: +91 7827072277

WhatsApp : +91 7827072277

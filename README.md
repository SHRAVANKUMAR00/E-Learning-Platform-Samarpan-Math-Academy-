<!-- Chosen Palette: Minimalistic Harmony (Gray-50 background, Gray-800/900 text, Purple-600 accents) -->
<!-- Application Structure Plan: The SPA is designed as a single, vertically scrollable page. It features a sticky sidebar navigation on larger screens (desktop/tablet) that allows users to quickly jump to different thematic sections (Overview, Features, Tech Stack, Live Demo, Setup, Usage, Contact). On mobile, the navigation is integrated into the main scrollable content. This structure provides a clear, linear flow of information while allowing non-linear exploration via the sidebar, making the comprehensive README content easily digestible and explorable. -->
<!-- Visualization & Content Choices:
- Overview/Features/Usage/Contact: Goal: Inform. Viz/Presentation: Headings, paragraphs, bullet points, bold text. Interaction: None (direct consumption). Justification: Purely textual information, best presented clearly. Library/Method: HTML/CSS (Tailwind).
- Live Demo/GitHub Links: Goal: Inform/Direct. Viz/Presentation: Clickable badges/links. Interaction: Direct navigation. Justification: Provides immediate access to live resources. Library/Method: HTML/CSS.
- Tech Stack: Goal: Inform/Categorize. Viz/Presentation: HTML table. Interaction: None. Justification: Clear categorization of technologies. Library/Method: HTML/CSS.
- Setup & Installation: Goal: Instruct. Viz/Presentation: Headings, numbered lists, code blocks. Interaction: None (direct consumption). Justification: Step-by-step instructions. Library/Method: HTML/CSS.
- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samarpan Math Academy - Project Overview</title>
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        .sticky-nav {
            top: 0;
            z-index: 50;
        }
        @media (min-width: 1024px) {
            .lg\:sticky-nav {
                position: sticky;
            }
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800">
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Sidebar Navigation (Sticky on larger screens) -->
        <nav class="lg:w-64 bg-white shadow-lg p-6 lg:h-screen lg:sticky-nav">
            <div class="flex items-center justify-center lg:justify-start mb-6">
                <img src="[https://img.icons8.com/color/96/000000/graduation-cap.png](https://img.icons8.com/color/96/000000/graduation-cap.png)" alt="Samarpan Math Academy Logo" class="w-16 h-16 mr-3" />
                <h1 class="text-2xl font-bold text-gray-900 hidden lg:block">Samarpan Math Academy</h1>
            </div>
            <ul class="space-y-3">
                <li><a href="#overview" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">🚀 Overview</a></li>
                <li><a href="#features" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">✨ Features</a></li>
                <li><a href="#tech-stack" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">💻 Tech Stack</a></li>
                <li><a href="#live-demo" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">⚡ Live Demo</a></li>
                <li><a href="#setup" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">⚙️ Setup & Installation</a></li>
                <li><a href="#usage" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">🚀 Usage</a></li>
                <li><a href="#contributing" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">🤝 Contributing</a></li>
                <li><a href="#license" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">📄 License</a></li>
                <li><a href="#contact" class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200 font-medium">📧 Contact</a></li>
            </ul>
        </nav>

        <!-- Main Content Area -->
        <main class="flex-1 p-6 lg:p-10">
            <header class="mb-10 text-center lg:text-left">
                <h1 class="text-5xl font-extrabold text-gray-900 mb-2">🎓 Samarpan Math Academy</h1>
                <p class="text-xl text-gray-600"><b>E-Learning Platform with AI-Powered Math Tools</b></p>
                <p class="text-lg text-gray-500 italic mt-1">Your all-in-one solution for mastering mathematics!</p>
                
                <div class="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                    <a href="[https://samarpan-math-academy.vercel.app](https://samarpan-math-academy.vercel.app)" target="_blank" rel="noopener noreferrer" class="inline-block"><img src="[https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel](https://img.shields.io/badge/Live%20Demo-Visit%20Now-blue?style=for-the-badge&logo=vercel)" alt="Live Demo" /></a>
                    <a href="[https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues)" target="_blank" rel="noopener noreferrer" class="inline-block"><img src="[https://img.shields.io/github/issues/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge](https://img.shields.io/github/issues/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge)" alt="GitHub Issues" /></a>
                    <a href="[https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/stargazers](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/stargazers)" target="_blank" rel="noopener noreferrer" class="inline-block"><img src="[https://img.shields.io/github/stars/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge](https://img.shields.io/github/stars/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-?style=for-the-badge)" alt="GitHub Stars" /></a>
                    <a href="[https://t.me/Samarpanacademy](https://t.me/Samarpanacademy)" target="_blank" rel="noopener noreferrer" class="inline-block"><img src="[https://img.shields.io/badge/Telegram-Join%20Now-blue?style=for-the-badge&logo=telegram](https://img.shields.io/badge/Telegram-Join%20Now-blue?style=for-the-badge&logo=telegram)" alt="Telegram" /></a>
                </div>
            </header>

            <!-- Overview Section -->
            <section id="overview" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">🚀 Overview</h2>
                <p class="text-lg text-gray-700 leading-relaxed">
                    **Samarpan Math Academy** is a modern **MERN stack** e-learning platform designed to **empower students** in their mathematics journey. It combines **structured courses**, **interactive lectures**, and **advanced AI tools** for a **personalized and engaging learning experience**.
                </p>
            </section>

            <!-- Features Section -->
            <section id="features" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">✨ Features</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">🔒 Secure Authentication</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>📨 Email OTP verification</li>
                            <li>🌐 Google Sign-In (OAuth 2.0)</li>
                            <li>🔑 Password reset</li>
                            <li>🛡️ Role-based access</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">📚 Course Management</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>🔍 Browse public courses</li>
                            <li>📝 Detailed descriptions</li>
                            <li>🏠 Student dashboard</li>
                            <li>💳 Razorpay integration</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">🎥 Lecture & Progress</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>▶️ Interactive video lectures</li>
                            <li>📈 Track completion & progress</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">🤖 AI-Powered Tools</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>📝 MCQ Quiz Generator</li>
                            <li>🧮 Formula Generator (KaTeX)</li>
                            <li>🎯 Personalized recommendations</li>
                            <li>📊 Performance analysis</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">🛠️ Admin Panel</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>📊 Dashboard with key stats</li>
                            <li>➕➖ Manage courses & lectures</li>
                            <li>👑 Manage user roles</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">💻 Modern UI</h3>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                            <li>⚛️ React.js & Tailwind CSS</li>
                            <li>📱 Fully responsive design</li>
                            <li>✨ Animated & interactive</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Tech Stack Section -->
            <section id="tech-stack" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">🖥️ Tech Stack</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left table-auto">
                        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
                            <tr>
                                <th class="px-4 py-2">Frontend</th>
                                <th class="px-4 py-2">Backend</th>
                                <th class="px-4 py-2">Database</th>
                                <th class="px-4 py-2">AI Integration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border px-4 py-2">React.js, Tailwind CSS</td>
                                <td class="border px-4 py-2">Node.js, Express.js</td>
                                <td class="border px-4 py-2">MongoDB Atlas</td>
                                <td class="border px-4 py-2">Google Gemini API</td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">React Router DOM</td>
                                <td class="border px-4 py-2">JWT, bcrypt, multer</td>
                                <td class="border px-4 py-2">Mongoose</td>
                                <td class="border px-4 py-2">KaTeX</td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Axios, Recharts, KaTeX</td>
                                <td class="border px-4 py-2">Nodemailer, Razorpay</td>
                                <td class="border px-4 py-2"></td>
                                <td class="border px-4 py-2"></td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Vite, React Hot Toast</td>
                                <td class="border px-4 py-2">Google Auth Library</td>
                                <td class="border px-4 py-2"></td>
                                <td class="border px-4 py-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Live Demo Section -->
            <section id="live-demo" class="bg-white p-8 rounded-xl shadow-lg mb-10 text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">⚡ Live Demo</h2>
                <p class="text-lg text-gray-700 mb-4">Experience the **Samarpan Math Academy** live!</p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="[https://samarpan-math-academy.vercel.app](https://samarpan-math-academy.vercel.app)" target="_blank" rel="noopener noreferrer" class="inline-block bg-purple-600 text-white py-3 px-8 rounded-full font-bold shadow-md hover:bg-purple-700 transition-colors duration-200">
                        🌐 Visit Frontend
                    </a>
                    <a href="[https://youtu.be/-I-ZQTPgdJk](https://youtu.be/-I-ZQTPgdJk)" target="_blank" rel="noopener noreferrer" class="inline-block bg-red-600 text-white py-3 px-8 rounded-full font-bold shadow-md hover:bg-red-700 transition-colors duration-200">
                        🎬 Watch YouTube Demo
                    </a>
                </div>
            </section>

            <!-- Setup & Installation Section -->
            <section id="setup" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">⚙️ Setup & Installation (Local)</h2>
                <p class="text-lg text-gray-700 leading-relaxed mb-6">Follow these steps to get the project running on your local machine:</p>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">Prerequisites</h3>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    <li>💻 Node.js (v18+)</li>
                    <li>📦 npm (v8+)</li>
                    <li>🍃 MongoDB Atlas Account</li>
                    <li>☁️ Google Cloud Project (OAuth & Gemini API)</li>
                    <li>💳 Razorpay Account</li>
                    <li>📧 Gmail (App Password enabled)</li>
                </ul>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">1. Clone the Repository</h3>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-6"><code>git clone [https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy.git](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy.git)
cd E-Learning-Platform-Samarpan-Math-Academy</code></pre>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">2. Backend Setup (`server` directory)</h3>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-3"><code>cd server</code></pre>
                <p class="text-gray-700 mb-2">Create a <code class="bg-gray-200 p-1 rounded">.env</code> file with your credentials:</p>
                <pre class="bg-gray-800 text-white p-4 rounded-md text-sm overflow-x-auto mb-6"><code>PORT=5000
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
JWT_EXPIRE=1h</code></pre>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-3"><code>npm install</code></pre>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-6"><code>npm run dev</code></pre>
                <p class="text-gray-700">The server should start on <code class="bg-gray-200 p-1 rounded">http://localhost:5000</code>.</p>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">3. Frontend Setup (`frontend` directory)</h3>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-3"><code>cd ../frontend</code></pre>
                <p class="text-gray-700 mb-2">Create a <code class="bg-gray-200 p-1 rounded">.env</code> file with your Google Client ID:</p>
                <pre class="bg-gray-800 text-white p-4 rounded-md text-sm overflow-x-auto mb-6"><code>VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"</code></pre>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-3"><code>npm install</code></pre>
                <pre class="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-6"><code>npm run dev</code></pre>
                <p class="text-gray-700">The frontend should open in your browser, usually at <code class="bg-gray-200 p-1 rounded">http://localhost:5173</code>.</p>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">4. Google Cloud Console Setup (for Local Development)</h3>
                <p class="text-gray-700 mb-2">For Google Login to work locally, configure your OAuth 2.0 Client ID:</p>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    <li>Go to <a href="[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Google Cloud Console > APIs & Services > Credentials</a>.</li>
                    <li>Edit your "Web application" OAuth 2.0 Client ID.</li>
                    <li>Under <b>"Authorized JavaScript origins"</b>, add:
                        <ul class="list-circle list-inside ml-6">
                            <li><code class="bg-gray-200 p-1 rounded">http://localhost:5173</code></li>
                        </ul>
                    </li>
                    <li>Under <b>"Authorized redirect URIs"</b> (if applicable), add:
                        <ul class="list-circle list-inside ml-6">
                            <li><code class="bg-gray-200 p-1 rounded">http://localhost:5173</code></li>
                        </ul>
                    </li>
                    <li>Save changes.</li>
                </ul>
            </section>

            <!-- Usage Section -->
            <section id="usage" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">🙋‍♂️ Usage</h2>
                <h3 class="text-2xl font-semibold text-gray-800 mb-3">User Roles</h3>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    <li><b>Student:</b> Register, log in, browse/enroll, watch lectures, use AI tools.</li>
                    <li><b>Admin:</b> Manage courses/lectures, view stats.</li>
                    <li><b>Super Admin:</b> All Admin privileges + manage user roles.</li>
                </ul>

                <h3 class="text-2xl font-semibold text-gray-800 mb-3">Key Features to Explore</h3>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li><b>AI Tools:</b> Generate quizzes, formulas, personalized recommendations, and performance analytics.</li>
                    <li><b>Course Enrollment:</b> Browse and unlock courses with secure payments.</li>
                    <li><b>Admin Panel:</b> Manage content and users.</li>
                </ul>
            </section>

            <!-- Contributing Section -->
            <section id="contributing" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">🤝 Contributing</h2>
                <p class="text-lg text-gray-700 leading-relaxed">
                    Contributions are welcome! If you find a bug or have a feature request, <a href="[https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/issues)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">open an issue</a> or <a href="[https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/pulls](https://github.com/SHRAVANKUMAR00/E-Learning-Platform-Samarpan-Math-Academy-/pulls)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">submit a pull request</a>.
                </p>
            </section>

            <!-- License Section -->
            <section id="license" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">📄 License</h2>
                <p class="text-lg text-gray-700 leading-relaxed">
                    This project is licensed under the <a href="LICENSE" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">MIT License</a>.
                </p>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="bg-white p-8 rounded-xl shadow-lg mb-10">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">📬 Contact & Community</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li><b>👨‍💻 Developer:</b> Shravan Kumar</li>
                    <li><b>🐙 GitHub:</b> <a href="[https://github.com/SHRAVANKUMAR00](https://github.com/SHRAVANKUMAR00)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">SHRAVANKUMAR00</a></li>
                    <li><b>✉️ Email:</b> <a href="mailto:shravankumar00549@gmail.com" class="text-purple-600 hover:underline">shravankumar00549@gmail.com</a></li>
                    <li><b>📞 Phone:</b> +91 62012 12522</li>
                    <li><b>💬 WhatsApp Group:</b> <a href="[https://chat.whatsapp.com/Luru6pYkIqY0DU2Y2L3mode](https://chat.whatsapp.com/Luru6pYkIqY0DU2Y2L3mode)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Join our WhatsApp Group</a></li>
                    <li><b>✈️ Telegram Channel:</b> <a href="[https://t.me/Samarpanacademy](https://t.me/Samarpanacademy)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Join our Telegram Channel</a></li>
                    <li><b>📘 Facebook:</b> <a href="[https://www.facebook.com/share/1DwhFgiFtW](https://www.facebook.com/share/1DwhFgiFtW)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">Samarpan Math Academy on Facebook</a></li>
                    <li><b>📸 Instagram:</b> <a href="[https://instagram.com/m.k.yadav2000](https://instagram.com/m.k.yadav2000)" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">@m.k.yadav2000 on Instagram</a></li>
                </ul>
            </section>
            <p class="text-center text-xl font-bold text-gray-700 mt-10">Empowering your mathematics journey with technology & AI!</p>
        </main>
    </div>

    <script>
        // Smooth scroll for internal navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>
```

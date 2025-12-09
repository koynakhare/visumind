🧏‍♀️ VisuMind — AI-Powered Knowledge Explorer

VisuMind is your intelligent workspace where you can create projects, upload PDFs & images, and interact with a smart AI assistant to get instant insights! 🧠💡

🌍 Live Application: https://visumind.vercel.app/

⚙️ Tech Stack

Frontend: Next.js, Material-UI, TailwindCSS, Framer Motion, TinyMCE
Backend: Next API Routes, MongoDB, Mongoose, Cloudinary, Multer, Formidable, JWT, bcrypt
AI: OpenAI API
State & Utilities: Redux Toolkit, React Redux, Lodash, React Hook Form, Yup, Zod
Real-time & Networking: Rate-limiter-flexible, Upstash Ratelimit, Axios
Other Tools & Libraries: Tesseract.js, Node-Tesseract-OCR, Mammoth, PDF-Parse, PapaParse

☁️ Deployment:
Frontend: Vercel
Database: MongoDB Atlas

✨ Key Features

🗂 Project Management – Easily create, manage, and organize projects

📄 File Upload – Upload PDFs and images per project

🤖 AI Assistant – Ask questions about your content and get instant AI responses

🌐 Multimodal Support – Works with both PDFs and images

⚡ Real-time Interaction – Powered by Socket.io for instant answers

🎨 Beautiful UI – Designed with React, Next.js, Material-UI & TailwindCSS

📁 Project Structure
visumind/
├─ pages/
│  ├─ api/             # API routes
│  └─ assistant.js     # AI Assistant page
├─ components/         # Reusable UI components
├─ store/              # Redux store & slices
├─ utils/              # Helper functions
├─ public/             # Static assets
└─ styles/             # Tailwind & MUI styling

💻 Usage

Create a Project – Go to the dashboard and create a new project

Upload Documents – Add PDFs or images relevant to your project

Ask Questions – Navigate to the assistant page, select your project, and query the AI

Receive Answers – Get AI-powered insights instantly!

Clone the repository:

git clone https://github.com/yourusername/visumind.git


Install dependencies:

npm install


Run the development server:

npm run dev


Open http://localhost:3000

🎯 Future Enhancements

User Authentication & Profiles

Collaborative Project Editing

Advanced AI Features – Summarization & content tagging

Mobile-Friendly Interface Improvements

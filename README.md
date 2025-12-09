<p align="center"> <img src="https://user-images.githubusercontent.com/your-username/visumind-banner.png" alt="VisuMind" width="600"/> </p> <h1 align="center">🚀 VisuMind</h1> <p align="center"> AI-Powered Knowledge Explorer – Create projects, upload PDFs & images, and get instant AI insights! 🧠💡 </p>
🌟 Features

📁 Project Management: Create, manage, and organize projects effortlessly.

📄 Upload Files: Upload PDFs and images for AI analysis.

🤖 AI Assistant: Ask questions based on your documents and get instant AI-powered answers.

🌐 Multimodal Support: Works with both text (PDFs) and images.

⚡ Real-time Interaction: Powered by Socket.io for instant responses.

🎨 Beautiful UI: Built with React, Next.js, Material-UI, and TailwindCSS.

🛠 Tech Stack & Libraries
Layer	Libraries
Frontend	React, Next.js, Material-UI (@mui/material, @mui/icons-material), TailwindCSS, Framer Motion, TinyMCE
Backend / API	Node.js, Express, Next API routes, MongoDB, Mongoose, Cloudinary, Multer, Formidable, JWT, bcrypt
AI / NLP	OpenAI API, LangChain, Tesseract.js, Node-Tesseract-OCR, Mammoth, PDF-Parse, PapaParse
State / Utils	Redux Toolkit, React Redux, Lodash, React Hook Form, Yup, Zod
Real-time / Networking	Socket.io, Socket.io-client, Rate-limiter-flexible, Upstash Ratelimit, Axios
Other Tools	Video.js, XLSX, React Markdown, React Hot Toast
🚀 Quick Start

Clone the repo

git clone https://github.com/yourusername/visumind.git
cd visumind


Install dependencies

npm install


Add environment variables
Create a .env file in the root folder:

MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret


Start the development server

npm run dev


Open http://localhost:3000

📝 Usage

Create a Project – Go to the dashboard and create a new project.

Upload Documents – Add PDFs or images relevant to the project.

Ask Questions – Navigate to the assistant page, select the project, and query the AI.

Get Answers – Receive AI responses based on your uploaded content.

📂 Project Structure
visumind/
├─ pages/          # Next.js pages
│  ├─ api/         # API routes
│  └─ assistant.js # AI Assistant page
├─ components/     # Reusable UI components
├─ store/          # Redux store & slices
├─ utils/          # Helper functions
├─ public/         # Static assets
└─ styles/         # Tailwind & MUI styling

🎯 Future Enhancements

🔐 User authentication with roles

📄 Support for additional file formats (Word, Excel)

🧩 Improved AI context for multiple documents

📤 Export AI responses as PDF reports

🌍 Multi-language support

💻 Scripts
Command	Description
npm run dev	Run in development mode
npm run build	Build for production
npm run start	Start the production server
npm run lint	Run ESLint checks

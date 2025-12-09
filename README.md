# 🧏‍♀️ VisuMind — AI-Powered Knowledge Explorer

**VisuMind** is an intelligent workspace that helps you explore knowledge through documents and images.
Create projects, upload PDFs or images, and get instant insights with a powerful AI assistant. 🧠✨

## 🌍 Live Application: 
🔗 **Production:** https://visumind.vercel.app/  
*(Deployed on Vercel | Database on MongoDB Atlas)*

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Next.js** - React framework  
- **Material-UI** - UI components library  
- **TailwindCSS** - Utility-first CSS framework  
- **Framer Motion** - Animations & transitions  
- **TinyMCE** - Rich text editor  

### 🖥️ Backend
- **Next.js API Routes** - Serverless endpoints  
- **MongoDB & Mongoose** - Database with ORM  
- **Cloudinary** - Media storage & CDN  
- **Multer / Formidable** - File upload handling  
- **JWT** - Authentication tokens  
- **bcrypt** - Password hashing  

### 🖥️ AI
- **OpenAI API** - Language & vision models  

### 🖥️ State & Utilities
- **Redux Toolkit** - State management library  
- **React Redux** - React state connector  
- **Lodash** - Utility functions  
- **React Hook Form** - Form handling library  
- **Yup** - Schema validation  
- **Zod** - Type-safe validation  
- **File & Text Processing** - Parsing & extraction tools  
- **Tesseract.js** - Browser OCR  
- **Node-Tesseract-OCR** - Node OCR  
- **Mammoth** - DOCX to HTML  
- **PDF-Parse** - PDF extraction  
- **PapaParse** - CSV parsing  
- **Rate-Limiter-Flexible** - API rate limiting  
- **Upstash Rate Limit** - Redis rate limiting  
- **Axios** - HTTP requests  

### ✨ Key Features
🗂 **Project Management**
Create, organize, and manage separate projects effortlessly.

**📄 Document Uploads**
Upload PDFs or images under each project for AI processing.

**🤖 AI Assistant**
Ask questions about your files and get instant, intelligent responses.

**🌐 Multimodal Support**
Compatible with text, PDFs, and images.

**🎨 Clean & Modern Interface**
Built using Next.js, MUI, and TailwindCSS for a smooth user experience.

### 📁 Project Structure

```text
visumind/
├─ pages/
│  ├─ api/              # API routes
│  └─ assistant.js      # AI Assistant page
├─ components/          # Reusable components
├─ store/               # Redux store & slices
├─ utils/               # Helper functions
├─ public/              # Static assets
└─ styles/              # Tailwind & MUI styling
```
### 💻 Getting Started
**Clone the repository**
git clone https://github.com/yourusername/visumind.git

**Install dependencies**
npm install

**Run the development server**
npm run dev
**Open the app at:**
http://localhost:3000

### 🎯 Future Enhancements

- User authentication & user profiles
- Collaborative project editing
- AI-based summarization & content tagging
- Improved responsive/mobile UI

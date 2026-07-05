# 🏘️ AI-Powered Neighborhood Exchange Platform

An AI-powered full-stack web application that enables users to exchange, borrow, and donate items within their local community. The platform combines modern web technologies with Google's Gemini AI to generate professional item descriptions and Cloudinary for secure image storage.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- Secure Login using JWT Authentication
- Protected Routes
- User Profile Management

### 📦 Item Management
- Create New Items
- Browse Available Items
- View Item Details
- My Items Dashboard
- Delete Own Items

### 🤖 AI-Powered Description Generator
- Generates professional item descriptions using **Google Gemini AI**
- Automatically creates concise and natural descriptions based on:
  - Item Title
  - Category
  - Condition

### 🖼️ Image Upload
- Upload item images directly from the browser
- Images stored securely using **Cloudinary**
- Instant image preview before submission

### 🤝 Exchange Module
- Send Exchange Requests
- View Sent Requests
- View Received Requests

### ☁️ Database
- MongoDB Atlas Cloud Database
- Stores:
  - Users
  - Items
  - Exchange Requests

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

## Backend
- FastAPI
- Python
- JWT Authentication
- Pydantic
- Motor (Async MongoDB Driver)

## Database
- MongoDB Atlas

## AI
- Google Gemini API

## Cloud Storage
- Cloudinary

---

# 📁 Project Structure

```
AI-Neighborhood-Exchange/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── ai/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
│
├── docs/
├── images/
├── output/
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Neighborhood-Exchange.git
```

---

## Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

Windows

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
MONGODB_URL=your_mongodb_connection_string

DATABASE_NAME=AI_Neighborhood_Exchange

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

GEMINI_API_KEY=your_gemini_api_key
```

---

## Frontend (.env)

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

# 🤖 AI Description Generator

Users can automatically generate professional item descriptions using **Google Gemini AI**.

Example Input

```
Title:
Hair Dryer

Category:
Electronics

Condition:
Good
```

Example Output

> Looking for a reliable hair dryer? This electronic item is in good condition and well-maintained. It works efficiently for daily use and is perfect for anyone looking for a dependable styling accessory. A great choice for personal use at an affordable exchange.

---

# 🖼️ Image Upload

Images are uploaded directly to **Cloudinary**.

Features

- Image Preview
- Secure Cloud Storage
- Fast Upload
- Automatic Image URL Generation


# 🔮 Future Enhancements

- Real-time Chat
- Email Notifications
- Item Recommendation System
- AI-Based Fraud Detection
- Wishlist
- Nearby Location Search
- Admin Dashboard
- Rating & Review System
- Mobile Application

---

# 📚 Learning Outcomes

This project helped in gaining hands-on experience with:

- Full Stack Web Development
- REST API Design
- JWT Authentication
- MongoDB Atlas
- React Routing
- FastAPI Backend Development
- Cloudinary Integration
- Google Gemini AI Integration
- Image Upload Handling
- Project Deployment Workflow
- Git & GitHub Version Control

---

# 👩‍💻 Author

**Shreevalli Gundal**


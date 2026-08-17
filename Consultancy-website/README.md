# PAR CAREERS & Visa Consultancy Services

A full-stack overseas careers, education, and visa consultancy platform with MongoDB Atlas persistence, JWT-based candidate & administrator authentication, SMTP email notifications, job application pipelines, and administrative management desks.

## Project Structure

```text
Consultancy-website/
├── frontend/                     # Modern React + Vite frontend application
│   ├── public/                   # Static assets & brand icons
│   ├── src/                      # React source code
│   │   ├── assets/               # Local images & logo
│   │   ├── components/           # UI components (Header, Footer, Modals)
│   │   ├── context/              # Auth & Global State Context
│   │   ├── data/                 # Initial datasets & seed content
│   │   ├── pages/                # Page views (Home, Careers, Countries, Admin, etc.)
│   │   ├── services/             # API client & auth utilities
│   │   ├── types.ts              # Shared TypeScript definitions
│   │   ├── App.tsx               # Main application component
│   │   ├── main.tsx              # React entrypoint
│   │   └── index.css             # Tailwind CSS styles
│   ├── index.html                # HTML entrypoint
│   ├── package.json              # Frontend dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   └── vite.config.ts            # Vite configuration with API proxy
│
├── backend/                      # Node.js + Express backend service
│   ├── models.ts                 # Mongoose schemas (Users, Jobs, Applications, etc.)
│   ├── server.ts                 # Express REST API, Auth, SMTP, and MongoDB logic
│   ├── package.json              # Backend dependencies and scripts
│   └── tsconfig.json             # TypeScript backend configuration
│
└── README.md                     # Project overview & running guide
```

---

## Getting Started

### 1. Frontend Setup
```bash
cd Consultancy-website/frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 2. Backend Setup
```bash
cd Consultancy-website/backend
npm install
npm run dev
```
The backend API server will start at `http://localhost:5000` (or the configured `PORT`).

---

## Environment Configuration

### Backend (`Consultancy-website/backend/.env`)
- `PORT`: Port for the API server (default: `5000` or `3000`)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT signing
- `SMTP_USER`: Gmail address for admin alert emails
- `SMTP_PASS`: Gmail app password for SMTP
- `ADMIN_ALLOWLIST`: Comma-separated admin emails

### Frontend (`Consultancy-website/frontend/.env`)
- `VITE_API_URL`: Backend API base URL (optional, defaults to `/api` via Vite proxy)

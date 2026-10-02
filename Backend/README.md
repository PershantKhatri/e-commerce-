# Professional Full-Stack E-Commerce Backend

A production-ready, highly scalable full-stack e-commerce backend built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

## Technologies Used
- **Node.js** & **Express.js** (REST API Framework)
- **MongoDB** & **Mongoose** (Database & ODM with Indexes & Pagination)
- **JWT (JSON Web Tokens)** (Secure User & Admin Authentication)
- **Bcrypt.js** (Password Hashing)
- **Helmet, CORS, & Express Rate Limit** (Security Hardening)
- **Multer** (Image Upload Support)

---

## Project Structure
```text
backend/
├── src/
│   ├── config/       # Database connection
│   ├── controllers/  # Route business logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth, Admin, Error, Upload handlers
│   ├── utils/        # Token & response generators
│   ├── seed/         # 1000+ Product seeder script
│   └── app.js        # Express app configuration
├── server.js         # Entry point
├── package.json      # Dependencies and scripts
├── .env              # Environment variables (private)
├── .env.example      # Template for environment variables
├── .gitignore        # Ignored files/folders
└── README.md         # Project documentation
# Task Management API

A RESTful API for managing tasks with role-based access control, built using Node.js, Express, Sequelize, and PostgreSQL.

---

## 🚀 Features

- JWT Authentication (Register/Login)
- Role-based access control (`admin`, `user`)
- Task CRUD (Create, Read, Update, Delete)
- Time tracking: `createdAt → updatedAt` diff
- Pagination and filtering
- Swagger API documentation
- Environment-based config with Zod validation

---

## 📦 Tech Stack

- Node.js + Express
- PostgreSQL
- Sequelize ORM
- Zod (validation)
- JWT + bcrypt (auth)
- Swagger (OpenAPI 3.0 docs)
- Winston (logging)

---

## 🛠️ Getting Started

### 1. Clone and install

```bash
git clone https://github.com/alexindevs/task_management_app_scelloo
cd task_management_app_scelloo
npm install
````

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run Migrations

```bash
npx sequelize-cli db:migrate
```

### 4. Start the App

```bash
npm run dev
```

---

## 📘 API Docs

Access Swagger docs at:
`http://localhost:3000/docs`

Access Postman docs at:
`https://documenter.getpostman.com/view/28783766/2sB2qdfKUW`

---

## 🧪 Testing the API

Use Postman or cURL to test:

```http
POST /auth/register
POST /auth/login
GET  /tasks
POST /tasks
PUT  /tasks/:id
DELETE /tasks/:id
GET /report-time
GET /report
```

---

## 🔐 Roles

- **User**: Can only manage their own tasks.
- **Admin**: Can manage all tasks, view reports.

---

## 👨‍🔧 Scripts

- `npm run dev` – Run in dev mode
- `npm run build` – Compile TypeScript
- `npm run start` – Start compiled server

---

## ✨ Author

Made with 🔥 by Alexin

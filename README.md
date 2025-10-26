# 🧩 CRUD_Prisma (NestJS + Prisma + MySQL)

A RESTful API built with **NestJS**, **Prisma ORM**, and **MySQL** providing full CRUD functionality for `Users` and `Posts`.  
Includes **Swagger documentation** for easy API testing and exploration.

---

## 🚀 Features

- Built with **NestJS** (modular architecture)
- **Prisma ORM** for database modeling and querying
- **MySQL** support
- Full **CRUD operations** for `Users` and `Posts`
- DTO validation with `class-validator`
- Swagger API documentation

---

## 📦 Tech Stack

| Technology      | Purpose           |
| --------------- | ----------------- |
| NestJS          | Backend framework |
| Prisma          | ORM               |
| MySQL           | Database          |
| Swagger         | API documentation |
| Class-validator | DTO validation    |

---

## 🛠️ Setup Instructions

1. Clone the repository: `git clone https://github.com/sudeepgtm777/CRUD_Prisma.git`  
   `cd CRUD_Prisma`

2. Install dependencies: `npm install`

3. Configure environment variables in a `.env` file:  
   `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"`  
   Example: `DATABASE_URL="mysql://root:password@localhost:3306/crud_prisma"`

4. Run Prisma migrations: `npx prisma migrate dev`

5. Start the server: `npm run start:dev`  
   Server runs on: `http://localhost:3000`

---

## 🧠 Swagger API Documentation

Swagger UI is available at: `http://localhost:3000/api`

## 📘 API Endpoints

### 👤 User Routes

- **POST `/users`**: Create a new user
- **GET `/users`**: Get all users
- **GET `/users/:id`**: Get user by ID
- **PATCH `/users/:id`**: Update user details
- **PATCH `/users/:id/settings`**: Update user settings
- **DELETE `/users/:id`**: Delete user

### 📝 Post Routes

- **POST `/posts`**: Create a single post
- **POST `/posts/group`**: Create a group post with multiple users
- **GET `/posts/group`**: Get all group posts

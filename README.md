# 📚 School Management API

A backend API built using Node.js, Express.js, and MySQL to manage school data.
It allows users to add schools and retrieve a list of schools sorted by proximity to a given location.

---

## 🌐 Live API

```text
https://educasebackendtask-production.up.railway.app/
```

---

## 🚀 Features

* Add a new school with validation
* Prevent duplicate school entries
* Fetch all schools sorted by distance from user location
* Clean architecture (Controller → Service → DB)
* Deployed on cloud (Railway)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL (Railway)
* Postman (API Testing)

---

## 📂 Project Structure

```
config/         → Database configuration
controllers/    → Request handling logic
routes/         → API endpoints
services/       → Business logic
utils/          → Utility functions (distance calculation)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
PORT=
```

### Example (Railway)

```
DB_HOST=mysql.railway.internal
DB_USER=your_username
DB_PASS=your_password
DB_NAME=railway
DB_PORT=3306
PORT=5000
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    UNIQUE (name, address)
);
```

---

## 📌 API Endpoints

### ➤ Add School

**Endpoint:**

```
POST /api/school/addSchool
```

**Request Body:**

```json
{
  "name": "ABC School",
  "address": "Pune",
  "latitude": 18.5204,
  "longitude": 73.8567
}
```

**Response:**

```json
{
  "message": "School added successfully"
}
```

---

### ➤ List Schools

**Endpoint:**

```
GET /api/school/listSchools?latitude=18.52&longitude=73.85
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "Pune",
    "latitude": 18.52,
    "longitude": 73.85,
    "distance": 0.2
  }
]
```

---

## 📏 Distance Calculation

* Uses the **Haversine formula**
* Distance is returned in **kilometers (km)**

---

## 🧪 Testing

* Tested using Postman
* Includes:

  * Add School API
  * List Schools API
  * Example requests and responses

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 💡 Notes

* Duplicate entries are prevented using:

  * Backend validation
  * Database UNIQUE constraint
* Environment variables are used for secure configuration
* Clean and modular backend structure

---

## 👨‍💻 Author

Dhananjay Deshmukh

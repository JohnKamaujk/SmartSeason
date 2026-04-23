## 🌱 SmartSeason — Field Monitoring System

> A full-stack application for tracking crop progress, managing agricultural fields, and coordinating field agents.

---

## 🔗 Live Demo (Optional)
- Frontend: [https://smart-season-five.vercel.app/](https://smart-season-five.vercel.app/)
- Backend API: [https://smartseason-3gg6.onrender.com](https://smartseason-3gg6.onrender.com)

---

## 📸 Screenshots

### 🏠 Home Page
![Home](./screenshots/home.png)

---

### 📊 Dashboard (Admin)
![Dashboard](./screenshots/craetefield.png)

---

### 🌾 Field Management
![Fields](./screenshots/fieldmanagement.png)

---

### 🔄 login.png 
![Updates](./screenshots/login.png)

---

---

### 🔄 register 
![Updates](./screenshots/register.png)

---

## 🚀 Overview

SmartSeason is designed to help agricultural coordinators monitor crop progress across multiple fields during a growing season.

It provides:
- centralized field management  
- real-time updates from field agents  
- clear visibility into crop stages and risks  

---

## 🧩 Key Features

### 🔐 Authentication & Authorization
- Secure login & registration (JWT)
- Role-based access:
  - **Admin**
  - **Field Agent**

---

### 🌾 Field Management
- Create and manage fields
- Assign fields to agents
- Store:
  - field name
  - crop type
  - planting date
  - current stage

---

### 📈 Crop Lifecycle Tracking
Fields progress through:

- `PLANTED`
- `GROWING`
- `READY`
- `HARVESTED`

---

### 📊 Smart Field Status (Computed)
Each field automatically computes status:

- `ACTIVE` → normal progress  
- `AT_RISK` → delayed or no updates  
- `COMPLETED` → harvested  

---

### 📝 Field Updates System
- Agents can:
  - update stage
  - add observations
- Each field displays the **latest observation**
- Designed as an **append-only audit trail**

---

### 📊 Dashboard
#### Admin Dashboard
- Total fields
- Status breakdown
- All field activity

#### Agent Dashboard
- Assigned fields only
- Field updates access

---

## 🏗️ Architecture

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT authentication

### Frontend
- React
- Axios
- React Router

---

## 📁 Project Structure

```

SmartSeason/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── config/
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── package.json

````

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/SmartSeason.git
cd SmartSeason
````

---

## 🐘 2. Setup PostgreSQL

Ensure PostgreSQL is installed and running.

```bash
sudo -i -u postgres
psql
```

Create database:

```sql
CREATE DATABASE fieldwatch;
CREATE USER fielduser WITH PASSWORD 'strongpassword';
GRANT ALL PRIVILEGES ON DATABASE fieldwatch TO fielduser;
```

Exit:

```bash
\q
exit
```

---

## 🛠️ 3. Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
DATABASE_URL="postgresql://fielduser:strongpassword@localhost:5432/fieldwatch"
JWT_SECRET="your_secret_key"
PORT=5000
```

---

### Run Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

### Start Backend

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 💻 4. Frontend Setup

```bash
cd ../frontend
npm install
```

### Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

### Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔑 Demo Credentials

### Admin

```
email: johnjkkamau@gmail.com
password: 123456
```

### Agent

```
email: mary@gmail.com
password: 123456
```

---

## 🧠 Design Decisions

* Prisma ORM for clean database interactions
* JWT for stateless authentication
* Role-based middleware for access control
* Computed field status instead of stored values
* Latest update optimization for performance

---

## ⚠️ Assumptions

* One agent per field
* Updates are append-only (audit trail)
* Status derived from activity, not manually set

---

## 🚀 Future Improvements

* 📊 Data visualization (charts)
* 📱 Mobile responsiveness
* 🔔 Notifications system
* 🌍 Deployment (Vercel + Render + Neon DB)
* ⚡ Real-time updates (WebSockets)

---

## 🧪 API Overview

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Fields

* `GET /fields`
* `POST /fields`
* `POST /fields/:id/update`

### Users

* `GET /users/agents`

---

## 👨‍💻 Author

**John Kamau**

* GitHub: [https://github.com/JohnKamaujk](https://github.com/JohnKamaujk)
* Portfolio: [https://johnnyk.vercel.app/](https://johnnyk.vercel.app/)

---

## ⭐ Final Note

This project demonstrates:

* full-stack system design
* REST API development
* role-based architecture
* real-world problem solving

```

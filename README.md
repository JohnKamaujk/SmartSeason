---

```md
# 🌱 SmartSeason Field Monitoring System

SmartSeason is a full-stack web application used to monitor crop progress across multiple fields during a growing season.

It allows admins to manage fields and assign agents, while field agents update crop stages and add observations.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Role-based access (Admin / Agent)

### 👥 Roles

#### Admin
- Create and manage fields
- Assign fields to agents
- View all fields
- Monitor updates from all agents

#### Field Agent
- View assigned fields
- Update field stage
- Add observations (notes)

---

### 🌾 Field Management
Each field contains:
- Name
- Crop type
- Planting date
- Current stage
- Assigned agent

---

### 📈 Field Lifecycle
- PLANTED
- GROWING
- READY
- HARVESTED

---

### 📊 Field Status (Computed)
- ACTIVE
- AT_RISK
- COMPLETED

---

### 📝 Updates System
- Agents can update:
  - Field stage
  - Observations
- Each field displays the **latest update**

---

### 📊 Dashboard
- Total number of fields
- Status breakdown (Active / At Risk / Completed)
- Overview of field activity

---

## 📁 Project Structure

```

SmartSeason/
├── backend/
├── frontend/

````

---

# ⚙️ Setup Guide

## 1. Clone the Project

```bash
git clone https://github.com/your-username/SmartSeason.git
cd SmartSeason
````

---

## 2. Setup PostgreSQL

Make sure PostgreSQL is installed and running.

Login as postgres user:

```bash
sudo -i -u postgres
psql
```

Create database and user:

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

## 3. Backend Setup

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

### Run Prisma Setup

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

## 4. Frontend Setup

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

## 🔑 Demo Accounts

### Admin

```
email: admin@test.com
password: admin123
```

### Agent

```
email: agent@test.com
password: agent123
```

---

## 🧠 Notes

* Only Admins can create fields
* Agents can only update their assigned fields
* Field status is computed automatically based on activity

---

## 🏁 Summary

SmartSeason helps:

* Track crop progress
* Manage field operations
* Improve coordination between admins and field agents

```

---

```

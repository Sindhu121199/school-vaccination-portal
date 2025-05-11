# 🏫 School Vaccination Portal

A full-stack application to manage student vaccination records, schedule drives, and generate actionable reports for school health coordinators.

---

## 📌 Features

- Admin login authentication
- Manage students: add, edit, delete
- Bulk student import via CSV upload
- Vaccination tracking per student
- Drive scheduling and eligibility mapping
- Dashboard with stats, alerts, and export options (PDF, Excel)
- Class and vaccination status filters

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (with Mongoose ODM)

---

## 📂 Folder Structure

school-vaccination-portal/
│
├── backend/ # Node.js + Express API
│ ├── routes/ # API route files
│ ├── models/ # Mongoose schemas
│ ├── uploads/ # CSV uploads
│ └── index.js # Entry point
│
├── frontend/ # React UI
│ ├── src/
│ │ ├── pages/ # Dashboard, Students, Drives, Reports
│ │ ├── components/ # Sidebar, Modals, Charts
│ └── App.js
│
└── .env.example # Sample environment file


---

## 🚀 Getting Started Locally

### Backend

cd backend
npm install
# Create a .env file with MONGO_URI
node index.js

### Frontend

cd frontend
npm install
npm start

🔗 Links
📽️ Demo Video: Watch on Google Drive

📄 Final Documentation: Included in LMS submission

📬 Postman Collection: Provided in the repository (if added)

🤝 Acknowledgements
Project submitted as part of SE ZG503 FSAD II SEM 2024-25
Guided by Akshaya Ganesan

## 📌 Base Project Reference

This project is built on top of an existing open-source HRMS:
MERN Employee Salary Management System.

The original structure and core modules were reused and enhanced.

# 🏗️ HRMS Overtime & Payroll Enhancement

This project is based on an existing HRMS (Employee Salary Management System) and enhanced as part of a real-world assignment.

The goal was to simulate actual developer work:
- Understanding an existing codebase
- Adding a new feature
- Fixing production-level tickets quickly

---

## 🚀 Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB / MySQL (based on base project)
- API: REST

---

## 📌 Base Project

Used: MERN Employee Salary Management System

Reason:  
It already includes employee + payroll modules, making it suitable for adding overtime and validation features.

---

## ✨ Features Implemented

### 1. Overtime Entry System (Main Feature)

Managers can:
- Select worker
- Enter date, overtime hours, and reason
- Submit entry for payroll processing

#### ✅ Frontend Validations
- All fields required
- Hours must be between 1–6
- Date cannot be future
- Date cannot be older than 7 days
- Reason must be at least 10 characters

#### ✅ Backend Validations
- All frontend validations enforced again
- Worker must exist
- No duplicate entry (same worker + same date)
- Monthly overtime limit ≤ 60 hours

---

## ⚡ Ticket Fixes (Real-world Simulation)

### LF-101 → Date Format Fix
- Changed date format from `MM/DD/YYYY` → `DD/MM/YYYY` in payslip

### LF-102 → Salary Validation
- Prevented negative salary values (frontend + backend)

### LF-103 → Designation Field
- Added dropdown field (Mason, Electrician, etc.)
- Stored in DB
- Displayed in employee list

### LF-104 → CSV Export
- Added "Download CSV" button
- Export includes name, designation, salary

### LF-105 → Mobile UI Fix
- Fixed table overflow issue
- Added responsive scroll for smaller screens

---

## 🛠️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/Sweety-Mitra/hrms-overtime-ticket-system.git
cd mern-employee-salary-management
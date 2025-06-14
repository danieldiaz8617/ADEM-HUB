# ADEM Hub

A centralized platform for managing student associations, events, and student engagement within the ADEM Faculty at the University of Puerto Rico - Mayagüez.

**View the deployed app → [View Page](https://app.appsmith.com/applications/68138bef6b85093fd10b0c6e/pages/68138bef6b85093fd10b0c76)**

---

## 📖 Overview

ADEM Hub was developed as part of the SICI 4097 System Development course. The platform solves the problem of scattered event coordination, poor student engagement, and limited visibility into association activities. 

The system enables student associations to manage their information, propose events, track attendance, and foster engagement through leaderboards, all within a single centralized interface.

---

## 🚀 Features

- **Association Profiles:** Customizable association profiles with branding, contact info, and membership options.
- **Event Calendar:** Event proposals submitted via tickets and displayed upon approval.
- **Ticket System:** Associations submit change requests reviewed by admins to ensure compliance.
- **Leaderboards:** Tracks student participation and motivates associations through rankings.
- **Role-Based Access:** Different permissions for Admins, Associations, and Public users.
- **Google Sheets Backend:** Simplifies data access and management for non-technical users.

---

## 🏗️ System Architecture

| Layer         | Technology |
| ------------- | ----------- |
| Frontend      | Appsmith |
| Backend       | Google Sheets |
| Deployment (Private)    | Docker + Cloudflare Tunnel |
| Authentication | Spreadsheet-based login (future: SSO integration) |
| Version Control | GitHub |

---

## 📊 Application Modules

- **Home:** Landing page with platform overview and login.
- **Associations:** Displays all registered student associations.
- **Leaderboards:** Ranks associations based on event participation data.
- **Admin Panel:** Admin interface for ticket management and data updates.
- **Tickets:** Association users submit tickets for new events or updates.

---

## 🧪 Testing

Comprehensive testing included:

- **Unit Testing:** Validation of all forms, inputs, and UI logic.
- **Integration Testing:** Verification of database connectivity and full page workflows.
- **System Testing:** End-to-end user flows across all user roles.
- **Bug Tracking:** Full debugging process documented during development.

---

## ⚙️ Deployment Overview (Private)

1. Provision Ubuntu Server VM
2. Install Docker & Docker Compose
3. Configure Cloudflare Tunnel for secure external access
4. Deploy Appsmith using Docker Compose
5. Integrate Appsmith application with Google Sheets backend

---

## 👨‍💻 Development Team

**Digital Jibaros (SICI 4097 - Spring 2025)**

- Daniel Diaz — Project Manager
- Alonso Cardona — Developer & Tester
- Alejandro Herrera — Documentation Lead
- Carlos Cardona — Developer & Tester

---

## 🔒 Future Improvements

- University SSO integration (OAuth2)
- Secure password storage (e.g., Firebase/Auth0)
- Expansion beyond ADEM Faculty

---

## ⚠️ Disclaimer

This project was developed for academic purposes as part of the Systems Development course at UPRM. It serves as a functional prototype, not a production system.

---

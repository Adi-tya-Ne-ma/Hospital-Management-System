# Hospital-Management-System

A full-stack, real-time hospital management platform for doctors and patients, built with Angular, ASP.NET Core Web API, SQL Server, and Node.js (Socket.IO).

---

## Features

- **Role-based Dashboards:** Separate, secure dashboards for doctors and patients.
- **Appointment Management:** Patients can book, view, and cancel appointments; doctors can manage their schedules.
- **Prescription Management:** Doctors can write and manage prescriptions; patients can view their prescriptions.
- **Real-Time Notifications:** Instant alerts for appointment bookings and prescription updates using Socket.IO.
- **Video Consultation:** Secure video chat functionality for remote consultations.
- **Profile Management:** Edit and update doctor and patient profiles.
- **Authentication & Authorization:** Secure JWT-based login and role-based access control.
- **Responsive UI:** Built with Angular and PrimeNG for a modern, user-friendly experience.
- **Performance Optimizations:** Angular lazy loading and efficient API design for fast load times.

---

## Technologies Used

- **Frontend:** Angular 16+, PrimeNG, TypeScript, RxJS
- **Backend:** ASP.NET Core Web API, Entity Framework Core, SQL Server
- **Real-Time:** Node.js, Express, Socket.IO
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** HTML5, CSS3

---

## Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI
- .NET 6 SDK or later
- SQL Server

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/hospital-management-system.git
   cd hospital-management-system
   ```

2. **Install Angular dependencies:**
   ```sh
   cd hospital-managements
   npm install
   ```

3. **Configure the backend:**
   - Update your SQL Server connection string in `HospitalManagementApi/appsettings.json`.

4. **Apply database migrations:**
   ```sh
   cd ../HospitalManagementApi
   dotnet ef database update
   ```

5. **Run the backend API:**
   ```sh
   dotnet run
   ```

6. **Run the Node.js notification server:**
   ```sh
   cd ../hospital-managements
   node server.js
   ```

7. **Run the Angular frontend:**
   ```sh
   ng serve
   ```
   Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## Testing

- **Unit Tests:**  
  Run `ng test` in the `hospital-managements` folder.
- **End-to-End Tests:**  
  Run `ng e2e` (configure your preferred e2e framework).

---

## Impact

- Improved hospital workflow efficiency and reduced manual errors.
- Enhanced patient engagement with real-time notifications.
- Successfully tested with 10+ users in a pilot environment.

# Event System 🎫

## Project Description
Event System is an event booking web application that allows users to sign up, log in, create their own events, make bookings, or cancel their own bookings. Users are able to have a basic graphical view of the summary of the bookings they have made.

## System Actors
- **Admin**
  - Create user
  - Create event
  - Update
  - Delete
  - View booking
- **User**
  - Event Booking 🎫
  - Cancel booking
  - Filter

## System Layouts
### Authentication
- **Registration:** `Signup.js`
- **Login / Logout:** `Login.js` (each dashboard has a logout)

### Admin Dashboard
- **Create User (CRUD):** `ManageUser.js`
- **Create Event (CRUD):** `ManageBooking.js`

### User Dashboard
- **Event Booking 🎟:** `BookingList.js`
- **Cancel Booking:** `EditBooking.js`

## Technologies Used
- **Frontend:** React
- **Backend:** Django (Python)
- **Database:** SQL

## Team Members
- **Yassin Ali:** Responsible for the back-end
- **Youssef Ali:** Responsible for the front-end
- **Rojeh Wael:** Responsible for the front-end

## Project Structure
The project is divided into two main folders:
1. **Client:** Contains the front-end code using React.
2. **Server:** Contains the back-end code using Django.

## Getting Started
### Prerequisites
- Python 3.x
- Django
- Node.js
- npm or yarn

### Usage
- Navigate to `http://localhost:8000` for the backend.
- Navigate to `http://localhost:3000` for the frontend.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

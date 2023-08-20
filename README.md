# BOOKIP
Hotel booking system with React + Node.js + Express + MySQL stack

Welcome to the BOOKIP: Hotel Booking System! This web application is designed exclusively for the front desk staff of a small hotel to efficiently manage room accommodations. The system provides an intuitive interface for adding rooms, updating availability, and managing bookings.

Features
Room Accommodations: The system supports a range of room types, including room types, bed number, bathroom and tv inclusion, and prices for 12-hour to 24-hour stay.

User-friendly Interface: The front desk staff can easily add new rooms, update availability status, and manage bookings through an intuitive interface.

Booking Management: Easily manage customer bookings, check-in and check-out dates, and room preferences.

Database Integration: The backend utilizes Node.js, Express.js, and MySQL to ensure data integrity and efficient query handling.

Installation
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/bookip.git
Navigate to the project directory:

bash
Copy code
cd front-desk-booking-system
Install backend dependencies:

bash
Copy code
npm install
Create a MySQL database named hotel_booking_system.

Configure database connection:

Open backend/config/config.json and modify the development section to match your MySQL database configuration.
Set up the database schema and tables:

bash
Copy code
npx sequelize-cli db:migrate
Start the backend server:

bash
Copy code
npm start
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install frontend dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
Access the application in your web browser at http://localhost:5173.

Technologies Used
Node.js
Express.js
Sequelize (ORM)
MySQL (Database)
React (Frontend)
HTML, CSS, JavaScript
Contributions
Contributions to this project are welcome! If you find issues or want to add new features, please submit a pull request. Be sure to follow the project's coding style and guidelines.

License
This project is licensed under the MIT License.

This README has been customized to reflect your front desk-only hotel booking system using MySQL. Adjust the instructions as needed and replace placeholders like your-username with your actual GitHub username.

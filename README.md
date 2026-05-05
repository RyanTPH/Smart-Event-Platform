**Project Overview**
The Smart Event Management & Ticketing Platform is a web-based application built using the Node.js + Express + MongoDB (MVC) architecture.

It allows users to:
    -Browse and search events
    -Book tickets
    -Submit enquiries

Administrators can:

    -Create and manage events
    -Monitor bookings
    -View analytics through a dashboard

**Features**
    *User Features*
        -User registration and login
        -Browse and search events
        -Book tickets (with capacity validation)
        -Submit enquiries
    *Admin Features*
        -Full CRUD operations on events
        -View and manage bookings
        -Access analytics dashboard:
        -Popular events
        -Total bookings
        -Capacity usage

**Tech Stack**

    *Backend*
    	Node.js, Express
    *Database*	
        MongoDB, Mongoose
    *Frontend*	
        EJS
    *Styling*	
        Bootstrap / Tailwind CSS
    *Authentication*	
        bcrypt, express-session
    *Environment*	
        dotenv

**Project Structure**
smart-event-platform/
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── views/
├── app.js
├── package.json
└── README.md

**Installation and setup**
    *clone repo*
        git clone https://github.com/your-repo/smart-event-platform.git
        cd smart-event-platform 
    *Install dependicies*
        npm install
    *Create Environment File*
        create .env file in the root directory
    *Run Application*
        npm start

**Security Features**
    -Password hashing using bcrypt
    -Session-based authentication
    -Role-Based Access Control (RBAC)
    -Environment variables for sensitive data

**Testing**
    -Manual testing performed for all modules
    -Edge cases covered:
        -Overbooking prevention
        -Invalid login attempts
        -Role access restrictions

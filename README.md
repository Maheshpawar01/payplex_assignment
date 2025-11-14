# 🌟 Payplex Assignment 🌟

This project is a full-stack authentication application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a robust and secure user authentication system, complete with registration, login, protected routes, and user role management. It solves the common problem of implementing secure user authentication in web applications, offering a ready-to-use solution with a well-defined architecture.

📸 **Screenshots**

# Dashboard
<img width="1895" height="833" alt="Screenshot 2025-11-14 161639" src="https://github.com/user-attachments/assets/0a285a97-cbf9-457a-bd4a-2a2ef2793c36" />

# Login Page
<img width="1916" height="842" alt="Screenshot 2025-11-14 161454" src="https://github.com/user-attachments/assets/ff6a0eed-402c-4dac-a020-ddd9353aaa5d" />

# Signup Page
<img width="1774" height="833" alt="Screenshot 2025-11-14 161556" src="https://github.com/user-attachments/assets/20a9787b-f1df-4059-bcd9-781057e59ca3" />



(Add screenshots of the application here to showcase its UI and functionality)

🚀 **Key Features**

*   **User Registration:** Allows new users to create accounts with secure password hashing.
*   **User Login:** Authenticates existing users and grants access to protected resources.
*   **JWT Authentication:** Uses JSON Web Tokens (JWT) for secure authentication and authorization.
*   **Protected Routes:** Restricts access to certain routes based on authentication status.
*   **Admin Role Management:** Allows administrators to manage user accounts and permissions.
*   **Password Hashing:** Securely stores user passwords using bcryptjs.
*   **MongoDB Database:** Stores user data in a MongoDB database.
*   **Frontend with React:** A user-friendly interface built with React.
*   **Backend with Node.js and Express:** A robust and scalable backend built with Node.js and Express.js.
*   **Toast Notifications:** Provides user feedback through toast notifications.

🛠️ **Tech Stack**

*   **Frontend:**
    *   React.js
    *   React Router DOM
    *   Axios
    *   react-hot-toast
    *   lucide-react (icons)
    *   Tailwind CSS
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Mongoose
    *   jsonwebtoken
    *   bcryptjs
    *   cors
    *   dotenv
*   **Database:**
    *   MongoDB
*   **Other:**
    *   npm (Node Package Manager)
    *   .env (Environment variables)

📦 **Getting Started / Setup Instructions**

**Prerequisites**

*   Node.js and npm installed
*   MongoDB installed and running
*   A code editor (e.g., VS Code)

**Installation**

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Configure environment variables:**

    *   Create a `.env` file in the `backend` directory.
    *   Add the following environment variables:

        ```
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        PORT=5000 # Or any other port you prefer
        ```

        Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<your_jwt_secret>` with a secure secret key for JWT.

**Running Locally**

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

    This will start the backend server using nodemon, which automatically restarts the server when changes are made.

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    This will start the frontend development server, usually on `http://localhost:5173`.

💻 **Usage**

1.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Register a new user account or log in with an existing account.
3.  Access the dashboard to view user information and manage accounts (if you have admin privileges).

📂 **Project Structure**

```
├── backend/
│   ├── config/
│   │   └── db.js          # Database connection configuration
│   ├── middleware/
│   │   └── auth.js        # Authentication middleware
│   ├── models/
│   │   └── User.js        # User model
│   ├── routes/
│   │   └── auth.js        # Authentication routes
│   ├── server.js          # Main backend server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx   # Dashboard component
│   │   │   ├── Login.jsx       # Login component
│   │   │   ├── PretectedRoute.jsx # Protected Route component
│   │   │   └── Register.jsx    # Register component
│   │   ├── utils/
│   │   │   └── api.js        # API utility functions
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Entry point for the frontend
│   │   └── index.css        # Global CSS styles
│   ├── public/
│   │   └── vite.svg
│   ├── package.json
│   ├── vite.config.js
├── .env                # Environment variables (backend)
├── .gitignore
└── README.md           # This file
```


🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.



📬 **Contact**

If you have any questions or suggestions, feel free to contact me at maheshp5447@gmail.com.


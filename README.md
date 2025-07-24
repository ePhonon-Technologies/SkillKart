# VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone

Welcome to the MERN (MongoDB, Express.js, React.js, Node.js) stack project! This comprehensive guide will walk you through every aspect of this project, including its structure, setup instructions, usage, API endpoints, backend, frontend, contributing guidelines, license information, and how to get in touch for support or inquiries.


## Introduction

This project is a robust, full-stack Udemy-like e-learning platform developed using a modern and scalable web development stack. It provides a seamless learning experience for students and a powerful content management interface for admins. The architecture emphasizes performance, modularity, and developer experience.

On the **frontend**, the application is built with **React** and bootstrapped using **Vite** to leverage ultra-fast development and optimized build times. UI components are crafted with **Shadcn UI**, offering accessible and themeable design elements, while **Tailwind CSS** ensures utility-first, responsive styling. For global state and asynchronous API data management, the app uses **Redux Toolkit** integrated with **RTK Query**, enabling efficient, cache-aware network operations with minimal boilerplate.

The **backend** is implemented using **Node.js** and **Express**, connected to a **MongoDB** database. It supports RESTful APIs for authentication, course and lecture management, media uploads, and purchase tracking. The application enforces **JWT-based authentication**, supports role-based authorization, and integrates cloud-based services like **Cloudinary** for media storage and delivery.

The platform is divided into two main roles:
- **Students**, who can browse, enroll in, and view progress on courses with gated access to paid content.
- **Admins**, who can create and manage courses, upload video lectures, and monitor platform metrics through a secure dashboard.

This project is ideal for developers looking to build scalable SaaS applications with a solid foundation of frontend performance, API efficiency, and clean UI/UX patterns. Whether for learning purposes or as a starting point for a commercial LMS product, the codebase is clean, modular, and easy to extend.

## Features

### Authentication & Authorization
- User authentication system with **JWT** and cookie-based session handling.
- Role-based route protection to ensure only authenticated users and authorized admins can access certain pages.
- `ProtectedRoute`, `AdminRoute`, and `AuthenticatedUser` wrappers for clean and secure route guarding.

### Student Interface
- Beautifully designed homepage with a Hero section and featured courses.
- Dynamic **course detail** pages with lecture preview capability.
- **My Learning** section for enrolled students to continue their learning journey.
- **Course progress tracking** to monitor video completion.
- Search functionality to explore available courses.
- **Course filtering** by category, price, and status (free/paid) for better content discovery.

### Admin Panel
- Fully functional **Admin Dashboard** showing analytics like total sales, revenue, and course-wise pricing using `recharts`.
- Manage courses:
  - Create, edit, delete courses.
  - Upload and update individual lectures (videos + metadata).
- Toggle preview status of each lecture (free/paid).
- Admin sidebar with clean navigation for dashboard and course sections.

### Media Upload & Storage
- Video uploads are handled through **Cloudinary** via Axios POST requests.
- Upload progress indicator with real-time feedback using progress bars.

### RTK Query & State Management
- **Redux Toolkit Query (RTK Query)** is integrated for managing all API requests with automatic caching, invalidation, and loading states.
- RTK Query internally uses **Axios** for efficient and performant API calls.
- Centralized global state management using **Redux Toolkit** for auth, UI states, and more.

### UI & UX
- Built using **Shadcn UI components** for consistent and modern UI elements.
- Fully responsive design with **TailwindCSS** and clean mobile-first layout.
- **Dark/Light/System** theme toggle built using `useTheme()` and persisted using context.
- Toaster notifications via **sonner** for user feedback (e.g., login success, errors, upload status).

### Stripe Payment Integration
- **Stripe Checkout** integrated for seamless and secure course payments.
- Webhook support to verify successful payments and enroll users automatically.
- Real-time webhook handling using **Stripe CLI** during development.
- Stripe environment variables and signing secret handled securely.
- Payment confirmation and redirection built into the user flow.

### Developer Experience
- Built with **Vite** for ultra-fast development and hot module reload.
- Modular and clean codebase with separated folder structures for admin, student, shared components, and features.
- Strong use of reusable components and hooks to keep code maintainable and scalable.


## Live Demo

You can try out the live demo of the app [here](https://vite-shadcn-mern-redux-rtkquery.onrender.com/).

## Folder Structure

```

📁 project-root
├── 📁 backend
│   ├── 📁 controllers
│   │   ├── 📄 authController.js
│   │   ├── 📄 courseController.js
│   │   ├── 📄 lectureController.js
│   │   └── 📄 purchaseController.js
│   ├── 📁 middleware
│   │   └── 📄 authMiddleware.js  
│   ├── 📁 models
│   │   ├── 📄 Course.js
│   │   ├── 📄 Lecture.js
│   │   ├── 📄 Purchase.js
│   │   └── 📄 User.js
│   ├── 📁 routes
│   │   ├── 📄 authRoutes.js
│   │   ├── 📄 courseRoutes.js
│   │   ├── 📄 lectureRoutes.js
│   │   └── 📄 purchaseRoutes.js
│   ├── 📁 utils
│   │   ├── 📄 connectDB.js
│   │   |── 📄 cloudinaryConfig.js
|   |   └── 📄 multer.js
│   └── 📄 server.js
│
├── 📁 frontend
│   ├── 📁 app
│   │   ├── 📄 store.js
│   │   └── 📁 slices (optional)
│   ├── 📁 components
│   │   ├── 📁 ui
│   │   │   ├── 📄 button.jsx
│   │   │   ├── 📄 card.jsx
│   │   │   └── 📄 ...others
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 LoadingSpinner.jsx
│   │   ├── 📄 ProtectedRoutes.jsx
│   │   └── 📄 ThemeProvider.jsx
│   ├── 📁 features
│   │   ├── 📁 api
│   │   │   ├── 📄 authApi.js
│   │   │   ├── 📄 courseApi.js
│   │   │   └── 📄 purchaseApi.js
│   ├── 📁 layout
│   │   └── 📄 MainLayout.jsx
│   ├── 📁 pages
│   │   ├── 📄 Login.jsx
│   │   ├── 📁 student
│   │   │   ├── 📄 HeroSection.jsx
│   │   │   ├── 📄 Courses.jsx
│   │   │   ├── 📄 MyLearning.jsx
│   │   │   ├── 📄 CourseDetail.jsx
│   │   │   ├── 📄 CourseProgress.jsx
│   │   │   └── 📄 SearchPage.jsx
│   │   ├── 📁 admin
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   └── 📁 course
│   │   │       ├── 📄 CourseTable.jsx
│   │   │       ├── 📄 AddCourse.jsx
│   │   │       ├── 📄 EditCourse.jsx
│   │   │       └── 📁 lecture
│   │   │           ├── 📄 CreateLecture.jsx
│   │   │           └── 📄 EditLecture.jsx
│   ├── 📄 App.jsx
│   ├── 📄 main.jsx
│   └── 📄 index.css
│
├── 📄 package.json
├── 📄 .env
├── 📄 .gitignore
└── 📄 README.md

```
## Screenshots

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss1.png?raw=true" alt="Screenshot 1" width="1000">

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss2.png?raw=true" alt="Screenshot 1" width="1000">

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss3.png?raw=true" alt="Screenshot 1" width="1000">

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss4.png?raw=true" alt="Screenshot 1" width="1000">

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss5.png?raw=true" alt="Screenshot 1" width="1000">

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss6.png?raw=true" alt="Screenshot 1" width="1000">



## GIF's

<img src="https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone/blob/main/Screenshots/ss7.gif?raw=true" alt="Screenshot 1" width="1000">

## Tech Stack

### Frontend
- **[React](https://react.dev/)** – Core UI library for building interactive interfaces.
- **[Vite](https://vitejs.dev/)** – Fast and modern development bundler for lightning-fast dev experience.
- **[Shadcn UI](https://ui.shadcn.com/)** – Accessible, reusable UI components built with Radix UI and Tailwind.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – Simplified global state management with built-in best practices.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** – Advanced data fetching and caching layer built into Redux Toolkit.
- **[React Router DOM](https://reactrouter.com/)** – Declarative routing for React applications.
- **[Lucide Icons](https://lucide.dev/)** – Icon library used for a clean and consistent UI.
- **[Sonner](https://sonner.emilkowal.ski/)** – Toast notification library used for user feedback.

### Backend
- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment to run the server.
- **[Express.js](https://expressjs.com/)** – Minimalist web framework for creating robust APIs.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database used for storing users, courses, and lecture data.
- **[Mongoose](https://mongoosejs.com/)** – ODM library to interact with MongoDB using JavaScript objects.
- **[Cloudinary](https://cloudinary.com/)** – Cloud-based service for storing course and lecture media files.

### Authentication & Authorization
- **[JWT](https://jwt.io/)** (JSON Web Tokens) – Token-based authentication for user sessions.
- **[Role-Based Access Control](https://en.wikipedia.org/wiki/Role-based_access_control)** (RBAC) – Secure separation of student and admin functionality.

### State & Data Handling
- **[Redux Toolkit](https://redux-toolkit.js.org/)** (RTK) – Manages local and global state efficiently.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** (with Axios) – Handles server communication with built-in caching, invalidation, and automatic refetching of data.

### Payments
- **[Stripe](https://stripe.com/)** – Secure payment gateway for handling course purchases and subscriptions.
- **[Stripe Checkout](https://stripe.com/docs/payments/checkout)** – Seamless, pre-built Stripe UI for accepting payments.
- **[Stripe Webhooks](https://stripe.com/docs/webhooks)** – For handling payment success notifications and automating enrollment.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nishkarsh25/VITE-SHADCN-MERN-REDUX-RTKQuery-UdemyClone.git
   ```

2. Navigate to the project branch:

   ```bash
   git checkout <branch-name>
   ```

   Replace `<branch-name>` with the name of the branch you want to checkout.

3. Start the Backend Server: Launch the backend Node.js server.

   ```bash
   cd backend
   node index.ts
   ```

4. Start the Frontend Development Server: Run the React development server for the frontend application.

   ```bash
   cd frontend
   npm run dev
   ```

## Usage

1. **Run the development server**:

   ```bash
   cd client
   npm start
   ```

2. **Open your browser** and navigate to http://localhost:5173 to view the app.

> **Note**: After deployment configuration, the entire application is now served through the backend. You can run the full application by simply executing `npm run dev` from the root directory, which will serve the app on `http://localhost:8080` (the backend server port).

## Stripe Integration

This project uses [Stripe](https://stripe.com/docs) to handle secure payments and subscriptions.

### Stripe Setup

To enable Stripe:

1. Create an account at [Stripe Dashboard](https://dashboard.stripe.com/).
2. Go to **Developers → API keys**, and copy the following:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
3. Go to **Developers → Webhooks**, and:
   - Add a new endpoint (e.g., `http://localhost:8080/api/v1/purchase/webhook`)
   - Enable event types like `checkout.session.completed`
   - Copy the `WEBHOOK_ENDPOINT_SECRET`

### .env Configuration

```env
# .env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
WEBHOOK_ENDPOINT_SECRET=whsec_...

```


### Downloading Stripe CLI for Windows

To download the Stripe CLI for Windows, follow these steps:

1. Visit the official [Stripe CLI installation documentation](https://docs.stripe.com/stripe-cli?install-method=windows).
2. Choose the appropriate installation method for your system, and download the executable.

Alternatively, you can download the latest version directly from the GitHub releases page:
- **[Stripe CLI GitHub Releases](https://github.com/stripe/stripe-cli/releases/tag/v1.27.0)**

Choose the **`stripe_1.27.0_windows_x86_64.zip`** file if you're on a 64-bit version of Windows, or **`stripe_1.27.0_windows_i386.zip`** for 32-bit systems.



### Local Testing with Stripe CLI

Use Stripe CLI to test webhook events locally:

```
stripe login
stripe listen --forward-to http://localhost:8080/api/v1/purchase/webhook
```

### Features

- **Course checkout via Stripe Checkout**  
  Secure payment processing for course purchases using Stripe's hosted checkout page.

- **Webhook payment handling**  
  Real-time payment status updates through Stripe webhooks for completed transactions.

- **Backend purchase verification**  
  Server-side validation of successful payments before granting access to purchased content.

**Note:** Test mode is enabled by default. Use production keys carefully when deploying to live environment.



## How to Use

This Udemy-like e-learning platform offers a variety of features for both students and admins. Below is a guide on how to make the best use of the platform:

### 1. **User Authentication**
- **Login**: Upon visiting the platform, users can log in using their credentials. If they don't have an account, they can sign up directly.
- **Signup**: New users can register with their name, email, and password to create an account.
- **JWT Authentication**: Authentication is handled via JSON Web Tokens (JWT) to ensure secure and session-based login.
- **Role-Based Access**: The platform distinguishes between student and admin users, granting specific permissions and features accordingly.

### 2. **Course Discovery & Search**
- **Browse Courses**: On the homepage, students can see available courses. Courses are listed with title, instructor, price, and category.
- **Search Courses**: A search feature allows students to find courses by keywords, categories, or instructors.
- **Filters**: Use filters to refine course searches based on categories or price range.
- **Course Details**: Each course has a dedicated page with detailed information including description, course content, and instructor details.

### 3. **Course Enrollment**
- **Free and Paid Courses**: Students can enroll in both free and paid courses. Payment for paid courses is done securely through **Stripe** using the **Stripe Checkout** integration.
- **Purchased Courses**: Once enrolled, students can access all their purchased courses from their profile page under the 'My Learning' section.

### 4. **Course Content**
- **Lectures**: Each course includes video lectures that students can watch at their own pace. The videos are hosted on Cloudinary for quick and reliable streaming.
- **Lecture Progress**: Students can track their progress through the lectures and resume from where they left off.
- **Course Completion**: After completing all lectures of a course, students can mark the course as complete. This feature helps to track learning achievements.

### 5. **Instructor and Admin Dashboard**
- **Create Courses**: Admins can create new courses by providing titles, descriptions, prices, and uploading media. They can manage all aspects of course creation, including video lectures and other course materials.
- **Manage Users**: Admins can view user data, approve new registrations, and manage their accounts.
- **Edit Courses**: Admins have the ability to edit courses after creation, such as changing titles, descriptions, or adding new lectures.
- **Monitor Enrollments**: Admins can see detailed insights into who has enrolled in which course and manage the course contents efficiently.

### 6. **Student Profile**
- **View Enrolled Courses**: Students can see a list of all courses they are enrolled in.
- **Profile Editing**: Students can update their profile information such as their name, email, and password.
- **Learning History**: Track the progress and history of courses students have completed or are currently enrolled in.

### 7. **Interactive Course Features**
- **Quizzes & Assignments**: Some courses may have quizzes or assignments that allow students to test their knowledge and track their learning.
- **Course Feedback**: Students can leave ratings and reviews for courses they've completed. This helps future students decide which courses to enroll in.
- **Discussion Forums**: Some courses include discussion forums where students can interact with the instructor and other learners.

### 8. **Responsive Design**
- **Mobile-Friendly**: The platform is fully responsive, ensuring that students and admins can access the platform from any device, including tablets and smartphones.
- **Fast Loading**: Vite and React ensure that the platform loads quickly, providing a smooth user experience even with large media files.

### 9. **Notifications**
- **Alerts and Messages**: The platform supports in-app notifications for course updates, new enrollments, and important announcements.

### 10. **Dark Mode**
- **Toggle Themes**: Users can toggle between light and dark modes for a better viewing experience based on their preference.

### 11. **Stripe Payment Integration**
- **Secure Checkout**: Students can securely pay for courses using **Stripe Checkout**.
- **Webhooks**: The platform listens to Stripe webhooks to handle payment success and automatically enroll students in courses.
- **Payment Confirmation**: Once payment is confirmed, students are granted immediate access to their enrolled courses.




## API Endpoints

The platform provides several RESTful API endpoints to manage users, courses, progress tracking, media uploads, and purchases. Below are the key API endpoints available.

### 1. **User Authentication**

#### POST `/api/v1/user/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### POST `/api/v1/user/login`
- **Description**: Login an existing user and generate a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### GET `/api/v1/user/logout`
- **Description**: Log out the currently authenticated user.
- **Response**:
  ```json
  {
    "message": "Logout successful"
  }
  ```

#### GET `/api/v1/user/profile`
- **Description**: Get the profile information of the currently authenticated user.
- **Response**:
  ```json
  {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    }
  }
  ```

#### PUT `/api/v1/user/profile/update`
- **Description**: Update the profile information of the authenticated user.
- **Request Body**:
  ```json
  {
    "name": "John Doe Updated",
    "email": "john_updated@example.com",
    "profilePhoto": "profile-image-url"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile updated successfully",
    "user": { ...updatedUserData }
  }
  ```

### 2. **Courses**

#### POST `/api/v1/course`
- **Description**: Create a new course (Admin only).
- **Request Body**:
  ```json
  {
    "title": "JavaScript for Beginners",
    "description": "Learn the basics of JavaScript programming.",
    "price": 50,
    "category": "Programming",
    "instructor": "Jane Smith",
    "courseThumbnail": "image-url"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Course created successfully",
    "course": { ...courseData }
  }
  ```

#### GET `/api/v1/course/search`
- **Description**: Search for courses based on various filters.
- **Response**:
  ```json
  [
    {
      "courseId": "course123",
      "title": "JavaScript for Beginners",
      "price": 50
    },
    ...
  ]
  ```

#### GET `/api/v1/course/published-courses`
- **Description**: Get a list of published courses.
- **Response**:
  ```json
  [
    {
      "courseId": "course123",
      "title": "JavaScript for Beginners",
      "price": 50,
      "status": "published"
    },
    ...
  ]
  ```

#### PUT `/api/v1/course/:courseId`
- **Description**: Edit an existing course (Admin only).
- **Request Body**:
  ```json
  {
    "title": "Advanced JavaScript",
    "description": "Master JavaScript programming for web development.",
    "price": 75,
    "category": "Programming"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Course updated successfully",
    "course": { ...updatedCourseData }
  }
  ```

#### GET `/api/v1/course/:courseId`
- **Description**: Get detailed information of a specific course.
- **Response**:
  ```json
  {
    "courseId": "course123",
    "title": "JavaScript for Beginners",
    "price": 50,
    "description": "Learn the basics of JavaScript programming.",
    "lectures": [ ... ]
  }
  ```

#### POST `/api/v1/course/:courseId/lecture`
- **Description**: Add a new lecture to a course (Admin only).
- **Request Body**:
  ```json
  {
    "title": "Introduction to JavaScript",
    "videoUrl": "video-url"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Lecture added successfully",
    "lecture": { ...lectureData }
  }
  ```

#### GET `/api/v1/course/:courseId/lecture`
- **Description**: Get all lectures for a specific course.
- **Response**:
  ```json
  [
    {
      "lectureId": "lecture123",
      "title": "Introduction to JavaScript",
      "videoUrl": "video-url"
    },
    ...
  ]
  ```

#### PUT `/api/v1/course/:courseId/lecture/:lectureId`
- **Description**: Edit an existing lecture (Admin only).
- **Request Body**:
  ```json
  {
    "title": "JavaScript Basics - Updated",
    "videoUrl": "updated-video-url"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Lecture updated successfully",
    "lecture": { ...updatedLectureData }
  }
  ```

#### DELETE `/api/v1/course/lecture/:lectureId`
- **Description**: Remove a lecture from a course (Admin only).
- **Response**:
  ```json
  {
    "message": "Lecture deleted successfully"
  }
  ```

#### PATCH `/api/v1/course/:courseId`
- **Description**: Toggle publish status of a course (Admin only).
- **Response**:
  ```json
  {
    "message": "Course publish status updated"
  }
  ```

### 3. **Course Progress**

#### GET `/api/v1/progress/:courseId`
- **Description**: Get the progress of a specific course for the authenticated user.
- **Response**:
  ```json
  {
    "courseId": "course123",
    "progress": 75
  }
  ```

#### POST `/api/v1/progress/:courseId/lecture/:lectureId`
- **Description**: Update progress for a specific lecture.
- **Response**:
  ```json
  {
    "message": "Lecture progress updated"
  }
  ```

#### POST `/api/v1/progress/:courseId/complete`
- **Description**: Mark the course as completed for the authenticated user.
- **Response**:
  ```json
  {
    "message": "Course marked as completed"
  }
  ```

#### POST `/api/v1/progress/:courseId/incomplete`
- **Description**: Mark the course as incomplete for the authenticated user.
- **Response**:
  ```json
  {
    "message": "Course marked as incomplete"
  }
  ```

### 4. **Media**

#### POST `/api/v1/media/upload-video`
- **Description**: Upload a video file (used for course lectures).
- **Request Body** (Form Data):
  - `file`: The video file to be uploaded.
- **Response**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully.",
    "data": { ...uploadedMediaData }
  }
  ```

### 5. **Purchase & Payment**

#### POST `/api/v1/purchase/create-checkout-session`
- **Description**: Initiates a checkout session for course purchase.
- **Request Body**:
  ```json
  {
    "courseId": "course123",
    "amount": 50
  }
  ```
- **Response**:
  ```json
  {
    "message": "Checkout session created",
    "paymentLink": "payment-link"
  }
  ```

#### POST `/api/v1/purchase/webhook`
- **Description**: Webhook for Stripe payment verification.
- **Request Body**:
  - Raw body with the payment data from Stripe.

#### GET `/api/v1/purchase/course/:courseId/detail-with-status`
- **Description**: Get detailed information about a course along with the purchase status.
- **Response**:
  ```json
  {
    "courseId": "course123",
    "status": "purchased"
  }
  ```

#### GET `/api/v1/purchase`
- **Description**: Get a list of all purchased courses by the authenticated user.
- **Response**:
  ```json
  [
    {
      "courseId": "course123",
      "title": "JavaScript for Beginners",
      "price": 50
    },
    ...
  ]
  ```

---

### Notes
- **JWT Authentication**: Most of the above endpoints require authentication via JWT. Include the token in the `Authorization` header as a Bearer token for secure access.
- **Error Handling**: Error responses will include an appropriate status code (e.g., 401 Unauthorized, 404 Not Found) with a message indicating the issue.



## Contributing

Contributions to this project are highly appreciated! Whether you discover bugs, have feature requests, or wish to contribute improvements, your input is valuable. Here's how you can contribute:

- **Report Issues:** If you encounter any bugs or issues while using MyCalculatorApp, please open an issue on the GitHub repository. Be sure to provide detailed information about the problem and steps to reproduce it.

- **Submit Pull Requests:** If you have enhancements or fixes to propose, feel free to submit a pull request. Contributions that improve the functionality, usability, or performance of this app are welcomed and encouraged.

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork the Repository**.
2. **Create a New Branch** (`git checkout -b feature/your-feature-name`).
3. **Make Your Changes**.
4. **Commit Your Changes** (`git commit -am 'Add some feature'`).
5. **Push to the Branch** (`git push origin feature/your-feature-name`).
6. **Create a New Pull Request**.

## License

This project is licensed under the [The 3-Clause BSD License](LICENSE).Feel free to explore, modify, and contribute to this project as you see fit. Your feedback and contributions are greatly appreciated! 🚀✨

## Acknowledgments

This project is made possible by the contributions and support of various individuals and communities. Special thanks to:

- **Tailwind CSS Team:** For developing Tailwind CSS, a versatile CSS framework that simplifies web development and enhances user interfaces.
- **Open Source Community:** For fostering collaboration, innovation, and the sharing of knowledge, which enriches projects like My Form Validation and makes them accessible to all.

## Credits

This project wouldn't be possible without the contributions of the following:

### Frontend
- **[React](https://react.dev/)** – Core UI library for building interactive interfaces.
- **[Vite](https://vitejs.dev/)** – Fast and modern development bundler for lightning-fast dev experience.
- **[Shadcn UI](https://ui.shadcn.com/)** – Accessible, reusable UI components built with Radix UI and Tailwind.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development.
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – Simplified global state management with built-in best practices.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** – Advanced data fetching and caching layer built into Redux Toolkit.
- **[React Router DOM](https://reactrouter.com/)** – Declarative routing for React applications.
- **[Lucide Icons](https://lucide.dev/)** – Icon library used for a clean and consistent UI.
- **[Sonner](https://sonner.emilkowal.ski/)** – Toast notification library used for user feedback.

### Backend
- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment to run the server.
- **[Express.js](https://expressjs.com/)** – Minimalist web framework for creating robust APIs.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database used for storing users, courses, and lecture data.
- **[Mongoose](https://mongoosejs.com/)** – ODM library to interact with MongoDB using JavaScript objects.
- **[Cloudinary](https://cloudinary.com/)** – Cloud-based service for storing course and lecture media files.

### Authentication & Authorization
- **[JWT](https://jwt.io/)** (JSON Web Tokens) – Token-based authentication for user sessions.
- **[Role-Based Access Control](https://en.wikipedia.org/wiki/Role-based_access_control)** (RBAC) – Secure separation of student and admin functionality.

### State & Data Handling
- **[Redux Toolkit](https://redux-toolkit.js.org/)** (RTK) – Manages local and global state efficiently.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** (with Axios) – Handles server communication with built-in caching, invalidation, and automatic refetching of data.

### Payments
- **[Stripe](https://stripe.com/)** – Payment processing platform for handling secure transactions, including course purchases and subscriptions.
- **[Stripe Checkout](https://stripe.com/docs/payments/checkout)** – Pre-built Stripe UI for accepting payments.
- **[Stripe Webhooks](https://stripe.com/docs/webhooks)** – Handling successful payment notifications and automating user enrollments.

### Deployment & Hosting
- **[Render](https://render.com/)** – Cloud platform used to deploy the application and host both frontend and backend services.




## Author

- **Nishkarsh Gupta**
  - GitHub: [nishkarsh25](https://github.com/nishkarsh25)
  - Email: bm21btech11016@gmail.com
#   S k i l l K a r t  
 
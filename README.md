# 🎓 Course Registration System

A modern course registration system built with React, TypeScript, Zustand, Styled Components, and Mock Service Worker.

## 🚀 Features

- ✅ **Student ID Login** - Simple authentication with student ID
- ✅ **Course Visualization** - View available courses for next semester
- ✅ **Prerequisites** - Prerequisite verification system
- ✅ **Course Registration** - Register for courses if prerequisites are met
- ✅ **Global State with Zustand** - Efficient state management
- ✅ **Styled Components** - Modern and responsive styles
- ✅ **Mock API with MSW** - Real HTTP requests visible in DevTools Network tab

## 📦 Installation

```bash
npm install
```

## 🏃 Run the Project

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### User 1 (Completed 2 courses)
- **ID**: `student001`
- **Password**: `pass123`
- Completed courses: Introduction to Programming, Data Structures

### User 2 (Completed 1 course)
- **ID**: `student002`
- **Password**: `pass123`
- Completed courses: Introduction to Programming

### User 3 (No completed courses)
- **ID**: `student003`
- **Password**: `pass123`
- Completed courses: None

## 🌐 API Endpoints (Mocked)

All requests are intercepted by MSW and appear in the **Network** tab of DevTools.

### POST `/api/login`

**Request:**
```json
{
  "username": "student001",
  "password": "pass123"
}
```

**Response (200):**
```json
{
  "student": {
    "id": "001",
    "username": "student001"
  },
  "token": "mock-token-001-1234567890"
}
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Spring 2024",
  "start_date": "2024-01-15",
  "end_date": "2024-05-15"
}
```

### GET `/api/terms/{id}/courses`
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "courses": [
    {
      "id": 1,
      "name": "Introduction to Programming",
      "prereqs": []
    },
    {
      "id": 2,
      "name": "Data Structures",
      "prereqs": [1]
    }
  ]
}
```

### GET `/api/students/{id}/registrations`
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "registrations": [
    {
      "id": 1234567890,
      "course": {
        "id": 1,
        "name": "Introduction to Programming",
        "prereqs": []
      },
      "term": {
        "id": 1,
        "name": "Spring 2024"
      },
      "status": "enrolled"
    }
  ]
}
```

### POST `/api/students/{studentId}/courses/{courseId}/register`
**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "termId": 1
}
```

**Response (201):**
```json
{
  "registration": {
    "id": 1234567890,
    "course": {
      "id": 1,
      "name": "Introduction to Programming",
      "prereqs": []
    },
    "term": {
      "id": 1,
      "name": "Spring 2024"
    },
    "status": "enrolled"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Prerequisites not met"
}
```

## 🏗️ Project Structure

```
src/
├── App.tsx                    # Route configuration
├── index.tsx                  # Entry point + MSW setup
├── styled.d.ts                # TypeScript declarations for styled-components
├── types/
│   └── index.ts               # TypeScript types
├── mocks/
│   ├── browser.ts             # MSW worker setup
│   ├── handlers.ts            # API mock handlers
│   └── mockData.ts            # Test data
├── pages/
│   ├── Courses.tsx            # Courses page
│   └── Login.tsx              # Login page
├── services/
│   └── api.ts                 # Axios API client
├── store/
│   ├── authStore.ts           # Zustand auth store
│   └── coursesStore.ts        # Zustand courses store
└── styles/
    ├── GlobalStyles.ts        # Global styles
    └── theme.ts               # Color theme
```

## 🎨 Technologies Used

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **React Router DOM** - Navigation
- **Zustand** - State Management
- **Styled Components** - CSS-in-JS
- **Axios** - HTTP Client
- **MSW (Mock Service Worker)** - API Mocking
- **React Scripts** - Build tooling

## 🔍 View HTTP Requests

1. Open **Chrome DevTools** (F12)
2. Go to the **Network** tab
3. Filter by `api/` to see only API requests
4. You'll see real requests with:
   - Request Headers (Authorization)
   - Request Payload
   - Response Data
   - Status Codes
   - Timing

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Wide (1280px+)

## 🎯 System Features

### Prerequisites Validation
- Courses display their prerequisites
- Visual indicators (✓/✗) for completed/missing prerequisites
- Register button disabled if prerequisites are missing

### Registration States
- **Available**: Can register (prerequisites met)
- **Registered**: Already registered in the course
- **Locked**: Incomplete prerequisites

### Animations
- Fade in for components
- Float effect for elements
- Hover effects on cards
- Shimmer effect for loading states
- Smooth transitions

## 🛠️ Available Scripts

```bash
npm start       # Run in development
npm build       # Build for production
npm test        # Run tests
npm test -- --coverage  # Run tests with coverage
```

## 🧪 Testing

This project includes comprehensive unit and integration tests:

- **Unit Tests**: Zustand stores (auth, courses)
- **Component Tests**: Login, Courses pages
- **Integration Tests**: Full user flow (login → courses → register → logout)

For detailed testing documentation, see [TESTING.md](./TESTING.md)

### Test Coverage
- AuthStore: Login, logout, persistence
- CoursesStore: Data loading, registration, prerequisites
- Login Component: Form validation, authentication
- Courses Component: Course display, registration, logout
- Integration: End-to-end user flows

Run tests:
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage report
```

## 📄 License

This is an educational demonstration project.

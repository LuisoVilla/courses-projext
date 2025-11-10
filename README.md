# Course Registration System

A simple web-based course registration system for students that implements the following functional requirements:

## Functional Requirements

✅ **Student Login with Student ID Only**
- Students can log in using just their student ID
- No password required (simplified authentication for demo purposes)

✅ **View Next Semester Courses Only**
- Students can only see courses available for the next semester
- Current semester courses are not shown in the registration view

✅ **Prerequisite Validation**
- Students cannot register for courses if they don't meet the prerequisites
- The system checks completed courses against course prerequisites
- Clear error messages indicate which prerequisites are missing

## Features

- Simple and intuitive web interface
- Real-time prerequisite checking
- Visual indicators for course eligibility
- Student course history tracking
- Registration status tracking

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Start the Flask web server:
```bash
python app.py
```

For development mode with debug enabled:
```bash
export FLASK_ENV=development
python app.py
```

The application will be available at `http://localhost:5000`

## Running Tests

Run the test suite:
```bash
pytest test_models.py -v
```

## Usage

### Login
1. Navigate to `http://localhost:5000`
2. Enter a student ID (e.g., S001, S002, S003, or S004)
3. Click "Login"

### View and Register for Courses
- After logging in, you'll see all courses available for the next semester
- Courses show:
  - Course code and name
  - Prerequisites (if any)
  - Eligibility status
  - Registration button (enabled only if eligible)
- Click "Register for this course" to enroll in an eligible course

### Sample Data

**Students:**
- **S001** - Alice Johnson (completed: CS101, MATH101)
- **S002** - Bob Smith (completed: CS101)
- **S003** - Carol Williams (no completed courses)
- **S004** - David Brown (completed: CS101, MATH101, CS201)

**Next Semester Courses (Spring 2026):**
- **CS102** - Data Structures (prerequisite: CS101)
- **CS201** - Algorithms (prerequisites: CS101, MATH101)
- **MATH102** - Calculus II (prerequisite: MATH101)
- **CS301** - Database Systems (prerequisite: CS201)
- **ENG102** - Advanced Writing (prerequisite: ENG101)
- **PHYS101** - Physics I (no prerequisites)

## Project Structure

```
courses-projext/
├── app.py              # Flask web application
├── models.py           # Data models and business logic
├── sample_data.py      # Sample data initialization
├── test_models.py      # Unit tests
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   ├── base.html      # Base template
│   ├── login.html     # Login page
│   └── courses.html   # Course listing and registration
└── README.md          # This file
```

## Technology Stack

- **Backend**: Python 3.x with Flask
- **Frontend**: HTML5, CSS3 (embedded)
- **Testing**: pytest
- **Data Storage**: In-memory (can be extended to use SQLite or other databases)

## Architecture

The system uses a simple three-layer architecture:

1. **Data Models** (`models.py`): Core business logic
   - `Student`: Represents a student with ID, name, and course history
   - `Course`: Represents a course with code, name, semester, and prerequisites
   - `Semester`: Represents an academic semester
   - `CourseRegistrationSystem`: Main system managing students, courses, and registrations

2. **Web Layer** (`app.py`): Flask routes and session management
   - Login/logout functionality
   - Course listing
   - Registration processing

3. **Presentation Layer** (`templates/`): HTML templates with embedded CSS
   - Responsive design
   - User-friendly interface
   - Visual feedback for actions

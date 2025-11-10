"""
Tests for the course registration system models.
"""

import pytest
from models import Student, Course, Semester, CourseRegistrationSystem


class TestStudent:
    """Tests for Student class."""
    
    def test_student_creation(self):
        """Test creating a student."""
        student = Student("S001", "Alice", ["CS101"])
        assert student.student_id == "S001"
        assert student.name == "Alice"
        assert student.has_completed("CS101")
        assert not student.has_completed("CS102")
    
    def test_student_register_course(self):
        """Test registering for a course."""
        student = Student("S001", "Alice")
        student.register_for_course("CS101")
        assert student.is_registered_for("CS101")
    
    def test_student_no_completed_courses(self):
        """Test student with no completed courses."""
        student = Student("S002", "Bob")
        assert len(student.completed_courses) == 0


class TestCourse:
    """Tests for Course class."""
    
    def test_course_creation(self):
        """Test creating a course."""
        course = Course("CS101", "Intro to CS", "2026-spring", ["MATH101"])
        assert course.course_code == "CS101"
        assert course.name == "Intro to CS"
        assert course.semester == "2026-spring"
        assert "MATH101" in course.prerequisites
    
    def test_course_no_prerequisites(self):
        """Test course with no prerequisites."""
        course = Course("CS101", "Intro to CS", "2026-spring")
        assert len(course.prerequisites) == 0
    
    def test_check_prerequisites_met(self):
        """Test prerequisite check when student meets requirements."""
        course = Course("CS201", "Advanced CS", "2026-spring", ["CS101"])
        student = Student("S001", "Alice", ["CS101"])
        
        meets, missing = course.check_prerequisites(student)
        assert meets is True
        assert len(missing) == 0
    
    def test_check_prerequisites_not_met(self):
        """Test prerequisite check when student doesn't meet requirements."""
        course = Course("CS201", "Advanced CS", "2026-spring", ["CS101", "MATH101"])
        student = Student("S001", "Alice", ["CS101"])
        
        meets, missing = course.check_prerequisites(student)
        assert meets is False
        assert "MATH101" in missing


class TestSemester:
    """Tests for Semester class."""
    
    def test_semester_creation(self):
        """Test creating a semester."""
        semester = Semester("2026-spring", "Spring", 2026)
        assert semester.semester_id == "2026-spring"
        assert semester.name == "Spring"
        assert semester.year == 2026
    
    def test_semester_string_representation(self):
        """Test semester string representation."""
        semester = Semester("2026-spring", "Spring", 2026)
        assert str(semester) == "Spring 2026"
    
    def test_semester_equality(self):
        """Test semester equality."""
        sem1 = Semester("2026-spring", "Spring", 2026)
        sem2 = Semester("2026-spring", "Spring", 2026)
        sem3 = Semester("2026-fall", "Fall", 2026)
        
        assert sem1 == sem2
        assert sem1 != sem3


class TestCourseRegistrationSystem:
    """Tests for CourseRegistrationSystem class."""
    
    def setup_method(self):
        """Set up test fixtures."""
        self.system = CourseRegistrationSystem()
        
        # Set up semesters
        self.current_sem = Semester("2025-fall", "Fall", 2025)
        self.next_sem = Semester("2026-spring", "Spring", 2026)
        self.system.set_current_semester(self.current_sem)
        self.system.set_next_semester(self.next_sem)
        
        # Add students
        self.student1 = Student("S001", "Alice", ["CS101", "MATH101"])
        self.student2 = Student("S002", "Bob", ["CS101"])
        self.student3 = Student("S003", "Carol", [])
        
        self.system.add_student(self.student1)
        self.system.add_student(self.student2)
        self.system.add_student(self.student3)
        
        # Add courses
        self.course1 = Course("CS102", "Data Structures", "2026-spring", ["CS101"])
        self.course2 = Course("CS201", "Algorithms", "2026-spring", ["CS101", "MATH101"])
        self.course3 = Course("PHYS101", "Physics", "2026-spring", [])
        
        self.system.add_course(self.course1)
        self.system.add_course(self.course2)
        self.system.add_course(self.course3)
    
    def test_login_valid_student(self):
        """Test login with valid student ID."""
        student = self.system.login("S001")
        assert student is not None
        assert student.student_id == "S001"
        assert student.name == "Alice"
    
    def test_login_invalid_student(self):
        """Test login with invalid student ID."""
        student = self.system.login("S999")
        assert student is None
    
    def test_get_next_semester_courses(self):
        """Test getting courses for next semester."""
        courses = self.system.get_next_semester_courses()
        assert len(courses) == 3
        assert all(c.semester == "2026-spring" for c in courses)
    
    def test_can_register_with_prerequisites_met(self):
        """Test registration when prerequisites are met."""
        can_reg, reason = self.system.can_register(self.student1, self.course2)
        assert can_reg is True
        assert reason == "Can register"
    
    def test_can_register_without_prerequisites_met(self):
        """Test registration when prerequisites are not met."""
        can_reg, reason = self.system.can_register(self.student2, self.course2)
        assert can_reg is False
        assert "Missing prerequisites" in reason
        assert "MATH101" in reason
    
    def test_can_register_no_prerequisites(self):
        """Test registration for course with no prerequisites."""
        can_reg, reason = self.system.can_register(self.student3, self.course3)
        assert can_reg is True
        assert reason == "Can register"
    
    def test_cannot_register_already_registered(self):
        """Test that student cannot register twice for same course."""
        self.student1.register_for_course("CS102")
        can_reg, reason = self.system.can_register(self.student1, self.course1)
        assert can_reg is False
        assert "Already registered" in reason
    
    def test_register_student_for_course_success(self):
        """Test successful course registration."""
        success, message = self.system.register_student_for_course(self.student1, "CS102")
        assert success is True
        assert "Successfully registered" in message
        assert self.student1.is_registered_for("CS102")
    
    def test_register_student_for_course_failure(self):
        """Test failed course registration due to missing prerequisites."""
        success, message = self.system.register_student_for_course(self.student2, "CS201")
        assert success is False
        assert "Missing prerequisites" in message
        assert not self.student2.is_registered_for("CS201")
    
    def test_register_for_nonexistent_course(self):
        """Test registration for course that doesn't exist."""
        success, message = self.system.register_student_for_course(self.student1, "CS999")
        assert success is False
        assert "Course not found" in message

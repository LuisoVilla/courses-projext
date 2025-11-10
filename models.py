"""
Course Registration System

This module contains the data models for the course registration system.
"""

from datetime import datetime
from typing import List, Set, Optional


class Student:
    """Represents a student in the system."""
    
    def __init__(self, student_id: str, name: str, completed_courses: Optional[List[str]] = None):
        self.student_id = student_id
        self.name = name
        self.completed_courses: Set[str] = set(completed_courses or [])
        self.registered_courses: Set[str] = set()
    
    def has_completed(self, course_code: str) -> bool:
        """Check if student has completed a course."""
        return course_code in self.completed_courses
    
    def register_for_course(self, course_code: str) -> None:
        """Register student for a course."""
        self.registered_courses.add(course_code)
    
    def is_registered_for(self, course_code: str) -> bool:
        """Check if student is registered for a course."""
        return course_code in self.registered_courses


class Course:
    """Represents a course in the system."""
    
    def __init__(self, course_code: str, name: str, semester: str, 
                 prerequisites: Optional[List[str]] = None):
        self.course_code = course_code
        self.name = name
        self.semester = semester
        self.prerequisites: List[str] = prerequisites or []
    
    def check_prerequisites(self, student: Student) -> tuple[bool, List[str]]:
        """
        Check if student meets prerequisites for this course.
        
        Returns:
            tuple: (meets_prerequisites, missing_prerequisites)
        """
        missing = [prereq for prereq in self.prerequisites 
                   if not student.has_completed(prereq)]
        return (len(missing) == 0, missing)


class Semester:
    """Represents a semester in the system."""
    
    def __init__(self, semester_id: str, name: str, year: int):
        self.semester_id = semester_id
        self.name = name  # e.g., "Fall", "Spring", "Summer"
        self.year = year
    
    def __str__(self):
        return f"{self.name} {self.year}"
    
    def __eq__(self, other):
        if isinstance(other, Semester):
            return self.semester_id == other.semester_id
        return False
    
    def __hash__(self):
        return hash(self.semester_id)


class CourseRegistrationSystem:
    """Main system for managing course registrations."""
    
    def __init__(self):
        self.students: dict[str, Student] = {}
        self.courses: dict[str, Course] = {}
        self.current_semester: Optional[Semester] = None
        self.next_semester: Optional[Semester] = None
    
    def add_student(self, student: Student) -> None:
        """Add a student to the system."""
        self.students[student.student_id] = student
    
    def add_course(self, course: Course) -> None:
        """Add a course to the system."""
        self.courses[course.course_code] = course
    
    def set_current_semester(self, semester: Semester) -> None:
        """Set the current semester."""
        self.current_semester = semester
    
    def set_next_semester(self, semester: Semester) -> None:
        """Set the next semester."""
        self.next_semester = semester
    
    def login(self, student_id: str) -> Optional[Student]:
        """
        Login a student using their student ID.
        
        Args:
            student_id: The student's ID
            
        Returns:
            Student object if found, None otherwise
        """
        return self.students.get(student_id)
    
    def get_available_courses(self, semester: Semester) -> List[Course]:
        """
        Get all courses available for a specific semester.
        
        Args:
            semester: The semester to get courses for
            
        Returns:
            List of courses for that semester
        """
        return [course for course in self.courses.values() 
                if course.semester == semester.semester_id]
    
    def get_next_semester_courses(self) -> List[Course]:
        """Get courses available for the next semester only."""
        if self.next_semester is None:
            return []
        return self.get_available_courses(self.next_semester)
    
    def can_register(self, student: Student, course: Course) -> tuple[bool, str]:
        """
        Check if a student can register for a course.
        
        Args:
            student: The student attempting to register
            course: The course to register for
            
        Returns:
            tuple: (can_register, reason)
        """
        # Check if course is for next semester
        if self.next_semester is None:
            return False, "Next semester is not defined"
        
        if course.semester != self.next_semester.semester_id:
            return False, "Course is not available for the next semester"
        
        # Check if already registered
        if student.is_registered_for(course.course_code):
            return False, "Already registered for this course"
        
        # Check prerequisites
        meets_prereqs, missing = course.check_prerequisites(student)
        if not meets_prereqs:
            missing_str = ", ".join(missing)
            return False, f"Missing prerequisites: {missing_str}"
        
        return True, "Can register"
    
    def register_student_for_course(self, student: Student, course_code: str) -> tuple[bool, str]:
        """
        Register a student for a course.
        
        Args:
            student: The student to register
            course_code: The code of the course to register for
            
        Returns:
            tuple: (success, message)
        """
        course = self.courses.get(course_code)
        if course is None:
            return False, "Course not found"
        
        can_register, reason = self.can_register(student, course)
        if not can_register:
            return False, reason
        
        student.register_for_course(course_code)
        return True, "Successfully registered"

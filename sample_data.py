"""
Sample data for the course registration system.
"""

from models import Student, Course, Semester, CourseRegistrationSystem


def initialize_system() -> CourseRegistrationSystem:
    """Initialize the system with sample data."""
    system = CourseRegistrationSystem()
    
    # Define semesters
    current_semester = Semester("2025-fall", "Fall", 2025)
    next_semester = Semester("2026-spring", "Spring", 2026)
    
    system.set_current_semester(current_semester)
    system.set_next_semester(next_semester)
    
    # Add students with completed courses
    students = [
        Student("S001", "Alice Johnson", ["CS101", "MATH101"]),
        Student("S002", "Bob Smith", ["CS101"]),
        Student("S003", "Carol Williams", []),
        Student("S004", "David Brown", ["CS101", "MATH101", "CS201"]),
    ]
    
    for student in students:
        system.add_student(student)
    
    # Add courses for current semester (Fall 2025)
    current_courses = [
        Course("CS101", "Introduction to Programming", "2025-fall", []),
        Course("MATH101", "Calculus I", "2025-fall", []),
        Course("ENG101", "English Composition", "2025-fall", []),
    ]
    
    for course in current_courses:
        system.add_course(course)
    
    # Add courses for next semester (Spring 2026) with prerequisites
    next_courses = [
        Course("CS102", "Data Structures", "2026-spring", ["CS101"]),
        Course("CS201", "Algorithms", "2026-spring", ["CS101", "MATH101"]),
        Course("MATH102", "Calculus II", "2026-spring", ["MATH101"]),
        Course("CS301", "Database Systems", "2026-spring", ["CS201"]),
        Course("ENG102", "Advanced Writing", "2026-spring", ["ENG101"]),
        Course("PHYS101", "Physics I", "2026-spring", []),
    ]
    
    for course in next_courses:
        system.add_course(course)
    
    return system

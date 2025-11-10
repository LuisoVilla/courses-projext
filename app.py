"""
Flask web application for course registration system.
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash
from sample_data import initialize_system

app = Flask(__name__)
app.secret_key = 'dev-secret-key-change-in-production'

# Initialize the system with sample data
system = initialize_system()


@app.route('/')
def index():
    """Home page - shows login if not logged in."""
    if 'student_id' in session:
        return redirect(url_for('courses'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    """Student login page - login with student ID only."""
    if request.method == 'POST':
        student_id = request.form.get('student_id', '').strip()
        
        if not student_id:
            flash('Please enter a student ID', 'error')
            return render_template('login.html')
        
        student = system.login(student_id)
        
        if student:
            session['student_id'] = student_id
            flash(f'Welcome, {student.name}!', 'success')
            return redirect(url_for('courses'))
        else:
            flash('Invalid student ID', 'error')
            return render_template('login.html')
    
    return render_template('login.html')


@app.route('/logout')
def logout():
    """Logout the current student."""
    session.pop('student_id', None)
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))


@app.route('/courses')
def courses():
    """Show available courses for next semester."""
    if 'student_id' not in session:
        return redirect(url_for('login'))
    
    student = system.students.get(session['student_id'])
    if not student:
        session.pop('student_id', None)
        return redirect(url_for('login'))
    
    # Get courses for next semester only
    available_courses = system.get_next_semester_courses()
    
    # Check registration eligibility for each course
    course_info = []
    for course in available_courses:
        can_reg, reason = system.can_register(student, course)
        course_info.append({
            'course': course,
            'can_register': can_reg,
            'reason': reason,
            'is_registered': student.is_registered_for(course.course_code)
        })
    
    return render_template('courses.html', 
                         student=student,
                         course_info=course_info,
                         next_semester=system.next_semester)


@app.route('/register/<course_code>', methods=['POST'])
def register(course_code):
    """Register for a course."""
    if 'student_id' not in session:
        return redirect(url_for('login'))
    
    student = system.students.get(session['student_id'])
    if not student:
        session.pop('student_id', None)
        return redirect(url_for('login'))
    
    success, message = system.register_student_for_course(student, course_code)
    
    if success:
        flash(message, 'success')
    else:
        flash(message, 'error')
    
    return redirect(url_for('courses'))


if __name__ == '__main__':
    # Debug mode should only be enabled in development, not production
    # Set via environment variable: export FLASK_ENV=development
    import os
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(debug=debug_mode, port=5000)

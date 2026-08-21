import React, { useState } from 'react';
import { useStudents } from '../context/StudentContext';

const AddStudentForm = ({ onSuccess }) => {
    const { addStudent, allStudents } = useStudents();
    
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        major: '',
        gpa: '',
        courses: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Full Name is required';
        }

        if (!formData.id.trim()) {
            newErrors.id = 'Student ID is required';
        } else if (!/^\d+(-\d+)*$/.test(formData.id)) {
            newErrors.id = 'ID must be numeric (e.g. 23-50194-1)';
        } else if (allStudents.some(s => s.id === formData.id)) {
            newErrors.id = 'Student ID must be unique';
        }

        if (!formData.major.trim()) {
            newErrors.major = 'Major is required';
        }

        const gpaVal = parseFloat(formData.gpa);
        if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 4.0) {
            newErrors.gpa = 'GPA must be between 0.0 and 4.0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validate()) {
            const newStudent = {
                id: formData.id,
                name: formData.name,
                major: formData.major,
                gpa: parseFloat(formData.gpa),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
                courses: formData.courses.split(',').map(c => ({
                    name: c.trim(),
                    color: '#' + Math.floor(Math.random()*16777215).toString(16)
                })).filter(c => c.name !== '')
            };

            addStudent(newStudent);
            setFormData({ name: '', id: '', major: '', gpa: '', courses: '' });
            onSuccess();
        }
    };

    return (
        <form className="add-student-form" onSubmit={handleSubmit}>
            <h3>Register New Student</h3>
            
            <div className="form-group">
                <label>Full Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label>Student ID</label>
                <input 
                    type="text" 
                    name="id" 
                    value={formData.id} 
                    onChange={handleChange} 
                    placeholder="e.g. 23-50194-1"
                />
                {errors.id && <span className="error-message">{errors.id}</span>}
            </div>

            <div className="form-group">
                <label>Major</label>
                <input 
                    type="text" 
                    name="major" 
                    value={formData.major} 
                    onChange={handleChange} 
                    placeholder="e.g. Computer Science"
                />
                {errors.major && <span className="error-message">{errors.major}</span>}
            </div>

            <div className="form-group">
                <label>GPA</label>
                <input 
                    type="number" 
                    step="0.01" 
                    name="gpa" 
                    value={formData.gpa} 
                    onChange={handleChange} 
                    placeholder="0.0 - 4.0"
                />
                {errors.gpa && <span className="error-message">{errors.gpa}</span>}
            </div>

            <div className="form-group">
                <label>Courses (Comma separated)</label>
                <input 
                    type="text" 
                    name="courses" 
                    value={formData.courses} 
                    onChange={handleChange} 
                    placeholder="Web Tech, Algorithms, OS"
                />
            </div>

            <button type="submit" className="submit-btn">Add Student</button>
        </form>
    );
};

export default AddStudentForm;

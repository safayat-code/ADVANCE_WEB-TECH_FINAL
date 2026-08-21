import React from 'react';
import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';
import { useStudents } from '../context/StudentContext';

const StudentCard = ({ name, id, avatar, major, gpa, courses }) => {
    const { favorites, toggleFavorite, removeStudent } = useStudents();
    const isFavorite = favorites.includes(id);

    return (
        <div className={`card ${isFavorite ? 'favorite' : ''}`}>
            <div className="card-controls">
                <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(id)}
                    aria-label="Toggle Favorite"
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
                <button 
                    className="remove-btn"
                    onClick={() => removeStudent(id)}
                    aria-label="Remove Student"
                    title="Remove Student"
                >
                    🗑️
                </button>
            </div>
            
            <div className="card-header">
                <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
                <div className="card-main-info">
                    <h2>{name}</h2>
                    <p className="student-id">ID: {id}</p>
                </div>
            </div>
            
            <div className="card-body">
                <div className="info-group">
                    <p className="major-text"><span>Major:</span> {major}</p>
                </div>

                <div className="stats-container">
                    <StatBadge label="GPA" value={gpa} />
                    <StatBadge label="Credits" value={90} />
                </div>

                <div className="courses-section">
                    <h4>Enrolled Courses:</h4>
                    <div className="course-tags">
                        {courses.map((course, index) => (
                            <CourseTag 
                                key={index} 
                                courseName={course.name} 
                                color={course.color} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

StudentCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    gpa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            color: PropTypes.string
        })
    )
};

export default StudentCard;
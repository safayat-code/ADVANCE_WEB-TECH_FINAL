import React from 'react';
import PropTypes from 'prop-types';

const CourseTag = ({ courseName, color }) => {
    return (
        <span 
            className="course-tag" 
            style={{ backgroundColor: color || '#3b82f6' }}
        >
            {courseName}
        </span>
    );
};

CourseTag.propTypes = {
    courseName: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default CourseTag;

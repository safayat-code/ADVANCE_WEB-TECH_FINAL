import React from 'react';
import PropTypes from 'prop-types';

const DashboardHeader = ({ title, tagline }) => {
    return (
        <header className="dashboard-header">
            <div className="header-content">
                <h1>{title}</h1>
                <p>{tagline}</p>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#students">Students</a></li>
                    <li><a href="#courses">Courses</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>
        </header>
    );
};

DashboardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string
};

export default DashboardHeader;

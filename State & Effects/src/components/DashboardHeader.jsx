import React from 'react';
import PropTypes from 'prop-types';

const DashboardHeader = ({ title, tagline, favoriteCount }) => {
    return (
        <header className="dashboard-header">
            <div className="header-content">
                <h1>{title}</h1>
                <p>{tagline}</p>
            </div>
            <div className="header-actions">
                <div className="favorites-badge">
                    ❤️ Favorites: <span>{favoriteCount}</span>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#students">Students</a></li>
                        <li><a href="#courses">Courses</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

DashboardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    favoriteCount: PropTypes.number
};

DashboardHeader.defaultProps = {
    favoriteCount: 0
};

export default DashboardHeader;

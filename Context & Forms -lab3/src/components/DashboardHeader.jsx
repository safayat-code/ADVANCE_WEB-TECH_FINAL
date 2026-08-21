import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const DashboardHeader = ({ title, tagline, favoriteCount }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="dashboard-header">
            <div className="header-content">
                <h1>{title}</h1>
                <p>{tagline}</p>
            </div>
            <div className="header-actions">
                <button 
                    className="theme-toggle" 
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <div className="favorites-badge">
                    ❤️ Favorites: <span>{favoriteCount}</span>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#students">Students</a></li>
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

export default DashboardHeader;

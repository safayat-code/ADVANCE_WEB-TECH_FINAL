import React from 'react';
import PropTypes from 'prop-types';

const SortControls = ({ onSort, currentSort }) => {
    return (
        <div className="sort-controls">
            <span>Sort by:</span>
            <button 
                className={currentSort === 'default' ? 'active' : ''} 
                onClick={() => onSort('default')}
            >
                Default
            </button>
            <button 
                className={currentSort === 'name' ? 'active' : ''} 
                onClick={() => onSort('name')}
            >
                Name (A-Z)
            </button>
            <button 
                className={currentSort === 'gpa' ? 'active' : ''} 
                onClick={() => onSort('gpa')}
            >
                GPA (High-Low)
            </button>
        </div>
    );
};

SortControls.propTypes = {
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.string.isRequired
};

export default SortControls;

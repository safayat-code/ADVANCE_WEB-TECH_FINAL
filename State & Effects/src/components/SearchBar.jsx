import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, query }) => {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search by name or major..." 
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                className="search-input"
            />
            <div className="search-icon">🔍</div>
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
};

export default SearchBar;

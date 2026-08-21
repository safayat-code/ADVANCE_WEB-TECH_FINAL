import React from 'react';
import { useStudents } from '../context/StudentContext';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useStudents();

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search by name or major..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <div className="search-icon">🔍</div>
        </div>
    );
};

export default SearchBar;

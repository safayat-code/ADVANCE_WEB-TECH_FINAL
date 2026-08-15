import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';

const RAW_STUDENT_DATA = [
    {
        id: "23-50194-1",
        name: "Mohsin Ibna Hossain",
        major: "Computer Science",
        gpa: 4.00,
        avatar: "https://cdn-front.freepik.com/home/anon-rvmp/creative-suite/photography/change-location.webp",
        courses: [{ name: "Web Tech", color: "#3b82f6" }, { name: "Data Structures", color: "#10b981" }]
    },
    {
        id: "23-50199-1",
        name: "MIH Jihad",
        major: "Software Engineering",
        gpa: 3.87,
        avatar: "https://assets.leonardo.ai/aYN8890YXLCxVX3A_image-models-explained.png?q=80&auto=compress,format&fit=max&w=2560",
        courses: [{ name: "Algorithms", color: "#f59e0b" }, { name: "Database", color: "#6366f1" }]
    },
    {
        id: "23-50200-1",
        name: "Sadman Shakib",
        major: "Computer Science",
        gpa: 3.91,
        avatar: "https://static.imagetoimage.app/assets/gallery/item1.webp",
        courses: [{ name: "Networking", color: "#ef4444" }, { name: "OS", color: "#8b5cf6" }]
    },
    {
        id: "23-50187-1",
        name: "Sayed Mahmud Rayan",
        major: "Data Science",
        gpa: 3.80,
        avatar: "https://static.imagetoimage.app/assets/gallery/item3.webp",
        courses: [{ name: "Machine Learning", color: "#ec4899" }, { name: "Statistics", color: "#06b6d4" }]
    }
    
];

export const App = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [favorites, setFavorites] = useState([]);

    // Simulated API Fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setStudents(RAW_STUDENT_DATA);
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Favorite Toggle (State Lifting)
    const handleFavoriteToggle = (id) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    // Filtering logic
    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.major.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting logic
    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'gpa') return b.gpa - a.gpa;
        return 0; 
    });

    // Dynamic Document Title
    useEffect(() => {
        document.title = `Dashboard — ${sortedStudents.length} Students`;
    }, [sortedStudents.length]);

    return (
        <div className="dashboard-app">
            <DashboardHeader 
                title="Student Analytics Dashboard" 
                tagline="Interactive student management system"
                favoriteCount={favorites.length}
            />
            
            <div className="controls-container">
                <SearchBar query={searchQuery} onSearch={setSearchQuery} />
                <SortControls currentSort={sortBy} onSort={setSortBy} />
            </div>

            <main className="container">
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading students...</p>
                    </div>
                ) : sortedStudents.length > 0 ? (
                    sortedStudents.map((student) => (
                        <StudentCard 
                            key={student.id}
                            {...student}
                            isFavorite={favorites.includes(student.id)}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No students found matching your search.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
import React, { createContext, useState, useContext, useEffect } from 'react';

const StudentContext = createContext();

const INITIAL_DATA = [
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

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('students');
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Persist students to localStorage
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const addStudent = (newStudent) => {
        setStudents(prev => [newStudent, ...prev]);
    };

    const removeStudent = (id) => {
        setStudents(prev => prev.filter(s => s.id !== id));
        setFavorites(prev => prev.filter(favId => favId !== id));
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.major.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'gpa') return b.gpa - a.gpa;
        return 0;
    });

    return (
        <StudentContext.Provider value={{
            students: sortedStudents,
            allStudents: students, // For validation checks
            searchQuery,
            setSearchQuery,
            sortBy,
            setSortBy,
            favorites,
            toggleFavorite,
            addStudent,
            removeStudent,
            loading
        }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
};

export default StudentContext;

import React, { useEffect, useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import AddStudentForm from './components/AddStudentForm';
import { useStudents } from './context/StudentContext';

export const App = () => {
    const { students, loading, favorites } = useStudents();
    const [showNotification, setShowNotification] = useState(false);

    // Dynamic Document Title
    useEffect(() => {
        document.title = `Dashboard — ${students.length} Students`;
    }, [students.length]);

    const handleSuccess = () => {
        setShowNotification(true);
    };

    // Auto-dismiss notification
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return (
        <div className="dashboard-app">
            <DashboardHeader 
                title="Student Analytics Dashboard" 
                tagline="Interactive student management system"
                favoriteCount={favorites.length}
            />

            {showNotification && (
                <div className="notification success">
                    Student registered successfully!
                </div>
            )}
            
            <div className="dashboard-content container">
                <section className="form-section">
                    <AddStudentForm onSuccess={handleSuccess} />
                </section>

                <section className="display-section">
                    <div className="controls-container">
                        <SearchBar />
                        <SortControls />
                    </div>

                    <main className="students-grid">
                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading students...</p>
                            </div>
                        ) : students.length > 0 ? (
                            students.map((student) => (
                                <StudentCard 
                                    key={student.id}
                                    {...student}
                                />
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No students found matching your search.</p>
                            </div>
                        )}
                    </main>
                </section>
            </div>
        </div>
    );
};

export default App;
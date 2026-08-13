import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';

const studentsData = [
    {
        name: "Mohsin Ibna Hossain",
        id: "23-50194-1",
        major: "Computer Science",
        gpa: "4.00",
        avatar: "https://cdn-front.freepik.com/home/anon-rvmp/creative-suite/photography/change-location.webp",
        courses: [
            { name: "Web Tech", color: "#3b82f6" },
            { name: "Data Structures", color: "#10b981" }
        ]
    },
    {
        name: "MIH Jihad",
        id: "23-50199-1",
        major: "Software Engineering",
        gpa: "3.87",
        avatar: "https://assets.leonardo.ai/aYN8890YXLCxVX3A_image-models-explained.png?q=80&auto=compress,format&fit=max&w=2560",
        courses: [
            { name: "Algorithms", color: "#f59e0b" },
            { name: "Database", color: "#6366f1" }
        ]
    },
    {
        name: "Sadman Shakib",
        id: "23-50200-1",
        major: "Computer Science",
        gpa: "3.91",
        avatar: "https://static.imagetoimage.app/assets/gallery/item1.webp",
        courses: [
            { name: "Networking", color: "#ef4444" },
            { name: "OS", color: "#8b5cf6" }
        ]
    },
    {
        name: "Sayed Mahmud Rayan",
        id: "23-50187-1",
        major: "Data Science",
        gpa: "3.80",
        avatar: "https://static.imagetoimage.app/assets/gallery/item3.webp",
        courses: [
            { name: "Machine Learning", color: "#ec4899" },
            { name: "Statistics", color: "#06b6d4" }
        ]
    }
];

export const App = () => {
    return (
        <div className="dashboard-app">
            <DashboardHeader 
                title="Student Analytics Dashboard" 
                tagline="Monitoring academic excellence and progress" 
            />
            
            <main className="container">
                {studentsData.map((student) => (
                    <StudentCard 
                        key={student.id}
                        name={student.name}
                        id={student.id}
                        major={student.major}
                        gpa={student.gpa}
                        avatar={student.avatar}
                        courses={student.courses}
                    />
                ))}
            </main>
        </div>
    );
};

export default App;
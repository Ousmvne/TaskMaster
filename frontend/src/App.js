import React from 'react';
import TaskManager from './components/TaskManager';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <div className="App">
            <UserProfile />
            <TaskManager />
        </div>
    );
}

export default App;

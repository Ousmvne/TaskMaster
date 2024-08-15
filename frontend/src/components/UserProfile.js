import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/profiles/1/')  // Remplacez par l'ID utilisateur actuel
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Level: {profile.level}</p>
            <p>Experience Points: {profile.experience_points}</p>
        </div>
    );
}

export default UserProfile;

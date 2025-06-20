import { createContext, useContext, useEffect, useState } from 'react';
import { createUserProfile, getUserProfile, updateUserPoints } from '../services/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Load user from localStorage on initial render
        const savedUser = localStorage.getItem('quiz_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Sync user with localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('quiz_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('quiz_user');
        }
    }, [user]);

    // Initialize or fetch user profile
    const initializeUser = async (nickname) => {
        try {
            if (user) {
                // Check if user exists in Supabase
                const profile = await getUserProfile(user.user_id);
                if (profile) {
                    setUser(profile);
                    return profile;
                }
            }
            // Create new user if none exists
            const newUser = await createUserProfile(nickname);
            setUser(newUser);
            return newUser;
        } catch (error) {
            console.error('Error initializing user:', error);
            throw error;
        }
    };

    // Update user points
    const updatePoints = async (points) => {
        try {
            if (!user) throw new Error('No user found');
            const updatedUser = await updateUserPoints(user.user_id, points);
            setUser(updatedUser);
        } catch (error) {
            console.error('Error updating points:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, initializeUser, updatePoints }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
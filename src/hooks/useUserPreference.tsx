import { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user preferences
interface UserPreferences {
  theme: 'light' | 'dark';
  pushNotification: boolean;
}
type ContextType = {
    preferences: UserPreferences,
    update: React.Dispatch<React.SetStateAction<UserPreferences>>
}

// Create the initial context
const UserPreferenceContext = createContext<ContextType | null>(null);

// Custom hook to access the user preferences
export function useUserPreferences() {
  const context = useContext(UserPreferenceContext);

  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferenceProvider');
  }

  return context;
}

// User preference provider component
export function UserPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    theme: 'light',
    pushNotification: true,
  });

  // Load user preferences from local storage on component mount
  useEffect(() => {
    const storedPreferences = localStorage.getItem('userPreferences');

    if (storedPreferences) {
      setUserPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  // Save user preferences to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  return (
    <UserPreferenceContext.Provider value={{

        preferences: userPreferences,
        update: (newPreferences) => setUserPreferences(old => ({...old, ...newPreferences}))
    }}>
      {children}
    </UserPreferenceContext.Provider>
  );
}

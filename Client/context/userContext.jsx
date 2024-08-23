import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state to handle the initial request

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setLoading(false); // Data loaded, stop loading
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); // Handle error and stop loading
        });
    }
  }, [user]);

  const clearCookie = () => {
    // Clear cookie logic here, such as setting an expired cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null); // Clear user state as well
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading indicator while fetching user data
  }

  return (
    <UserContext.Provider value={{ user, setUser, clearCookie }}>
      {children}
    </UserContext.Provider>
  );
}

/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const { data } = await axios.get("/profile");
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const clearCookie = async () => {
    try {
      await axios.post("/logout");
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
      setUser(null);
    } catch (error) {
      console.error("Error clearing cookie:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearCookie, loading }}>
      {children}
    </UserContext.Provider>
  );
}

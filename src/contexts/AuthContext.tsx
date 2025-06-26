import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
useEffect(() => {
  const storedUser = sessionStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  setIsLoading(false);
}, []);
const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch("/api/User/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) return null;

    const data = await response.json();
let role: "admin" | "restaurant" | "individual" = "individual";

if (data.userTypeId === 2) {
  role = "admin";
} else if (data.userTypeId === 3) {
  role = "restaurant";
} else {
  return null; // غير مسموح
}


    const mappedUser: User = {
      id: data.userId,
      fullName: data.fullName,
     role: "admin",
      token: data.token,
    };

    setUser(mappedUser);
    sessionStorage.setItem("user", JSON.stringify(mappedUser));
    sessionStorage.setItem("justLoggedIn", "true");

    return mappedUser;
  } catch {
    return null;
  }
};


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {
  const [currentUser, setCurrentUser] =
    useState(
      JSON.parse(
        localStorage.getItem("currentUser")
      ) || null
    );

  const login = (userData) => {
    setCurrentUser(userData);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setCurrentUser(null);

    localStorage.removeItem(
      "currentUser"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
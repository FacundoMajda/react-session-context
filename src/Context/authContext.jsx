/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const SessionContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const savedSession = localStorage.getItem("session");
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [session]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      //DEMO: simular llamada a la a´pi con credenciales de ejemplo
      if (email === "demo@example.com" && password === "demo123") {
        const demoSession = {
          user: {
            id: 1,
            name: "John Doe",
            email: "demo@example.com",
            role: "usuario",
          },
          token: uuidv4(),
        };

        localStorage.setItem("session", JSON.stringify(demoSession));
        setSession(demoSession);
        return true;
      }

      //ESTA ES LA LLAMADA REAL A LA API
      // const response = await axios.post('http://localhost:3000/api/auth/login', {
      //   email,
      //   password
      // });
      // const sessionData = response.data;
      // localStorage.setItem('session', JSON.stringify(sessionData));
      // setSession(sessionData);
      // return true;

      throw new Error("Credenciales inválidas");
    } catch (err) {
      setError(err.message || "Ocurrió un error durante el inicio de sesión");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        loading,
        error,
        isAuthenticated: !!session,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

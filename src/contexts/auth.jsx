import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../services/auth";

import Spinner from "../components/Spinner";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useHistory();

  async function requestAuth({ email, password }) {
    try {
      const { data } = await login({ email, password });
      return data;
    } catch (error) {
      console.warn("Falha na requisão http referente ao login");
      console.warn(error);
      return null;
    }
  }

  async function signIn({ email, password }) {
    setLoading(true);
    const response = await requestAuth({ email, password });
    
    if (!!response) {
      setUser(response.user);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      router.replace({ pathname: "/chat" });
    }
    
    setLoading(false);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    const storagedToken = localStorage.getItem("token");
    const storagedUser = localStorage.getItem("user");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

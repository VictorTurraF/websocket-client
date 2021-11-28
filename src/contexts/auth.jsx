import { createContext, useContext, useEffect, useState } from "react";
import { useHistory} from 'react-router-dom'
import * as service from "../services/client";

import Spinner from "../components/Spinner";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useHistory()

  async function signIn({ email, password }) {
    setLoading(true);

    try {
      const { data } = await service.login({ email, password });
      const user = { email }

      setUser(user);

      localStorage.setItem("_token", data.token);
      localStorage.setItem("_user", JSON.stringify(user));

      router.replace({ pathname: "/dashboard" })

    } catch (error) {
      console.warn(error)
      console.warn('Falha no login')
    }

    setLoading(false);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    const storagedToken = localStorage.getItem("_token");
    const storagedUser = localStorage.getItem("_user");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Spinner />
    );
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

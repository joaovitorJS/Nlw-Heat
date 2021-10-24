import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";


type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_CLIENT_ID}`;
  const [user, setUser] = useState<User | null>(null)

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      
      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile')
        .then(response => {
           setUser(response.data); 
        });
    }
  },[]);

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  return (
    <AuthContext.Provider value={{user, signInUrl, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}
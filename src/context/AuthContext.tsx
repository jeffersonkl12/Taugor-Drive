import { Usuario } from "@interfaces/app.interfaces";
import React, { createContext, ReactNode, useContext, useState } from "react";


interface AuthState {
  isAuthenticated: boolean;
  user: Usuario | null; 
}


interface AuthContextType {
  authState: AuthState;
  login: (usuario?: Usuario) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children?: ReactNode; 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });


  const login = (usuario?: Usuario) => {
    if (usuario) {
      setAuthState({
        isAuthenticated: true,
        user: usuario,
      });
    }
  };


  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { UsuarioLogin } from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { toast } from "react-toastify";

interface AuthContextType {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/logar`, userLogin, setUsuario);
      toast.success("Usuário autenticado com sucesso!");
    } catch (error) {
      toast.error("Dados do usuário inconsistentes!");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    });
  }

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
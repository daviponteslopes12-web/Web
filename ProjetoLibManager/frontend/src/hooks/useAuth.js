import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export function useAuth() {
    return useContext(AuthContext);
}

/**
createContext()  → Cria o quadro vazio
Provider value   → Preenche o quadro com dados
useContext()     → Lê os dados do quadro
useAuth()        → Atalho que chama useContext()
 */
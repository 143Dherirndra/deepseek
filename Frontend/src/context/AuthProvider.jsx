import { Cookie } from "lucide-react"
import { createContext, useContext, useState } from "react"

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [authuser,setAuthUser]=useState(()=>{
        return localStorage.getItem("token") || null;

    });

    return (
        <AuthContext.Provider value={[authuser,setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)
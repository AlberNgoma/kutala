import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));

    function logout() {
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        setUsuario(null)

    }

    return (
        <AuthContext.Provider value={{ usuario, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
import { Navigate, Outlet } from "react-router-dom";

function RotaCidadao() {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if (!token) {
        return <Navigate to="/" replace />
    }

    if (usuario?.tipo !== "CIDADAO") {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default RotaCidadao;
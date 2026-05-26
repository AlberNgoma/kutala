import { Link } from "react-router-dom";
import logo from "../assets/imgKutala.png"
import { FaPowerOff } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



function NavbarCidadao() {
    const [nome, setNome] = useState("")
    const navigate = useNavigate();
    const { logout } = useAuth();


    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        if (usuario) {
            setNome(usuario?.nome)
        }

    })

    function fazerLogout() {
        const confirmacao = window.confirm("Deseja termir a sessão")
        if (confirmacao) {
            logout()
            navigate("/")
        }
    }


    return (
        <>
            <div className="bg-sky-50  shadow-md w-full flex justify-around absolute z-2000">

                <section className="cursor-pointer flex justift-center items-center">
                    <img src={logo} className="w-15 p-3"></img>
                </section>



                <section className="flex justify-center space-x-2 items-center">



                    <span className=" cursor-pointer bg-gray-300 w-9 h-9 rounded-full flex justify-center items-center">
                        <p className="font-bold text-xl text-gray-600">{nome.charAt(0).toUpperCase()}</p>

                    </span>
                    <span className=" cursor-pointer bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center"
                        onClick={() => fazerLogout()}>
                        <FaPowerOff className="text-xl text-gray-600" />

                    </span>



                </section>

            </div>




        </>
    )
}

export default NavbarCidadao;
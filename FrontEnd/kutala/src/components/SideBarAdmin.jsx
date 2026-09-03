import { FaUserTie } from "react-icons/fa";
import { RiHome9Line } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbAlertHexagon } from "react-icons/tb";
import { FaBars, FaXmark } from 'react-icons/fa6';
import { NavLink } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion"
import { LuLogOut } from "react-icons/lu";
import Modal from "./Modal";

function SideBarAdmin() {
    const [email, setEmail] = useState("");
    const [tipo, setTipo] = useState("");
    const [sidebar, setSideBar] = useState(false)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario) {
            setEmail(usuario?.email)
            setTipo(usuario?.tipo)
        }
    }, [])

    function out() {
        logout()
        navigate("/login")
        setModal(false)
    }

    
    function linkStyle({isActive}){
        return(
            `w-full flex items-center rounded px-5 py-2 gap-2 text-gray-50 hover:bg-white/10 transition-all duration-300
             ${isActive && "border-l-4 border-white text-white bg-white/10"} `
        )
    }

    return (
        <>
            <button onClick={() => setSideBar(!sidebar)} className="fixed top-0 p-6 cursor-pointer md:hidden z-2000">
                {sidebar ? (
                    <motion.p animate={{ rotate: 360, transition: { duration: 0.5 } }}>
                        <FaXmark color="white" size={22} />
                    </motion.p>
                ) : (
                    <motion.p>
                        <FaBars size={22} />
                    </motion.p>
                )}
            </button>

            <div className={`${sidebar ? "translate-x-0" : "-translate-x-full"} bg-kutala-blue flex flex-col items-center w-75 inset-y-0 md:translate-x-0 fixed md:relative duration-400 ease-in-out z-1900`}>

                <div className="text-white font-semibold font-outfit p-3 md:mt-6 mt-7 flex flex-col gap-1 items-center justify-center">
                    <FaUserTie className="md:text-5xl text-4xl" />
                    <span> {tipo} </span>
                    <span className="text-sm opacity-80"> {email} </span>
                </div>


                <div className="font-semibold mt-9 flex flex-col gap-2 w-full px-10">

                    <NavLink to="/admin/dashboard" className={linkStyle}>
                        <RiHome9Line size={20} />
                        <span>Início</span>
                    </NavLink>

                    <NavLink to="/admin/mapa" className={linkStyle}>
                        <TbMap2 size={20} />
                        <span>Mapa</span>
                    </NavLink>

                    <NavLink to="/admin/listar-cidadao" className={linkStyle}>
                        <FaUsers size={20} />
                        <span>Cidadãos</span>
                    </NavLink>

                    <NavLink to="/admin/listar-alerta" className={linkStyle}>
                        <RiErrorWarningLine size={20} />
                        <span>Alertas</span>
                    </NavLink>

                    <NavLink to="/admin/riscos" className={linkStyle}>
                        <TbAlertHexagon size={20} />
                        <span>Riscos</span>
                    </NavLink>

                    <NavLink to="/admin/definicoes" className={linkStyle}>
                        <IoSettingsOutline size={20} />
                        <span>Definições</span>
                    </NavLink>

                    
                    <button onClick={() => setModal(true)} className="flex items-center gap-3 px-4 py-2.5 rounded-r-lg border-l-4 border-transparent text-white/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-left font-semibold w-full mt-4">
                        <LuLogOut size={20} />
                        <span>Sair</span>
                    </button>

                </div>
            </div>

            <AnimatePresence>
                {sidebar && (
                    <div onClick={() => setSideBar(false)} className="inset-0 bg-black/30 fixed z-1200"></div>
                )}

                {modal && (
                    <Modal close={() => setModal(false)}>
                        <div className="flex flex-col items-center justify-center gap-5 mt-20 font-outfit z-3000">
                            <LuLogOut className="text-5xl" />
                            <h1 className="font-semibold">Deseja terminar a sessão</h1>
                            <div className="w-full flex items-center justify-center gap-3">
                                <button onClick={out} className="p-2 w-30 rounded cursor-pointer bg-blue-500 text-gray-50 duration-200 ease-in hover:bg-blue-700">
                                    Sim
                                </button>
                                <button onClick={() => setModal(false)} className="p-2 w-30 rounded cursor-pointer bg-red-500 text-gray-50 duration-200 ease-in hover:bg-red-700">
                                    Não
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )
}

export default SideBarAdmin;

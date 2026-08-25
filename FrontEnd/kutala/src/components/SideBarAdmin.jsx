import { FaUserTie } from "react-icons/fa";
import { RiHome9Line } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { LuUserPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { TbAlertHexagon } from "react-icons/tb";
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Link } from "react-router-dom";
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
        }

        if (usuario) {
            setTipo(usuario?.tipo)
        }

    }, [])

    function out() {
        logout()
        navigate("/login")
        setModal(false)
    }


    return (
        <>
            <button onClick={() => setSideBar(!sidebar)} className="fixed  top-0 p-5 cursor-pointer md:hidden z-60">
                {sidebar ? (
                    <motion.p animate={{ rotate: 360, transition: { duration: 0.5 } }}>
                        <FaXmark color="white" size={22} />
                    </motion.p>
                ) : (
                    <motion.p>
                        <FaBars  size={22} />
                    </motion.p>
                )}
            </button>

            <div className={`${sidebar ? "translate-x-0" : "-translate-x-full"} bg-kutala-blue flex flex-col items-center  w-75 inset-y-0 md:translate-x-0 fixed md:relative duration-400 ease-in-out z-40`}>

                <div className="text-white font-semibold font-outfit  p-3 md:mt-6 mt-7 flex flex-col gap-1 items-center justify-center">
                    <FaUserTie className="md:text-5xl text-4xl" />
                    <span> {tipo} </span>
                    <span> {email} </span>
                </div>

                <div className="text-white font-semibold mt-20 flex flex-col gap-4">

                    <Link to="/admin/dashboard" className="flex items-center gap-3">
                        <span><RiHome9Line /></span>
                        <span>Início</span>
                    </Link>

                    <Link to="/admin/mapa" className="flex items-center gap-3">
                        <span><TbMap2 /></span>
                        <span>Mapa</span>
                    </Link>

                    <Link to="/admin/listar-cidadao" className="flex items-center gap-3">
                        <span><FaUsers /></span>
                        <span>Cidadãos</span>
                    </Link>
                    <Link to="/admin/listar-alerta" className="flex items-center gap-3">
                        <span><RiErrorWarningLine /></span>
                        <span>Alertas</span>
                    </Link>

                    <Link to="" className="flex items-center gap-3">
                        <span><TbAlertHexagon /></span>
                        <span>Riscos</span>
                    </Link>

                    <Link to="" className="flex items-center gap-3">
                        <span><IoSettingsOutline /></span>
                        <span>Definições</span>
                    </Link>
                    <Link onClick={() => setModal(true)} className="flex items-center gap-3">
                        <span><LuLogOut /></span>
                        <span>Sair</span>
                    </Link>


                </div>
            </div>
            <AnimatePresence>
                {sidebar && (
                    <div onClick={() => setSideBar(false)} className="inset-0 bg-black/30 fixed z-20"></div>
                )}

                {modal && (

                    <Modal close={() => setModal(false)}>
                        <div className="flex flex-col items-center justify-center gap-5 mt-20 font-outfit">

                            <LuLogOut className="text-5xl" />

                            <h1 className="font-semibold">Deseja terminar a sessão</h1>

                            <div className="w-full  flex items-center justify-center gap-3">
                                <button onClick={out}
                                    className="p-2 w-30 rounded cursor-pointer bg-blue-500 text-gray-50  duration-200 ease-in hover:bg-blue-700">
                                    Sim
                                </button>

                                <button onClick={() => setModal(false)}
                                    className="p-2 w-30 rounded cursor-pointer bg-red-500 text-gray-50  duration-200 ease-in hover:bg-red-700">
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
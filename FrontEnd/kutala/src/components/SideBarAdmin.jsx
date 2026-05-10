import { FaUserTie } from "react-icons/fa";
import { RiHome9Line } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { LuUserPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { TbAlertHexagon } from "react-icons/tb";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function SideBarAdmin({ isOpen }) {
    const [email, setEmail] = useState("");
    const [tipo, setTipo] = useState("");
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

    function fazerLogout() {
        const confirmacao = window.confirm("Deseja terminar a sessão?");
        if (confirmacao) {
            logout()
            navigate("/")
        }
    }



    return (
        <>
            <div className={`${isOpen ? "flex" : "hidden"} md:flex  justify-center pt-12 min-h-screen w-64 md:w-92 bg-gray-900 fixed md:relative z-2000`}>
                <div className="md:flex flex-col space-y-2">

                    <div className="text-center flex justify-center items-center flex-col pb-10">
                        <FaUserTie className="text-6xl text-white my-2" />
                        <h3 className="text-white font-barlow">
                            <Link to="/admin/dashboard"> {tipo} </Link>
                        </h3>
                        <p className="text-gray-300 font-barlow cursor-pointer hover:text-blue-400"> {email} </p>
                    </div>

                    <div className="space-y-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <section>
                                <RiHome9Line className=" flex justify-center text-blue-400 text-xl" />
                            </section>

                            <section>
                                <p className="text-gray-100 font-google hover:text-gray-300">
                                    <Link to="/admin/dashboard">Home</Link>
                                </p>
                            </section>


                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <TbMap2 className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 hover:text-gray-300">
                                    <Link to="/admin/mapa">Mapa</Link>
                                </p>

                            </section>


                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <LuUserPlus className=" flex justify-center text-blue-400 text-xl" />
                            </section>

                            <section>
                                <p className="text-gray-200 font-google hover:text-gray-300">
                                    <Link to="/admin/listar-governadores">Governador</Link>
                                </p>

                            </section>


                        </div>


                        <div className="flex items-center gap-3">
                            <section>
                                <FaUsers className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">
                                    <Link to="/admin/listar-cidadao">Cidadãos</Link>
                                </p>
                            </section>


                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <TbAlertHexagon className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300" >
                                    <Link className="flex" to="/admin/listar-alerta"> Alertas<FaCircle className="ml-2 text-red-600 w-2 animate-ping" /> </Link>
                                </p>
                            </section>




                        </div>




                        <div className="flex items-center gap-3">
                            <section>
                                <RiErrorWarningLine className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">
                                    <Link to="/admin/listar-riscos">Riscos de Inundação</Link>
                                </p>
                            </section>


                        </div>


                        <div className="flex items-center gap-3">
                            <section>
                                <IoSettingsOutline className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">Definições</p>
                            </section>


                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <GrLogout className="text-xl text-blue-400 flex justify-center" />
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300"
                                    onClick={() => fazerLogout()}
                                >
                                    Sair
                                </p>
                            </section>


                        </div>









                    </div>






                </div>
            </div>



        </>
    )
}

export default SideBarAdmin;
import SideBarAdmin from "../../../components/SideBarAdmin";
import TotalGovernador from "../../../services/Governador/TotalGovService"
import TotalCidadao from "../../../services/Cidadao/TotalCidService";
import TotalAlerta from "../../../services/Alerta/TotalAlertService";
import TotalRisc from "../../../services/Risco/TotalRiscService";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion"



import { useEffect, useState } from "react";


import { FaUsers } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { RiAlertLine } from "react-icons/ri";
import { IoAlertCircleOutline } from "react-icons/io5";


import GraficoBarras from "../../Gráficos/GraficoBarra";
import GraficoLinhas from "../../Gráficos/GraficoLine";
import GraficoPizza from "../../Gráficos/GraficoPizza";



function Dashboard() {
    const [totalGov, setTotalGov] = useState([]);
    const [totalCid, setTotalCid] = useState([]);
    const [totalAlert, setTotalAlert] = useState([]);
    const [totalRisc, setTotalRisc] = useState([]);
    const [sideBar, setSideBar] = useState(false);
    const [loader, setLoader] = useState(false)





    useEffect(() => {
        async function todosGov() {
            try {
                setLoader(true)
                const resposta = await TotalGovernador();
                setTotalGov(resposta.data);


            } catch (error) {
                console.log("Erro ao buscar o total de governadores")
            }
            setLoader(false)

        }

        async function todosCid() {
            try {
                setLoader(true)
                const resposta = await TotalCidadao();
                setTotalCid(resposta.data);




            } catch (error) {
                console.log("Erro ao calcular todal de cidadãos ", error);
            }
            setLoader(false)
        }

        async function todosAlert() {
            try {
                setLoader(true)
                const resposta = await TotalAlerta();
                setTotalAlert(resposta.data);

            } catch (error) {
                console.log("Erro ao calcular total de alertas ", error);
            }
            setLoader(false)
        }

        async function todosRisc() {
            try {
                setLoader(true)
                const resposta = await TotalRisc();
                setTotalRisc(resposta.data)


            } catch (error) {
                console.log("Erro ao calcular total de riscos ", error)
            }
            setLoader(false)
        }

        todosAlert()
        todosRisc()
        todosCid()
        todosGov()
    }, [])


    const container = {
        hidden: {},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5
            }
        }
    }

    const item = {
        hidden: {
            opacity: 0,
            y: 50
        },

        visible: {
            opacity: 1,
            y: 0,
            transition : {duration : 0.7}
        }
    }


    return (

        <>
            <div className="flex">
                <SideBarAdmin />

                <motion.div variants={container} initial="hidden" animate="visible"
                    className="flex-1 w-full min-h-screen  flex flex-col p-5 bg- gap-3">

                    <motion.div variants={item}
                        className="md:mt-0 mt-10 font-outfit">
                        <p className="font-medium tracking-wide">Painel de controle</p>
                        <p className="text-gray-600 tracking-wide">Bem vindo de volta admin!</p>
                    </motion.div>


                    <motion.div variants={item}
                     className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 font-outfit">

                        <div className="bg-kutala-blue rounded-md p-5 cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-50 font-medium">Cidadãos</p>
                                <FaUsers className="text-3xl text-gray-50" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-50">{totalCid}</h3>
                            )}
                        </div>

                        <div className="bg-kutala-blue rounded-md   p-6 cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-50 font-medium">Governadores</p>
                                <FaUserTie className="text-3xl text-gray-50" />
                            </div>

                            {loader ? (
                                <div className="w-full p-1 flex justify-center items-center">
                                    <ClipLoader size={25} />
                                </div>
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-50">{totalGov}</h3>
                            )}
                        </div>

                        <div className="bg-kutala-blue rounded-md   p-6 cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-50 font-medium">Alertas</p>
                                <RiAlertLine className="text-3xl text-gray-50" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-50">{totalAlert}</h3>
                            )}
                        </div>

                        <div className="bg-kutala-blue rounded-md   p-6 cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl  text-gray-50 font-medium">Riscos</p>
                                <IoAlertCircleOutline className="text-3xl text-gray-50" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-50">{totalRisc}</h3>
                            )}
                        </div>
                    </motion.div>

                    <motion.div variants={item}
                     className="flex flex-col md:flex-row gap-4 w-full flex-1">


                        <div className="flex flex-col gap-4 w-full md:w-2/3">
                            <div className="bg-white p-5 shadow-xl rounded-md flex-1 fl6x flex-col justify-center items-center cursor-pointer">
                                <h2 className="font-google text-lg text-center mb-2">Municípios Afetados</h2>
                                <div className="w-full h-full min-h-50">
                                    <GraficoBarras />
                                </div>
                            </div>

                            <div className="bg-white p-5 shadow-xl rounded-lg flex-1 flex items-center justify-center">
                                <div className="w-full h-full min-h-50">
                                    <h2 className="font-google text-lg text-center mb-2">Últimos Alertas</h2>
                                    <GraficoLinhas />
                                </div>
                            </div>
                        </div>


                        <div className="bg-white shadow-xl rounded-lg w-full md:w-1/3 p-5 flex flex-col justify-center items-center">
                            <h2 className="font-google text-xl mb-4">Níveis de alerta</h2>
                            <div className="w-full h-full flex items-center justify-center">
                                <GraficoPizza />
                            </div>
                        </div>

                    </motion.div>
                </motion.div>

            </div>


        </>
    )
}

export default Dashboard;
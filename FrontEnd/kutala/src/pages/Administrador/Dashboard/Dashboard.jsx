import SideBarAdmin from "../../../components/SideBarAdmin";
import TotalGovernador from "../../../services/Governador/TotalGovService"
import TotalCidadao from "../../../services/Cidadao/TotalCidService";
import TotalAlerta from "../../../services/Alerta/TotalAlertService";
import TotalRisc from "../../../services/Risco/TotalRiscService";
import { ClipLoader } from "react-spinners";



import { useEffect, useState } from "react";


import { FaUsers } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { RiAlertLine } from "react-icons/ri";
import { IoAlertCircleOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

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

    function abrirSidebar() {
        setSideBar(!sideBar)
    }




    return (

        <>
            <div className="flex">
                <SideBarAdmin isOpen={sideBar} />
                <div className="w-full min-h-screen bg-sky-50 flex flex-col p-4 md:px-4 gap-6">

                    <div className="pt-2 md:p-0">
                        <GiHamburgerMenu onClick={() => abrirSidebar()} className="text-xl md:hidden cursor-pointer hover:scale-120 transition-all" />
                        {sideBar && (
                            <div
                                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                onClick={() => setSideBar(false)}
                            />
                        )}
                    </div>



                    <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">

                        <div className="bg-white rounded-md border-l-6 border-blue-400 p-6 cursor-pointer hover:bg-gray-100 shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-800 font-medium">Cidadãos</p>
                                <FaUsers className="text-3xl text-blue-400" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) :  (
                                <h3 className="text-3xl font-bold font-google text-gray-800">{totalCid}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-md border-l-6 border-green-500 p-6 cursor-pointer hover:bg-gray-100 shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-800 font-medium">Governadores</p>
                                <FaUserTie className="text-3xl text-green-500" />
                            </div>

                            {loader ? (
                                <div className="w-full p-1 flex justify-center items-center">
                                    <ClipLoader size={25} />
                                </div>
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-800">{totalGov}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-md border-l-6 border-yellow-400 p-6 cursor-pointer hover:bg-gray-100 shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-gray-800 font-medium">Alertas</p>
                                <RiAlertLine className="text-3xl text-yellow-400" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-800">{totalAlert}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-md border-l-6 border-red-600 p-6 cursor-pointer hover:bg-gray-100 shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl  text-gray-800 font-medium">Riscos</p>
                                <IoAlertCircleOutline className="text-3xl text-red-600" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-gray-800">{totalRisc}</h3>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full flex-1">


                        <div className="flex flex-col gap-4 w-full md:w-2/3">
                            <div className="bg-white p-5 shadow-xl rounded-md flex-1 fl6x flex-col justify-center items-center cursor-pointer">
                                <h2 className="font-google text-lg text-center mb-2">Municípios Afetados</h2>
                                <div className="w-full h-full min-h-[200px]">
                                    <GraficoBarras />
                                </div>
                            </div>

                            <div className="bg-white p-5 shadow-xl rounded-lg flex-1 flex items-center justify-center">
                                <div className="w-full h-full min-h-[200px]">
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

                    </div>
                </div>

            </div>


        </>
    )
}

export default Dashboard;
import SideBarAdmin from "../../../components/SideBarAdmin";
import TotalCidadao from "../../../services/Cidadao/TotalCidService";
import TotalAlerta from "../../../services/Alerta/TotalAlertService";
import TotalRisc from "../../../services/Alerta/TotalRiscoAlto"
import buscarBairros from "../../../services/Bairro/Total";
import filtro from "../../../services/Cidadao/Filtrar";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion"



import { useEffect, useState } from "react";


import { FaUsers } from "react-icons/fa6";
import { RiAlertLine } from "react-icons/ri";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuMapPinHouse } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

import GraficoBarras from "../../Gráficos/GraficoBarra";
import GraficoLinhas from "../../Gráficos/GraficoLine";
import GraficoPizza from "../../Gráficos/GraficoPizza";



function Dashboard() {
    const [totalCid, setTotalCid] = useState([]);
    const [totalAlert, setTotalAlert] = useState([]);
    const [totalRisc, setTotalRisc] = useState([]);
    const [totalBairro, setTotalBairro] = useState([]);
    const [loader, setLoader] = useState(false)
    const [filter, setFilter] = useState(false)
    const [day, setDay] = useState(0);
    const [quantidadeCid, setQuantidadeCid] = useState(0)






    useEffect(() => {

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

        async function todosBairros() {
            try {

                const response = await buscarBairros();
                setTotalBairro(response.data)

            } catch (error) {
                console.log("Erro ao ir buscar os bairros")
            }
        }

        async function filtrarUser(dia) {

            try {
                const resposta = await filtro(dia);
                setQuantidadeCid(resposta.data)

            } catch {
                console.log("Erro ao flitrar cidadao")
            }
        }
        todosBairros()
        todosAlert()
        todosRisc()
        todosCid()
        filtrarUser(day)
    }, [day])


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
            transition: { duration: 0.7 }
        }
    }


    return (

        <>
            <div className="flex">
                <SideBarAdmin />

                <motion.div variants={container} initial="hidden" animate="visible"
                    className="flex-1 w-full min-h-screen bg-gray-100 flex flex-col p-5 bg- gap-3">

                    <motion.div variants={item}
                        className="md:mt-0 mt-10 py-1 md:p-0 font-outfit">
                        <p className="font-medium tracking-wide">Painel de controle</p>
                        <p className="text-gray-600 tracking-wide">Bem vindo de volta admin!</p>
                    </motion.div>

                    <motion.div variants={item}
                        className="flex items-center justify-between font-outfit">
                        <button onClick={() => setFilter(prev => !prev)}
                            className={`${filter ? "rounded-t-md" : "rounded-md"} p-2 bg-kutala-blue w-30 flex items-center justify-center text-white gap-2 cursor-pointer text-sm `} >
                            Filtrar
                            <FaFilter />
                        </button>


                        <button className="p-2 w-40 cursor-pointer text-sm rounded-md flex items-center justify-center gap-2 bg-kutala-blue text-white">
                            Gerar Relatório
                            <IoMdDownload />
                        </button>
                    </motion.div>




                    <motion.div variants={item}
                        className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 font-outfit">

                        <div className="bg-white rounded-xl p-6  cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-kutala-blue font-medium">Cidadãos</p>
                                <FaUsers className="text-4xl text-blue-500 bg-blue-50 p-2 rounded" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-kutala-blue">{quantidadeCid}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-xl p-6  cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-kutala-blue font-medium">Bairros</p>
                                <LuMapPinHouse className="text-4xl text-green-500 p-2 bg-green-50 rounded" />
                            </div>

                            {loader ? (
                                <div className="w-full p-1 flex justify-center items-center">
                                    <ClipLoader size={25} />
                                </div>
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-kutala-blue">{totalBairro}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-xl p-6  cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl text-kutala-blue font-medium">Alertas</p>
                                <RiAlertLine className="text-4xl text-yellow-500 bg-yellow-50 p-2 rounded" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-kutala-blue">{totalAlert}</h3>
                            )}
                        </div>

                        <div className="bg-white rounded-xl p-6  cursor-pointer  shadow-md transition-all">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-outfit text-xl  text-kutala-blue font-medium">Riscos Alto</p>
                                <IoAlertCircleOutline className="text-4xl text-red-500 bg-red-50 p-2 rounded" />
                            </div>
                            {loader ? (
                                <ClipLoader size={25} />
                            ) : (
                                <h3 className="text-3xl font-bold font-google text-kutala-blue">{totalRisc}</h3>
                            )}
                        </div>
                    </motion.div>

                    <motion.div variants={item}
                        className="flex flex-col md:flex-row gap-4 w-full flex-1">


                        <div className="flex flex-col gap-4 w-full md:w-2/3">
                            <div className="bg-white p-5 shadow-xl rounded-md flex-1 fl6x flex-col justify-center items-center cursor-pointer">
                                <h2 className="font-google text-lg text-center mb-2">Alertas por Município</h2>
                                <div className="w-full h-full min-h-50">
                                    <GraficoBarras />
                                </div>
                            </div>

                            <div className="bg-white p-5 shadow-xl rounded-lg flex-1 flex items-center justify-center">
                                <div className="w-full h-full min-h-50">
                                    <h2 className="font-google text-lg text-center mb-2"> Evolução dos Alertas</h2>
                                    <GraficoLinhas />
                                </div>
                            </div>
                        </div>


                        <div className="bg-white shadow-xl rounded-lg w-full md:w-1/3 p-5 flex flex-col justify-center items-center">
                            <h2 className="font-google text-xl mb-4">Quantidade de alertas</h2>
                            <div className="w-full h-full flex items-center justify-center">
                                <GraficoPizza />
                            </div>
                        </div>

                    </motion.div>

                    {filter && (
                        <div className="absolute  bg-white border w-30 h-40 md:top-29 top-40 rounded-b-md font-outfit flex flex-col gap-2">
                            <p onClick={() => { setDay(0); setFilter(false) }}
                                className="w-full px-2 hover:bg-kutala-blue hover:text-white cursor-pointer mt-1">Hoje</p>


                             <p onClick={() => { setDay(1); setFilter(false) }}
                                className="w-full px-2 hover:bg-kutala-blue hover:text-white cursor-pointer">1 Dia</p>

                             <p onClick={() => { setDay(3); setFilter(false) }}
                                className="w-full px-2 hover:bg-kutala-blue hover:text-white cursor-pointer">3 Dias</p>


                            <p onClick={() => { setDay(7); setFilter(false) }}
                                className="w-full px-2 hover:bg-kutala-blue hover:text-white cursor-pointer">Uma Semana</p>


                            <p onClick={() => { setDay(30); setFilter(false) }}
                                className="w-full px-2 hover:bg-kutala-blue hover:text-white cursor-pointer">Um Mês</p>
                        </div>
                    )}
                </motion.div>



            </div>


        </>
    )
}

export default Dashboard;
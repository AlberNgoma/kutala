import SideBarAdmin from "../../../components/SideBarAdmin"
import { ImSearch } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { useState, useEffect } from "react";
import getAlerts from "../../../services/Alerta/TodosAlertasService"
import deleteAlert from "../../../services/Alerta/ApagarAlerta"
import emitirRisco from "../../../services/Alerta/EmitirRiscoService"
import { LuTriangleAlert } from "react-icons/lu";
import alert from "../../../Alerts";
import { ClipLoader } from "react-spinners";
import Modal from "../../../components/Modal";
import { AnimatePresence } from "framer-motion";
import updateAlert from "../../../services/Alerta/ActualizarAlertService";
import buscarBairros from "../../../services/Bairro/BairrosService";
import { FaLocationDot } from "react-icons/fa6";
import { LuMessageCircleWarning } from "react-icons/lu";
import { IoIosWater } from "react-icons/io";
import { FaTemperatureFull } from "react-icons/fa6";
import { RiPercentFill } from "react-icons/ri";
import { BsChatSquareTextFill } from "react-icons/bs";



function corNivel(nivel) {
    switch (nivel) {
        case "ALTO": return "text-red-600";
        case "MEDIO": return "text-yellow-500";
        case "BAIXO": return "text-green-500";
        default: return "text-gray-400";
    }
};

function corNivelModal(nivel) {
    switch (nivel) {
        case "ALTO": return "text-red-600 bg-red-200";
        case "MEDIO": return "text-yellow-500 bg-yellow-200";
        case "BAIXO": return "text-green-500 bg-green-200";
        default: return "text-gray-400";
    }
};


function corStatus(status) {
    switch (status) {
        case "PENDENTE": return "text-yellow-500"
        case "RESOLVIDO": return "text-green-500"
    }
};

function corStatusModal(status) {
    switch (status) {
        case "PENDENTE": return "text-yellow-600 bg-yellow-200";
        case "RESOLVIDO": return "text-green-500 bg-green-200";
    }
};




function Listar() {
    const [alertas, setAlertas] = useState([]);
    const [pesquisar, setPesquisar] = useState("");
    const [risco, setRisco] = useState("");
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [modalAlert, setModalAlert] = useState(false);
    const [alertaSelecionado, setAlertaSelecionado] = useState(null)
    const [bairros, setBairros] = useState([])
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function buscarAlertas() {
            try {
                const resposta = await getAlerts();
                setAlertas(resposta.data)
                console.log(resposta.data)

            } catch (error) {
                console.log("Erro ao listar alertas ", error);
            }
        }

        async function getBairros() {
            const resposta = await buscarBairros()
            setBairros(resposta.data)
        }

        getBairros()
        buscarAlertas()
    }, [])

    async function apagarAlerta(id) {
        try {
            await deleteAlert(id);
            setAlertas(alertaActual => alertaActual.filter(a => a.id !== id))
            setModalDelete(false)
            alert.success("Alerta eliminado com sucesso!")

        } catch (error) {
            console.log("Erro ao apagar alerta")
        }
    }


    const alertasFiltrados = alertas.filter((alerta) => {
        const termo = pesquisar.toLowerCase();

        const filtroTexto = pesquisar === "" || (
            alerta.nivel_alerta.toLowerCase().includes(termo) ||
            alerta.descricao.toLowerCase().includes(termo) ||
            alerta.bairro.nome.toLowerCase().includes(termo) ||
            alerta.status.toLowerCase().includes(termo)
        );

        const filtroRisco = risco === "" || alerta.bairro.nivel_risco === risco;

        return filtroTexto && filtroRisco

    });


    async function actualizarAlert(id, nivelActual) {
        const confirmacao = window.confirm(`Emitir risco de inundação nível ${nivelActual}?`);
        if (!confirmacao) return;

        try {
            setLoading(id);
            await emitirRisco(id, nivelActual);
            setAlertas(alertaActual =>
                alertaActual.map(a =>
                    a.id === id ? { ...a, status: 'RESOLVIDO' } : a
                )
            );

            alert.success("Risco de inundação emitido com sucesso!");

        } catch (error) {
            console.log("Erro ao emitir risco", error);
            alert.error("Erro ao emitir risco!");
        } finally {
            setLoading(null)
        }
    };

    function openEdit(alerta) {
        setModalEdit(true)
        setAlertaSelecionado(alerta)
    }

    function openDelete(alerta) {
        setModalDelete(true)
        setAlertaSelecionado(alerta)
    }

    {/*async function novoAlerta(e) {
        e.preventDefault();
        try {
            const alertId = alertaSelecionado.id;

            const dadosAlerta = {
                titulo: alertaSelecionado.titulo,
                bairro_id: alertaSelecionado.bairro_id,
                municipio_id: alertaSelecionado.municipio_id,
                nivel_alerta: alertaSelecionado.nivel_alerta,
                status: alertaSelecionado.status
            };

            await updateAlert(alertId, dadosAlerta)
            const resposta = await getAlerts();
            setAlertas(resposta.data)
            setModalEdit(false)
            alert.success("Alerta atualizado com sucesso");





        } catch (error) {
            console.log("Erro ao actualizar alerta ", error)
        }
    } */}




    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="flex-1 w-full h-screen bg-gray-100">
                    <div className="px-4 pt-4 flex justify-center flex-col space-y-10">



                        <div className="md:mt-0 mt-10 py-2 md:p-0 font-outfit">
                            <h2 className="text-xl flex items-center">Alertas Registrados</h2>
                            <p className="font-outfit text-lg">Total : {alertas.length}</p>
                        </div>

                        <div className="w-full flex items-center justify-end">
                            <input value={pesquisar} onChange={(e) => setPesquisar(e.target.value)}
                                placeholder="Pesquise por nivel, bairro, status..." type="search"
                                className="border w-1/2 py-1 px-5 md:py-2  outline-none rounded-tl-full rounded-bl-full  placeholder:text-kutala-blue bg-white placeholder:font-outfit" />


                            <button className="bg-kutala-blue border border-kutala-blue text-white cursor-pointer md:px-4 md:py-3 py-2 px-3 rounded-tr-full rounded-br-full">
                                <ImSearch />
                            </button>

                        </div>


                        <div className="w-full overflow-x-auto max-h-100 overflow-y-auto ">
                            <table className="w-full min-w-150 bg-white text-left text-sm">
                                <thead className="bg-kutala-blue text-white top-0 sticky">

                                    <tr>
                                        <th className="py-3 px-8 rounded-tl-2xl">Nível</th>
                                        <th className="py-3 px-8">Descrição</th>
                                        <th className="py-3 px-8">Bairro</th>
                                        <th className="py-3 px-8">Município</th>
                                        <th className="py-3 px-8">Status</th>
                                        <th className="py-3 px-8 rounded-tr-2xl">Botões</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {alertasFiltrados.map((alerta) => (
                                        <tr className="hover:bg-gray-100 cursor-pointer duration-300 " key={alerta.id}>

                                            <td className={`${corNivel(alerta.nivel_alerta)} py-3 px-8 font-semibold`}> {alerta.nivel_alerta} </td>
                                            <td className="py-3 px-8"> {alerta.descricao} </td>
                                            <td className="py-3 px-8"> {alerta.bairro.nome} </td>
                                            <td className="py-3 px-8"> {alerta.municipio.nome} </td>
                                            <td className={`${corStatus(alerta.status)} py-3 px-8 font-semibold`}> {alerta.status} </td>


                                            <td className="flex items-center px-6 py-3 gap-1">
                                                <button onClick={() => openEdit(alerta)} className="bg-green-100 p-2 rounded hover:bg-green-200 duration-300 cursor-pointer">
                                                    <FaEye className="text-green-500" />
                                                </button>

                                                <button onClick={() => openDelete(alerta)} className="bg-red-100 p-2 rounded hover:bg-red-200 duration-300 cursor-pointer">
                                                    <BsTrash3 className="text-red-500" />
                                                </button>

                                                <button onClick={() => setModalAlert(true)} className="bg-blue-100 p-2 rounded hover:bg-blue-200 duration-300 cursor-pointer">
                                                    <LuTriangleAlert className="text-blue-500" />
                                                </button>


                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
                {loading && (
                    <div className="bg-black/30 backdrop-blur-sm z-50 fixed inset-0 flex items-center justify-center">

                        <div className="relative w-full flex items-center justify-center flex-col md:left-34">
                            <ClipLoader size={43} color="#1c0063" />
                        </div>


                    </div>
                )}
            </div>

            <AnimatePresence>

                {modalEdit && (
                    <Modal close={() => setModalEdit(false)}>
                        <div className="flex flex-col  px-5 font-outfit">

                            <div className="text-kutala-blue">
                                <h1 className="flex items-center gap-2 text-xl  font-semibold tracking-wide">Localização <FaLocationDot /> </h1>
                                <div className="mt-2 flex flex-col gap-1 bg-white border-l-4 px-3 py-2 border-kutala-blue rounded">
                                    <h1> Municipio : {alertaSelecionado.municipio.nome} </h1>
                                    <h1> Bairro : {alertaSelecionado.bairro.nome} </h1>
                                </div>
                            </div>

                            <div>
                                <h1 className="flex items-center gap-2 text-xl text-kutala-blue font-semibold tracking-wide mt-1">Descrição <LuMessageCircleWarning /> </h1>
                                <div className="mt-2 flex flex-col gap-1 bg-white px-3 py-4 text-kutala-blue border-l-4 border-kutala-blue rounded">
                                    <h1 className="italic flex items-center gap-1"> <BsChatSquareTextFill /> {alertaSelecionado.descricao} </h1>

                                    <div className="flex flex-col justify-center gap-1">

                                        <section className="flex items-center gap-1">
                                            <IoIosWater />
                                            <p>Chuva - {alertaSelecionado.dados_clima.chuva}mm </p>
                                        </section>

                                        <section className="flex items-center gap-1">
                                            <FaTemperatureFull />
                                            <p>Temperatura - {alertaSelecionado.dados_clima.temperatura}ºC</p>
                                        </section>

                                        <section className="flex items-center gap-1">
                                            <RiPercentFill />
                                            <p>Humidade - {alertaSelecionado.dados_clima.humidade} % </p>
                                        </section>


                                    </div>


                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-3">
                                <div className="flex items-center gap-2 ">
                                    <p className="text-gray-700">Risco de inundação : </p>

                                    <p className={`${corNivelModal(alertaSelecionado.nivel_alerta)} font-semibold rounded-full text-xs py-1 px-5`}>
                                        {alertaSelecionado.nivel_alerta}
                                    </p>

                                </div>

                                <div className="flex items-center gap-2 ">
                                    <p className="text-gray-700">Status : </p>
                                    <p className={`${corStatusModal(alertaSelecionado.status)} font-semibold rounded-full text-xs py-1 px-5`}>
                                        {alertaSelecionado.status}
                                    </p>
                                </div>


                                <p className="text-xs  text-center text-gray-500">Alerta criado em {new Date(alertaSelecionado.createdAt).toLocaleString()} </p>



                            </div>




                        </div>


                    </Modal>
                )}





                {modalDelete && (
                    <Modal close={() => setModalDelete(false)}>
                        <div className="flex flex-col items-center justify-center gap-3 font-outfit">

                            <section className="mt-20">
                                <BsTrash3 className="text-4xl text-red-500" />
                            </section>


                            <section className="flex flex-col gap-2 justify-center items-center">
                                <p className="text-xl">Deseja eliminar este alerta?</p>
                                <p className="text-sm">Esta ação não pode ser revertida</p>
                            </section>


                            <section className="flex items-center justify-center gap-2 text-gray-100 ">
                                <button onClick={() => apagarAlerta(alertaSelecionado.id)} className="w-20 p-2 cursor-pointer bg-blue-500 rounded duration-300 hover:bg-blue-600">
                                    Sim
                                </button>

                                <button onClick={() => setModalDelete(false)} className="w-20 p-2 cursor-pointer bg-red-500 rounded duration-300 hover:bg-red-600">
                                    Não
                                </button>
                            </section>

                        </div>
                    </Modal>
                )}



                {modalAlert && (
                    <Modal close={() => setModalAlert(false)}>
                        <p>It´s modal Alert</p>
                    </Modal>
                )}


            </AnimatePresence>


        </>
    );
}

export default Listar;
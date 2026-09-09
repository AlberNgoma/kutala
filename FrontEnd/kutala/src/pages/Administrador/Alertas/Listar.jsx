import SideBarAdmin from "../../../components/SideBarAdmin"
import { ImSearch } from "react-icons/im";
import { TbEdit } from "react-icons/tb";
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




function corNivel(nivel) {
    switch (nivel) {
        case "ALTO": return "text-red-600";
        case "MEDIO": return "text-yellow-500";
        case "BAIXO": return "text-green-500";
        default: return "text-gray-400";
    }
};


function corStatus(status) {
    switch (status) {
        case "PENDENTE": return "text-yellow-500"
        case "RESOLVIDO": return "text-green-500"
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
        const confirmacao = window.confirm("Tem a certeza que quer eliminar?");
        if (!confirmacao) return;
        try {
            await deleteAlert(id);
            setAlertas(alertaActual => alertaActual.filter(a => a.id !== id))
            alert.success("Alerta eliminado com sucesso!")

        } catch (error) {
            console.log("Erro ao apagar alerta")
        }
    }


    const alertasFiltrados = alertas.filter((alerta) => {
        const termo = pesquisar.toLowerCase();

        const filtroTexto = pesquisar === "" || (
            alerta.titulo.toLowerCase().includes(termo) ||
            alerta.mensagem.toLowerCase().includes(termo) ||
            alerta.nivel_alerta.toLowerCase().includes(termo) ||
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

    async function novoAlerta(e) {
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
    }




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
                            <table className="w-full min-w-150 bg-white text-left">
                                <thead className="bg-kutala-blue text-white top-0 sticky">

                                    <tr>
                                        <th className="py-3 px-8 rounded-tl-2xl">Título</th>
                                        <th className="py-3 px-8">Bairro</th>
                                        <th className="py-3 px-8">Município</th>
                                        <th className="py-3 px-8">Nivel</th>
                                        <th className="py-3 px-8">Status</th>
                                        <th className="py-3 px-8 rounded-tr-2xl">Botões</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {alertasFiltrados.map((alerta) => (
                                        <tr className="hover:bg-gray-100 cursor-pointer duration-300 " key={alerta.id}>
                                            <td className="py-3 px-8 font-semibold"> {alerta.titulo} </td>
                                            <td className="py-3 px-8"> {alerta.bairro.nome} </td>
                                            <td className="py-3 px-8"> {alerta.municipio.nome} </td>
                                            <td className={`${corNivel(alerta.nivel_alerta)} py-3 px-8 font-semibold`}> {alerta.nivel_alerta} </td>
                                            <td className={`${corStatus(alerta.status)} py-3 px-8 font-semibold`}> {alerta.status} </td>


                                            <td className="flex items-center px-6 py-3 gap-1">
                                                <button onClick={() => openEdit(alerta)} className="bg-green-100 p-2 rounded hover:bg-green-200 duration-300 cursor-pointer">
                                                    <TbEdit className="text-green-500" />
                                                </button>

                                                <button onClick={() => setModalDelete(true)} className="bg-red-100 p-2 rounded hover:bg-red-200 duration-300 cursor-pointer">
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

                        

                    </Modal>
                )}





                {modalDelete && (
                    <Modal close={() => setModalDelete(false)}>
                        <p>It´s modal Delete</p>
                    </Modal>
                )}

                {modalDelete && (
                    <Modal close={() => setModalDelete(false)}>
                        <p>It´s modal Delete</p>
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
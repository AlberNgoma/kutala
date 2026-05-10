import SideBarAdmin from "../../../components/SideBarAdmin"
import { IoSearch } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAlertFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getAlerts from "../../../services/Alerta/TodosAlertasService"
import deleteAlert from "../../../services/Alerta/ApagarAlerta"
import emitirRisco from "../../../services/Alerta/EmitirRiscoService"
import { LuTriangleAlert } from "react-icons/lu";




function corNivel(nivel) {
    switch (nivel) {
        case "ALTO": return "bg-red-600";
        case "MEDIO": return "bg-yellow-500";
        case "BAIXO": return "bg-green-500";
        default: return "bg-gray-400";
    }
};


function corStatus(status) {
    switch (status) {
        case "PENDENTE": return "bg-yellow-500"
        case "RESOLVIDO": return "bg-green-500"
    }
};

function Listar() {
    const [alertas, setAlertas] = useState([]);
    const [pesquisar, setPesquisar] = useState("");
    const [risco, setRisco] = useState("");
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();

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
            await emitirRisco(id, nivelActual);
            setAlertas(alertaActual =>
                alertaActual.map(a =>
                    a.id === id ? { ...a, status: 'RESOLVIDO' } : a
                )
            );
            alert("Risco de inundação emitido com sucesso!");
        } catch (error) {
            console.log("Erro ao emitir risco", error);
            alert("Erro ao emitir risco!");
        }
    };

    function abrirSideBar() {
        setSideBar(!sideBar)
    }


    return (
        <>
            <div className="flex">
                <SideBarAdmin isOpen={sideBar} />
                <div className="w-full h-screen bg-gray-50">
                    <div className="px-4 pt-4 flex justify-center flex-col space-y-10">

                        <div className="pt-2 md:p-0">
                            <GiHamburgerMenu onClick={() => abrirSideBar()} className="text-xl md:hidden cursor-pointer hover:scale-120 transition-all" />
                            {sideBar && (
                                <div
                                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                    onClick={() => setSideBar(false)}
                                />
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl flex items-center font-google">Alertas Registados <RiAlertFill className=" mx-1 text-2xl" /></h2>
                            <p className="font-outfit text-lg">Total : {alertas.length}</p>
                        </div>

                        <div className="w-full space-y-2 md:flex justify-between items-center">


                            <input type="search" placeholder="Pesquisar..."
                                className="w-full md:w-1/2 px-3 py-2 focus:border-blue-900
                                          focus: outline-none border  shadow-lg border-gray-400
                                         rounded-lg cursor-pointer placeholder:font-barlow"
                                value={pesquisar}
                                onChange={(e) => setPesquisar(e.target.value)}>
                            </input>


                            <select className="w-full md:w-60 border w-70 rounded-lg p-2 font-outfitfocus: outline-none border  shadow-lg border-gray-400"
                                onChange={(e) => setRisco(e.target.value)}>


                                <option value="">Todos Bairros</option>
                                <option value="ALTO">Bairros Críticos</option>
                                <option value="BAIXO">Bairros Moderados</option>
                            </select>

                        </div>


                        <div className="w-full h-80 rounded-xl overflow-y-auto">
                            <table className="w-full text-center p-0">
                                <thead className="bg-gray-900 h-10 sticky top-0 text-gray-200">
                                    <tr>
                                        <td className="font-google">Título</td>
                                        <td className="font-google">Mensagem</td>
                                        <td className="font-google">Nível</td>

                                        <td className="font-google">Bairro</td>
                                        <td className="font-google">Status</td>
                                        <td className="font-google">Ações</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {alertasFiltrados.length > 0 ? (
                                        alertasFiltrados.map((alerta) => (
                                            <tr className="hover:bg-gray-100" key={alerta.id}>
                                                <td className="font-barlow text-md font-bold">{alerta.titulo}</td>
                                                <td className="font-barlow text-md">{alerta.mensagem}</td>
                                                <td className="font-barlow text-md">
                                                    <span className={`${corNivel(alerta.nivel_alerta)}  text-white text-xs px-2 py-1 rounded-full`}>
                                                        {alerta.nivel_alerta}
                                                    </span>
                                                </td>

                                                <td className="font-barlow text-md">{alerta.bairro.nome}</td>

                                                <td className="font-barlow text-md">
                                                    <span className={`${corStatus(alerta.status)} text-white text-xs px-2 py-1 rounded-full`}>
                                                        {alerta.status}
                                                    </span>

                                                </td>

                                                <td className="flex justify-center space-x-1 py-1 cursor-pointer">

                                                    <TbEdit
                                                        className="bg-green-500 rounded text-white hover:bg-green-700 text-3xl px-2 py-1"
                                                        onClick={() => navigate(`/admin/editar-alerta/${alerta.id}`)}
                                                    />
                                                    <BsTrash3
                                                        className="bg-red-600 rounded text-white hover:bg-red-700 text-3xl px-2 py-1"
                                                        onClick={() => apagarAlerta(alerta.id)}

                                                    />
                                                    <LuTriangleAlert className="bg-blue-600 rounded text-white hover:bg-blue-700 text-3xl px-2 py-1"
                                                        onClick={() => actualizarAlert(alerta.id, alerta.nivel_alerta)}
                                                    />

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td colSpan="7" className="py-10 text-gray-500 font-outfit">Nenhum alerta encontrado.</td>
                                    )}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Listar;
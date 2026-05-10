import SideBarAdmin from "../../../components/SideBarAdmin";
import { IoSearch } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAlertFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getRisc from "../../../services/Risco/TodosRiscosService"
import deleteRisc from "../../../services/Risco/ApagarRisco";



const corNivel = (nivel) => {
    switch (nivel) {
        case "ALTO": return "bg-red-600";
        case "MEDIO": return "bg-yellow-500";
        case "BAIXO": return "bg-green-500";
        default: return "bg-gray-400";
    }
};

function Listar() {
    const [riscos, setRiscos] = useState([]);
    const [pesquisar, setPesquisar] = useState("");
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarRiscos() {
            try {
                const resposta = await getRisc();
                setRiscos(resposta.data)

            } catch (error) {
                console.log("Erro ao listar alertas ", error);
            }
        }
        buscarRiscos()
    }, [])

    async function apagarRisco(id) {
        const confirmacao = window.confirm("Tem a certeza que quer eliminar?");
        if (!confirmacao) return;
        try {
            await deleteRisc(id);
            setRiscos(riscoActual => riscoActual.filter(r => r.id !== id))
            alert.success("Alerta eliminado com sucesso!")

        } catch (error) {
            console.log("Erro ao apagar alerta")
        }
    }

    const riscosFiltrados = riscos.filter((risco) => {
        if (pesquisar === "") return true;
        const termo = pesquisar.toLowerCase();
        return (
            risco.nivel.toLowerCase().includes(termo) ||
            risco.descricao.toLowerCase().includes(termo) ||
            risco.bairro.nome.toLowerCase().includes(termo) ||
            risco.municipio.nome.toLowerCase().includes(termo) ||
            risco.perfil.nome.toLowerCase().includes(termo)

        );
    });

    function abrirSidebar() {
        setSideBar(!sideBar)
    }

    return (
        <>
            <div className="flex">
                <SideBarAdmin isOpen={sideBar} />
                <div className="w-full h-screen bg-gray-50">

                    <div className="px-4 pt-4 flex justify-center flex-col space-y-10">
                        <div className="pt-2 md:p-0">
                            <GiHamburgerMenu onClick={() => abrirSidebar()} className="text-xl md:hidden cursor-pointer hover:scale-120 transition-all" />
                            {sideBar && (
                                <div
                                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                    onClick={() => setSideBar(false)}
                                />
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl flex items-center font-google">Riscos Registados <RiAlertFill className=" mx-1 text-2xl" /></h2>
                            <p className="font-outfit text-lg">Total : {riscos.length}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">

                            <input
                                type="search"
                                placeholder="Pesquisar..."
                                className="w-full px-3 py-2 focus:border-blue-900 focus:outline-none border shadow-lg border-gray-400 rounded-lg cursor-pointer placeholder:font-barlow"
                                value={pesquisar}
                                onChange={(e) => setPesquisar(e.target.value)}
                            />

                        </div>

                        <div className="w-full h-80 rounded-xl overflow-y-auto text-center">
                            <table className="w-full">
                                <thead className="bg-gray-900 h-10 sticky top-0 text-gray-200">
                                    <tr>
                                        <td className="font-google">Município</td>
                                        <td className="font-google">Bairro</td>
                                        <td className="font-google">Descrição</td>
                                        <td className="font-google">Nível</td>
                                        <td className="font-google">Usuário</td>
                                        <td className="font-google">Ações</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {riscosFiltrados.length > 0 ? (
                                        riscosFiltrados.map((risco) => (
                                            <tr className="hover:bg-gray-100" key={risco.id}>
                                                <td className="font-barlow text-md font-bold ">{risco.municipio.nome}</td>
                                                <td className="font-barlow text-md font-bold text-gray-800">{risco.bairro.nome}</td>
                                                <td className="font-barlow text-md">{risco.descricao}</td>
                                                <td className="font-barlow text-md">

                                                    <span className={`${corNivel(risco.nivel)}  text-white text-xs px-2 py-1 rounded-full`}>
                                                        {risco.nivel}
                                                    </span>
                                                </td>

                                                <td className="font-barlow text-md">{risco.perfil.nome}</td>

                                                <td className="flex justify-center space-x-1 py-1 cursor-pointer">
                                                    <TbEdit
                                                        className="bg-green-500 rounded text-white hover:bg-green-700 text-3xl px-2 py-1"
                                                        onClick={() => navigate(`/admin/editar-riscos/${risco.id}`)}
                                                    />
                                                    <BsTrash3
                                                        className="bg-red-600 rounded text-white hover:bg-red-700 text-3xl px-2 py-1"
                                                        onClick={() => apagarRisco(risco.id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td colSpan="7" className="py-10 font-outfit text-gray-600">Nenhum risco encontrado</td>
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
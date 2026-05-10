import SideBarAdmin from "../../../components/SideBarAdmin";
import { FaUserTie } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import buscarGov from "../../../services/Governador/GovernadorService";
import totalGovSerive from "../../../services/Governador/TotalGovService";
import deleteGov from "../../../services/Governador/ApagarGovService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import alert from "../../../Alerts"



function ListarGov() {
    const [governador, setGovernador] = useState([]);
    const [totalGov, setTotalGov] = useState([])
    const [pesquisar, setPesquisar] = useState("");
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getGov() {
            try {
                const resposta = await buscarGov();
                setGovernador(resposta.data)
                console.log(resposta.data)
            } catch (error) {
                console.log("Erro ao ir buscar governadores ", error)
            }

        }
        getGov()


        async function totalGov() {
            try {
                const resposta = await totalGovSerive();
                setTotalGov(resposta.data)

            } catch (error) {
                console.log("Erro ao calcular total de governadores ", error)
            }

        }
        totalGov()
    }, [])

    const govFiltrados = governador.filter((gov) => {
        if (pesquisar === "") return true;

        const termo = pesquisar.toLowerCase();
        return (
            gov.perfil.nome.toLowerCase().includes(termo) ||
            gov.perfil.email.toLowerCase().includes(termo) ||
            gov.cargo.toLowerCase().includes(termo) ||
            gov.provincia.nome.toLowerCase().includes(termo)
        )
    })

    async function eliminarGov(id) {
        const confirmacao = window.confirm("Tem a certeza que quer eliminar?");
        if (!confirmacao) return;

        await deleteGov(id);
        setGovernador(govActual => govActual.filter(u => u.id !== id));
        alert.success("Usuário eleminado com sucesso!")
    }

    function abrirSidebar() {
        setSideBar(!sideBar)
    }



    return (
        <>
            <div className="flex">
                <SideBarAdmin isOpen={sideBar} />
                <div className="w-full h-screen bg-gray-50">
                    <div className="flex justify-center flex-col p-4 space-y-10">

                        <div className="pt-2 md:p-0">
                            <GiHamburgerMenu onClick={() => abrirSidebar()} className="text-xl md:hidden cursor-pointer hover:scale-120 transition-all" />
                            {sideBar && (
                                <div
                                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                                    onClick={() => setSideBar(false)}
                                />
                            )}
                        </div>

                        <div className="w-full flex flex-col">
                            <h2 className="text-2xl flex items-center font-google">Governadores Cadastrados <FaUserTie className="mx-2 text-3xl" /></h2>
                            <p className="font-outfit text-lg"> Total : {totalGov} </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4">
                            <input
                                type="search"
                                placeholder="Pesquisar..."
                                className="border w-full md:max-w-xl p-2 rounded-md outline-none"
                                value={pesquisar}
                                onChange={(e) => setPesquisar(e.target.value)}
                            />

                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center w-full md:w-auto md:px-6 p-2 rounded-md transition-colors"
                                onClick={() => navigate("/admin/cadastrar-governadores")}
                            >
                                <FaPlus className="mr-2" />
                                <span>Governador</span>
                            </button>
                        </div>



                        <div className="w-full h-80 rounded-xl overflow-y-auto text-center">

                            <table className="w-full">
                                <thead className="bg-gray-900 h-10 sticky top-0 text-gray-200">

                                    <tr>
                                        <td className="font-google md:text-md text-sm">Nome</td>
                                        <td className="font-google md:text-md text-sm">Email</td>
                                        <td className="font-google md:text-md text-sm">Cargo</td>
                                        <td className="font-google md:text-md text-sm">Provincia</td>
                                        <td className="font-google md:text-md text-sm">Ações</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {govFiltrados.map((gov) =>
                                        <tr className="hover:bg-gray-100" key={gov.id}>
                                            <td className="font-barlow md:text-md text-sm font-bold"> {gov.perfil.nome} </td>
                                            <td className="font-barlow md:text-md text-sm"> {gov.perfil.email} </td>
                                            <td className="font-barlow md:text-md text-sm"> {gov.cargo}  </td>
                                            <td className="font-barlow md:text-md text-sm"> {gov.provincia.nome} </td>

                                            <td className="flex justify-center space-x-1 py-1 cursor-pointer">
                                                <TbEdit className="bg-green-600 rounded text-white hover:bg-green-700 text-3xl px-2 py-1"
                                                    onClick={() => navigate(`/admin/editar-governadores/${gov.id}`)}
                                                />


                                                <BsTrash3 className="bg-red-600 rounded text-white hover:bg-red-700 text-3xl px-2 py-1"
                                                    onClick={() => eliminarGov(gov.id)}

                                                />

                                            </td>
                                        </tr>
                                    )}


                                </tbody>
                            </table>

                        </div>

                    </div>





                </div>

            </div>



        </>
    )
}

export default ListarGov;
import SideBarAdmin from "../../../components/SideBarAdmin";
import { FaUsers } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import totalCidadao from "../../../services/Cidadao/TotalCidService"
import buscarCidadao from "../../../services/Cidadao/CidadaoService";
import deleteCid from "../../../services/Cidadao/ApagarCidService";
import alert from "../../../Alerts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function ListarCidadao() {
    const [cidadao, setCidadao] = useState([]);
    const [totalCid, setTotalCid] = useState([])
    const [pesquisar, setPesquisar] = useState("");
    const [sideBar, setSideBar] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        async function getCid() {
            try {
                const resposta = await buscarCidadao();
                setCidadao(resposta.data)
                console.log(resposta.data)
            } catch (error) {
                console.log("Erro ao ir buscar Cidadãos ", error)
            }

        }
        getCid()


        async function totalCid() {
            try {
                const resposta = await totalCidadao();
                setTotalCid(resposta.data)

            } catch (error) {
                console.log("Erro ao calcular total de cidadãos ", error)
            }

        }
        totalCid()
    }, [])

    async function apagarCidadao(id) {
        const confirmacao = window.confirm("Tem a certeza que quer eliminar?");
        if (!confirmacao) return;
        try {

            await deleteCid(id)
            setCidadao(cidActual => cidActual.filter(u => u.id !== id));
            alert.success("Usuário eleminado com sucesso!")

        } catch (error) {
            console.log("Erro ao eliminar cidadão")
        }

    }

    const cidFiltrados = cidadao.filter((cid) => {
        if (pesquisar === "") return true;

        const termo = pesquisar.toLowerCase();
        return (
            cid.perfil.nome.toLowerCase().includes(termo) ||
            cid.perfil.email.toLowerCase().includes(termo) ||
            cid.n_bi.toLowerCase().includes(termo) ||
            cid.bairro.nome.toLowerCase().includes(termo)

        )
    })

    function abrirSidebar() {
        setSideBar(!sideBar)
    }

    return (
        <>
            <div className="flex">
                <SideBarAdmin isOpen={sideBar} />
                <div className="w-full h-screen bg-gray-50">
                    <div className=" px-4 pt-4 flex justify-center flex-col space-y-10 ">

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
                            <h2 className="text-2xl flex items-center font-google">Cidadãos Cadastrados <FaUsers className="mx-2 text-3xl" /></h2>
                            <p className="font-outfit text-lg"> Total : {totalCid} </p>
                        </div>

                        <div className="w-full flex items-center">


                            <input type="search" placeholder="Pesquisar..."
                                className="md:w-1/2 w-full px-3 py-2 focus:border-blue-900
                                  focus: outline-none border  shadow-lg border-gray-400
                                   rounded-lg cursor-pointer placeholder:font-barlow"
                                value={pesquisar}
                                onChange={(e) => setPesquisar(e.target.value)}>
                            </input>



                        </div>


                        <div className="w-full h-80 rounded-xl overflow-y-auto text-center">

                            <table className="w-full">
                                <thead className="bg-gray-900 h-10 sticky top-0 text-gray-200">

                                    <tr>
                                        <td className="text-sm md:text-md font-google">Nome</td>
                                        <td className="text-sm md:text-md font-google">Email</td>
                                        <td className="text-sm md:text-md font-google">Nº BI</td>
                                        <td className="text-sm md:text-md font-google">Bairro</td>
                                        <td className="text-sm md:text-md font-google">Ações</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cidFiltrados.map((cid) =>
                                        <tr className="hover:bg-gray-100" key={cid.id}>
                                            <td className="font-barlow text-sm md:text-md font-bold"> {cid.perfil.nome} </td>
                                            <td className="font-barlow text-sm md:text-md "> {cid.perfil.email} </td>
                                            <td className="font-barlow text-sm md:text-md "> {cid.n_bi} </td>
                                            <td className="font-barlow text-sm md:text-md"> {cid.bairro.nome} </td>

                                            <td className="flex justify-center space-x-1 py-1 cursor-pointer">
                                                <TbEdit className="bg-green-600 rounded text-white hover:bg-green-700 text-3xl px-2 py-1"
                                                    onClick={() => navigate(`/admin/editar-cidadao/${cid.id}`)}
                                                />

                                                <BsTrash3 className="bg-red-600 rounded text-white hover:bg-red-700 text-3xl px-2 py-1"
                                                    onClick={() => apagarCidadao(cid.id)}
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

export default ListarCidadao;
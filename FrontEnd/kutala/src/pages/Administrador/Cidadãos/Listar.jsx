import SideBarAdmin from "../../../components/SideBarAdmin";
import { TbEdit } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import totalCidadao from "../../../services/Cidadao/TotalCidService"
import buscarCidadao from "../../../services/Cidadao/CidadaoService";
import deleteCid from "../../../services/Cidadao/ApagarCidService";
import alert from "../../../Alerts";
import Modal from "../../../components/Modal";
import { FaFileDownload } from "react-icons/fa";
import actualizarCid from "../../../services/Cidadao/ActualizarCidService";
import buscarBairros from "../../../services/Bairro/BairrosService";
import { ImSearch } from "react-icons/im";
import { PDFViewer } from "@react-pdf/renderer";
import UserPDF from "../../../Pdf/UserPDF";

import { useEffect, useState } from "react";




function ListarCidadao() {
    const [cidadao, setCidadao] = useState([]);
    const [bairro, setBairro] = useState([]);
    const [totalCid, setTotalCid] = useState(0)
    const [pesquisar, setPesquisar] = useState("");
    const [modalDelete, setModalDelete] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalPrint, setModalPrint] = useState(false)
    const [userSelecionado, setUserSelecionado] = useState(null)



    useEffect(() => {
        async function getCid() {
            try {
                const resposta = await buscarCidadao();
                setCidadao(resposta.data)
            } catch (error) {
                console.log("Erro ao ir buscar Cidadãos ", error)
            }

        }

        async function totalCid() {
            try {
                const resposta = await totalCidadao();
                setTotalCid(resposta.data)

            } catch (error) {
                console.log("Erro ao calcular total de cidadãos ", error)
            }

        }

        async function getBairro() {
            try {
                const response = await buscarBairros();
                setBairro(response.data)
            } catch (error) {
                console.error("Erro ao ir buscar bairros ", error)
            }

        }

        getCid()
        getBairro()
        totalCid()
    }, [])

    async function apagarCidadao(id) {

        try {

            await deleteCid(id)
            setCidadao(cidActual => cidActual.filter(u => u.id !== id));
            setTotalCid(total => total - 1)
            setModalDelete(false)
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

    function openModalDelete(usuario) {
        setModalDelete(true)
        setUserSelecionado(usuario)
    }

    function openModalEdit(usuario) {
        setModalEdit(true)
        setUserSelecionado(usuario)

    }

    function openModalPrint(usuario) {
        setModalPrint(true)
        setUserSelecionado(usuario)
    }


    async function handleSalvar(e) {

        try {
            e.preventDefault();
            const idUser = userSelecionado.id;

            const dadosActualizados = {
                nome: userSelecionado.perfil.nome,
                email: userSelecionado.perfil.email,
                bairro_id: userSelecionado.bairro_id,
                n_bi: userSelecionado.n_bi
            }

            if (dadosActualizados.n_bi.length !== 14) {
                return alert.error("O BI deve ter exatamente 14 caracteres")
            }

            const padraoEmail = /@./

            if (!padraoEmail.test(dadosActualizados.email)) {
                return alert.error("O email deve conter @")
            }

            await actualizarCid(idUser, dadosActualizados)
            const response = await buscarCidadao();
            setCidadao(response.data)

            alert.success(`${dadosActualizados.nome} atualizado`)
            setModalEdit(false)
            setUserSelecionado(null)

        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Não foi possível salvar as alterações.");
        }
    }






    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="flex-1 w-full h-screen bg-gray-50 font-outfit">
                    <div className=" px-5 pt-4 flex justify-center flex-col space-y-10 ">

                        <div className="md:mt-0 mt-10 py-2 md:p-0">
                            <h2 className="text-xl flex items-center font-outfit">Cidadãos Cadastrados </h2>
                            <p className="font-outfit text-lg"> Total : {totalCid} </p>
                        </div>



                        <div className="flex flex-col gap-4">
                            <div className="flex md:w-1/2 w-full items-center">
                                <input value={pesquisar} onChange={(e) => setPesquisar(e.target.value)}
                                    placeholder="Pesquisar..." type="search"
                                    className="border w-full py-1 px-5 md:py-2  outline-none rounded-tl-full rounded-bl-full  placeholder:text-kutala-blue bg-white placeholder:font-outfit" />


                                <button className="bg-kutala-blue border border-kutala-blue text-white cursor-pointer md:px-4 md:py-3 py-2 px-3 rounded-tr-full rounded-br-full">
                                    <ImSearch />
                                </button>
                            </div>

                            <div className="flex md:w-1/2 w-full items-center text-sm">
                                <button onClick={() => setModalPrint(true)} className="bg-kutala-blue duration-300 text-white rounded-full py-1 md:py-2 px-5 cursor-pointer flex items-center gap-2">
                                    Salvar em PDF
                                    <FaFileDownload />
                                </button>
                            </div>
                        </div>







                        <div className="w-full overflow-x-auto max-h-80 overflow-y-auto">

                            <table className="w-full text-left text-sm min-w-150 bg-white rounded-xl">

                                <thead className="bg-kutala-blue border-none text-white top-0 sticky">
                                    <tr >
                                        <th className="px-6 py-3 rounded-tl-2xl">CIDADÃO</th>
                                        <th className="px-6 py-3">BAIRRO</th>
                                        <th className="px-6 py-3">Nº BI</th>
                                        <th className="px-6 py-3 rounded-tr-2xl">BOTÕES</th>
                                    </tr>
                                </thead>


                                <tbody>

                                    {cidFiltrados.length > 0 ? (
                                        cidFiltrados.map((cid) => (
                                            <tr key={cid.id} className="duration-200 hover:bg-gray-100 cursor-pointer">

                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-2">

                                                        <div className="w-10 h-10 bg-kutala-blue text-white font-medium flex items-center justify-center rounded-full">
                                                            <p> {cid.perfil.nome.toUpperCase().charAt()} </p>
                                                        </div>


                                                        <div className="flex flex-col space-y-0">
                                                            <p className="my-0 leading-none"> {cid.perfil.nome}  </p>
                                                            <p className="my-0 leading-none text-xs text-kutala-blue/70 mt-1"> {cid.perfil.email}  </p>
                                                        </div>

                                                    </div>
                                                </td>


                                                <td className="px-6 py-3"> {cid.bairro.nome} </td>
                                                <td className="px-6 py-3"> {cid.n_bi} </td>

                                                <td className="flex items-center px-6 py-3 gap-1">
                                                    <button onClick={() => openModalEdit(cid)} className="bg-green-100 p-2 rounded hover:bg-green-200 duration-300 cursor-pointer">
                                                        <TbEdit className="text-green-500" />
                                                    </button>



                                                    <button onClick={() => openModalDelete(cid)} className="bg-red-100 p-2 rounded hover:bg-red-200 duration-300 cursor-pointer">
                                                        <BsTrash3 className="text-red-500" />
                                                    </button>

                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <td colSpan="7" className="text-center pt-10 font-outfit text-red-500">Nenhum usuário encontrado</td>
                                    )}



                                </tbody>

                            </table>


                        </div>



                    </div>





                </div>

                <AnimatePresence>
                    {modalDelete && (
                        <Modal close={() => setModalDelete(false)}>
                            <div className="flex flex-col items-center justify-center gap-3 font-outfit">

                                <section className="mt-20">
                                    <BsTrash3 className="text-4xl text-red-500" />
                                </section>


                                <section className="flex flex-col justify-center items-center">
                                    <p className="text-xl">Deseja eliminar  <span className="font-semibold">{userSelecionado.perfil.nome}</span>?</p>
                                    <p className="text-sm">Esta ação não pode ser revertida</p>
                                </section>


                                <section className="flex items-center justify-center gap-2 text-gray-100 ">
                                    <button onClick={() => apagarCidadao(userSelecionado.id)} className="w-20 p-2 cursor-pointer bg-blue-500 rounded duration-300 hover:bg-blue-600">
                                        Sim
                                    </button>

                                    <button onClick={() => setModalDelete(false)} className="w-20 p-2 cursor-pointer bg-red-500 rounded duration-300 hover:bg-red-600">
                                        Não
                                    </button>
                                </section>

                            </div>
                        </Modal>
                    )}

                    {modalEdit && (
                        <Modal close={() => setModalEdit(false)}>


                            <form className="flex flex-col gap-3 font-outfit px-5" onSubmit={handleSalvar}>

                                <section className="flex flex-col ">
                                    <span>Nome :</span>

                                    <input type="text"
                                        name="nome"
                                        onChange={(e) => setUserSelecionado({
                                            ...userSelecionado, perfil: {
                                                ...userSelecionado.perfil, nome: e.target.value
                                            }
                                        })}
                                        value={userSelecionado.perfil.nome}

                                        className="w-full border p-2 rounded" />

                                </section>

                                <section className="flex flex-col ">
                                    <span>Email :</span>

                                    <input type="text"
                                        name="email"
                                        onChange={(e) => setUserSelecionado({
                                            ...userSelecionado, perfil: {
                                                ...userSelecionado.perfil, email: e.target.value
                                            }
                                        })}

                                        value={userSelecionado.perfil.email}
                                        className="w-full border p-2 rounded" />

                                </section>

                                <section className="flex flex-col ">
                                    <span>Bairro : </span>

                                    <select className="w-full border p-2 rounded"
                                        name="bairro_id"
                                        onChange={(e) => setUserSelecionado({
                                            ...userSelecionado, bairro_id: e.target.value
                                        })}

                                        value={userSelecionado.bairro_id}





                                    >

                                        <option value="">Selecione</option>
                                        {bairro.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.nome}
                                            </option>
                                        ))}

                                    </select>

                                </section>

                                <section className="flex flex-col ">
                                    <span>Nº BI : </span>

                                    <input type="text"
                                        name="n_bi"
                                        onChange={(e) => setUserSelecionado({
                                            ...userSelecionado, n_bi: e.target.value
                                        })}
                                        value={userSelecionado.n_bi}
                                        className="w-full border p-2 rounded" />

                                </section>

                                <section className="mt-4">
                                    <button type="submit" className="bg-blue-500 text-white duration-400 hover:bg-blue-600 w-full p-2 rounded font-semibold cursor-pointer">Salvar</button>
                                </section>

                            </form>




                        </Modal>
                    )}

                    {modalPrint && (
                        <Modal close={() => setModalPrint(false)}>
                            <div className="w-full h-90">
                                <PDFViewer width="100%" height="100%">
                                    <UserPDF />
                                </PDFViewer>

                            </div>
                        </Modal>
                    )}
                </AnimatePresence>


            </div>



        </>
    )
}

export default ListarCidadao;
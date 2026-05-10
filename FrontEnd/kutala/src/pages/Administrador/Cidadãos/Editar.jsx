import SideBarAdmin from "../../../components/SideBarAdmin";
import { TbUserEdit } from "react-icons/tb";

import actualizarCidadao from "../../../services/Cidadao/ActualizarCidService"
import getCidId from "../../../services/Cidadao/CidadaoIdService";
import getBairro from "../../../services/Bairro/BairrosService"
import { MdOutlineEditNote } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import alert from "../../../Alerts";

function Editar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [bairros, setBairros] = useState([]);

    const [dadosForm, setDadosForm] = useState({
        nome: "",
        email: "",
        bairro_id: "",
        n_bi: "",
    });

    useEffect(() => {
        async function buscarCidadaoId() {
            try {

                const resposta = await getCidId(id);
                const cid = resposta.data;
                console.log(resposta.data)
                console.log(cid)
                setDadosForm({
                    nome: cid.perfil.nome,
                    email: cid.perfil.email,
                    bairro_id: cid.bairro_id,
                    n_bi: cid.n_bi,

                })


            } catch (error) {
                console.log("Erro ao ir buscar dados do cidadão ", error)
            }
        }

        async function buscarBairro() {
            try {
                const resposta = await getBairro();
                setBairros(resposta.data);


            } catch (error) {
                console.log("Erro ao ir buscar bairros ", error)
            }
        }

        buscarBairro()
        buscarCidadaoId();
    }, [id]);

    function mudarInput(e) {
        setDadosForm({ ...dadosForm, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await actualizarCidadao(id, dadosForm);
            alert.success("Cidadão actualizado com sucesso!");
            navigate("/admin/listar-cidadao");
        } catch (error) {
            console.log("Erro ao actualizar Cidadão :", error);
            alert.error("Erro ao actualizar Cidadão");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="w-full h-screen bg-white flex justify-center items-center flex-col py-3">
                    <h1 className="text-2xl font-google flex items-center">
                        Editar Cidadão <TbUserEdit className="mx-2 text-xl" />
                    </h1>
                    <div className="w-full h-110 flex items-center justify-center">

                        <form className="w-4xl h-100 px-2 space-y-2" onSubmit={handleSubmit}>

                            <section>
                                <p className="font-barlow">Nome :</p>
                                <input
                                    type="text"
                                    name="nome"
                                    value={dadosForm.nome}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">E-mail :</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={dadosForm.email}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>



                            <section>
                                <p className="font-barlow">Nº BI :</p>
                                <input
                                    type="text"
                                    name="n_bi"
                                    value={dadosForm.n_bi}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Bairro :</p>
                                <select
                                    name="bairro_id"
                                    value={dadosForm.bairro_id}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-2 rounded"
                                    required
                                >
                                    <option value="">Selecione...</option>

                                    {bairros.map((bairro) => (
                                        <option key={bairro.id} value={bairro.id}>
                                            {bairro.nome}
                                        </option>
                                    ))}
                                </select>
                            </section>



                            <section className="py-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-blue-500 w-full py-2 px-3 rounded flex items-center justify-center font-google text-white hover:bg-blue-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {saving ? "A guardar..." : "Editar"}
                                    <MdOutlineEditNote className="mx-2" />
                                </button>
                            </section>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Editar;
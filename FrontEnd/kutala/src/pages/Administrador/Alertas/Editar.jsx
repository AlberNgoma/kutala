import SideBarAdmin from "../../../components/SideBarAdmin"
import { TbUserEdit } from "react-icons/tb";
import { MdOutlineEditNote } from "react-icons/md";
import updateAlert from "../../../services/Alerta/ActualizarAlertService"
import alertaId from "../../../services/Alerta/AlertaIdService"
import getBairro from "../../../services/Bairro/BairrosService"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import alert from "../../../Alerts"




function Editar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bairros, setBairros] = useState([]);

    const [dadosForm, setDadosForm] = useState({
        titulo: "",
        mensagem: "",
        nivel_alerta: "",
        bairro_id: ""
    })

    useEffect(() => {
        async function buscarAlerta() {
            try {
                const resposta = await alertaId(id);
                const dados = resposta.data;
               

                setDadosForm({
                    titulo: dados.titulo,
                    mensagem: dados.mensagem,
                    nivel_alerta: dados.nivel_alerta,
                    bairro_id: dados.bairro_id
                })

            } catch (error) {
                console.log("Erro ao ir buscar dados do alerta ", error)
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
        buscarAlerta();
    }, [id])

    function mudarInput(e) {
        setDadosForm({ ...dadosForm, [e.target.name]: e.target.value });
    }


    async function actualizar(e) {
        e.preventDefault()
        try {
            await updateAlert(id, dadosForm);
            alert.success("Alerta actualizado com sucesso!");
            navigate("/admin/listar-alerta");



        } catch (error) {
            console.log("Erro ao actualizar alerta ", error)
        }
    }



    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="w-full h-screen bg-white flex justify-center items-center flex-col py-3">
                    <h1 className="text-2xl font-google flex items-center">
                        Editar Alerta <TbUserEdit className="mx-2 text-xl" />
                    </h1>
                    <div className="w-full h-110 flex items-center justify-center">


                        <form className="w-4xl h-100 px-2 space-y-2" onSubmit={actualizar}>

                            <section>
                                <p className="font-barlow">Título :</p>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={dadosForm.titulo}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Mensagem :</p>
                                <input
                                    type="text"
                                    name="mensagem"
                                    value={dadosForm.mensagem}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Nível de Alerta:</p>
                                <select 
                                    name="nivel_alerta"
                                    value={dadosForm.nivel_alerta}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required>
                                        <option value="">Selecione....</option>
                                        <option value="ALTO">ALTO</option>
                                        <option value="MEDIO">MEDIO</option>
                                        <option value="BAIXO">BAIXO</option>
                                </select>
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
                                    className="bg-blue-500 w-full py-2 px-3 rounded flex items-center justify-center font-google text-white hover:bg-blue-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                        Editar
                                    <MdOutlineEditNote className="mx-2" />
                                </button>
                            </section>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editar;
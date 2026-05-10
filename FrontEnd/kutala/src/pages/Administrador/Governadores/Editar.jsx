import SideBarAdmin from "../../../components/SideBarAdmin";
import { TbUserEdit } from "react-icons/tb";
import { MdOutlineEditNote } from "react-icons/md";
import actualizarGov from "../../../services/Governador/ActualizarGovService";
import governadorId from "../../../services/Governador/GovernadorIdService";
import getProvincia from "../../../services/Provincia/ProvinciasService";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import alert from "../../../Alerts";

function EditarGov() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [provincias, setProvincias] = useState([]);
    const [saving, setSaving] = useState(false);

    const [dadosForm, setDadosForm] = useState({
        nome: "",
        email: "",
        cargo: "",
        provincia_id: ""
    });

    useEffect(() => {
        async function dadosGovernador() {
            try {
                const resposta = await governadorId(id);
                const gov = resposta.data;
               
                

                
                setDadosForm({
                    nome: gov.perfil.nome,
                    email: gov.perfil.email,
                    cargo: gov.cargo,
                    provincia_id: gov.provincia_id,
                });

            } catch (error) {
                console.log("Erro ao ir buscar dados do governador ", error);
                alert.error("Erro ao carregar os dados!");
            }
        }

        async function buscarProvincia() {
            try {
                const resposta = await getProvincia();
                setProvincias(resposta.data);
            } catch (error) {
                console.log("Erro ao ir buscar províncias ", error);
                alert.error("Erro ao ir buscar províncias");
            }
        }

        dadosGovernador();
        buscarProvincia();
    }, [id]);

    function mudarInput(e) {
        setDadosForm({ ...dadosForm, [e.target.name]: e.target.value });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await actualizarGov(id, dadosForm);
            alert.success("Governador actualizado com sucesso!");
            navigate("/admin/listar-governadores");
        } catch (error) {
            console.log("Erro ao actualizar Governador :", error);
            alert.error("Erro ao actualizar Governador");
        } 
    }

    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="w-full h-screen bg-white flex justify-center items-center flex-col py-3">
                    <h1 className="text-2xl font-google flex items-center">
                        Editar Governador <TbUserEdit className="mx-2 text-xl" />
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
                                <p className="font-barlow">Cargo :</p>
                                <input
                                    type="text"
                                    name="cargo"
                                    value={dadosForm.cargo}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Província :</p>
                                <select
                                    name="provincia_id"
                                    value={dadosForm.provincia_id}
                                    onChange={mudarInput}
                                    className="bg-white w-full border py-2 px-2 rounded"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    
                                    {provincias.map((prov) => (
                                        <option key={prov.id} value={prov.id}>
                                            {prov.nome}
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

export default EditarGov;
import SideBarAdmin from "../../../components/SideBarAdmin";
import { TbUserEdit } from "react-icons/tb";
import { MdOutlineEditNote } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import alert from "../../../Alerts";
import getProvincia from "../../../services/Provincia/ProvinciasService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Cadastrar() {
    const [provincias, setProvincias] = useState([]);



    useEffect(() => {
        async function provincias() {
            try {
                const resposta = await getProvincia();
                setProvincias(resposta.data)
            } catch (error) {
                console.log("Erro ao listar as províncias ", error)
            }
        }
        provincias()
    }, [])






    return (
        <>
            <div className="flex">
                <SideBarAdmin />
                <div className="w-full h-screen bg-white flex justify-center items-center flex-col py-3">
                    <h1 className="text-2xl font-google flex items-center">
                        Cadastrar Governador <TbUserEdit className="mx-2 text-xl" />
                    </h1>
                    <div className="w-full h-110 flex items-center justify-center p-2">


                        <form className="w-4xl h-100 px-2 space-y-2">

                            <section>
                                <p className="font-barlow">Nome :</p>
                                <input
                                    type="text"
                                    name="nome"

                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">E-mail :</p>
                                <input
                                    type="email"
                                    name="email"

                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Cargo :</p>
                                <input
                                    type="text"
                                    name="cargo"

                                    className="bg-white w-full border py-2 px-3 rounded"
                                    required
                                />
                            </section>

                            <section>
                                <p className="font-barlow">Província :</p>
                                <select
                                    name="provincia_id"

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

                            <section className="py-6 space-y-3">
                                <button
                                    type="submit"

                                    className="bg-blue-500 font-medium w-full py-2 px-3 rounded flex items-center justify-center font-google text-white hover:bg-blue-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Cadastrar
                                    <MdOutlineEditNote className="mx-2" />
                                </button>

                                <button
                                    type="submit"

                                    className="bg-white border border-gray-500 w-full py-2 px-3 rounded flex items-center justify-center font-google text-black hover:bg-gray-300 font-medium cursor-pointer"
                                >
                                     <Link to="/admin/listar-governadores">Voltar</Link>
                                    <TiArrowBackOutline className="mx-2" />
                                </button>
                            </section>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cadastrar;
import banner from "../../assets/banner.png"
import background from "../../assets/banner2.webp";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import alert from "../../Alerts";
import cadastrar from "../../services/Login/CadastrarService";
import getBairro from "../../services/Bairro/BairrosService"
import { RxEyeOpen } from "react-icons/rx";
import { IoEyeOffOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion"




function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [bairro_id, setBairro_id] = useState(null);
    const [bairros, setBairros] = useState([]);
    const [password, setPassword] = useState("");
    const [n_bi, setN_bi] = useState("");
    const [dropdow, setDropdow] = useState(false);
    const [bairroSelecionado, setBairroSelecionado] = useState(null);
    const [pesquisar, setPesquisar] = useState("");
    const [verSenha, setVerSenha] = useState(false);
    const [saving, setSaving] = useState(false);


    async function fazerCadastro() {
        if (!nome || !email || !password || !n_bi || !bairro_id) {
            return alert.error("Preenche todos os campos")
        }


        if (n_bi.length !== 14) {
            return alert.error("O BI deve ter exatamente 14 caracteres")
        }


        if (password.length < 6) {
            return alert.error("A palavra passe deve ter no mínimo 6 caracteres")
        }

        const padraoEmail = /@/;
        const padraoSenha = /^(?=.*[A-Za-z])(?=.*\d).+$/;


        if (!padraoEmail.test(email)) {
            return alert.error("O email deve conter @")
        }

        if (!padraoSenha.test(password)) {
            return alert.error("A senha deve conter simbolos e numeros")
        }



        try {
            setSaving(true)
            const dados = { nome, email, password, n_bi, bairro_id };
            await cadastrar(dados);

            alert.success(`${nome} cadastrado com sucesso!`);
            navigate("/login")


        } catch (error) {
            console.log("Erro ao criar cidadão ", error)
        } finally {
            setSaving(false)
        }
    }

    useEffect(() => {

        async function buscarBairro() {
            try {
                const resposta = await getBairro();
                const bairrosOrdenados = resposta.data.sort((a, b) =>
                    a.nome.localeCompare(b.nome)
                )
                setBairros(bairrosOrdenados)

            } catch (error) {
                console.log("Erro ao ir buscar bairros ", error)
            }
        }

        buscarBairro()
    }, [])

    function abrirDrop() {
        setDropdow(!dropdow)
    }

    function verPasse() {
        setVerSenha(!verSenha);
    }

    const bairrosFiltrados = bairros.filter((bairro) => {
        if (pesquisar === "") return true;
        const termo = pesquisar.toLowerCase();
        return (
            bairro.nome.toLowerCase().includes(termo)
        )
    })







    return (
        <>


            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.53),rgb(0,0,0)), url(${background})`

            }} className="min-h-screen flex items-center justify-center bg-cover">
                <motion.div initial={{opacity : 0, x:-190}} animate={{opacity : 1, x : 0, transition : {duration :1}}}
                 className="bg-gray-50 w-full max-w-3xl flex-col md:flex-row rounded flex justify-center items-center mx-4">

                    <div className="hidden md:flex w-full md:w-1/2 p-6 justify-center items-center">
                        <img className="w-full" alt="image banner" src={banner}></img>
                    </div>


                    <div className="bg-gray-900 w-full md:w-1/2 p-6 shadow-lg">

                        <div className="flex justify-center items-center cursor-pointer">
                            <h2 className="font-outfit text-3xl text-white">Criar Conta</h2>
                        </div>


                        <div className="space-y-2">
                            <p className="font-outfit text-gray-300">Nome :</p>

                            <input type="text" placeholder="Insira o seu nome"
                                className="w-full px-2 py-1 border border-gray-300
                                rounded text-gray-100 placeholder:font-outfit
                                placeholder-gray-400"

                                onChange={(e) => setNome(e.target.value)}
                                value={nome}>
                            </input>
                        </div>

                        <div className="my-3 space-y-2">
                            <p className="font-outfit text-gray-300">E-mail :</p>

                            <input type="text" placeholder="nome@gmail.com"
                                className="w-full px-2 py-1 border border-gray-300
                                rounded  text-gray-100 placeholder:font-outfit
                                placeholder-gray-400" onChange={(e) => setEmail(e.target.value)}
                                value={email.trim()}>

                            </input>
                        </div>

                        <div className="my-3 space-y-2">
                            <p className="font-outfit text-gray-100">Bairro :</p>

                            <section className="relative">


                                <button type="button" onClick={() => abrirDrop()}
                                    className="w-full px-2 py-1 border border-gray-300 rounded
                                 text-gray-100 placeholder:font-outfit
                                 text-start">

                                    {bairroSelecionado ? bairroSelecionado : "Selecione..."}
                                </button>


                                {dropdow && (
                                    <div className="bg-white bottom-10 w-full h-40 absolute">
                                        <div className="w-full h-8 p-3 bg-gray-300 flex items-center justify-center">
                                            <input value={pesquisar} onChange={(e) => setPesquisar(e.target.value)} type="search" className="w-full outline-none  placeholder:font-poppins" placeholder="Pesquisar..."></input>
                                        </div>

                                        <div className="w-full h-32 overflow-y-auto pb-1 pt-2">
                                            {bairros.length > 0 ? (
                                                bairrosFiltrados.map((bairro) => (

                                                    <p key={bairro.id} className="cursor-pointer w-full flex
                                                        items-center justify-start hover:bg-gray-200
                                                        h-8 px-2"
                                                        onClick={() => {
                                                            abrirDrop();
                                                            setBairroSelecionado(bairro.nome);
                                                            setBairro_id(bairro.id)
                                                        }}

                                                    >
                                                        {bairro.nome}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-center text-red-700 text-sm">Nenhum bairro encontrado</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </section>

                        </div>

                        <div>
                            <p className="font-outfit text-gray-300">Nº BI : </p>
                            <input type="text" placeholder="000000000"
                                className="w-full px-2 py-1 border border-gray-300
                                    rounded  text-gray-100 placeholder:font-outfit
                                    placeholder-gray-400" onChange={(e) => {
                                    if (e.target.value.length <= 14) {
                                        setN_bi(e.target.value)
                                    }
                                }}
                                value={n_bi}>

                            </input>
                        </div>


                        <div className="my-3 space-y-2">
                            <p className="font-outfit text-gray-300">Palavra Passe :</p>

                            <div className="relative flex">

                                <input type={verSenha ? "text" : "password"} placeholder="***********"
                                    className="w-full px-2 py-1 border border-gray-300
                                rounded text-gray-100 placeholder:font-outfit
                                placeholder-gray-400" onChange={(e) => setPassword(e.target.value)}
                                    value={password}>

                                </input>

                                <button className="absolute right-2 top-2 cursor-pointer text-lg text-blue-500" onClick={() => verPasse()}>
                                    {verSenha ? (
                                        <RxEyeOpen />
                                    ) : (
                                        <IoEyeOffOutline />
                                    )}
                                </button>
                            </div>



                        </div>





                        <div className="mt-7 flex justify-center items-center">
                            <button className="w-full bg-gray-50 py-2 hover:bg-gray-200
                             hover:text-black font-medium rounded
                            font-outfit cursor-pointer" onClick={fazerCadastro}
                                disabled={saving}>
                                {saving ? <ClipLoader size={22} /> : "Criar Conta"}
                            </button>
                        </div>

                        <div className="flex items-center py-2">

                            <div className="flex-1 border-t border-gray-300"></div>

                            <span className="px-3 text-gray-500">ou</span>

                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <div className="mt-1 flex justify-center items-center">
                            <button className="w-full bg-blue-800 py-2 text-gray-50 hover:bg-blue-900 font-medium rounded font-outfit cursor-pointer"
                                onClick={() => navigate("/login")}>
                                Entrar
                            </button>
                        </div>




                    </div>


                </motion.div>




            </div>



        </>

    )
}

export default Cadastro;
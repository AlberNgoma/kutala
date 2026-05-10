import banner from "../../assets/banner.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import login from "../../services/Login/LoginService"
import alert from "../../Alerts";
import { ClipLoader } from "react-spinners";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [verSenha, setVerSenha] = useState(false);



    async function fazerLogin() {

        if (!email || !password) {
            return alert.error("Preencha todos os campos!");
        }

        try {
            setLoading(true)

            const dados = {
                email: email.trim(),
                password

            };

            const resposta = await login(dados);
            setLoading(false)

            const token = resposta.data.token;
            const usuario = {
                nome: resposta.data.usuario.nome,
                tipo: resposta.data.usuario.tipo,
                email: resposta.data.usuario.email,
            }


            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(usuario))

            if (usuario?.tipo === 'ADMIN') {
                navigate("/admin/dashboard")
            } else {
                navigate("/cidadao/mainpage")
            }

            alert.success("Login feito com sucesso")

        } catch (error) {
            console.log("Erro ao fazer login")
            if (error.response) {
                const status = error.response.status;

                if (status === 404) {
                    alert.error("Utilizador não encontrado!");
                } else if (status === 401) {
                    alert.error("Palavra-passe incorreta!");
                } else {
                    alert.error("Erro ao realizar login. Tente novamente.");
                }
            } else {
                console.error("Erro de conexão:", error);
                alert.error("Erro de conexão com o servidor.");
            }
        }

    }



    return (
        <>
            {loading ? (
                <div className="w-full h-screen bg-white/20 flex items-center justify-center flex-col space-y-3">
                    <p className="font-outfit font-medium text-xl">Entrando...</p>
                    <ClipLoader size={60} color="#041736" />
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-cover bg-[linear-gradient(to_top,rgb(0,0,0),rgba(0,0,0,0.53)),url('./src/assets/banner2.webp')]">

                    <div className="bg-gray-50 w-full max-w-3xl rounded flex flex-col md:flex-row justify-center items-center mx-4">

                        <div className="hidden md:flex w-full md:w-1/2 p-6 justify-center items-center">
                            <img src={banner} className="w-full" />
                        </div>

                        <div className="bg-gray-900 w-full md:w-1/2 p-6 shadow-lg rounded md:rounded-none md:rounded-r">
                            <h2 className="font-outfit text-2xl md:text-3xl text-white text-center">Login</h2>

                            <div className="space-y-2 mt-4">
                                <p className="font-outfit text-gray-50">E-mail :</p>
                                <input
                                    type="text"
                                    placeholder="Insira o seu email"
                                    className="w-full px-2 py-2 border border-gray-300 rounded text-gray-100 placeholder:font-outfit placeholder-gray-400"
                                    value={email.trim()}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 mt-3 mb-4">
                                <p className="font-outfit text-gray-50">Palavra Passe :</p>

                                <div className="relative">
                                    <input
                                        type={verSenha ? "text" : "password"}
                                        placeholder="***********"
                                        className="w-full px-2 py-2 border border-gray-300 rounded text-gray-100 placeholder:font-outfit placeholder-gray-400"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button onClick={() => setVerSenha(!verSenha)} className="text-blue-500 absolute right-2 top-3 text-lg cursor-pointer">
                                        {verSenha ? (
                                            <MdRemoveRedEye />
                                        ) : (
                                            <IoMdEyeOff />
                                        )}
                                    </button>
                                </div>

                            </div>

                            <div className="mt-7">
                                <button
                                    className="w-full bg-gray-50 py-2 hover:bg-gray-200 hover:text-black font-medium rounded font-outfit cursor-pointer"
                                    onClick={fazerLogin}
                                    type="button"
                                >
                                    Entrar
                                </button>
                            </div>

                            <div className="flex items-center py-2">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500">ou</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <div className="pb-4">
                                <button
                                    className="w-full bg-blue-800 py-2 text-gray-50 hover:bg-blue-900 font-medium rounded font-outfit cursor-pointer"
                                    onClick={() => navigate("/criar-conta")}
                                >
                                    Criar Conta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </>
    )
}

export default Login;
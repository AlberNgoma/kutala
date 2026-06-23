import background from "../../assets/banner2.webp";
import { Link } from "react-router-dom";
import recuperConta from "../../services/Login/Recuperar-conta"
import { useState } from "react";
import alert from "../../Alerts"
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    async function EnviarEmail(e) {
        e.preventDefault()
        try {
            setLoading(true)
            if (!email) {
                return alert.error("Este campo não pode estar vazio!")
            }
            const dados = email.trim();
            await recuperConta(dados);

            alert.success("O seu email foi enviado com sucesso!")
            navigate("/")
        } catch (error) {
            console.log(`Erro ${error}`)
        } finally {
            setLoading(false)
        }

    }



    return (
        <>

            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.53),rgb(0,0,0)),url(${background})`
            }} className="w-full h-screen bg-cover flex items-center justify-center px-3">



                <div className="w-full bg-gray-900 p-6 md:w-1/3 rounded-xl">
                    <h2 className="font-outfit text-2xl md:text-3xl text-white text-center">Recuperar Senha</h2>



                    <form onSubmit={EnviarEmail}>
                        <div>

                            <div className="space-y-1">
                                <p className="font-outfit text-gray-50">E-mail :</p>
                                <input type="text" value={email.trim()}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-2 py-2 border border-gray-300 rounded text-gray-100 " />
                            </div>


                            <div className="mt-3">
                                <button type="submit" disabled={loading} className="flex justify-center items-center w-full bg-gray-50 py-2 hover:bg-gray-200 hover:text-black font-medium rounded font-outfit cursor-pointer">
                                    {loading ? (
                                        <ClipLoader size={24} />
                                    ) : "Entrar"}
                                </button>
                            </div>

                            <div className="flex items-center py-2">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-3 text-gray-500">ou</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            <div className="mt-1">
                                <button className="w-full bg-blue-800 py-2 text-gray-50 hover:bg-blue-900 font-medium rounded font-outfit cursor-pointer">
                                    <Link to="/">Voltar</Link>
                                </button>
                            </div>

                        </div>
                    </form>




                </div>

            </div>

        </>
    )
}
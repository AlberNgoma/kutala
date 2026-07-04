import background from "../../assets/banner2.webp";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import Reset from "../../services/Login/Resetet-password";
import { useParams } from "react-router-dom";
import alert from "../../Alerts";
import { useNavigate } from "react-router-dom";

export default function RestartPassword() {

    const [verSenha, setVerSenha] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { token } = useParams()

    async function restart() {

        try {
            await Reset(token, password);
            alert.success("Senha alterada com sucesso!");
            navigate("/login")


        } catch (error) {
            console.log(`Erro ao redefinir senha ${error}`)
        }
    }



    return (
        <>

            <div style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.53),rgb(0,0,0)),url(${background})`
            }} className="w-full h-screen bg-cover flex items-center justify-center px-3">



                <div className="w-full bg-gray-900 p-6 md:w-1/3 rounded-xl">
                    <h2 className="font-outfit text-2xl md:text-3xl text-white text-center p-2">Redefinir Senha</h2>






                    <div className="space-y-1">
                        <p className="font-outfit text-gray-50">Insira a nova senha : </p>
                        <div className="relative">
                            <input type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="w-full px-2 py-2 border border-gray-300 rounded text-gray-100"
                            />



                            {/* <button onClick={() => setVerSenha(!verSenha)} className="text-blue-500 absolute right-4 top-3 text-lg cursor-pointer">
                                    {verSenha ? (
                                        <IoEye />
                                    ) : (
                                        <IoMdEyeOff />
                                    )}
                                </button>*/}


                        </div>

                    </div>


                    <div className="my-3">
                        <button onClick={restart} className="flex justify-center items-center w-full bg-gray-50 py-2 hover:bg-gray-200 hover:text-black font-medium rounded font-outfit cursor-pointer">Actualizar</button>
                    </div>


                </div>




            </div>



        </>
    )
}
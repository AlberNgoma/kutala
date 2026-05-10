import { FaUserTie } from "react-icons/fa";
import { RiHome9Line } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { GrStatusWarning } from "react-icons/gr";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
function SideBarGov() {
    return (
        <>
            <div className="h-screen w-85 bg-gray-900">
                <div className="flex justify-center items-center flex-col space-y-3">

                    <div className="text-center flex justify-center items-center flex-col py-10">
                        <FaUserTie className="text-6xl text-white my-2" />
                        <h3 className="text-white font-barlow">Governador</h3>
                        <p className="text-gray-300 font-barlow cursor-pointer hover:text-blue-400">govluanda@gmail.com</p>
                    </div>

                    <div className="space-y-4 cursor-pointer">

                        <div className="flex items-center gap-3">
                            <section>
                                <RiHome9Line className=" flex justify-center text-blue-400 text-xl"/>
                            </section>

                            <section>
                                <p className="text-gray-200 font-google hover:text-gray-300">Home</p>
                            </section>

                            
                        </div>


                        <div className="flex items-center gap-3">
                            <section>
                                <TbMap2 className="text-xl text-blue-400 flex justify-center"/>
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 hover:text-gray-300">Mapa</p>
                            </section>

                            
                        </div>


                        <div className="flex items-center gap-3">
                            <section>
                                <GrStatusWarning className="text-xl text-blue-400 flex justify-center"/>
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">Alertas</p>
                            </section>

                            
                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <RiErrorWarningLine className="text-xl text-blue-400 flex justify-center"/>
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">Riscos de Inundação</p>
                            </section>

                            
                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <IoSettingsOutline className="text-xl text-blue-400 flex justify-center"/>
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">Definições</p>
                            </section>

                            
                        </div>

                        <div className="flex items-center gap-3">
                            <section>
                                <GrLogout className="text-xl text-blue-400 flex justify-center"/>
                            </section>

                            <section>
                                <p className=" font-google text-gray-200 font-google hover:text-gray-300">Sair</p>
                            </section>

                            
                        </div>

                        

                        





                    </div>






                </div>
            </div>



        </>
    )
}

export default SideBarGov;
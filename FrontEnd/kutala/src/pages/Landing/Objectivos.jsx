import { motion } from "framer-motion"
import { GoGoal } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { LiaCloudSunRainSolid } from "react-icons/lia";
import { FaUserTie } from "react-icons/fa6";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Objectivos() {
    const ref = useRef();
    const isInView = useInView(ref);


    const container = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 100,
        transition: { duration: isInView ? 1.5 : 0 }
    }








    return (
        <>
            <motion.div id="objectivos" className="w-full min-h-screen  flex items-center justify-center flex-col py-2">



                <motion.div ref={ref} animate={container} className="w-full p-10 min-h-70 flex flex-col md:flex-row justify-center items-center gap-6">


                    <motion.section className="hover:scale-105 p-6 rounded-lg  duration-500 cursor-pointer bg-kutala-blue w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <GoAlert className="text-6xl text-gray-100" />
                        <h3 className="text-lg text-gray-50 font-bold font-archivo">Emitir Alertas</h3>
                        <p className="text-center text-gray-100 font-outfit">Este sistema fornece e emite notificações imediatas sobre possíveis cheias e inundações.</p>
                    </motion.section>


                    <motion.section className="hover:scale-105 p-6 rounded-lg duration-500 bg-kutala-blue cursor-pointer w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <LiaCloudSunRainSolid className="text-6xl text-gray-100" />
                        <h3 className="text-lg text-gray-50 font-bold font-archivo">Monitorar o clima</h3>
                        <p className="text-center text-gray-100 font-outfit">Com este sistema é possível acompanhar continuamente dados climáticos para identificar possíveis riscos.</p>
                    </motion.section>


                    <motion.section className="hover:scale-105 p-6 rounded-lg duration-500 bg-kutala-blue cursor-pointer w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <FaUserTie className="text-6xl text-gray-100" />
                        <h3 className="text-lg text-gray-50 font-bold font-archivo">Auxiliar Autoridades</h3>
                        <p className="text-center text-gray-100 font-outfit">Este sistema disponibiliza informações actualizadas e confiáveis para apoiar ações de prevenção.</p>
                    </motion.section>

                </motion.div>




            </motion.div>

        </>
    )
}
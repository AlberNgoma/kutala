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

    const first = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : -100,
        transition: {
            duration: isInView ? 1 : 0,

        },
        whileInView: { opacity: 1, y: 0 }
    }
    const second = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : -120,
        transition: {
            duration: isInView ? 1.5 : 0,

        },
        whileInView: { opacity: 1, y: 0 }
    }
    const third = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : -130,
        transition: {
            duration: isInView ? 2 : 0,

        },
        whileInView: { opacity: 1, y: 0 }
    }









    return (
        <>
            <motion.div id="objectivos" className="w-full min-h-110  flex items-center justify-center flex-col py-2">

                <motion.div className="w-full flex items-center justify-start px-5 py-2">
                    <p className="bg-verde text-white rounded-full py-1 p-3 font-barlow flex items-center justify-center">Objectivos <GoGoal className="ml-2" /></p>
                </motion.div>

                <motion.div ref={ref} className="w-full p-10 min-h-70 flex flex-col md:flex-row justify-center items-center gap-6">


                    <motion.section animate={first} className="hover:scale-105 p-6 rounded-lg  duration-500 cursor-pointer bg-kutala-blue w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <GoAlert className="text-6xl text-white" />
                        <h3 className="text-lg text-gray-50 font-bold font-google">Emitir Alertas</h3>
                        <p className="text-center text-white font-outfit">Este sistema fornece e emite notificações imediatas sobre possíveis cheias e inundações.</p>
                    </motion.section>


                    <motion.section animate={second} className="hover:scale-105 p-6 rounded-lg duration-500 bg-kutala-blue cursor-pointer w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <LiaCloudSunRainSolid className="text-6xl text-white" />
                        <h3 className="text-lg text-gray-50 font-bold font-google">Monitorar o clima</h3>
                        <p className="text-center text-white font-outfit">Com este sistema é possível acompanhar continuamente dados climáticos para identificar possíveis riscos.</p>
                    </motion.section>


                    <motion.section animate={third} className="hover:scale-105 p-6 rounded-lg duration-500 bg-kutala-blue cursor-pointer w-full min-h-68 flex items-center justify-center flex-col space-y-3 md:w-1/3">
                        <FaUserTie className="text-6xl text-white" />
                        <h3 className="text-lg text-gray-50 font-bold font-google">Auxiliar Autoridades</h3>
                        <p className="text-center text-white font-outfit">Este sistema disponibiliza informações actualizadas e confiáveis para apoiar ações de prevenção.</p>
                    </motion.section>

                </motion.div>




            </motion.div>

        </>
    )
}
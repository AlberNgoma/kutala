import { motion } from "framer-motion";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import imgKutala from "../../assets/kutala.png";
import { IoLogoReact } from "react-icons/io5";
import { IoLogoNodejs } from "react-icons/io";
import mysql from "../../assets/mysql.png";
import openWeather from "../../assets/openweather.png"
import { SiExpress } from "react-icons/si";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function Sobre() {
    // Criamos o ref para a secção inteira
    const sectionRef = useRef();
    const isInView = useInView(sectionRef); 

    const title = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : -50, // Valores menores para não quebrar o layout
        transition: { duration: 1 }
    };

    const item = {
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : -30, // Usa percentagem! Funciona perfeitamente no mobile
        transition: { duration: 1.5 },
         whileInView : {opacity : 1, x :0}
    };

    const img = {
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : 30, // Entra pela direita de forma segura
        transition: { duration: 1.5 },
        whileInView : {opacity : 1, x :0}
    };

    return (
        <>
            {/* Adicionamos o overflow-hidden para evitar barras de rolagem estranhas no mobile */}
            <motion.div id="sobre" ref={sectionRef} className="w-full min-h-screen flex items-center justify-center bg-kutala-blue py-5 overflow-hidden">
               

                {/* Mudamos para flex-col no mobile e flex-row no desktop (md:flex-row) */}
                <motion.div className="w-full min-h-80 flex flex-col md:flex-row justify-center gap-6 p-5">
                    
                    {/* Secção de Texto */}
                    <motion.section className="w-full flex flex-col justify-center items-center p-5 text-center gap-4 md:w-1/2">
                        <motion.h1 animate={title} className="text-3xl font-archivo font-bold text-gray-100">Kutala</motion.h1>
                        <motion.p animate={item} className="font-outfit text-gray-100">Kutala é um sistema de controle de cheias e inundações desenvolvido para alertar os cidadãos que vivem em zonas de perigo.</motion.p>
                        <motion.p animate={item} className="font-outfit text-gray-100">Este sistema foi desenvolvido em 2026 por jovens Angolanos estudantes da área de tecnologia de informação e ciências geográficas, com as seguintes tecnologias : </motion.p>

                        <motion.div animate={item} className="flex space-x-4 p-2">
                            <IoLogoReact className="text-3xl text-blue-500" />
                            <IoLogoNodejs className="text-3xl text-green-500" />
                            <img src={mysql} className="w-8" alt="" />
                            <img src={openWeather} className="w-20" alt="" />
                            

                        </motion.div>
                    </motion.section>

                    {/* Secção da Imagem - Agora visível em todos os ecrãs, mas empilhada no mobile */}
                    <motion.section className="w-full flex justify-center items-center md:w-1/2">
                        <motion.img 
                            src={imgKutala} 
                            animate={img} 
                            className="w-full max-w-sm md:max-w-md shadow-md shadow-blue-100 rounded-lg" 
                            alt="Sistema Kutala" 
                        />
                    </motion.section>

                </motion.div>
            </motion.div>
        </>
    );
}

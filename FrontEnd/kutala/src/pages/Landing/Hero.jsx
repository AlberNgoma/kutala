import Navbar from "../../components/Navbar"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { FaCircleArrowRight } from "react-icons/fa6";
import inundacao from "../../assets/inundacao.jpg";
import inundacao2 from "../../assets/inundacao1.jpg";
import inundacao3 from "../../assets/inundacao2.jpg";
import inundacao4 from "../../assets/inundacao3.jpg";
import inundacao5 from "../../assets/inundacao4.webp";
import inundacao6 from "../../assets/images.jpg";
import { Link } from "react-router-dom"

const imagem = [
    inundacao4,
    inundacao3,
    inundacao,
    inundacao2,
    inundacao5,
    inundacao6
]


export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % imagem.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])


    const container = {
        hidden: {},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
            }
        }
    }

    const item = {
        hidden: {
            opacity: 0,
            y: 50
        },

        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 }
        }
    }





    return (
        <>

            <div id="inicio" className="overflow-hidden bg-black relative w-full min-h-143 flex items-center justify-center">
                <AnimatePresence>

                    <motion.img
                        className="object-cover w-full h-full inseit-0 absolute"
                        key={index} src={imagem[index]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        exit={{ opacity: 0 }} />

                </AnimatePresence>



                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/60 to-black z-10" />
                <motion.div initial="hidden" animate="visible" variants={container} className="relative w-full top-3 h-screen z-20 flex items-center justify-center text-center flex-col gap-4 px-5">

                    <motion.div variants={item} className="w-full min-h-10 fixed top-6 px-6 flex items-center justify-center">
                        <Navbar />
                    </motion.div>

                    <motion.div className="space-y-2 text-gray-100" variants={item}>
                        <h1 className="md:text-7xl text-5xl font-archivo font-semibold tracking-wider">Bem vindo ao <span className="te">Kutala</span>.</h1>
                        <p className="font-outfit tracking-wider">Sistema de controle de cheias e inundações <br /> que une a  tecnologia e dados climáticos para salvar vidas e proteger infraestruturas</p>
                    </motion.div>

                    <motion.div variants={item} className="w-full min-h-20 flex flex-col-reverse md:flex-row items-center justify-center gap-4">
                        <a href="#objectivos"><button className="bg-kutala-blue font-outfit hover:bg-gray-100 hover:text-kutala-blue   text-gray-100 w-40 duration-400 ease-in-out p-3 rounded-full  cursor-pointer flex items-center justify-center">Saber Mais <HiQuestionMarkCircle className="ml-2" /></button></a>
                        <Link to="/login"><button className="bg-kutala-blue font-outfit hover:bg-gray-100 hover:text-kutala-blue   text-gray-100 w-40 duration-400 ease-in-out p-3 rounded-full  cursor-pointer flex items-center justify-center">Entrar <FaCircleArrowRight className="ml-2" /></button></Link>

                    </motion.div>




                </motion.div>

            </div>


        </>
    )
}
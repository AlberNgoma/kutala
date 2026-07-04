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
    inundacao2,
    inundacao,
    inundacao3,
    inundacao4,
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



                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black z-10" />
                <motion.div initial="hidden" animate="visible" variants={container} className="relative w-full top-3 min-h-130 z-20 flex items-center justify-center text-center flex-col gap-4 px-5">

                    <motion.div variants={item} className="w-full min-h-10 fixed top-6 px-6 flex items-center justify-center">
                        <Navbar />
                    </motion.div>

                    <motion.div className="space-y-2" variants={item}>
                        <h1 className="md:text-7xl text-5xl font-google text-white tracking-wider font-semibold">Bem vindo ao <span className="text-ouro">Kutala</span>.</h1>
                        <p className="md:text-xl text-md font-outfit text-white">Sistema de controle de cheias e inundações</p>
                    </motion.div>

                    <motion.div variants={item} className="w-full min-h-20 flex flex-col md:flex-row items-center justify-center gap-3">
                        <a href="#objectivos"><button className="bg-ouro font-outfit hover:bg-transparent hover:border border-ouro text-white rounded-full  duration-500 ease-in-out h-12 w-40 cursor-pointer flex items-center justify-center">Saber Mais <HiQuestionMarkCircle className="ml-2" /></button></a>
                        <Link to="/login"><button className="bg-ouro font-outfit hover:bg-transparent hover:border border-ouro text-white rounded-full  duration-500 ease-in-out h-12 w-40 cursor-pointer flex items-center justify-center">Entrar <FaCircleArrowRight className="ml-2" /></button></Link>

                    </motion.div>




                </motion.div>

            </div>


        </>
    )
}
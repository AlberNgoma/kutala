import logo from "../assets/imgKutala.png"
import { TiThMenu } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);




    return (
        <>

            <div className={` ${sidebar ? "rounded-t-xl" : "rounded-full"} bg-white w-full md:w-2/3 flex justify-around items-center py-2`}>
                <section>
                    <img className="w-10 cursor-pointer" src={logo} alt="img" />
                </section>

                <section className="hidden md:flex space-x-6">
                    <a href="#inicio" className="text-kutala-blue cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Início</a>
                    <a href="#objectivos" className="text-kutala-blue cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Objectivos</a>
                    <a href="#sobre" className="text-kutala-blue cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Sobre o Sistema</a>
                    <a href="#equipa" className="text-kutala-blue cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Equipa</a>


                </section>

                <motion.section whileTap={{ scale: 1.3, transition: { duration: 0.2 } }} className="md:hidden">
                    {sidebar ? (
                        <motion.p animate={{
                            rotate: 360,
                            transition: { duration: 0.6 }
                        }} className="text-black text-3xl" onClick={() => setSidebar(!sidebar)}><IoIosCloseCircle /></motion.p>
                    ) : (
                        <TiThMenu onClick={() => setSidebar(!sidebar)} className="text-2xl  cursor-pointer" />
                    )}
                </motion.section>
            </div>

            <AnimatePresence>
                {sidebar && (

                    <motion.div
                        key="teste"
                        initial={{
                            y: -10
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.2 }
                        }}

                        exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}



                        className="w-full min-h-40 absolute top-14.5 flex items-center justify-center px-6">
                        <div className="bg-white w-full min-h-40 rounded-b-xl flex items-center justify-center flex-col gap-3">
                            <a href="#inicio" className="hover:text-ouro cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Início</a>
                            <a href="#objectivos" className="hover:text-ouro cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Objectivos</a>
                            <a href="#sobre" className="hover:text-ouro cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Sobre o Sistema</a>
                            <a href="#equipa" className="hover:text-ouro cursor-pointer duration-140 ease-in font-manrope font-bold hover:scale-104 text-sm">Equipa</a>

                        </div>
                    </motion.div>

                )}
            </AnimatePresence>

        </>
    )
}
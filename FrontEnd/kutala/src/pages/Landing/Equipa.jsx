import { motion } from "framer-motion"
import AlbertoPhoto from "../../assets/Alberto´s photo.png"
import AndersonPhoto from "../../assets/Anderson.png"
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoEarth } from "react-icons/io5";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function equipa() {

  const ref = useRef();
  const isInView = useInView(ref);

  const firstImg = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : 30,
    transition: { duration: 1.5 },
    whileInView: { opacity: 1, x: 0 }

  }

  const secondImg = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : -30,
    transition: { duration: 1.5 },
    whileInView: { opacity: 1, x: 0 }

  }
  return (
    <>
      <div id="equipa" className="w-full min-h-screen bg-white flex justify-center items-center gap-4">

        

        <div className=" w-full p-10  min-h-40 flex flex-col md:flex-row items-center justify-center gap-10"
          ref={ref}>

          <motion.div animate={secondImg} className="w-75 bg-kutala-blue rounded-xl">
            <img src={AndersonPhoto} className="w-full rounded-t-xl" alt="Alberto" />

            <div className="flex items-center justify-center flex-col py-2">
              <p className="font-medium text-xl text-white font-google">Coge Paiva </p>
              <p className="text-sm text-white tracking-wide font-sn flex justify-center items-center">Engenheiro Geográfico <IoEarth className="ml-2" /> </p>
            </div>

            <div className="rounded-b-xl flex items-center justify-center gap-5 bg-kutala-blue py-2">
              <FaLinkedin className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
              <SiGmail className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
              <FaGithub className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
            </div>

          </motion.div>

          <motion.div animate={firstImg} className="w-75 bg-kutala-blue rounded-xl">
            <img src={AlbertoPhoto} className="w-full rounded-t-xl" alt="Alberto" />

            <div className="flex items-center justify-center flex-col py-2">
              <p className="font-medium text-xl text-white font-google">Alberto Ngoma</p>
              <p className="text-sm text-white tracking-wide font-sn flex justify-center items-center">Desenvolvedor Full Stack <IoCodeSlash className="ml-2" /> </p>
            </div>

            <div className="rounded-b-xl flex items-center justify-center gap-5 bg-kutala-blue py-2">
              <a href="https://www.linkedin.com/in/alberto-ngoma-1b0293380/">
                <FaLinkedin className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
              </a>
              <a href="mailto:albertongoma77@gmail.com">
                <SiGmail className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
              </a>
              <a href="https://github.com/AlberNgoma">
                <FaGithub className="text-xl text-white duration-400 cursor-pointer hover:text-gray-300" />
              </a>
            </div>



          </motion.div>


        </div>

      </div>

    </>
  )
}
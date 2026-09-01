import { FaXmark } from 'react-icons/fa6';
import { motion } from "framer-motion"

export default function Modal({ children, close }) {
    return (
        <>
            <motion.div  exit={{opacity : 0}}
             className='z-5000 inset-0 bg-black/50 w-full fixed flex items-center justify-center p-8'>


                <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }} exit={{opacity : 0, y : "100%"}}
                    className='w-full md:w-100 bg-gray-100 rounded-md h-110  '>
                    <div className='w-full flex items-center justify-end p-5 '>
                        <FaXmark onClick={close} className='text-red-600 text-xl cursor-pointer' />
                    </div>

                    <div className='w-full h-94 '>
                        {children}
                    </div>


                </motion.div>
            </motion.div>

        </>
    )
}
import { IoMdAlert } from "react-icons/io";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FaCheckSquare } from "react-icons/fa";

function MapLegend() {
    return (
        <>
            <div className=" bg-white shadow-3xl absolute z-1000 bottom-10 right-0 p-3 items-center justify-center flex-col rounded-md">
                <div className="w-full  flex items-center justify-center">
                    <h2 className="font-barlow font-medium text-xl py-1">Legenda</h2>
                </div>

                <div className="space-y-2">

                    <div className="flex items-center gap-2">
                        <div className="bg-red-600 p-4 rounded-md"></div>
                        
                        <p className="font-bold text-red-600 font-google flex items-center justify-center text-lg">Risco <IoMdAlert className=" mx-1"/></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-yellow-400 p-4 rounded-md"></div>
                        <p className="font-bold text-yellow-400 font-google flex items-center justify-center text-lg">Alerta <TbAlertTriangleFilled className=" mx-1"/></p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-green-500 p-4 rounded-md"></div>
                        <p className="font-bold text-green-500 font-google flex items-center justify-center text-lg">Seguro <FaCheckSquare className="mx-1"/></p>
                    </div>


                </div>



            </div>

        </>
    )
}

export default MapLegend;
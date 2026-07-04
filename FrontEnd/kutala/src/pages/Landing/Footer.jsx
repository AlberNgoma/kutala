import { LuCopyright } from "react-icons/lu";

export default function Footer() {


    return (
        <>
            <div className="bg-kutala-blue w-full min-h-10 flex items-center justify-center ">
                <div className="w-full min-h-10 flex items-center justify-center gap-2  text-gray-100 font-google">
                    <LuCopyright />
                    <p>2026 . Kutala todos direitos resevados</p>
                </div>
            </div>
        </>
    )
}
import { View, Text, Font } from "@react-pdf/renderer";
import TemplatePDF from "../components/PDF.JSX"
import { createTw } from "@react-pdf/tailwind";
import OutfitRegular from "../Fonts/Outfit/Outfit-Regular.ttf"
import OutfitSemiBold from "../Fonts/Outfit/Outfit-SemiBold.ttf"
import PoppinsRegular from "../Fonts/Poppins/Poppins-Regular.ttf"
import PoppinsSemiBold from "../Fonts/Poppins/Poppins-SemiBold.ttf"

Font.register({
    family: "Outfit",
    fonts: [
        { src: OutfitRegular },
        { src: OutfitSemiBold }
    ]
});

Font.register({
    family: "Poppins",
    fonts: [
        { src: PoppinsRegular },
        { src: PoppinsSemiBold }
    ]
});

const tw = createTw({
    colors: {
        primary: "#1f304d"
    },
    fontFamily: {
        outfit: ["Outfit"],
        poppins: ["Poppins"]
    }
});


export default function UserPDF({ users = [] }) {
    return (

        <TemplatePDF titleHeader="RELATÓRIO DE USUÁRIOS" titleBody="USUÁRIOS CADASTRADOS" total={users.length} date="teste" >
            <View style={tw('mt-8')}>

                <View style={tw("flex-row items-center rounded-tr-lg rounded-tl-lg text-white justify-between text-xs font-outfit font-semibold bg-primary px-5 py-2")}>
                    <Text style={tw("text-left w-3/12")}>NOME</Text>
                    <Text style={tw("text-left w-4/12")}>EMAIL</Text>
                    <Text style={tw("text-left w-3/12")}>BAIRRO</Text>
                    <Text style={tw("text-left w-2/12")}>Nº BI</Text>
                </View>

                {users.length > 0 ? (
                    users.map((item, index) => {
                        const bgFundo = index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        return (
                            <View key={item.id} style={tw(`flex-row font-outfit justify-between text-xs py-3 px-5 ${bgFundo}`)}>
                                <Text style={tw("text-left w-3/12 font-semibold")}> {item.perfil.nome} </Text>
                                <Text style={tw("text-left w-4/12")}> {item.perfil.email} </Text>
                                <Text style={tw("text-left w-3/12")}> {item.bairro.nome} </Text>
                                <Text style={tw("text-left w-2/12")}> {item.n_bi} </Text>
                            </View>
                        )
                    })
                ) : (
                    <View>
                        <Text style={tw("text-red-500 text-center text-sm pt-10 font-poppins")}>Nenhum usuário cadastrado</Text>
                    </View>
                )}



            </View>
        </TemplatePDF>
    )

}
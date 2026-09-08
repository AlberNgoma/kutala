import { Document, Page, View, Text, Image, Font } from "@react-pdf/renderer";
import { createTw } from "@react-pdf/tailwind";


export default function UserPDF({ users = [] }) {

    Font.register({
        family: "Outfit",
        fonts: [
            { src: "/public/Fonts/Outfit/Outfit-Regular.ttf" },
            { src: "/public/Fonts/Outfit/Outfit-SemiBold.ttf" }
        ]
    });

    Font.register({
        family: "Poppins",
        fonts: [
            { src: "/public/Fonts/Poppins/Poppins-Regular.ttf" },
            { src: "/public/Fonts/Poppins/Poppins-SemiBold.ttf" }
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

    return (
        <Document>
            <Page style={tw("flex flex-col")}>

                {/* CABEÇALHO*/}
                <View>
                    <View style={tw("bg-primary py-4 px-10 flex flex-row items-center justify-between")}>
                        <View style={tw("text-white")}>
                            <Text style={tw("text-lg font-semibold font-outfit leading-none")}>Kutala</Text>
                            <Text style={tw("text-xs leading-none font-outfit text-gray-300 mt-1")}>Sistema de controle de cheias e inundações</Text>
                            <Text style={tw("text-xs font-poppins tracking-wider mt-4 font-semibold")}>RELATÓRIO DE USUÁRIOS</Text>
                        </View>

                        <View>
                            <Image src="/public/imgKutala2.png" style={tw("w-20")} />
                        </View>
                    </View>

                    <View style={tw("w-full h-2")}>
                        <Image src="/public/bannerPDF.png" style={tw("w-full object-cover object-top h-full")} />
                    </View>
                </View>


                {/* CORPO*/}
                <View style={tw("flex-1 p-10")}>

                    <View style={tw("text-primary border-b border-gray-200 py-3")}>
                        <Text style={tw("font-poppins font-semibold text-lg")}>USUÁRIOS CADASTRADOS</Text>
                        <Text style={tw("font-poppins font-semibold text-sm")}>Total : {users.length} </Text>
                    </View>

                    <View style={tw('mt-8')}>

                        <View style={tw("flex-row items-center rounded-tr-lg rounded-tl-lg text-white justify-between text-xs font-outfit font-semibold bg-primary px-5 py-2")}>
                            <Text style={tw("text-left w-3/12")}>NOME</Text>
                            <Text style={tw("text-left w-4/12")}>EMAIL</Text>
                            <Text style={tw("text-left w-3/12")}>BAIRRO</Text>
                            <Text style={tw("text-left w-2/12")}>Nº BI</Text>
                        </View>

                        {users.map((item, index) => {
                            const bgFundo = index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            return (
                                <View key={item.id} style={tw(`flex-row font-outfit justify-between text-xs py-3 px-5 ${bgFundo}`)}>
                                    <Text style={tw("text-left w-3/12 font-semibold")}> {item.perfil.nome} </Text>
                                    <Text style={tw("text-left w-4/12")}> {item.perfil.email} </Text>
                                    <Text style={tw("text-left w-3/12")}> {item.bairro.nome} </Text>
                                    <Text style={tw("text-left w-2/12")}> {item.n_bi} </Text>
                                </View>
                            )
                        })}



                    </View>

                </View>



                {/* ROTADÉ*/}
                <View>
                    <View style={tw("w-full h-2")}>
                        <Image src="/public/bannerPDF.png" style={tw("w-full object-cover object-top h-full")} />
                    </View>

                    <View style={tw("bg-primary py-4 px-10 flex flex-row items-center justify-between")}>
                        <View>
                            <Text style={tw("text-gray-200 font-poppins text-xs")}>©2026. kutala todos direitos reservados</Text>
                        </View>

                        <View style={tw("text-gray-200 font-poppins text-xs flex flex-col items-end gap-1")}>
                            <Text>Emitido à 00/00/0000</Text>
                            <Text>Página 1 de 20</Text>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>

        
    );
}

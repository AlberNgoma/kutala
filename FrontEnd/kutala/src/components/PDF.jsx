import { Document, Page, View, Text, Image, Font } from "@react-pdf/renderer";
import { createTw } from "@react-pdf/tailwind";
import FormatedDate from "../utils/FormatedDate";
import OutfitRegular from "../Fonts/Outfit/Outfit-Regular.ttf"
import OutfitSemiBold from "../Fonts/Outfit/Outfit-SemiBold.ttf"
import PoppinsRegular from "../Fonts/Poppins/Poppins-Regular.ttf"
import PoppinsSemiBold from "../Fonts/Poppins/Poppins-SemiBold.ttf"
import logo from "../assets/imgKutala2.png"
import banner from "../assets/bannerPDF.png"


export default function templatePDF({ titleHeader, titleBody, total, children }) {

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

    return (
        <Document>
            <Page style={tw("flex flex-col")}>

                {/* CABEÇALHO*/}
                <View fixed>
                    <View style={tw("bg-primary py-4 px-10 flex flex-row items-center justify-between")}>
                        <View style={tw("text-white")}>
                            <Text style={tw("text-lg font-semibold font-outfit leading-none")}>Kutala</Text>
                            <Text style={tw("text-xs leading-none font-outfit text-gray-300 mt-1")}>Sistema de controle de cheias e inundações</Text>
                            <Text style={tw("text-xs font-poppins tracking-wider mt-4 font-semibold")}> {titleHeader} </Text>
                        </View>

                        <View>
                            {<Image src={logo} style={tw("w-20")} />}
                        </View>
                    </View>

                    <View style={tw("w-full h-2")}>
                        {<Image src={banner} style={tw("w-full object-cover object-top h-full")} />}
                    </View>
                </View>


                {/* CORPO*/}

                <View style={tw("flex-1 p-10")}>
                    <View style={tw("text-primary border-b border-gray-200 py-3")}>
                        <Text style={tw("font-poppins font-semibold text-lg")}> {titleBody} </Text>
                        <Text style={tw("font-poppins font-semibold text-sm")}>Total : {total}  </Text>
                    </View>

                    {children}

                </View>




                {/* ROTADÉ*/}
                <View fixed >
                    <View style={tw("w-full h-2")}>
                        { <Image
                            src={banner}
                            style={tw("w-full object-cover object-top h-full")}
                        />}
                    </View>

                    <View style={tw("bg-primary py-4 px-10 flex flex-row items-center justify-between font-poppins text-gray-200 text-[10px] gap-3")}>

                        <View>
                            <Text>
                                ©2026. Kutala todos direitos reservados
                            </Text>
                        </View>

                        <View style={tw("flex-col items-end justify-center")}>
                            <Text>
                                Emitido à {FormatedDate()}
                            </Text>

                            <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />

                        </View>

                    </View>
                </View>

            </Page>
        </Document>
    );
}

import { Document, Page, Text, View, Image } from "@react-pdf/renderer"
import { createTw } from '@react-pdf/tailwind';
import logo from "../assets/imgKutala.png"
import banner from "../assets/teste.png"
export default function UserPDF() {

    const tw = createTw({
        colors: {
            kutala: "#1f304d"
        }
    });

    return (
        <>

            <Document>
                <Page size="">
                    <View>
                        <View style={tw("w-full bg-kutala h-32 p-4 flex flex-row items-center justify-around")}>



                            <View style={tw("text-white")}>
                                <Text style={tw("text-md")}>Kutala</Text>
                                <Text style={tw("text-xs text-gray-200 tracking-wide mt-1")}>Sistema de controle de cheias e inundações</Text>
                                <Text style={tw("tracking-wider mt-5 text-sm font-semibold")}>RELATÓRIO DE USUÁRIOS</Text>
                            </View>

                            <View style={tw("text-white text-xs")}>

                                <Text style={tw("text-gray-50")}>Gerado em 03/09/2026</Text>
                            </View>


                        </View>

                        <View style={tw("w-full h-5")}>
                            <Image src={banner} style={tw("w-full h-auto ")}></Image>
                        </View>

                    </View>

                </Page>
            </Document>

        </>
    )
}
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import bairroService from "../../../services/Bairro/BairrosService";
import climaService from "../../../services/Clima/ClimaService";
import listarComentarios from "../../../services/Comentario/ComentariosService";
import SideBarAdmin from "../../../components/SideBarAdmin";
import foto from "../../../assets/kutala.png"


import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import alert from "../../../Alerts"
import Modal from "../../../components/Modal";
import { AnimatePresence } from "framer-motion";
import { LuMessageCircleWarning } from "react-icons/lu";


import { useState, useEffect } from "react";

function FocusBairro({ bounds }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            // fitBounds ajusta o mapa para os limites do polígono
            map.fitBounds(bounds, { padding: [10, 10], duration: 1.5 });
        }
    }, [bounds, map]);
    return null;
}

function Mapa() {
    const [bairros, setBairros] = useState([]);
    const [clima, setClima] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBounds, setSelectedBounds] = useState(null);
    const [modal, setModal] = useState(false);
    const [bairroSelecionado, setBairroSelecionado] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [fotoAmpliada, setFotoAmpliada] = useState(null)


    useEffect(() => {
        async function getBairros() {
            try {
                const resposta = await bairroService();

                const bairrosFormatados = resposta.data.map((bairro) => ({
                    ...bairro,
                    coordenadasFormatadas: bairro.poligono[0].map(coord => [
                        coord[1],
                        coord[0]
                    ])
                }));

                setBairros(bairrosFormatados);

            } catch (error) {
                console.log("Erro ao buscar bairros ", error);
            }
        }

        getBairros();
    }, []);

    async function getClima(bairro_id) {
        setClima(null); // Reseta o clima para mostrar o loader
        try {
            const resposta = await climaService(bairro_id);
            setClima(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar dados do clima", error);
        }
    }

    async function getComentarios(bairro_id) {

        try {
            const resposta = await listarComentarios(bairro_id);

            setComentarios(resposta.data);

        } catch (error) {
            console.log("Erro ao listar comentários ", error.message)
        }
    }

    const handleSearch = () => {
        if (!searchTerm) return;

        const bairroEncontrado = bairros.find(b =>
            b.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (bairroEncontrado && bairroEncontrado.poligono) {
            // Converte as coordenadas do banco [lng, lat] para o Leaflet [lat, lng]
            const coords = bairroEncontrado.poligono[0].map(coord => [coord[1], coord[0]]);
            const bounds = L.latLngBounds(coords);
            setSelectedBounds(bounds);
            getClima(bairroEncontrado.id);
        } else {
            alert.error("Bairro não encontrado!");
        }
    };


    function getCorRisco(nivel) {
        if (nivel === "ALTO") return "#ff0000";
        if (nivel === "MEDIO") return "#ffbf00";
        if (nivel === "BAIXO") return "#26ff00";
        return "#9ca9ba00";
    }

    function abrirModal(bairro) {
        setBairroSelecionado(bairro)
        getComentarios(bairro.id)
        setModal(true);

    }





    return (
        <>
            <div className="flex">
                <SideBarAdmin />

                <div className="flex-1 w-full h-screen relative">

                    <MapContainer
                        center={[-8.814848815023304, 13.229510556084374]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                        zoomControl={false}

                    >

                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution="&copy;KUTALA"
                        />

                        <ZoomControl position="topright" />

                        <FocusBairro bounds={selectedBounds} />

                        {bairros.map((bairro) => {


                            return (
                                <Polygon
                                    key={bairro.id}
                                    positions={bairro.coordenadasFormatadas}
                                    pathOptions={{
                                        color: "white",
                                        fillColor: getCorRisco(bairro.riscos?.[0]?.nivel),
                                        fillOpacity: 0.6,
                                        weight: 2
                                    }}
                                    eventHandlers={{
                                        click: () => getClima(bairro.id)
                                    }}
                                >
                                    <Popup>
                                        <p className="flex items-center justify-center text-center gap-2">
                                            <FaLocationDot className="text-md text-red-600" />{bairro.nome}
                                        </p>

                                        {clima ? (
                                            <div className="space-y-1">
                                                <p className="flex font-outfit font-medium"><IoIosWater className="mr-2 text-blue-600" /> Chuva: {clima.chuva} mm</p>
                                                <p className="flex font-outfit font-medium"><FaTemperatureHigh className="mr-2 text-orange-600" /> Temp: {clima.temperatura} ºC</p>
                                                <p className="flex font-outfit font-medium"><FaPercent className="mr-2 text-red-400" /> Humidade: {clima.humidade} %</p>
                                                <p className="flex font-outfit font-medium"><AiFillMessage className="mr-2 text-green-500" /> Obs: {clima.descricao_clima}</p>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center p-1">
                                                <ClipLoader size={20} className="text-kutala-blue" />
                                            </div>
                                        )}
                                        <button className="w-full mt-3 cursor-pointer flex items-center justify-center bg-red-500 px-5 py-1 rounded text-white hover:bg-red-600  font-google"
                                            onClick={() => abrirModal(bairro)}>
                                            Visualizar Alertas <GoAlertFill className="ml-1" />
                                        </button>
                                    </Popup>

                                    <Tooltip>
                                        <p className="font-outfit font-bold">{bairro.nome}</p>
                                    </Tooltip>

                                </Polygon>


                            );


                        })}

                    </MapContainer>

                    <div className="w-full mt-24 flex items-center justify-center px-7 absolute top-0 z-600">
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}

                            type="text"
                            className="bg-white border-white outline-none rounded-tl-full rounded-bl-full w-130 px-7 py-2"
                            placeholder="Pesquisar..."
                        />
                        <button className="p-3 cursor-pointer w-15 text-white  bg-kutala-blue  flex items-center justify-center rounded-tr-full rounded-br-full">
                            <FaSearch onClick={handleSearch} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 fixed z-600 bg-gray-50 px-8 py-2 rounded-md bottom-5 right-0 font-outfit ">
                        <h1>Legenda</h1>

                        <div className="space-y-3">

                            <div className="flex items-center gap-2">
                                <div className="p-4 bg-green-500 rounded-full"></div>
                                <div>Seguro</div>
                            </div>


                            <div className="flex items-center gap-2">
                                <div className="p-4 bg-yellow-300 rounded-full"></div>
                                <div>Moderado</div>
                            </div>


                            <div className="flex items-center gap-2">
                                <div className="p-4 bg-red-500 rounded-full"></div>
                                <div>Risco</div>
                            </div>

                        </div>

                    </div>



                </div>
                <AnimatePresence>
                    {modal && (
                        <Modal close={() => setModal(false)}>


                            <div className="flex items-center px-5 font-outfit">
                                <div className="flex-1 border-t border-kutala-blue/50"></div>
                                <div className="px-3 flex items-center gap-2 text-kutala-blue tracking-wider">
                                    <span> Comentários</span>
                                    <LuMessageCircleWarning />
                                </div>
                                <div className="flex-1 border-t border-kutala-blue/50"></div>
                            </div>

                            <div className="w-full h-85 flex flex-col gap-2 items-stretch overflow-y-auto overflow-x-auto p-5">

                                <div className="p-5 bg-white border-l-4 border-kutala-blue rounded-tr-xl rounded-br-xl rounded-tl-md rounded-bl-md">

                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <p className="flex items-center justify-center text-sm p-3 bg-kutala-blue font-semibold text-white rounded-full">AN</p>
                                            <p>Alberto Ngoma</p>
                                        </span>

                                        <span className="text-sm">
                                            20/03/2020
                                        </span>
                                    </div>

                                    <div className="w-full flex items-center">
                                        <div className="w-1/1 mt-2 flex items-center justify-center">
                                            <p className="text-sm ">Lorem ipsum dolor sit, amet consecteturiusto.</p>
                                        </div>

                                        <div className="w-1/2 flex items-center justify-center">
                                            <img src={foto} className="w-20 rounded cursor-pointer" alt="" />
                                        </div>

                                    </div>
                                </div>









                            </div>




                        </Modal>
                    )}
                </AnimatePresence>

            </div>






        </>
    );
}

export default Mapa;

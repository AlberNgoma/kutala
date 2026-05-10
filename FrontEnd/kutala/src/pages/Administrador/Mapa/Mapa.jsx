import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import bairroService from "../../../services/Bairro/BairrosService";
import climaService from "../../../services/Clima/ClimaService";
import listarComentarios from "../../../services/Comentario/ComentariosService";
import SideBarAdmin from "../../../components/SideBarAdmin";
import MapLegend from "./MapLegend";
import { GiHamburgerMenu } from "react-icons/gi";


import { FaLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { BsChatTextFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { BsHousesFill } from "react-icons/bs";
import { GoAlertFill } from "react-icons/go";
import { ClipLoader } from "react-spinners";

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
    const [sideBar, setSideBar] = useState(false);

    useEffect(() => {
        async function getBairros() {
            try {
                const resposta = await bairroService();

                setBairros(resposta.data);
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
            alert("Bairro não encontrado!");
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

    function abrirSidebar() {
        setSideBar(!sideBar);
    }



    return (
        <div className="flex">
            <SideBarAdmin isOpen={sideBar} />

            <div className="relative w-full h-screen">

                <div className="p-4 md:p-0 ">
                    <GiHamburgerMenu onClick={() => abrirSidebar()} className="text-xl md:hidden relative cursor-pointer hover:scale-120 transition-all" />
                    {sideBar && (
                        <div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setSideBar(false)}
                        />
                    )}
                </div>

                <div className="absolute z-[1000] px-4 h-9 md:w-1/2 w-full top-1/5 md:right-1/4 flex items-center justify-center">
                    <input
                        type="text"
                        placeholder="Pesquise por Bairros..."
                        className="w-full bg-white py-3 px-5 rounded-full outline-none focus:bg-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <FaSearch
                        onClick={handleSearch}
                        className="absolute right-9 top-3 text-gray-400 cursor-pointer hover:text-blue-600"
                    />
                </div>

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
                        const coordenadasFormatadas = bairro.poligono[0].map(coord => [
                            coord[1],
                            coord[0]
                        ]);


                        return (
                            <Polygon
                                key={bairro.id}
                                positions={coordenadasFormatadas}
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
                                    <p className="flex font-outfit font-medium">
                                        <BsHousesFill className="mr-2 text-black" /> Bairro {bairro.nome}
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
                                            <ClipLoader size={20} color="#3b82f6" />
                                        </div>
                                    )}
                                    <button className="w-full mt-3 flex items-center justify-center bg-red-500 px-5 py-1 rounded text-white hover:bg-red-600  font-google"
                                        onClick={() => abrirModal(bairro)}>
                                        Visualizar Alertas <GoAlertFill className="ml-1" />
                                    </button>
                                </Popup>

                                <Tooltip sticky>
                                    <p className="font-outfit font-bold">{bairro.nome}</p>
                                </Tooltip>
                            </Polygon>
                        );
                    })}

                    <MapLegend />
                </MapContainer>
            </div>
            {modal && (
                <>
                    <div className=" bg-black/50 z-[1000] p-6 absolute w-full min-h-screen flex items-center justify-center">
                        <div className="bg-white w-100 h-120 rounded-lg">

                            <div className="w-full h-10 flex justify-end items-center px-3">
                                <IoIosCloseCircle className="text-2xl cursor-pointer hover:text-red-600"
                                    onClick={() => setModal(false)}
                                />
                            </div>

                            <div className="flex w-full items-center flex-col p-3">
                                <h3 className="flex items-center justify-center  text-lg"><FaLocationDot className="mx-2 text-red-600" /> {bairroSelecionado.nome}  </h3>

                            </div>


                            <div className="w-full h-50 px-3">
                                <div className="flex items-center p-3">

                                    <span className="flex-1 border-t border-gray-300"></span>
                                    <span className="px-3 text-gray-500 flex items-center justify-center">Comentários <BsChatTextFill className="ml-2 text-green-500" /></span>
                                    <span className="flex-1 border-t border-gray-300"></span>
                                </div>

                                <div className="w-full h-90  overflow-y-auto">

                                    <div className="w-full flex items-center flex-col space-y-3">

                                        {comentarios.map((comentario) => (
                                            <div key={comentario.id} className="w-full h-40 py-3 bg-gray-200 p-2 rounded-lg border-l-4 border-blue-500">

                                                <div className="w-full h-10 flex items-center justify-between pb-3 px-2 border-b border-gray-300">

                                                    <div className="flex items-center justify-center space-x-2">

                                                        <section>
                                                            <p className="font-bold text-white bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center p-3">
                                                                {comentario.perfil.nome.charAt(0).toUpperCase()}
                                                            </p>
                                                        </section>

                                                        <section>
                                                            <p className="font-google font-medium"> {comentario.perfil.nome} </p>
                                                        </section>
                                                    </div>

                                                    <div>
                                                        <p className="font-google text-sm text-gray-700"> {new Date(comentario.createdAt).toLocaleDateString()} </p>
                                                    </div>

                                                </div>

                                                <div className="w-full h-28">
                                                    <div className="w-full px-4 py-2">
                                                        <p className="font-barlow">{comentario.texto}</p>

                                                        {comentario.foto && (
                                                            <img
                                                                src={`http://localhost:5000/${comentario.foto}`}
                                                                alt="foto do comentário"
                                                                className="w-17 h-14 object-cover rounded-lg shadow-md mt-2"
                                                                onClick={() => setFotoAmpliada(`http://localhost:5000/${comentario.foto}`)}
                                                            />
                                                        )}
                                                        {fotoAmpliada && (
                                                            <div
                                                                className="fixed inset-0 bg-black/40 z-[3000] flex justify-center items-center"
                                                                onClick={() => setFotoAmpliada(null)} // clica fora para fechar
                                                            >
                                                                <img
                                                                    src={fotoAmpliada}
                                                                    alt="foto ampliada"
                                                                    className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-2xl"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>




                                                </div>

                                            </div>
                                        ))}






                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </>
            )}
        </div>
    );
}

export default Mapa;

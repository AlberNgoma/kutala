import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Cadastro from "../pages/login/Cadastro";


import RotaAdmin from "./RotaAdmin";
import RotaCidadao from "./RotaCidadao";

import Mapa from "../pages/Administrador/Mapa/Mapa";
import Dashboard from "../pages/Administrador/Dashboard/Dashboard"
import CadastrarGov from "../pages/Administrador/Governadores/Cadastrar";
import ListarGov from "../pages/Administrador/Governadores/Listar";
import EditGov from "../pages/Administrador/Governadores/Editar";
import ListarCid from "../pages/Administrador/Cidadãos/Listar"
import EditCid from "../pages/Administrador/Cidadãos/Editar"
import ListarAlert from "../pages/Administrador/Alertas/Listar";
import EditAlert from "../pages/Administrador/Alertas/Editar";
import ListarRisc from "../pages/Administrador/Riscos/Listar"
import EditarRisc from "../pages/Administrador/Riscos/Editar"
import MainPage from "../pages/Cidadão/MainPage";



function Rotas() {
    return (
        <>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/criar-conta" element={<Cadastro />} />


                <Route element={<RotaAdmin/>}>

                    <Route path="/admin/mapa" element={<Mapa />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/listar-governadores" element={<ListarGov />} />
                    <Route path="/admin/cadastrar-governadores" element={<CadastrarGov />} />
                    <Route path="/admin/editar-governadores/:id" element={<EditGov />} />
                    <Route path="/admin/listar-cidadao" element={<ListarCid />} />
                    <Route path="/admin/editar-cidadao/:id" element={<EditCid />} />
                    <Route path="/admin/listar-alerta/" element={<ListarAlert />} />
                    <Route path="/admin/editar-alerta/:id" element={<EditAlert />} />
                    <Route path="/admin/listar-riscos" element={<ListarRisc />} />
                    <Route path="/admin/editar-riscos/:id" element={<EditarRisc />} />

                </Route>

                <Route element={<RotaCidadao/>}>

                    <Route path="/cidadao/mainpage" element={<MainPage />} />
                </Route>


                <Route path="/*" element={<h1>404 NOT FOUND</h1>}></Route>
            </Routes>




        </>
    )
}

export default Rotas;

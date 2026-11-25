import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import PaginaCadastroCarro from "./paginas/PaginaCadastroCarro/PaginaCadastroCarro";
import PaginaListaCarros from "./paginas/PaginaListaCarros/PaginaListaCarros";
import PaginaHome from "./paginas/PaginaHome/PaginaHome";
import PaginaInfoCarro from "./paginas/PaginaInfoCarro/PaginaInfoCarro";
import PaginaLoginUsuario from "./paginas/PaginaLoginUsuario/PaginaLoginUsuario";
import PaginaCadastroUsuario from "./paginas/PaginaCadastroUsuario/PaginaCadastroUsuario";
import RotaPublica from "./componentes/RotaPublica/RotaPublica";
import RotaPrivada from "./componentes/RotaPrivada/RotaPrivada";
import PaginaPerfil from "./paginas/PaginaPerfil/PaginaPerfil";

const roteador = createBrowserRouter([
  {
    element: <RotaPublica />,
    children: [
      { path: "login", element: <PaginaLoginUsuario /> },
      { path: "cadastro-usuario", element: <PaginaCadastroUsuario /> },
    ],
  },

  {
    element: <RotaPrivada />,
    children: [
      { path: "", element: <PaginaHome /> },
      { path: "lista-carros", element: <PaginaListaCarros /> },
      { path: "cadastro-carro/:id?", element: <PaginaCadastroCarro /> },
      { path: "info-carro/:id?", element: <PaginaInfoCarro /> },
      { path: "perfil", element: <PaginaPerfil /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;

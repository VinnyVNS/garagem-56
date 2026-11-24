import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaCadastroCarro from "./paginas/PaginaCadastroCarro/PaginaCadastroCarro";
import PaginaListaCarros from "./paginas/PaginaListaCarros/PaginaListaCarros";
import PaginaHome from "./paginas/PaginaHome/PaginaHome";
import PaginaInfoCarro from "./paginas/PaginaInfoCarro/PaginaInfoCarro";
import PaginaLoginUsuario from "./paginas/PaginaLoginUsuario/PaginaLoginUsuario";
import PaginaCadastroUsuario from "./paginas/PaginaCadastroUsuario/PaginaCadastroUsuario";

const roteador = createBrowserRouter([
  { path: "", element: <PaginaHome /> },
  { path: "lista-carros", element: <PaginaListaCarros /> },
  { path: "cadastro-carro/:id?", element: <PaginaCadastroCarro /> },
  { path: "info-carro/:id?", element: <PaginaInfoCarro /> },
  { path: "login", element: <PaginaLoginUsuario /> },
  { path: "cadastro-usuario", element: <PaginaCadastroUsuario /> },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;

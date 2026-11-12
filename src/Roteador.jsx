import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaAdicionarCarro from "./paginas/PaginaAdicionarCarro/PaginaAdicionarCarro";
import PaginaListaCarros from "./paginas/PaginaListaCarros/PaginaListaCarros";
import PaginaHome from "./paginas/PaginaHome/PaginaHome";

const roteador = createBrowserRouter([
  { path: "", element: <PaginaHome /> },
  { path: "lista-carros", element: <PaginaListaCarros /> },
  { path: "adicionar-carro", element: <PaginaAdicionarCarro /> },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;

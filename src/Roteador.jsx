import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaAdicionarCarro from "./paginas/PaginaAdicionarCarro/PaginaAdicionarCarro";
import PaginaListaCarros from "./paginas/PaginaListaCarros/PaginaListaCarros";

const roteador = createBrowserRouter([
  { path: "", element: <PaginaListaCarros /> },
  { path: "adicionar-carro", element: <PaginaAdicionarCarro /> },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;

import { Navigate, Outlet } from "react-router-dom";
import { buscarUsuarioLogado } from "../../servicos/usuarios.servico";

function RotaPublica() {
  const usuarioLogado = buscarUsuarioLogado();

  if (usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RotaPublica;
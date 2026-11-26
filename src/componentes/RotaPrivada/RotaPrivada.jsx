import { Navigate, Outlet } from "react-router-dom";
import { buscarUsuarioLogado } from "../../servicos/usuarios.servico";

function RotaPrivada() {
  const usuarioLogado = buscarUsuarioLogado();

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RotaPrivada;
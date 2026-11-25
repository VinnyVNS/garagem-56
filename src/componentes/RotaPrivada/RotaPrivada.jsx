import { Navigate, Outlet } from "react-router-dom";
import { buscarUsuarioLogado } from "../../servicos/usuarios.servico";

function RotaPrivada() {
  const usuarioLogado = buscarUsuarioLogado();

  // Se não estiver logado, redireciona para /login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza a rota filha correspondente (Home, ListaCarros, etc.)
  return <Outlet />;
}

export default RotaPrivada;
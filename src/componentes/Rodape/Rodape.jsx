import "./Rodape.css";
import { FaHome, FaCar } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";

function Rodape() {
  const location = useLocation();

  const isCarrosAtivo =
    location.pathname.includes("lista-carros") ||
    location.pathname.includes("cadastro-carro") ||
    location.pathname.includes("info-carro");

  const rolarParaOTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="Rodape_root">
      <NavLink
        to="/"
        end
        onClick={rolarParaOTopo}
        className={({ isActive }) =>
          `Rodape_item ${isActive ? "ativo" : ""}`
        }
      >
        <FaHome className="Rodape_icone" />
        <span className="Rodape_texto">Home</span>
      </NavLink>

      <NavLink
        to="/lista-carros"
        onClick={rolarParaOTopo}
        className={`Rodape_item ${isCarrosAtivo ? "ativo" : ""}`}
      >
        <FaCar className="Rodape_icone" />
        <span className="Rodape_texto">Carros</span>
      </NavLink>

      {/* Quando criar a PaginaPerfil, basta trocar esta div por um NavLink para "/perfil" */}
      <div className="Rodape_item disabled" aria-disabled="true">
        <RxAvatar className="Rodape_icone" />
        <span className="Rodape_texto">Perfil</span>
      </div>
    </footer>
  );
}

export default Rodape;
import "./Rodape.css";
import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";

function Rodape() {
  const location = useLocation();

  const isCarrosAtivo =
    location.pathname.includes("lista-carros") ||
    location.pathname.includes("adicionar-carro") ||
    location.pathname.includes("info-carro");

  return (
    <>
      <footer className="Rodape_root">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "Rodape_home_ativo" : "Rodape_home_inativo"
          }
        >
          <FaHome className="home_foto" />
          <strong className="home_texto">Home</strong>
        </NavLink>

        <NavLink
          to={"/lista-carros"}
          className={isCarrosAtivo ? "Rodape_carros_ativo" : "Rodape_carros_inativo"
          }
        >
          <FaCar className="carros_foto" />
          <strong className="carros_texto">Carros</strong>
        </NavLink>

        <div className="Rodape_perfil">
          <RxAvatar className="perfil_foto" />
          <strong className="perfil_texto">Perfil</strong>
        </div>
      </footer>
    </>
  );
}

export default Rodape;

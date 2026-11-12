import "./Rodape.css";
import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

function Rodape() {
  return (
    <>
      <footer className="Rodape_root">
        <div className="Rodape_home">
          <FaHome className="home_foto" />
          <span className="home_texto">Home</span>
        </div>

        <div className="Rodape_carros">
          <FaCar className="carros_foto" />
          <span className="carros_texto">Carros</span>
        </div>

        <div className="Rodape_perfil">
          <RxAvatar className="perfil_foto"/>
          <span className="perfil_texto">Perfil</span>
        </div>
      </footer>
    </>
  );
}

export default Rodape;

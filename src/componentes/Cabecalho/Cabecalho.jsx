import { useLocation } from "react-router-dom";
import BotaoVoltar from "../BotaoVoltar/BotaoVoltar";
import "./Cabecalho.css";
import garagem56logo from "../../assets/garagem-56-logo.png";

function Cabecalho() {
  const location = useLocation();

  const paginasLogo =
    location.pathname === "/" || location.pathname === "/lista-carros";

  return (
    <header className="Cabecalho_root">
      <div className="conteudo">
        {paginasLogo ? (
          <img
            src={garagem56logo}
            alt="Logo Garagem 56"
            className="conteudo_img"
          />
        ) : (
          <BotaoVoltar />
        )}
        <h1 className="conteudo_texto">Garagem 56</h1>
      </div>
    </header>
  );
}

export default Cabecalho;
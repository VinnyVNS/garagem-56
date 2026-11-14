import { useLocation } from "react-router-dom";
import BotaoVoltar from "../BotaoVoltar/BotaoVoltar";
import "./Cabecalho.css";

function Cabecalho() {
  const location = useLocation();

  const paginasLogo =
    location.pathname === "/" || location.pathname === "/lista-carros";

  return (
    <>
      <header className="Cabecalho_root">
        {paginasLogo ? (
          <img src="\src\assets\garagem-56-logo.png" />
        ) : (
          <BotaoVoltar />
        )}
        <h1>Garagem 56</h1>
      </header>
    </>
  );
}

export default Cabecalho;

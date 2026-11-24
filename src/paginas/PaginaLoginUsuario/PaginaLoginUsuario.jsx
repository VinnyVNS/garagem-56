import Principal from "../../componentes/Principal/Principal";
import "./PaginaLoginUsuario.css";
import garagem56logo from "../../assets/garagem-56-logo.png";
import InputCustom from "../../componentes/InputCustom/InputCustom";

function PaginaLoginUsuario() {
  return (
    <Principal>
      <div className="PaginaLoginUsuario_root">
        <div className="logo">
          <img
            src={garagem56logo}
            alt="Logo Garagem 56"
            className="logo_img"
          />
          <h1 className="logo_texto">Garagem 56</h1>
        </div>

        <InputCustom label="Email"/>
      </div>
    </Principal>
  );
}

export default PaginaLoginUsuario;

import Cabecalho from "../Cabecalho/Cabecalho";
import Rodape from "../Rodape/Rodape";
import "./Principal.css";

function Principal(props) {
  return (
    <>
      <Cabecalho />
      <main className="Principal_root">{props.children}</main>
      <Rodape home="/" carros="/lista-carros" />
    </>
  );
}

export default Principal;

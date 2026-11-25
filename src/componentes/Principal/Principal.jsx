import Cabecalho from "../Cabecalho/Cabecalho";
import Rodape from "../Rodape/Rodape";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Principal.css";

function Principal(props) {
  const mostrarNavegacao = props.mostrarNavegacao ?? true;
  
  return (
    <>
      <ScrollToTop />
      { mostrarNavegacao && <Cabecalho />}
      <main className="Principal_root">{props.children}</main>
      { mostrarNavegacao && <Rodape />}
    </>
  );
}

export default Principal;

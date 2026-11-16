import Cabecalho from "../Cabecalho/Cabecalho";
import Rodape from "../Rodape/Rodape";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Principal.css";

function Principal(props) {
  return (
    <>
      <ScrollToTop />
      <Cabecalho />
      <main className="Principal_root">{props.children}</main>
      <Rodape />
    </>
  );
}

export default Principal;

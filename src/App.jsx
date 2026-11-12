import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
import Roteador from "./Roteador";

function App() {
  return (
    <>
      <Cabecalho />
      <div className="App_conteudo">
        <Roteador />
      </div>
      <Rodape />
      <ToastContainer />
    </>
  );
}

export default App;

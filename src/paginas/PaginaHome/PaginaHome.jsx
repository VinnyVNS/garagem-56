import Principal from "../../componentes/Principal/Principal";
import { buscarCarros } from "../../servicos/carros.servico";
import "./PaginaHome.css";
import { FaCar } from "react-icons/fa";

function PaginaHome() {
  const carrosSalvos = buscarCarros() || [];

  const prontos = carrosSalvos.filter(
    (carro) => carro.estado === "pronto",
  ).length;

  const emAndamento = carrosSalvos.filter(
    (carro) => carro.estado === "emAndamento",
  ).length;

  return (
    <Principal>
      <div className="PaginaHome_root">
        <div className="sumario">
          <h2 className="texto_sumario">SUMÁRIO</h2>
          <div className="cards_sumario">
            <div className="carros_prontos">
              <p>PRONTOS P/ RETIRADA</p>
              <span>
                {prontos} <FaCar />
              </span>
            </div>
            <div className="carros_emAndamento">
              <p>EM ANDAMENTO</p>
              <span>
                {emAndamento} <FaCar />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaHome;

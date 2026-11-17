import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaListaCarros.css";
import { buscarCarros } from "../../servicos/carros.servico";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import carroPlaceholder from "../../assets/carro-placeholder.jpg";

function PaginaListaCarros() {
  const navigate = useNavigate();

  const [carros, setCarros] = useState(buscarCarros());

  const irParaInfo = (carro) => {
    navigate(`/info-carro/${carro.id}`, { state: { carro: carro } });
  };

  return (
    <Principal>
      <div className="PaginaListaCarros_root">
        {carros.map((carro) => {
          return (
            <div
              onClick={() => irParaInfo(carro)}
              key={carro.id}
              className="carro_card"
            >
              <img src={carro.foto || carroPlaceholder} className="carro_img" />

              <div className="carro_infos">
                <strong className="carro_modelo">{carro.modelo}</strong>
                <div className="carro_subinfos"><span>Marca: {carro.marca}</span>
                  <span>Placa: {carro.placa}</span></div>
                  
                
              </div>
            </div>
          );
        })}

        <div className="PaginaListaCarros_btnAddCarro">
          <div className="click" onClick={() => navigate("/adicionar-carro")}>
            <IoIosAdd className="btn_redondo" />
            <span className="texto">Adicionar Carro</span>
          </div>
        </div>
      </div>

      {!carros.length && (
        <span className="PaginaListaCarros_vazia">
          Nenhum carro cadastrado.
        </span>
      )}
    </Principal>
  );
}

export default PaginaListaCarros;

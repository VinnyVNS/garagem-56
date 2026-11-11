import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaListaCarros.css";
import { buscarCarros } from "../../servicos/carros.servico";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

function PaginaListaCarros() {
  const navigate = useNavigate();

  const [carros, setCarros] = useState(buscarCarros());

  return (
    <Principal>
      <div className="PaginaListaCarros_root">
        {carros.map((carro) => {
          return (
            <div key={carro.id} className="PaginaListaCarros_carro">
              <img src={carro.foto} />

              <div className="infos">
                <strong className="modelo">{carro.modelo}</strong>
                <span>Marca: {carro.marca}</span>
                <span>Placa: {carro.placa}</span>
              </div>
            </div>
          );
        })}

        <div className="PaginaListaCarros_addCarro">
          <div>
            <span
              className="PaginaListaCarros_textoAdd"
              onClick={() => navigate("/adicionar-carro")}
            >
              Adicionar Carro
            </span>
          </div>

          <div className="PaginaListaCarros_botaoAdd">
            <IoIosAdd size={70} onClick={() => navigate("/adicionar-carro")} />
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

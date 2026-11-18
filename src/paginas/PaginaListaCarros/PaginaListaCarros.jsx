import { useState } from "react";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaListaCarros.css";
import { buscarCarros, salvarCarro } from "../../servicos/carros.servico";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import carroPlaceholder from "../../assets/carro-placeholder.jpg";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import { CiSearch } from "react-icons/ci";
import SelectCustom from "../../componentes/SelectCustom/SelectCustom";

function PaginaListaCarros() {
  const navigate = useNavigate();

  const [carros, setCarros] = useState(buscarCarros());
  const [carroPesquisa, setCarroPesquisa] = useState("");

  const irParaInfo = (carro) => {
    navigate(`/info-carro/${carro.id}`, { state: { carro: carro } });
  };

  const carroFiltrado = carros.filter((item) => {
    return item.modelo.toLowerCase().includes(carroPesquisa.toLowerCase());
  });

  const alterarEstadoCarro = (idCarro, novoEstado) => {
    const carroAtualizado = carros.map((item) => {
      return item.id === idCarro ? { ...item, estado: novoEstado } : item;
    });

    setCarros(carroAtualizado);
    salvarCarro(carroAtualizado.find((c) => c.id === idCarro));
  };

  return (
    <Principal>
      <div className="PaginaListaCarros_root">
        <div className="carro_pesquisa">
          <CiSearch className="lupa" />
          <InputCustom
            type="search"
            value={carroPesquisa}
            placeholder="Buscar carro..."
            onChange={(e) => setCarroPesquisa(e.target.value)}
          />
        </div>

        {carroFiltrado.map((carro) => {
          return (
            <div
              onClick={() => irParaInfo(carro)}
              key={carro.id}
              className="carro_card"
            >
              <img src={carro.foto || carroPlaceholder} className="carro_img" />

              <div className="carro_infos">
                <strong className="carro_modelo">{carro.modelo}</strong>
                <div className="carro_subinfos">
                  <span>Marca: {carro.marca}</span>
                  <span>Placa: {carro.placa}</span>
                </div>

                <SelectCustom
                  tipo={carro.estado}
                  value={carro.estado || "emAndamento"}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => alterarEstadoCarro(carro.id, e.target.value)}
                />
              </div>
            </div>
          );
        })}

        <div className="PaginaListaCarros_btnAddCarro">
          <div className="click" onClick={() => navigate("/cadastro-carro")}>
            <span className="texto">Adicionar Carro</span>
            <IoIosAdd className="btn_redondo" />
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

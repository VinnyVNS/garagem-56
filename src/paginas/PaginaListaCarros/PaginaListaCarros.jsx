import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Principal from "../../componentes/Principal/Principal";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import SelectCustom from "../../componentes/SelectCustom/SelectCustom";
import { buscarCarros, salvarCarro } from "../../servicos/carros.servico";
import carroPlaceholder from "../../assets/carro-placeholder.jpg";
import "./PaginaListaCarros.css";

function PaginaListaCarros() {
  const navigate = useNavigate();

  const [carros, setCarros] = useState(() => buscarCarros() || []);
  const [carroPesquisa, setCarroPesquisa] = useState("");

  const termoBusca = carroPesquisa.trim().toLowerCase();

  const carroFiltrado = carros.filter((item) => {
    if (!item) return false;
    return (
      item.modelo?.toLowerCase().includes(termoBusca) ||
      item.marca?.toLowerCase().includes(termoBusca) ||
      item.placa?.toLowerCase().includes(termoBusca)
    );
  });

  const irParaInfo = (carro) => {
    navigate(`/info-carro/${carro.id}`, { state: { carro } });
  };

  const alterarEstadoCarro = (idCarro, novoEstado) => {
    const listaAtualizada = carros.map((item) =>
      item.id === idCarro ? { ...item, estado: novoEstado } : item
    );

    setCarros(listaAtualizada);

    const carroModificado = listaAtualizada.find((c) => c.id === idCarro);
    if (carroModificado) {
      salvarCarro(carroModificado);
    }
  };

  return (
    <Principal>
      <div className="PaginaListaCarros_root">
        {carros.length > 0 && (
          <div className="carro_pesquisa">
            <CiSearch className="lupa" aria-hidden="true" />
            <InputCustom
              type="search"
              value={carroPesquisa}
              placeholder="Buscar por modelo, marca ou placa..."
              onChange={(e) => setCarroPesquisa(e.target.value)}
            />
          </div>
        )}

        {carroFiltrado.map((carro) => {
          const estadoAtual = carro.estado || "emAndamento";

          return (
            <div
              key={carro.id}
              className="carro_card"
              onClick={() => irParaInfo(carro)}
            >
              <img
                src={carro.foto || carroPlaceholder}
                alt={`${carro.marca || ""} ${carro.modelo || "Carro"}`.trim()}
                className="carro_img"
              />

              <div className="carro_infos">
                <strong className="carro_modelo">{carro.modelo}</strong>

                <div className="carro_subinfos">
                  <span>Marca: {carro.marca}</span>
                  <span>Placa: {carro.placa || "Não informado"}</span>
                </div>

                <SelectCustom
                  value={estadoAtual}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => alterarEstadoCarro(carro.id, e.target.value)}
                />
              </div>
            </div>
          );
        })}

        {!carros.length && (
          <span className="PaginaListaCarros_vazia">
            Nenhum carro cadastrado.
          </span>
        )}

        {carros.length > 0 && carroFiltrado.length === 0 && (
          <span className="PaginaListaCarros_vazia">
            Nenhum carro encontrado para &ldquo;{carroPesquisa}&rdquo;.
          </span>
        )}

        <div className="PaginaListaCarros_btnAddCarro">
          <button
            type="button"
            className="click"
            onClick={() => navigate("/cadastro-carro")}
          >
            <span className="texto">Adicionar Carro</span>
            <span className="btn_redondo">
              <IoIosAdd className="icone_add" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaListaCarros;
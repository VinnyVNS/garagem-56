import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Principal from "../../componentes/Principal/Principal";
import { salvarLocalStorage } from "../../servicos/localstorage.servico";
import { buscarCarros } from "../../servicos/carros.servico";
import carroPlaceholder from "../../assets/carro-placeholder.jpg";
import "./PaginaInfoCarro.css";

const TOAST_EXCLUSAO_ID = "confirmar-exclusao";

function PaginaInfoCarro() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    return () => {
      toast.dismiss(TOAST_EXCLUSAO_ID);
    };
  }, []);

  const carrosSalvos = buscarCarros() || [];
  const carro =
    carrosSalvos.find((item) => String(item.id) === String(id)) ||
    location.state?.carro;

  if (!carro) {
    return (
      <Principal>
        <div className="PaginaInfoCarro_root">
          <div className="carro_nao_encontrado">
            <p>Carro não encontrado.</p>
          </div>
        </div>
      </Principal>
    );
  }

  const editarCarro = () => {
    navigate(`/cadastro-carro/${carro.id}`, { state: { carro } });
  };

  const confirmarExclusao = (closeToast) => {
    const todosOsCarros = buscarCarros() || [];
    const carrosAtualizados = todosOsCarros.filter(
      (item) => String(item.id) !== String(carro.id),
    );
    salvarLocalStorage("carros", carrosAtualizados);

    closeToast();
    toast.success("Carro excluído com sucesso!", {
      position: "top-center",
      theme: "colored",
      hideProgressBar: true,
      autoClose: 2000,
    });
    navigate("/lista-carros");
  };

  const excluirCarro = () => {
    toast.warn(
      ({ closeToast }) => (
        <div className="toast_exclusao_container">
          <p className="toast_exclusao_texto">
            Deseja excluir o carro {carro.modelo}, placa {carro.placa}?
          </p>
          <div className="toast_exclusao_botoes">
            <button
              type="button"
              className="toast_btn toast_btn_sim"
              onClick={() => confirmarExclusao(closeToast)}
            >
              Sim
            </button>
            <button
              type="button"
              className="toast_btn toast_btn_nao"
              onClick={closeToast}
            >
              Não
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        toastId: TOAST_EXCLUSAO_ID,
      },
    );
  };

  return (
    <Principal>
      <div className="PaginaInfoCarro_root">
        <section className="carro">
          <img
            src={carro.foto || carroPlaceholder}
            alt={`${carro.marca || ""} ${carro.modelo || "Carro"}`.trim()}
            className="carro_foto"
          />

          <div className="carro_modelo_icones">
            <strong className="carro_modelo">{carro.modelo}</strong>

            <div className="carro_icones">
              <button
                type="button"
                className="btn_acao editar"
                onClick={editarCarro}
                aria-label="Editar carro"
              >
                <FaEdit className="editor" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn_acao excluir"
                onClick={excluirCarro}
                aria-label="Excluir carro"
              >
                <FaTrashAlt className="lixeira" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="carro_infos">
            <div className="carro_infos_textos">
              <span className="texto">
                <strong>Marca:</strong> {carro.marca}
              </span>
              <span className="texto">
                <strong>Placa:</strong> {carro.placa || "Não informado"}
              </span>
            </div>

            <div className="carro_infos_textos">
              <span className="texto">
                <strong>Ano:</strong> {carro.ano || "Não informado"}
              </span>
              <span className="texto">
                <strong>Cor:</strong> {carro.cor || "Não informado"}
              </span>
            </div>
          </div>
        </section>

        <section className="PaginaInfoCarro_servicos">
          <strong className="servicos_titulo">Serviços</strong>
          <span className="servicos_vazia">Nenhum serviço agendado.</span>
        </section>
      </div>
    </Principal>
  );
}

export default PaginaInfoCarro;
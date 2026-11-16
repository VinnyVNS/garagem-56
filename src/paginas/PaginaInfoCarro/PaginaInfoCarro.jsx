import { useLocation, useNavigate, useParams } from "react-router-dom";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaInfoCarro.css";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { salvarLocalStorage } from "../../servicos/localstorage.servico";
import { buscarCarros } from "../../servicos/carros.servico";
import { toast } from "react-toastify";

function PaginaInfoCarro() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const carro =
    location.state?.carro || buscarCarros().find((item) => item.id === +id);

  if (!carro) {
    return (
      <Principal>
        <div className="PaginaInfoCarro_root">
          <p>Carro não encontrado.</p>
        </div>
      </Principal>
    );
  }

  const editarCarro = () => {
    navigate(`/adicionar-carro/${carro.id}`);
  };

  const confirmarExclusao = (closeToast) => {
    const todosOsCarros = buscarCarros();
    const carrosAtualizados = todosOsCarros.filter(
      (item) => item.id !== carro.id,
    );
    salvarLocalStorage("carros", carrosAtualizados);

    toast.success("Carro excluído com sucesso!", {
      position: "top-center",
      theme: "colored",
      hideProgressBar: true,
      autoClose: 2000,
    });
    navigate("/lista-carros");
    closeToast();
  };

  const excluirCarro = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="toast_exclusao_texto">
            Deseja excluir o carro {carro.modelo}, placa {carro.placa}?
          </p>
          <div className="toast_exclusao_botoes">
            <button
              className="toast_btn toast_btn_sim"
              onClick={() => confirmarExclusao(closeToast)}
            >
              Sim
            </button>
            <button className="toast_btn toast_btn_nao" onClick={closeToast}>
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
        toastId: "confimar-exclusao",
      },
    );
  };

  return (
    <Principal>
      <div className="PaginaInfoCarro_root">
        <div className="PaginaInfoCarro_carro">
          <img src={carro.foto} className="carro_foto" />
          <div className="modelo_icones">
            <strong className="modelo_carro">{carro.modelo}</strong>
            <div className="icones">
              <FaEdit className="editor" onClick={editarCarro} />
              <FaTrashAlt className="lixeira" onClick={excluirCarro} />
            </div>
          </div>

          <div className="infos_carro">
            <div className="textos_info">
              <span className="texto">
                <strong>Marca</strong>: {carro.marca}
              </span>
              <span className="texto">
                <strong>Placa</strong>: {carro.placa}
              </span>
            </div>
            <div className="textos_info">
              <span className="texto">
                <strong>Ano</strong>: {carro.ano}
              </span>
              <span className="texto">
                <strong>Cor</strong>: {carro.cor}
              </span>
            </div>
          </div>
        </div>

        <div className="PaginaInfoCarro_servicos">
          <strong className="servicos_titulo">Serviços</strong>
          <span className="servicos_vazia">Nenhum serviço agendado.</span>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaInfoCarro;

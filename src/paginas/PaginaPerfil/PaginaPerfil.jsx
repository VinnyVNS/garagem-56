import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Principal from "../../componentes/Principal/Principal";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import {
  buscarUsuarioLogado,
  excluirUsuario,
  sairDaConta,
} from "../../servicos/usuarios.servico";
import "./PaginaPerfil.css";

const TOAST_EXCLUSAO_USUARIO_ID = "confirmar-exclusao-usuario";

function PaginaPerfil() {
  const navigate = useNavigate();
  const usuario = buscarUsuarioLogado();

  const isVisitante =
    Boolean(usuario?.visitante) || String(usuario?.id) === "visitante";

  useEffect(() => {
    return () => {
      toast.dismiss(TOAST_EXCLUSAO_USUARIO_ID);
    };
  }, []);

  const handleSair = () => {
    sairDaConta();
    navigate("/login", { replace: true });
  };

  const confirmarExclusaoConta = (closeToast) => {
    if (!usuario) return;

    excluirUsuario(usuario.id);

    closeToast();
    toast.success("Conta excluída com sucesso!", {
      position: "top-center",
      theme: "colored",
      hideProgressBar: true,
      autoClose: 2000,
    });
    navigate("/login", { replace: true });
  };

  const abrirConfirmacaoExclusao = () => {
    toast.warn(
      ({ closeToast }) => (
        <div className="toast_exclusao_container">
          <p className="toast_exclusao_texto">
            Deseja excluir sua conta? Todos os seus carros também serão apagados.
          </p>
          <div className="toast_exclusao_botoes">
            <button
              type="button"
              className="toast_btn toast_btn_sim"
              onClick={() => confirmarExclusaoConta(closeToast)}
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
        toastId: TOAST_EXCLUSAO_USUARIO_ID,
      },
    );
  };

  return (
    <Principal>
      <div className="PaginaPerfil_root">
        <div className="PaginaPerfil_acoes">
          <BotaoCustomizado tipo="excluir" onClick={handleSair}>
            Sair
          </BotaoCustomizado>

          {!isVisitante && (
            <BotaoCustomizado tipo="excluir" onClick={abrirConfirmacaoExclusao}>
              Excluir Conta
            </BotaoCustomizado>
          )}
        </div>
      </div>
    </Principal>
  );
}

export default PaginaPerfil;
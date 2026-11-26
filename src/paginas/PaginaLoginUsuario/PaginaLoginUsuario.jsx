import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Principal from "../../componentes/Principal/Principal";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import {
  autenticarUsuario,
  entrarComoVisitante,
} from "../../servicos/usuarios.servico";
import garagem56logo from "../../assets/garagem-56-logo.png";
import "./PaginaLoginUsuario.css";

function PaginaLoginUsuario() {
  const navigate = useNavigate();

  const acaoVisitante = () => {
    entrarComoVisitante();
    navigate("/", { replace: true });
  };

  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const entrar = (evento) => {
    if (evento) evento.preventDefault();

    if (!formLogin.email.trim() || !formLogin.senha) {
      toast.error("Preencha o e-mail e a senha!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    const usuario = autenticarUsuario(formLogin.email, formLogin.senha);

    if (!usuario) {
      toast.error("E-mail ou senha inválidos!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <Principal mostrarNavegacao={false}>
      <form className="PaginaLoginUsuario_root" onSubmit={entrar}>
        <div className="logo">
          <img src={garagem56logo} alt="Logo Garagem 56" className="logo_img" />
          <h1 className="logo_texto">Garagem 56</h1>
        </div>

        <div className="campos">
          <h2 className="campos_texto">Entrar</h2>
          <InputCustom
            label="Email"
            placeholder="Digite seu email..."
            tema="escuro"
            type="email"
            value={formLogin.email}
            onChange={(e) =>
              setFormLogin({ ...formLogin, email: e.target.value })
            }
          />

          <div className="campo_senha_wrapper">
            <InputCustom
              label="Senha"
              placeholder="Digite sua senha..."
              tema="escuro"
              type={mostrarSenha ? "text" : "password"}
              value={formLogin.senha}
              onChange={(e) =>
                setFormLogin({ ...formLogin, senha: e.target.value })
              }
            />
            <button
              type="button"
              className="btn_olho_senha"
              onClick={() => setMostrarSenha((prev) => !prev)}
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="btns">
          <BotaoCustomizado tipo="entrar" type="submit">
            Entrar
          </BotaoCustomizado>
          <button
            type="button"
            className="btn_visitante"
            onClick={acaoVisitante}
          >
            Entrar como visitante
          </button>

          <NavLink to="/cadastro-usuario">
            <span>Ainda não tem conta? </span>
            <strong>Cadastrar-se</strong>
          </NavLink>
        </div>
      </form>
    </Principal>
  );
}

export default PaginaLoginUsuario;

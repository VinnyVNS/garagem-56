import Principal from "../../componentes/Principal/Principal";
import "./PaginaCadastroUsuario.css";
import garagem56logo from "../../assets/garagem-56-logo.png";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import { toast } from "react-toastify";
import { autenticarUsuario, salvarUsuario } from "../../servicos/usuarios.servico";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PaginaCadastroUsuario() {
  const navigate = useNavigate();

  const [formUsuario, setFormUsuario] = useState({
    email: "",
    nome: "",
    senha: "",
  });
  const [repetirSenha, setRepetirSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState(false);

  const cadastrar = (evento) => {
    if (evento) evento.preventDefault();

    if (!formUsuario.email.trim()) {
      toast.error("Por favor, digite seu email!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (!formUsuario.nome.trim()) {
      toast.error("Por favor, digite seu nome!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (!formUsuario.senha) {
      toast.error("Por favor, digite uma senha!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (formUsuario.senha !== repetirSenha) {
      toast.error("As senhas não coincidem!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    try {
      salvarUsuario(formUsuario);
      toast.success("Cadastro realizado com sucesso!", {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      autenticarUsuario(formUsuario.email, formUsuario.senha);
      navigate("/", { replace: true });
    } catch (erro) {
      toast.error(erro.message, {
        position: "top-center",
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };

  return (
    <Principal mostrarNavegacao={false}>
      <form className="PaginaCadastroUsuario_root" onSubmit={cadastrar}>
        <div className="logo">
          <img src={garagem56logo} alt="Logo Garagem 56" className="logo_img" />
          <h1 className="logo_texto">Garagem 56</h1>
        </div>

        <div className="campos">
          <h2 className="campos_texto">Cadastrar-se</h2>
          <InputCustom
            label="Email *"
            placeholder="Digite seu email..."
            tema="escuro"
            type="email"
            value={formUsuario.email}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, email: e.target.value })
            }
          />
          <InputCustom
            label="Nome *"
            placeholder="Digite seu nome..."
            tema="escuro"
            value={formUsuario.nome}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, nome: e.target.value })
            }
          />

          <div className="campo_senha_wrapper">
            <InputCustom
              label="Senha *"
              placeholder="Digite sua nova senha..."
              tema="escuro"
              type={mostrarSenha ? "text" : "password"}
              value={formUsuario.senha}
              onChange={(e) =>
                setFormUsuario({ ...formUsuario, senha: e.target.value })
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

          <div className="campo_senha_wrapper">
            <InputCustom
              label="Repetir Senha *"
              placeholder="Repita sua nova senha..."
              tema="escuro"
              type={mostrarRepetirSenha ? "text" : "password"}
              value={repetirSenha}
              onChange={(e) => setRepetirSenha(e.target.value)}
            />
            <button
              type="button"
              className="btn_olho_senha"
              onClick={() => setMostrarRepetirSenha((prev) => !prev)}
              aria-label={
                mostrarRepetirSenha ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {mostrarRepetirSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="btns">
          <BotaoCustomizado tipo="entrar" type="submit">
            Cadastrar-se
          </BotaoCustomizado>

          <NavLink to="/login">
            <span>Já tem conta? </span>
            <strong>Entrar</strong>
          </NavLink>
        </div>
      </form>
    </Principal>
  );
}

export default PaginaCadastroUsuario;
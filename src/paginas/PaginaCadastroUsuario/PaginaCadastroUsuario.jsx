import Principal from "../../componentes/Principal/Principal";
import "./PaginaCadastroUsuario.css";
import garagem56logo from "../../assets/garagem-56-logo.png";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import { toast } from "react-toastify";

function PaginaCadastroUsuario() {
  const [formUsuario, setFormUsuario] = useState({
    email: "",
    nome: "",
    senha: "",
  });
  const [repetirSenha, setRepetirSenha] = useState("");

  const cadastrar = () => {
    if (!formUsuario.email.trim()) {
      toast.error("Por favor, digite seu email!");
      return;
    }

    if (!formUsuario.nome.trim()) {
      toast.error("Por favor, digite seu nome!");
      return;
    }

    if (!formUsuario.senha) {
      toast.error("Por favor, digite uma senha!");
      return;
    }

    if (formUsuario.senha !== repetirSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }
  };

  return (
    <Principal>
      <div className="PaginaCadastroUsuario_root">
        <div className="logo">
          <img src={garagem56logo} alt="Logo Garagem 56" className="logo_img" />
          <h1 className="logo_texto">Garagem 56</h1>
        </div>

        <div className="campos">
          <InputCustom
            label="Email"
            value={formUsuario.email}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, email: e.target.value })
            }
          />
          <InputCustom
            label="Nome"
            value={formUsuario.nome}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, nome: e.target.value })
            }
          />
          <InputCustom
            label="Senha"
            value={formUsuario.senha}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, senha: e.target.value })
            }
          />
          <InputCustom
            label="Repetir Senha"
            value={repetirSenha}
            onChange={(e) => setRepetirSenha(e.target.value)}
          />
        </div>

        <div className="btn">
          <BotaoCustomizado tipo="cadastrar" onClick={cadastrar}>Cadastrar-se</BotaoCustomizado>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaCadastroUsuario;

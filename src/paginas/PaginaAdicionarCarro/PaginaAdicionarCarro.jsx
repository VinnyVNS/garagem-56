import { useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaAdicionarCarro.css";
import { salvarCarro } from "../../servicos/carros.servico";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

function PaginaAdicionarCarro() {
  const navigate = useNavigate();

  const [formCarro, setFormCarro] = useState({
    id: "",
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    placa: "",
  });

  const salvar = () => {
    if (!formCarro.marca.trim()) {
      toast.error("O campo marca é obrigatório!", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (!formCarro.modelo.trim()) {
      toast.error("O campo modelo é obrigatório!", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (!formCarro.ano.trim()) {
      toast.error("O campo ano é obrigatório!", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    if (!formCarro.cor.trim()) {
      toast.error("O campo cor é obrigatório!", {
        theme: "colored",
        hideProgressBar: true,
        autoClose: 2000,
      });
      return;
    }

    salvarCarro(formCarro);
    toast.success("Carro adicionado com sucesso!", {
      theme: "colored",
      hideProgressBar: true,
      autoClose: 2000,
    });

    navigate("/")

    console.log(formCarro);
  };

  return (
    <Principal>
      <div className="PaginaAdicionarCarro_root">
        <div className="PaginaAdicionarCarro_voltar">
          <IoArrowBack
            className="PaginaAdicionarCarro_voltar_botao"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="PaginaAdicionarCarro_campo">
          <CampoCustomizado
            tipo="input"
            label="Marca"
            maxLength={20}
            placeholder="Digite a marca do carro..."
            value={formCarro.marca}
            onChange={(e) =>
              setFormCarro({ ...formCarro, marca: e.target.value })
            }
          />

          <CampoCustomizado
            tipo="input"
            label="Modelo"
            maxLength={20}
            placeholder="Digite o modelo do carro..."
            value={formCarro.modelo}
            onChange={(e) =>
              setFormCarro({ ...formCarro, modelo: e.target.value })
            }
          />

          <CampoCustomizado
            tipo="input"
            label="Ano"
            maxLength={4}
            placeholder="Digite o ano do carro..."
            value={formCarro.ano}
            onChange={(e) =>
              setFormCarro({ ...formCarro, ano: e.target.value })
            }
          />

          <CampoCustomizado
            tipo="input"
            label="Cor"
            maxLength={10}
            placeholder="Digite a cor do carro..."
            value={formCarro.cor}
            onChange={(e) =>
              setFormCarro({ ...formCarro, cor: e.target.value })
            }
          />

          <CampoCustomizado
            tipo="input"
            label="Placa"
            maxLength={8}
            placeholder="Digite a placa do carro..."
            value={formCarro.placa}
            onChange={(e) =>
              setFormCarro({ ...formCarro, placa: e.target.value })
            }
          />

          <CampoCustomizado
            tipo="foto"
            type="file"
            accept="image/*"
            label="Foto"
            onChange={(e) => {
              const imagem = e.target.files[0];
              if (imagem) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setFormCarro({ ...formCarro, foto: event.target.result });
                };
                reader.readAsDataURL(imagem);
              }
            }}
          />

          {formCarro.foto && (
            <div>
              <img
                src={formCarro.foto}
                alt="Foto do Cliente"
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "20px",
                  padding: "10px",
                }}
              />
            </div>
          )}
        </div>

        <div className="PaginaAdicionarCarro_botao">
          <BotaoCustomizado tipo="adicional" aoClicar={salvar}>
            Adicionar Carro
          </BotaoCustomizado>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaAdicionarCarro;

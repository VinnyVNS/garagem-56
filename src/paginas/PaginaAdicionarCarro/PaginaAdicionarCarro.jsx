import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import "./PaginaAdicionarCarro.css";
import { buscarCarros, salvarCarro } from "../../servicos/carros.servico";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BtnAddFoto from "../../componentes/BtnAddFoto/BtnAddFoto";
import InputCustom from "../../componentes/InputCustom/InputCustom";

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

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const carroParaEditar = buscarCarros().find(
        (item) => item.id === +params.id,
      );

      if (carroParaEditar) {
        setFormCarro(carroParaEditar);
      }
    }
  }, [params.id]);

  const salvar = () => {
    if (!formCarro.marca.trim()) {
      toast.error("O campo marca é obrigatório!", {
        position: "top-center",
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

    navigate("/lista-carros");

    console.log(formCarro);
  };

  return (
    <Principal>
      <div className="PaginaAdicionarCarro_root">
        <div className="PaginaAdicionarCarro_campo">
          <InputCustom
            type="input"
            label="Marca"
            maxLength={20}
            placeholder="Digite a marca do carro..."
            value={formCarro.marca}
            onChange={(e) =>
              setFormCarro({ ...formCarro, marca: e.target.value })
            }
          />
          <InputCustom
            tipo="input"
            label="Modelo"
            maxLength={20}
            placeholder="Digite o modelo do carro..."
            value={formCarro.modelo}
            onChange={(e) =>
              setFormCarro({ ...formCarro, modelo: e.target.value })
            }
          />

          <InputCustom
            tipo="input"
            label="Ano"
            maxLength={4}
            placeholder="Digite o ano do carro..."
            value={formCarro.ano}
            onChange={(e) =>
              setFormCarro({ ...formCarro, ano: e.target.value })
            }
          />

          <InputCustom
            tipo="input"
            label="Cor"
            maxLength={10}
            placeholder="Digite a cor do carro..."
            value={formCarro.cor}
            onChange={(e) =>
              setFormCarro({ ...formCarro, cor: e.target.value })
            }
          />

          <InputCustom
            tipo="input"
            label="Placa"
            maxLength={8}
            placeholder="Digite a placa do carro..."
            value={formCarro.placa}
            onChange={(e) =>
              setFormCarro({ ...formCarro, placa: e.target.value })
            }
          />

          {formCarro.foto ? (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "100%",
              }}
            >
              <button
                type="button"
                onClick={() => setFormCarro({ ...formCarro, foto: "" })}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  backgroundColor: "rgba(231, 76, 60, 0.9)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                }}
              >
                X
              </button>

              <img
                src={formCarro.foto}
                alt="Foto do Carro"
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "20px",
                  padding: "10px",
                }}
              />
            </div>
          ) : (
            <BtnAddFoto
              tipo="foto"
              type="file"
              accept="image/*"
              label="Foto"
              onClick={(e) => {
                e.target.value = null;
              }}
              onChange={(e) => {
                const imagem = e.target.files[0];
                if (imagem) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const imgTemp = new Image();
                    imgTemp.onload = () => {
                      if (imgTemp.height > imgTemp.width) {
                        toast.error(
                          "Por favor, escolha uma foto na horizontal.",
                          {
                            theme: "colored",
                            hideProgressBar: true,
                            autoClose: 2000,
                          },
                        );
                        input.value = "";
                        return;
                      }
                      setFormCarro({ ...formCarro, foto: event.target.result });
                    };
                    imgTemp.src = event.target.result;
                  };
                  reader.readAsDataURL(imagem);
                }
              }}
            />
          )}
        </div>

        <div className="PaginaAdicionarCarro_btn_add">
          <BotaoCustomizado tipo="adicional" aoClicar={salvar}>
            Adicionar Carro
          </BotaoCustomizado>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaAdicionarCarro;

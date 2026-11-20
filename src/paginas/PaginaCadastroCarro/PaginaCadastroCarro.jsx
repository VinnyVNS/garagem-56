import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import Principal from "../../componentes/Principal/Principal";
import InputCustom from "../../componentes/InputCustom/InputCustom";
import BtnAddFoto from "../../componentes/BtnAddFoto/BtnAddFoto";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import { buscarCarros, salvarCarro } from "../../servicos/carros.servico";
import "./PaginaCadastroCarro.css";
import { formatarPlacaEstrita } from "../../utils/formatarPlacaEstrita";

function PaginaCadastroCarro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const emEdicao = Boolean(id);

  const [formCarro, setFormCarro] = useState({
    id: "",
    marca: "",
    modelo: "",
    ano: "",
    cor: "",
    placa: "",
    foto: "",
    estado: "emAndamento",
  });

  useEffect(() => {
    if (!id) return;

    const carrosSalvos = buscarCarros() || [];
    const carroParaEditar = carrosSalvos.find(
      (item) => String(item.id) === String(id),
    );

    if (carroParaEditar) {
      setFormCarro({
        ...carroParaEditar,
        ano: carroParaEditar.ano ? String(carroParaEditar.ano) : "",
      });
    }
  }, [id]);

  const exibirErro = (mensagem) => {
    toast.error(mensagem, {
      position: "top-center",
      theme: "colored",
      hideProgressBar: true,
      autoClose: 2000,
    });
  };

  const salvar = (evento) => {
    if (evento) evento.preventDefault();

    if (!formCarro.marca.trim()) {
      exibirErro("Por favor, digite a marca do carro!");
      return;
    }

    if (!formCarro.modelo.trim()) {
      exibirErro("Por favor, digite o modelo do carro!");
      return;
    }

    try {
      salvarCarro({
        ...formCarro,
        marca: formCarro.marca.trim(),
        modelo: formCarro.modelo.trim(),
        ano: String(formCarro.ano).trim(),
        cor: formCarro.cor.trim(),
        placa: formCarro.placa.trim().toUpperCase(),
      });

      toast.success(
        emEdicao
          ? "Carro atualizado com sucesso!"
          : "Carro adicionado com sucesso!",
        {
          position: "top-center",
          theme: "colored",
          hideProgressBar: true,
          autoClose: 2000,
        },
      );

      navigate("/lista-carros");
    } catch {
      exibirErro("Espaço cheio no navegador. Tente uma foto menor.");
    }
  };

  const lidarComUploadFoto = (evento) => {
    const imagem = evento.target.files?.[0];
    if (!imagem) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgTemp = new Image();
      imgTemp.onload = () => {
        if (imgTemp.height > imgTemp.width) {
          exibirErro("Por favor, escolha uma foto na horizontal.");
          return;
        }

        // Redimensiona e comprime para não estourar o limite de 5MB do localStorage
        const larguraMax = 800;
        const escala = Math.min(1, larguraMax / imgTemp.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(imgTemp.width * escala);
        canvas.height = Math.round(imgTemp.height * escala);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgTemp, 0, 0, canvas.width, canvas.height);

        const fotoComprimida = canvas.toDataURL("image/jpeg", 0.75);

        setFormCarro((anterior) => ({
          ...anterior,
          foto: fotoComprimida,
        }));
      };
      imgTemp.src = event.target.result;
    };
    reader.readAsDataURL(imagem);
  };

  return (
    <Principal>
      <form className="PaginaCadastroCarro_root" onSubmit={salvar} noValidate>
        <div className="PaginaCadastroCarro_campo">
          <InputCustom
            type="text"
            label="Marca *"
            maxLength={20}
            placeholder="Digite a marca do carro..."
            value={formCarro.marca}
            onChange={(e) =>
              setFormCarro({ ...formCarro, marca: e.target.value })
            }
          />

          <InputCustom
            type="text"
            label="Modelo *"
            maxLength={20}
            placeholder="Digite o modelo do carro..."
            value={formCarro.modelo}
            onChange={(e) =>
              setFormCarro({ ...formCarro, modelo: e.target.value })
            }
          />

          <div className="linha_dupla">
            <InputCustom
              type="text"
              inputMode="numeric"
              label="Ano"
              maxLength={4}
              placeholder="Ex: 2024"
              value={formCarro.ano}
              onChange={(e) =>
                setFormCarro({
                  ...formCarro,
                  ano: e.target.value.replace(/\D/g, ""),
                })
              }
            />

            <InputCustom
              type="text"
              label="Cor"
              maxLength={15}
              placeholder="Ex: Preto"
              value={formCarro.cor}
              onChange={(e) =>
                setFormCarro({ ...formCarro, cor: e.target.value })
              }
            />
          </div>

          <InputCustom
            type="text"
            label="Placa"
            maxLength={8}
            placeholder="Ex: ABC-1234"
            value={formCarro.placa}
            onChange={(e) =>
              setFormCarro({
                ...formCarro,
                placa: formatarPlacaEstrita(e.target.value),
              })
            }
          />

          {formCarro.foto ? (
            <div className="foto_preview_container">
              <button
                type="button"
                className="btn_remover_foto"
                aria-label="Remover foto"
                onClick={() => setFormCarro({ ...formCarro, foto: "" })}
              >
                <IoClose className="icone_fechar" aria-hidden="true" />
              </button>

              <img
                src={formCarro.foto}
                alt="Foto do carro"
                className="foto_preview"
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
              onChange={lidarComUploadFoto}
            />
          )}
        </div>

        <div className="PaginaCadastroCarro_btn_add">
          <BotaoCustomizado type="submit" tipo="salvar">
            {emEdicao ? "Salvar Alterações" : "Salvar Carro"}
          </BotaoCustomizado>
        </div>
      </form>
    </Principal>
  );
}

export default PaginaCadastroCarro;

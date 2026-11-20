import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import "./SelectCustom.css";

const OPCOES = [
  { value: "pronto", label: "Pronto" },
  { value: "emAndamento", label: "Em Andamento" },
  { value: "foraDeServico", label: "Fora de Serviço" },
];

function SelectCustom({ value, tipo, onChange, onClick }) {
  const [aberto, setAberto] = useState(false);
  const raizRef = useRef(null);

  const valorAtual = value || tipo || "emAndamento";
  const opcaoAtiva =
    OPCOES.find((opcao) => opcao.value === valorAtual) || OPCOES[1];

  useEffect(() => {
    if (!aberto) return;

    const aoClicarFora = (evento) => {
      if (raizRef.current && !raizRef.current.contains(evento.target)) {
        setAberto(false);
      }
    };

    const aoApertarEsc = (evento) => {
      if (evento.key === "Escape") {
        setAberto(false);
      }
    };

    document.addEventListener("pointerdown", aoClicarFora);
    document.addEventListener("keydown", aoApertarEsc);

    return () => {
      document.removeEventListener("pointerdown", aoClicarFora);
      document.removeEventListener("keydown", aoApertarEsc);
    };
  }, [aberto]);

  const alternarMenu = (evento) => {
    evento.stopPropagation();
    if (onClick) onClick(evento);
    setAberto((estadoAnterior) => !estadoAnterior);
  };

  const escolherOpcao = (evento, novoValor) => {
    evento.stopPropagation();
    setAberto(false);

    if (onChange && novoValor !== valorAtual) {
      onChange({ target: { value: novoValor } });
    }
  };

  return (
    <div
      ref={raizRef}
      className={`SelectCustom_root ${valorAtual} ${aberto ? "aberto" : ""}`}
      onClick={alternarMenu}
      role="button"
      tabIndex={0}
      aria-expanded={aberto}
      onKeyDown={(evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          alternarMenu(evento);
        }
      }}
    >
      <div className="SelectCustom_gatilho">
        <span className="SelectCustom_ponto" aria-hidden="true" />
        <span className="SelectCustom_label">{opcaoAtiva.label}</span>
        <IoIosArrowDown
          className={`SelectCustom_seta ${aberto ? "girada" : ""}`}
          aria-hidden="true"
        />
      </div>

      {aberto && (
        <div
          className="SelectCustom_menu"
          role="listbox"
          onClick={(evento) => evento.stopPropagation()}
        >
          {OPCOES.map((opcao) => {
            const selecionada = opcao.value === valorAtual;

            return (
              <button
                key={opcao.value}
                type="button"
                role="option"
                aria-selected={selecionada}
                className={`SelectCustom_item ${opcao.value} ${
                  selecionada ? "selecionada" : ""
                }`}
                onClick={(evento) => escolherOpcao(evento, opcao.value)}
              >
                <span className="SelectCustom_item_esq">
                  <span className="SelectCustom_ponto" aria-hidden="true" />
                  <span>{opcao.label}</span>
                </span>

                {selecionada && (
                  <FiCheck className="SelectCustom_check" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectCustom;
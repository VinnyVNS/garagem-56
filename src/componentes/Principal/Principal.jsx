import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cabecalho from "../Cabecalho/Cabecalho";
import Rodape from "../Rodape/Rodape";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./Principal.css";

const ABAS_NAVEGACAO = ["/", "/lista-carros", "/perfil"];
const DISTANCIA_MINIMA_SWIPE = 60;

function Principal(props) {
  const mostrarNavegacao = props.mostrarNavegacao ?? true;
  const location = useLocation();
  const navigate = useNavigate();

  const toqueInicial = useRef({ x: 0, y: 0 });
  const direcao = location.state?.direcao;

  const lidarComToqueInicio = (e) => {
    if (!mostrarNavegacao) return;
    const toque = e.touches[0];
    toqueInicial.current = { x: toque.clientX, y: toque.clientY };
  };

  const lidarComToqueFim = (e) => {
    if (!mostrarNavegacao) return;

    const indiceAtual = ABAS_NAVEGACAO.indexOf(location.pathname);
    if (indiceAtual === -1) return;

    const toque = e.changedTouches[0];
    const deltaX = toque.clientX - toqueInicial.current.x;
    const deltaY = toque.clientY - toqueInicial.current.y;

    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (Math.abs(deltaX) < DISTANCIA_MINIMA_SWIPE) return;

    if (deltaX < 0 && indiceAtual < ABAS_NAVEGACAO.length - 1) {
      navigate(ABAS_NAVEGACAO[indiceAtual + 1], {
        state: { direcao: "avancar" },
      });
    } else if (deltaX > 0 && indiceAtual > 0) {
      navigate(ABAS_NAVEGACAO[indiceAtual - 1], {
        state: { direcao: "voltar" },
      });
    }
  };

  const classeTransicao =
    direcao === "avancar"
      ? "transicao_avancar"
      : direcao === "voltar"
        ? "transicao_voltar"
        : "transicao_fade";

  return (
    <>
      <ScrollToTop />
      {mostrarNavegacao && <Cabecalho />}
      <main
        key={location.pathname}
        className={`Principal_root ${!mostrarNavegacao ? "sem_navegacao" : ""} ${classeTransicao}`}
        onTouchStart={lidarComToqueInicio}
        onTouchEnd={lidarComToqueFim}
      >
        {props.children}
      </main>
      {mostrarNavegacao && <Rodape />}
    </>
  );
}

export default Principal;
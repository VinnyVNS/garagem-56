import "./BotaoCustomizado.css";

function BotaoCustomizado({
  tipo = "salvar",
  aoClicar,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const classes = ["BotaoCustomizado_root"];

  if (tipo === "salvar") {
    classes.push("BotaoCustomizado_salvar");
  } else if (tipo === "entrar") {
    classes.push("BotaoCustomizado_entrar");
  } else if (tipo === "cadastrar") {
    classes.push("BotaoCustomizado_cadastrar");
  }

  if (className) {
    classes.push(className);
  }

  const lidarComClique = (evento) => {
    if (aoClicar) aoClicar(evento);
    if (onClick) onClick(evento);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes.join(" ")}
      onClick={lidarComClique}
      {...props}
    >
      {children}
    </button>
  );
}

export default BotaoCustomizado;
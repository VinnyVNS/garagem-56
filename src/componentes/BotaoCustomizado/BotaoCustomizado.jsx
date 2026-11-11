import "./BotaoCustomizado.css";

function BotaoCustomizado(props) {
  const classe = ["BotaoCustomizado_root"];

  if (props.tipo === "adicional") {
    classe.push("BotaoCustomizado_adicional");
  }

  return (
    <>
      <button className={classe.join(" ")} onClick={props.aoClicar}>{props.children}</button>
    </>
  );
}

export default BotaoCustomizado;

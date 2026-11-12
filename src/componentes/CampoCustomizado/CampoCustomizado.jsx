import "./CampoCustomizado.css";

function CampoCustomizado(props) {
  const classe = [""]

  if(props.tipo === "input") {
    classe.push("CampoCustomizado_input");
  }

  if(props.tipo === "foto") {
    classe.push("CampoCustomizado_foto");
  }
  return (
    <div className="CampoCustomizado_root">
      <span className="CampoCustomizado_label">{props.label}</span>
      <input {...props} className={classe.join(" ")} />
    </div>
  );
}

export default CampoCustomizado;

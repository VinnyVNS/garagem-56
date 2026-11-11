import "./CampoCustomizado.css";

function CampoCustomizado(props) {
  return (
    <div className="CampoCustomizado_root">
      <span className="CampoCustomizado_label">{props.label}</span>
      <input {...props} className="CampoCustomizado_input" />
    </div>
  );
}

export default CampoCustomizado;

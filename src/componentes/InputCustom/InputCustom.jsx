import { useId } from "react";
import "./InputCustom.css";

function InputCustom({ label, id, tema = "claro", className = "", ...props }) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={`InputCustom_root ${tema} ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input id={inputId} className="input" {...props} autoComplete={props.autoComplete || "off"} />
    </div>
  );
}

export default InputCustom;
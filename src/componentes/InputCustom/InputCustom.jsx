import { useId } from "react";
import "./InputCustom.css";

function InputCustom({ label, id, className = "", ...props }) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className={`InputCustom_root ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}
      <input id={inputId} className="input" {...props} />
    </div>
  );
}

export default InputCustom;
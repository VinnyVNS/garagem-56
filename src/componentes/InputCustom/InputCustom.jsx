import "./InputCustom.css";

function InputCustom(props) {
  return (
    <>
      <div className="InputCustom_root">
        <label htmlFor="marca" className="label">
          {props.label}
        </label>
        <input className="input" {...props} />
      </div>
    </>
  );
}

export default InputCustom;

import { useNavigate } from "react-router-dom";
import "./BotaoVoltar.css";
import { IoArrowBack } from "react-icons/io5";

function BotaoVoltar() {
  const navigate = useNavigate();

  return (
    <div className="BotaoVoltar_root" onClick={() => navigate(-1)}>
      <IoArrowBack className="BotaoVoltar_logo" />
    </div>
  );
}

export default BotaoVoltar;

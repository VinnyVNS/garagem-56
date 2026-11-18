import './SelectCustom.css';

function SelectCustom(props) {
    const classe = ["SelectCustom_root"];

    if (props.tipo === "pronto") {
        classe.push("pronto")
    }
    else if (props.tipo === "emAndamento") {
        classe.push("emAndamento")
    }
    else if (props.tipo === "foraDeServico") {
        classe.push("foraDeServico")
    }
    return <select className={classe.join(" ")} {...props}>
        <option value="pronto" className="prontoDentro">Pronto</option>
        <option value="emAndamento" className="emAndamentoDentro">Em Andamento</option>
        <option value="foraDeServico" className="foraDeServicoDentro">Fora de Serviço</option>
    </select>
}

export default SelectCustom;
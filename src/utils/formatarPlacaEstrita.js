export const formatarPlacaEstrita = (valor) => {
  const limpo = valor.toUpperCase().replace(/[^A-Z0-9]/g, "");
  let resultado = "";

  for (let i = 0; i < limpo.length && resultado.length < 7; i++) {
    const char = limpo[i];
    const pos = resultado.length;

    if (pos < 3) {
      // 3 primeiros: apenas letras
      if (/[A-Z]/.test(char)) resultado += char;
    } else if (pos === 3 || pos === 5 || pos === 6) {
      // 4º, 6º e 7º: apenas números
      if (/[0-9]/.test(char)) resultado += char;
    } else if (pos === 4) {
      // 5º caractere: número (antiga) ou letra (Mercosul)
      if (/[A-Z0-9]/.test(char)) resultado += char;
    }
  }

  if (resultado.length > 3) {
    return `${resultado.slice(0, 3)}-${resultado.slice(3)}`;
  }

  return resultado;
};
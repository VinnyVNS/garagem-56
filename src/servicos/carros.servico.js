import { buscarLocalStorage, salvarLocalStorage } from "./localstorage.servico";

export const salvarCarro = (carro) => {
  const carros = buscarLocalStorage("carros") || [];

  if (!carro.id) {
    carro.id = Date.now();
    carros.push(carro);
  } else {
    const index = carros.findIndex((c) => c.id === carro.id);
    carros[index] = carro;
  }

  salvarLocalStorage("carros", carros);
};

export const buscarCarros = () => {
  return buscarLocalStorage("carros") || [];
};

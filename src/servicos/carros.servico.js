import { buscarLocalStorage, salvarLocalStorage } from "./localstorage.servico";
import { buscarUsuarioLogado } from "./usuarios.servico";

export const salvarCarro = (carro) => {
  const usuarioLogado = buscarUsuarioLogado();
  if (!usuarioLogado) return;

  const carros = buscarLocalStorage("carros") || [];

  if (!carro.id) {
    carro.id = Date.now();
    carro.usuarioId = usuarioLogado.id;
    carros.push(carro);
  } else {
    const index = carros.findIndex(
      (c) =>
        String(c.id) === String(carro.id) &&
        String(c.usuarioId) === String(usuarioLogado.id)
    );

    // Só atualiza se o carro existir E pertencer ao usuário logado
    if (index !== -1) {
      carros[index] = {
        ...carro,
        usuarioId: usuarioLogado.id,
      };
    }
  }

  salvarLocalStorage("carros", carros);
};

export const buscarCarros = () => {
  const usuarioLogado = buscarUsuarioLogado();
  if (!usuarioLogado) return [];

  const carros = buscarLocalStorage("carros") || [];
  return carros.filter((c) => String(c.usuarioId) === String(usuarioLogado.id));
};

export const excluirCarro = (id) => {
  const usuarioLogado = buscarUsuarioLogado();
  if (!usuarioLogado) return;

  const carros = buscarLocalStorage("carros") || [];
  const carrosAtualizados = carros.filter(
    (c) =>
      !(
        String(c.id) === String(id) &&
        String(c.usuarioId) === String(usuarioLogado.id)
      )
  );

  salvarLocalStorage("carros", carrosAtualizados);
};
import { buscarLocalStorage, salvarLocalStorage } from "./localstorage.servico";

const CHAVE_USUARIOS = "usuarios";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";

export const buscarUsuarios = () => {
  return buscarLocalStorage(CHAVE_USUARIOS) || [];
};

export const salvarUsuario = (usuario) => {
  const usuarios = buscarUsuarios();

  const emailFormatado = usuario.email.trim().toLowerCase();

  // Verifica se já existe outro usuário com o mesmo e-mail
  const emailJaExiste = usuarios.some(
    (u) => u.email.toLowerCase() === emailFormatado && u.id !== usuario.id,
  );

  if (emailJaExiste) {
    throw new Error("Este e-mail já está cadastrado!");
  }

  const usuarioFormatado = {
    ...usuario,
    email: emailFormatado,
    nome: usuario.nome.trim(),
  };

  if (!usuarioFormatado.id) {
    usuarioFormatado.id = Date.now();
    usuarios.push(usuarioFormatado);
  } else {
    const index = usuarios.findIndex((u) => u.id === usuarioFormatado.id);
    if (index !== -1) {
      usuarios[index] = usuarioFormatado;
    }
  }

  salvarLocalStorage(CHAVE_USUARIOS, usuarios);
  return usuarioFormatado;
};

export const autenticarUsuario = (email, senha) => {
  const usuarios = buscarUsuarios();
  const emailFormatado = email.trim().toLowerCase();

  const usuarioEncontrado = usuarios.find(
    (u) => u.email.toLowerCase() === emailFormatado && u.senha === senha,
  );

  if (!usuarioEncontrado) {
    return null;
  }

  // Salva a sessão sem expor a senha na chave de usuário logado
  const { senha: _, ...dadosSessao } = usuarioEncontrado;
  salvarLocalStorage(CHAVE_USUARIO_LOGADO, dadosSessao);

  return dadosSessao;
};

export const buscarUsuarioLogado = () => {
  return buscarLocalStorage(CHAVE_USUARIO_LOGADO);
};

export const entrarComoVisitante = () => {
  const visitante = {
    id: "visitante",
    nome: "Visitante",
    email: "visitante@garagem56.com",
    visitante: true,
  };

  salvarLocalStorage("usuarioLogado", visitante);
  return visitante;
};

export const sairDaConta = () => {
  localStorage.removeItem(CHAVE_USUARIO_LOGADO);
};

export const excluirUsuario = (idUsuario) => {
  // 1. Remove o usuário da lista de contas
  const usuarios = buscarLocalStorage("usuarios") || [];
  const usuariosAtualizados = usuarios.filter(
    (u) => String(u.id) !== String(idUsuario)
  );
  salvarLocalStorage("usuarios", usuariosAtualizados);

  // 2. Remove os carros pertencentes a esse usuário
  const todosCarros = buscarLocalStorage("carros") || [];
  const carrosAtualizados = todosCarros.filter(
    (c) => String(c.usuarioId) !== String(idUsuario)
  );
  salvarLocalStorage("carros", carrosAtualizados);

  // 3. Encerra a sessão atual
  sairDaConta();
};

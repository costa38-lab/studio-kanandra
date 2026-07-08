// ------------------------------------------------------------------
// Persistência dos dados do estúdio.
//
// Esta versão usa localStorage: os dados ficam salvos no navegador
// de quem está usando o site (cada aparelho tem seu próprio "banco").
// Isso é o suficiente para começar a usar rapidamente, mas quer dizer
// que os agendamentos feitos no celular de uma cliente não aparecem
// automaticamente no computador do estúdio.
//
// Se no futuro você quiser que todos vejam os mesmos dados em tempo
// real (recomendado assim que o negócio crescer), essa é a única
// peça que precisa ser trocada por um banco de dados real
// (ex: Supabase, Firebase, ou uma API própria).
// ------------------------------------------------------------------

const PREFIX = "estudio:";

export async function safeGet(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao carregar", key, e);
    return fallback;
  }
}

export async function safeSet(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error("Erro ao salvar", key, e);
  }
}

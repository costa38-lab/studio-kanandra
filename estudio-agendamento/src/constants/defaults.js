// ------------------------------------------------------------------
// Ajuste aqui os serviços e horários iniciais do seu estúdio.
// Depois de publicado, isso também pode ser editado pela própria
// tela de administração (aba "Estúdio").
// ------------------------------------------------------------------

export const DEFAULT_SERVICES = [
  { id: "s1", name: "Alongamento de cílios (fio a fio)", category: "cilios", duration: 120, price: 180 },
  { id: "s2", name: "Manutenção de cílios", category: "cilios", duration: 60, price: 90 },
  { id: "s3", name: "Unha em gel", category: "unha", duration: 90, price: 120 },
  { id: "s4", name: "Esmaltação tradicional", category: "unha", duration: 45, price: 50 },
  { id: "s5", name: "Pé + mão (esmaltação)", category: "unha", duration: 75, price: 70 },
];

export const DEFAULT_HOURS = {
  dom: { closed: true, open: "09:00", close: "18:00" },
  seg: { closed: true, open: "09:00", close: "18:00" },
  ter: { closed: false, open: "09:00", close: "19:00" },
  qua: { closed: false, open: "09:00", close: "19:00" },
  qui: { closed: false, open: "09:00", close: "19:00" },
  sex: { closed: false, open: "09:00", close: "19:00" },
  sab: { closed: false, open: "09:00", close: "17:00" },
};

// Senha para acessar a área do estúdio (aba "Estúdio").
// IMPORTANTE: troque isso antes de publicar o site!
export const ADMIN_PASSCODE = "1234";

// Intervalo (em minutos) entre um horário disponível e outro.
export const SLOT_STEP = 30;

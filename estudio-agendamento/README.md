# Estúdio Cílios & Unhas · Agendamento

App de agendamento online, com área do cliente (agenda em 5 passos) e área do
estúdio (gestão de agendamentos, serviços, horários e dias bloqueados).

## Estrutura de pastas

```
estudio-agendamento/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # ponto de entrada
    ├── App.jsx                 # estado global e persistência
    ├── constants/
    │   ├── colors.js           # cores do tema
    │   ├── week.js             # dias da semana
    │   └── defaults.js         # ★ serviços, horários e senha padrão
    ├── utils/
    │   ├── datetime.js         # formatação de datas/preços
    │   ├── availability.js     # cálculo de horários livres
    │   └── storage.js          # persistência (localStorage)
    ├── styles/
    │   └── global.css          # todo o CSS do app
    └── components/
        ├── Header.jsx
        ├── client/
        │   └── ClientBooking.jsx   # fluxo de agendamento do cliente
        └── admin/
            ├── AdminArea.jsx       # tela de senha
            ├── AdminPanel.jsx      # abas da área do estúdio
            ├── AgendaTab.jsx
            ├── ServicosTab.jsx
            ├── HorariosTab.jsx
            └── BloqueiosTab.jsx
```

## Ajustes que você provavelmente vai querer fazer

Praticamente tudo que você precisa mexer está em **`src/constants/defaults.js`**:

- `DEFAULT_SERVICES`: lista inicial de serviços (nome, categoria, duração, preço).
- `DEFAULT_HOURS`: horário de funcionamento por dia da semana.
- `ADMIN_PASSCODE`: senha da área do estúdio — **troque antes de publicar!**
- `SLOT_STEP`: intervalo entre horários disponíveis (em minutos).

Nome do estúdio e textos do cabeçalho: `src/components/Header.jsx`.

Cores do tema: `src/constants/colors.js`.

> Obs: depois que o site estiver publicado, serviços/horários/dias bloqueados
> também podem ser editados direto pela aba "Estúdio" (usando a senha), sem
> precisar mexer no código.

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) instalado (versão 18 ou mais recente).

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Publicando (hospedagem)

Este é um site estático — qualquer serviço de hospedagem estática funciona.
O caminho mais simples é o **Vercel** ou o **Netlify**:

1. Suba esta pasta para um repositório no GitHub.
2. Crie uma conta em [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com) e conecte o repositório.
3. Configuração do build (ambos detectam automaticamente por ser Vite, mas caso peçam):
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Pronto — você recebe um link público (ex: `seuestudio.vercel.app`), e pode
   depois configurar um domínio próprio.

Alternativa sem GitHub: rode `npm run build` localmente, o resultado fica na
pasta `dist/`, que pode ser arrastada direto para [app.netlify.com/drop](https://app.netlify.com/drop).

## ⚠️ Importante sobre os dados (leia antes de usar de verdade)

Este app guarda os dados (agendamentos, serviços, horários) no
**localStorage do navegador** — ou seja, cada aparelho/navegador tem sua
própria "cópia" dos dados.

Na prática isso significa:
- Um agendamento feito por uma cliente no celular dela **não aparece**
  automaticamente no computador do estúdio.
- Se a cliente limpar os dados do navegador, o histórico dela (não os
  agendamentos que ela criou, que ficam salvos no dispositivo dela) some.

Isso é ótimo para testar e começar rápido, mas **para o estúdio de fato
visualizar em um único lugar todos os agendamentos feitos pelas clientes**,
o próximo passo é trocar `src/utils/storage.js` por um banco de dados real
compartilhado (ex: Supabase, Firebase, ou uma API própria). Se quiser, posso
te ajudar a fazer essa migração depois — é uma mudança isolada, sem precisar
mexer no resto do app.

// ===== Dados dos pets =====
const catalogo = {
  calopsitas: {
    titulo: "CALOPSITAS",
    fundo: "/img/fundo-calopsita.png",
    avaliacao: "/img/calopsita-avaliacao.png",
    pets: [
      {
        id: 1,
        nome: "Raven",
        nascimento: "03/2024",
        img: "/img/raven.png",
        desc: "Pequena no tamanho, mas enorme no coração, essa calopsita sonha com um lar para chamar de seu. Ela merece uma família que enxergue todo o encanto que existe nela e esteja disposta a oferecer amor, paciência e muitos cuidados.",
      },
      {
        id: 2,
        nome: "Flash",
        nascimento: "06/2025",
        img: "/img/flash.png",
        desc: "Flash ama passear pela tarde, é ótimo companheiro para ouvir músicas, ama plantas e canta muito! Ele é um pet super dócil que apenas quer uma família nova para ser amado.",
      },
      {
        id: 3,
        nome: "Fantoche",
        nascimento: "01/2025",
        img: "/img/fantoche.png",
        desc: "Chegou a hora desse pequeno encontrar seu lugar no mundo. Com seu jeitinho especial, ele tem muito amor para receber e também para oferecer. Ama andar de skate!",
      },
    ],
  },

  coelhos: {
    titulo: "COELHOS",
    fundo: "/img/fundo-coelho.png",
    avaliacao: "/img/coelho-avaliacao.png",
    pets: [
      {
        id: 4,
        nome: "Pompom",
        nascimento: "00/0000",
        img: "/img/pompom.png",
        desc: "Texto do Pompom.",
      },
      {
        id: 5,
        nome: "Bolinho e Beijinho",
        nascimento: "00/0000",
        img: "/img/bolinho.png",
        desc: "Texto de Bolinho e Beijinho.",
      },
      {
        id: 6,
        nome: "Pulinho",
        nascimento: "00/0000",
        img: "/img/pulinho.png",
        desc: "Texto do Pulinho.",
      },
    ],
  },

  caes: {
    titulo: "CÃES",
    fundo: "/img/fundo-caes.png",
    avaliacao: "/img/cachorro-avaliacao.png",
    pets: [
      {
        id: 9,
        nome: "Rex",
        nascimento: "05/2024",
        img: "/img/imagem-de-exemplo.png",
        desc: "Rex é um cão muito carinhoso e procura uma família que possa oferecer amor e cuidados.",
      },
      {
        id: 10,
        nome: "Thor",
        nascimento: "08/2023",
        img: "/img/imagem-de-exemplo.png",
        desc: "Thor é brincalhão, companheiro e está esperando por uma família para chamar de sua.",
      },
    ],
  },

  gatos: {
    titulo: "GATOS",
    fundo: "/img/fundo-gato.png",
    avaliacao: "/img/gato-avaliacao.png",
    pets: [
      {
        id: 8,
        nome: "Barto",
        nascimento: "00/0000",
        img: "/img/imagem-de-exemplo.png",
        desc: "Barto é um gato carinhoso que procura um lar cheio de amor.",
      },
      {
        id: 11,
        nome: "Mimi",
        nascimento: "04/2024",
        img: "/img/imagem-de-exemplo.png",
        desc: "Mimi é uma gata tranquila e carinhosa que está esperando por uma família.",
      },
      {
        id: 12,
        nome: "Nino",
        nascimento: "09/2023",
        img: "/img/imagem-de-exemplo.png",
        desc: "Nino é curioso, brincalhão e adora receber carinho.",
      },
    ],
  },
};

// ===== Elementos da página =====
const elTitulo = document.getElementById("titulo");
const elLista = document.getElementById("lista");
const elVerMais = document.getElementById("verMais");
const elAvaliacaoPet = document.getElementById("avaliacaoPet");

const POR_PAGINA = 3;
let categoriaAtual = "calopsitas";
let mostrados = POR_PAGINA;

// ===== HTML de cada pet =====
const iconeCalendario = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3"/>
    <path d="M3 10h18M8 3v4M16 3v4"/>
  </svg>`;

const cardPet = (p) => `
  <article class="pet-linha">
    <img class="foto" src="${p.img}" alt="${p.nome}">
    <div class="info">
      <h2>${p.nome}</h2>
      <span class="tag">${iconeCalendario}Nascimento: ${p.nascimento}</span>
      <p>${p.desc}</p>
      <a class="btn" href="pet.html?id=${p.id}">Conhecer mais</a>
    </div>
  </article>`;

// ===== Desenha a categoria atual =====
function render() {
  const dados = catalogo[categoriaAtual];

  document.title = `${dados.titulo} | Adote com Amor`;
  document.body.style.setProperty("--fundo", `url("${dados.fundo}")`);

  if (elAvaliacaoPet) {
    elAvaliacaoPet.src = dados.avaliacao;
    elAvaliacaoPet.alt = dados.titulo.toLowerCase();
  }

  if (!elTitulo || !elLista) return;

  elTitulo.textContent = dados.titulo;
  elLista.innerHTML =
    dados.pets.slice(0, mostrados).map(cardPet).join("") ||
    "<p>Ainda não temos pets desse tipo. Volte em breve!</p>";

  if (elVerMais)
    elVerMais.parentElement.hidden = mostrados >= dados.pets.length;
}

function escolher(tipo) {
  categoriaAtual = tipo;
  mostrados = POR_PAGINA;
  history.replaceState({}, "", `?tipo=${tipo}#adote`);
  render();
}

// ===== Eventos =====
document.querySelectorAll("[data-categoria]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    escolher(link.dataset.categoria);
    document.getElementById("adote")?.scrollIntoView();
  });
});

elVerMais?.addEventListener("click", () => {
  mostrados += POR_PAGINA;
  render();
});

// ===== Início: lê ?tipo= da URL =====
const tipoUrl = new URLSearchParams(location.search).get("tipo");
if (catalogo[tipoUrl]) categoriaAtual = tipoUrl;
render();

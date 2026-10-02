// ==================================================
// ELEMENTOS DO HTML
// ==================================================

const elTitulo = document.getElementById("titulo");
const elLista = document.getElementById("lista");
const elVerMais = document.getElementById("verMais");
const elAvaliacaoPet = document.getElementById("avaliacaoPet");
const elAvaliacoesGrid = document.getElementById("avaliacoesGrid");

// ==================================================
// CONFIGURAÇÕES
// ==================================================

const POR_PAGINA = 3;

let categoriaAtual = "calopsitas";
let mostrados = POR_PAGINA;

// ==================================================
// ÍCONE DO CALENDÁRIO
// ==================================================

const iconeCalendario = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
    ></rect>

    <path d="M3 10h18M8 3v4M16 3v4"></path>
  </svg>
`;

// ==================================================
// CRIA O CARD DO PET
// ==================================================

function cardPet(p) {
  return `
    <article class="pet-linha">

      <img
        class="foto"
        src="${p.img}"
        alt="${p.nome}"
      >

      <div class="info">

        <h2>${p.nome}</h2>

        <div class="tags">

          <span class="tag tag-nascimento">
            ${iconeCalendario}
            Nascimento: ${p.nascimento}
          </span>

          <span class="tag tag-cor">
            <span class="icone-info">!</span>
            Cor: ${p.cor}
          </span>

          <span class="tag tag-genero ${p.sexo === "Macho" ? "macho" : "femea"}">
            <span class="icone-genero">
              ${p.sexo === "Macho" ? "♂" : "♀"}
            </span>
            Gênero: ${p.sexo}
          </span>

        </div>

        <p>
          ${p.desc}
        </p>

        <a
          class="btn"
          href="/PaginaPet/PaginaPet.html?id=${p.id}"
        >
          Conhecer mais
        </a>

      </div>

    </article>
  `;
}

// ==================================================
// DESENHA AS AVALIAÇÕES
// ==================================================
function renderAvaliacoes(tipo) {
  if (!elAvaliacoesGrid) return;

  const lista = avaliacoes[tipo];

  if (!lista) {
    elAvaliacoesGrid.innerHTML = "";
    return;
  }

  const aleatorias = [...lista].sort(() => Math.random() - 0.5).slice(0, 4);

  elAvaliacoesGrid.innerHTML = aleatorias
    .map(
      (avaliacao) => `
        <article class="avaliacao">

          <header>
            <img
              src="${avaliacao.foto}"
              alt="Foto de perfil de ${avaliacao.nome}"
            >

            <strong>
              @${avaliacao.nome.toLowerCase()}
            </strong>
          </header>

          <p>
            "${avaliacao.mensagem}"
          </p>

<div class="avaliacao-patas">
  ${Array.from(
    { length: avaliacao.estrelas },
    () => `
    <img src="/img/paw.png" alt="">
  `,
  ).join("")}
</div>

        </article>
      `,
    )
    .join("");
}

// ==================================================
// DESENHA A CATEGORIA ATUAL
// ==================================================

function render() {
  const dados = catalogo[categoriaAtual];

  if (!dados) return;

  // ==================================================
  // TÍTULO DA PÁGINA
  // ==================================================

  document.title = `${dados.titulo} | Adote com Amor`;

  // ==================================================
  // FUNDO DA CATEGORIA
  // ==================================================

  document.body.style.setProperty("--fundo", `url("${dados.fundo}")`);

  // ==================================================
  // IMAGEM DAS AVALIAÇÕES
  // ==================================================

  if (elAvaliacaoPet) {
    elAvaliacaoPet.src = dados.avaliacao;

    elAvaliacaoPet.alt = `Imagem de ${dados.titulo.toLowerCase()}`;
  }

  // ==================================================
  // AVALIAÇÕES
  // ==================================================

  renderAvaliacoes(categoriaAtual);

  // ==================================================
  // TÍTULO DA CATEGORIA
  // ==================================================

  if (elTitulo) {
    elTitulo.textContent = dados.titulo;
  }

  // ==================================================
  // LISTA DE PETS
  // ==================================================

  if (elLista) {
    const petsVisiveis = dados.pets.slice(0, mostrados);

    elLista.innerHTML = petsVisiveis.map(cardPet).join("");

    // Caso não existam pets

    if (petsVisiveis.length === 0) {
      elLista.innerHTML = `
        <p>
          Ainda não temos pets desse tipo.
          Volte em breve!
        </p>
      `;
    }
  }

  // ==================================================
  // BOTÃO VER MAIS
  // ==================================================

  if (elVerMais) {
    if (mostrados >= dados.pets.length) {
      elVerMais.parentElement.hidden = true;
    } else {
      elVerMais.parentElement.hidden = false;
    }
  }
}

// ==================================================
// ESCOLHER CATEGORIA
// ==================================================

function escolher(tipo) {
  if (!catalogo[tipo]) return;

  categoriaAtual = tipo;

  mostrados = POR_PAGINA;

  // Atualiza a URL

  history.replaceState({}, "", `?tipo=${tipo}#adote`);

  render();
}

// ==================================================
// EVENTOS DOS BOTÕES DE CATEGORIA
// ==================================================

document.querySelectorAll("[data-categoria]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    escolher(link.dataset.categoria);

    document.getElementById("adote")?.scrollIntoView();
  });
});

// ==================================================
// BOTÃO VER MAIS
// ==================================================

elVerMais?.addEventListener("click", () => {
  mostrados += POR_PAGINA;

  render();
});

// ==================================================
// LER CATEGORIA DA URL
// ==================================================

const tipoUrl = new URLSearchParams(location.search).get("tipo");

if (catalogo[tipoUrl]) {
  categoriaAtual = tipoUrl;
}

// ==================================================
// INICIA A PÁGINA
// ==================================================

render();

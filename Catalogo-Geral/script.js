const elTitulo = document.getElementById("titulo");
const elLista = document.getElementById("lista");
const elVerMais = document.getElementById("verMais");
const elAvaliacaoPet = document.getElementById("avaliacaoPet");
const elAvaliacoesGrid = document.getElementById("avaliacoesGrid");

// quantidade ate ver mais
const POR_PAGINA = 3;
//pagina iniciar
let categoriaAtual = "coelhos";
let mostrados = POR_PAGINA;


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

//gerador card pet
// HTML Escaping
function escapar(texto) {
  return String(texto ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

function cardPet(p) {
  const sexo = String(p.sexo || "");
  const classeGenero = sexo.startsWith("Macho")
    ? "macho"
    : sexo.startsWith("Fêmea")
      ? "femea"
      : "casal";
  const iconeGenero = { macho: "♂", femea: "♀", casal: "♂♀" }[classeGenero];

  const link = `/PaginaPet/PaginaPet.html?doacao=${p.id}`;

  return `
    <article class="pet-linha">

      <img
        class="foto"
        src="${escapar(p.img)}"
        alt="${escapar(p.nome)}"
      >

      <div class="info">

        <h2>${escapar(p.nome)}</h2>

        <div class="tags">

          <span class="tag tag-nascimento">
            ${iconeCalendario}
            Idade: ${escapar(p.idade)}
          </span>

          <span class="tag tag-cor">
            <span class="icone-info">!</span>
            Cor: ${escapar(p.cor)}
          </span>

          <span class="tag tag-genero ${classeGenero}">
            <span class="icone-genero">
              ${iconeGenero}
            </span>
            Gênero: ${escapar(p.sexo)}
          </span>

        </div>

        <p>
          ${escapar(p.desc)}
        </p>

        <a
          class="btn"
          href="${link}"
        >
          Conhecer mais
        </a>

      </div>

    </article>
  `;
}

//gerador avaliações
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
//gera a categoria atual com base no catalogo
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
// DOAÇÕES (SUPABASE)
// ==================================================

const ESPECIE_PARA_CATEGORIA = {
  Cachorro: "caes",
  Coelho: "coelhos",
  Gato: "gatos",
  Calopsita: "calopsitas",
};

async function carregarDoacoes() {
  try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await client
      .from("doacoes")
      .select("*")
      .eq("status", "aprovado")
      .order("criado_em", { ascending: false });

    if (error) {
      console.error("Erro ao carregar doações:", error);
      return;
    }

    // agrupa por categoria mais recente primeiro
    const porCategoria = {};

    data.forEach((d) => {
      const categoria = ESPECIE_PARA_CATEGORIA[d.especie];
      if (!categoria || !catalogo[categoria]) return;

      const resumo =
        d.historia.length > 220
          ? d.historia.slice(0, 217).trimEnd() + "..."
          : d.historia;

      (porCategoria[categoria] ||= []).push({
        id: d.id,
        nome: d.nome,
        sexo: d.sexo,
        idade: d.idade,
        cor: d.cor,
        img: d.fotos[0],
        desc: resumo,
      });
    });

    for (const categoria in porCategoria) {
      catalogo[categoria].pets = [
        ...porCategoria[categoria],
        ...catalogo[categoria].pets,
      ];
    }

    render();
  } catch (err) {
    console.error(err);
  }
}


render();
carregarDoacoes();
/* Renderiza o catálogo a partir do Supabase (tabela "doacoes") e também dos
   pets do arquivo local (window.PETS, em js/data/pets.js).
   Quem decide o que o visitante pode ver no Supabase é o RLS do banco; o código não filtra por status.
   Usa textContent (sem innerHTML) para evitar XSS. */
(() => {
  const PASTA_ICONES = "assets/img/icones/";
  const PASTA_PETS = "assets/img/pets/";
  const PASTA_AVALIACOES = "";
  const PAGINA_PET = "/PaginaPet/PaginaPet.html";
  const CHAVE_RETORNO_CATALOGO = "audote-voltar-catalogo";
  const CHAVE_SCROLL_CATALOGO = "audote-scroll-catalogo";

  /* Só a apresentação de cada categoria. Os pets vêm do Supabase e do pets.js.
     "especie" é o valor gravado na coluna doacoes.especie. */

  const CATEGORIAS = {
    caes: {
      titulo: "Cães",
      especie: "Cachorro",
      avaliacao: "img/avaliacao-caes.png",
      avaliacaoAlt: "Filhote de golden retriever deitado",
    },
    gatos: {
      titulo: "Gatos",
      especie: "Gato",
      avaliacao: "img/gato-avaliacao.png",
      avaliacaoAlt: "Gato listrado em pé",
    },
    coelhos: {
      titulo: "Coelhos",
      especie: "Coelho",
      avaliacao: "img/coelho-avaliacao.png",
      avaliacaoAlt: "Dois coelhos lado a lado",
    },
    calopsitas: {
      titulo: "Calopsitas",
      especie: "Calopsita",
      avaliacao: "img/calopsita-avaliacao.png",
      avaliacaoAlt: "Calopsita de crista amarela",
    },
  };

  /* ---------- Volta do catálogo (posição de rolagem) ---------- */
  const salvarRetornoCatalogo = () => {
    try {
      sessionStorage.setItem(
        CHAVE_RETORNO_CATALOGO,
        `${location.pathname}${location.search}${location.hash}`,
      );
      sessionStorage.setItem(
        CHAVE_SCROLL_CATALOGO,
        String(window.scrollY || 0),
      );
    } catch (erro) {
      console.warn("Não foi possível salvar a posição do catálogo:", erro);
    }
  };

  if (document.body) {
    window.addEventListener("beforeunload", salvarRetornoCatalogo);
    window.addEventListener("pagehide", salvarRetornoCatalogo);
  }

  if (
    window.location.pathname.endsWith("/adote.html") ||
    window.location.pathname.endsWith("/categoria.html")
  ) {
    salvarRetornoCatalogo();
  }

  /* ---------- Helpers de DOM ---------- */
  const criar = (tag, classe, texto) => {
    const no = document.createElement(tag);
    if (classe) no.className = classe;
    if (texto) no.textContent = texto;
    return no;
  };

  const criarTag = (classe, icone, texto) => {
    const tag = criar("span", classe);
    const img = criar("img", "tag__icone");
    img.src = `${PASTA_ICONES}${icone}.svg`;
    img.alt = "";
    tag.append(img, texto);
    return tag;
  };

  const iconeDoSexo = (sexo) => {
    if (sexo === "Macho") return "macho";
    if (sexo === "Fêmea") return "femea";
    return "info"; // casal ou não informado
  };

  const resumir = (texto, limite = 220) => {
    const t = String(texto ?? "").trim();
    return t.length > limite ? t.slice(0, limite - 3).trimEnd() + "..." : t;
  };

  /* ---------- Pets locais (window.PETS) ---------- */

  // "02/2023" -> "2 anos", "08/2026" -> "2 meses"
  const idadeDeNasc = (nasc) => {
    const m = /^(\d{2})\/(\d{4})$/.exec(nasc || "");
    if (!m) return "";
    const hoje = new Date();
    const meses = Math.max(
      0,
      (hoje.getFullYear() - Number(m[2])) * 12 +
        (hoje.getMonth() + 1 - Number(m[1])),
    );
    if (meses < 12) return meses <= 1 ? "1 mês" : `${meses} meses`;
    const anos = Math.floor(meses / 12);
    return anos === 1 ? "1 ano" : `${anos} anos`;
  };

  // Converte os pets do arquivo antigo para o mesmo formato do Supabase
  function petsLocais(especie = null) {
    const grupos = window.PETS || {};
    return Object.entries(grupos).flatMap(([chave, grupo]) => {
      const cat = CATEGORIAS[chave];
      if (!cat || (especie && cat.especie !== especie)) return [];
      return (grupo.itens || []).map((p) => ({
        id: p.id,
        nome: String(p.nome ?? "").trim() || "Pet",
        especie: cat.especie,
        idade: idadeDeNasc(p.nasc),
        sexo: p.sexo || "",
        historia: resumir(p.txt),
        foto: p.img ? PASTA_PETS + p.img : "",
        local: true,
      }));
    });
  }

  /* ---------- Supabase ---------- */
  async function pegarCliente() {
    if (typeof window.obterClienteSupabase === "function") {
      return await window.obterClienteSupabase(); // cliente do Nav.js
    }
    throw new Error(
      "obterClienteSupabase não encontrado. Confira se o Nav.js carrega antes do catalogo.js.",
    );
  }

  // Busca as doações (todas, ou só de uma espécie) e converte para o formato do catálogo.
  async function buscarDoBanco(especie = null) {
    const client = await pegarCliente();

    let consulta = client
      .from("doacoes")
      .select("id, nome, especie, idade, sexo, historia, fotos, criado_em")
      .order("criado_em", { ascending: false });

    if (especie) consulta = consulta.eq("especie", especie);

    const { data, error } = await consulta;
    if (error) throw error;

    console.log(
      `[catálogo] ${data?.length ?? 0} doação(ões) recebida(s)${especie ? ` (${especie})` : ""}`,
      data,
    );

    return (data || []).map((d) => ({
      id: d.id,
      nome: String(d.nome ?? "").trim() || "Pet",
      especie: String(d.especie ?? "").trim(),
      idade: String(d.idade ?? "").trim(),
      sexo: String(d.sexo ?? "").trim(),
      historia: resumir(d.historia),
      foto: Array.isArray(d.fotos) ? d.fotos.find(Boolean) || "" : "",
      local: false,
    }));
  }

  // Junta Supabase + pets locais. Se o Supabase falhar, os locais continuam aparecendo.
  async function buscarPets(especie = null) {
    let doBanco = [];
    try {
      doBanco = await buscarDoBanco(especie);
    } catch (erro) {
      console.error("Erro ao carregar do Supabase:", erro);
    }

    const locais = petsLocais(especie);
    console.log(`[catálogo] ${locais.length} pet(s) local(is)`);

    return [...doBanco, ...locais].filter((p) => p.foto); // sem foto não aparece no catálogo
  }

  const linkDoPet = (pet) =>
    pet.local
      ? `${PAGINA_PET}?pet=${encodeURIComponent(pet.id)}`
      : `${PAGINA_PET}?doacao=${encodeURIComponent(pet.id)}`;

  const tipo = new URLSearchParams(location.search).get("tipo");
  const lista = document.getElementById("lista-pets");
  const grade = document.getElementById("grade-pets");

  /* ---------- Página de categoria ---------- */
  if (lista) {
    const chave = CATEGORIAS[tipo] ? tipo : "caes";
    const categoria = CATEGORIAS[chave];
    const porPagina = 3;
    let petsCategoria = [];
    let petsExibidos = 0;
    const botaoVerMais = document.getElementById("ver-mais-btn");

    function renderizarCategoria() {
      lista.innerHTML = "";

      petsCategoria.slice(0, petsExibidos).forEach((pet) => {
        const artigo = criar("article", "pet");

        const foto = criar("div", "pet__foto");
        const img = criar("img");
        img.src = pet.foto;
        img.alt = `Foto de ${pet.nome}`;
        img.loading = "lazy";
        foto.append(img);

        const info = criar("div", "pet__info");
        const tags = criar("div", "pet__tags");

        if (pet.idade) {
          tags.append(
            criarTag("tag tag--laranja", "calendario", `Idade: ${pet.idade}`),
          );
        }
        if (pet.sexo) {
          tags.append(
            criarTag(
              "tag tag--sexo",
              iconeDoSexo(pet.sexo),
              `Sexo: ${pet.sexo}`,
            ),
          );
        }

        const botao = criar("a", "btn", "Conhecer mais");
        botao.href = linkDoPet(pet);

        info.append(
          criar("h3", "", pet.nome),
          tags,
          criar("p", "", pet.historia),
          botao,
        );
        artigo.append(foto, info);
        lista.append(artigo);
      });

      if (botaoVerMais) {
        const existeMais = petsExibidos < petsCategoria.length;
        botaoVerMais.hidden = !existeMais;
        botaoVerMais.disabled = !existeMais;
        botaoVerMais.setAttribute("aria-disabled", String(!existeMais));
        botaoVerMais.textContent = existeMais
          ? "Ver mais"
          : "Todos os pets exibidos";
      }
    }

    document.title = `${categoria.titulo} para adoção | Audote com Amor`;
    document.body.classList.add(`tema-${chave}`);
    document.getElementById("titulo-categoria").textContent = categoria.titulo;
    document
      .querySelector(`.categorias a[href$="tipo=${chave}"]`)
      ?.setAttribute("aria-current", "page");

    if (botaoVerMais) {
      botaoVerMais.hidden = true;
      botaoVerMais.addEventListener("click", () => {
        if (petsExibidos >= petsCategoria.length) return;
        petsExibidos = Math.min(petsExibidos + porPagina, petsCategoria.length);
        renderizarCategoria();
      });
    }

    /* Imagem decorativa das avaliações (some se o arquivo não existir) */
    const arte = document.getElementById("avaliacao-arte");
    if (arte) {
      arte.addEventListener("error", () => arte.classList.add("is-ausente"));
      arte.alt = categoria.avaliacaoAlt || "";
      arte.src = "/" + categoria.avaliacao;
    }

    lista.append(criar("p", "catalogo__aviso", "Carregando pets..."));

    buscarPets(categoria.especie)
      .then((pets) => {
        petsCategoria = pets;
        petsExibidos = Math.min(porPagina, pets.length);

        if (!pets.length) {
          lista.innerHTML = "";
          lista.append(
            criar(
              "p",
              "catalogo__aviso",
              `Ainda não temos ${categoria.titulo.toLowerCase()} para adoção no momento.`,
            ),
          );
          if (botaoVerMais) botaoVerMais.hidden = true;
          return;
        }

        renderizarCategoria();
      })
      .catch((erro) => {
        console.error("Erro ao carregar pets:", erro);
        lista.innerHTML = "";
        lista.append(
          criar(
            "p",
            "catalogo__aviso",
            "Não foi possível carregar os pets agora. Tente novamente em instantes.",
          ),
        );
      });
  }

  /* ---------- Catálogo geral ---------- */
  if (grade) {
    grade.append(criar("li", "catalogo__aviso", "Carregando pets..."));

    buscarPets()
      .then((pets) => {
        grade.innerHTML = "";

        if (!pets.length) {
          grade.append(
            criar(
              "li",
              "catalogo__aviso",
              "Ainda não temos pets para adoção no momento.",
            ),
          );
          return;
        }

        pets.forEach((pet) => {
          const item = criar("li");
          const link = criar("a", "card");
          link.href = linkDoPet(pet);

          const img = criar("img");
          img.src = pet.foto;
          img.alt = `${pet.nome}, ${pet.especie.toLowerCase()} para adoção`;
          img.loading = "lazy";

          link.append(img, criar("h3", "", pet.nome));
          item.append(link);
          grade.append(item);
        });
      })
      .catch((erro) => {
        console.error("Erro ao carregar pets:", erro);
        grade.innerHTML = "";
        grade.append(
          criar(
            "li",
            "catalogo__aviso",
            "Não foi possível carregar os pets agora. Tente novamente em instantes.",
          ),
        );
      });
  }
})();
// Página do pet: aceita ID do catálogo estático ou do Supabase.
// Endereços: PaginaPet.html?id=caes-cacau
//            PaginaPet.html?pet=caes-cacau
//            PaginaPet.html?doacao=123

(() => {
  const parametros = new URLSearchParams(window.location.search);
  const idPet =
    parametros.get("id") ?? parametros.get("pet") ?? parametros.get("doacao");

  const PASTA_PETS = "/assets/img/pets/";
  const PAGINA_PET = "/PaginaPet/PaginaPet.html";
  const CHAVE_RETORNO_CATALOGO = "audote-voltar-catalogo";
  const CHAVE_SCROLL_CATALOGO = "audote-scroll-catalogo";
  const MAX_MAIS_PETS = 12;

  let petAtual = null;

  // Recupera a página do catálogo para o botão voltar.
  function recuperarDestinoCatalogo() {
    const destino = sessionStorage.getItem(CHAVE_RETORNO_CATALOGO);

    if (destino && destino.startsWith("/")) {
      return destino;
    }

    return "/adote.html";
  }

  function configurarBotaoVoltar() {
    const botao = document.getElementById("voltarCatalogo");
    if (!botao) return;

    const destino = recuperarDestinoCatalogo();
    botao.href = destino;

    botao.addEventListener("click", (evento) => {
      evento.preventDefault();
      window.location.href = destino;
    });
  }

  // Escapa conteúdo antes de inserir no HTML.
  function esc(texto) {
    return String(texto ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }

  function padronizarTexto(valor, fallback = "Não informado") {
    const texto = String(valor ?? "").trim();
    return texto || fallback;
  }

  // ---------- Supabase (usa o mesmo cliente do Nav.js, com a sessão do login) ----------
  async function pegarCliente() {
    if (typeof window.obterClienteSupabase === "function") {
      return await window.obterClienteSupabase();
    }

    if (
      window.supabase &&
      typeof SUPABASE_URL !== "undefined" &&
      typeof SUPABASE_KEY !== "undefined"
    ) {
      if (!window.clienteSupabase) {
        window.clienteSupabase = window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_KEY,
        );
      }
      return window.clienteSupabase;
    }

    return null;
  }

  // Busca o pet no catálogo estático e aproveita as imagens
  // dos outros pets da mesma categoria para as miniaturas.
  function encontrarPetEstatico(id) {
    if (!id || !window.PETS) return null;

    for (const [chave, categoria] of Object.entries(window.PETS)) {
      const pet = categoria?.itens?.find(
        (item) => String(item.id) === String(id),
      );

      if (!pet) continue;

      const outrosPets = (categoria.itens || []).filter(
        (item) => String(item.id) !== String(pet.id) && item.img,
      );

      const fotos = [pet.img, ...outrosPets.map((item) => item.img)]
        .filter(Boolean)
        .slice(0, 4)
        .map((src) => `${PASTA_PETS}${src}`);

      return {
        id: pet.id,
        nome: pet.nome,
        especie: padronizarTexto(categoria.titulo || chave, "Pet"),
        raca: padronizarTexto(pet.raca || "SRD", "SRD"),
        sexo: padronizarTexto(pet.sexo || pet.extra || "Não informado"),
        idade: padronizarTexto(pet.nasc || pet.idade),
        cor: padronizarTexto(pet.cor),
        sobreNos: "", // o catálogo estático não tem esse campo
        historia: padronizarTexto(
          pet.historia ||
            pet.txt ||
            "Este pet está esperando uma família amorosa.",
        ),
        cuidados: padronizarTexto(
          pet.cuidados ||
            "Ofereça ambiente seguro, alimentação adequada, cuidado diário e muito carinho.",
        ),
        fotos,
        img: fotos[0] || "",
        donoId: null, // pets do catálogo não têm dono
        bruto: null,
        caracteristicas:
          Array.isArray(pet.caracteristicas) && pet.caracteristicas.length
            ? pet.caracteristicas
            : ["Carinhoso", "Curioso", "Esperança"],
        textoResumo: padronizarTexto(
          pet.txt || pet.historia,
          "Este pet está esperando uma família amorosa.",
        ),
      };
    }

    return null;
  }

  // Converte uma linha da tabela "doacoes" no formato usado pela página.
  function montarPetDoSupabase(data) {
    const fotos = Array.isArray(data.fotos) ? data.fotos.filter(Boolean) : [];
    const fotosNorm = fotos.length ? fotos : data.img ? [data.img] : [];

    return {
      id: data.id,
      nome: padronizarTexto(data.nome, "Pet"),
      especie: padronizarTexto(data.especie, "Pet"),
      raca: padronizarTexto(data.raca, ""), // a tabela não tem raça
      sexo: padronizarTexto(data.sexo),
      idade: padronizarTexto(data.idade),
      cor: padronizarTexto(data.cor),
      sobreNos: String(data.sobre_nos ?? "").trim(),
      historia: padronizarTexto(
        data.historia ||
          data.descricao ||
          "Este pet está esperando uma família amorosa.",
      ),
      cuidados: padronizarTexto(
        data.cuidados ||
          "Ofereça ambiente seguro, alimentação adequada, cuidado diário e muito carinho.",
      ),
      fotos: fotosNorm,
      img: fotosNorm[0] || "",
      donoId: data.user_id ?? null,
      bruto: data, // valores originais, usados no formulário de edição
      caracteristicas:
        Array.isArray(data.caracteristicas) && data.caracteristicas.length
          ? data.caracteristicas
          : ["Carinhoso", "Curioso", "Esperança"],
      textoResumo: padronizarTexto(
        data.historia || data.descricao,
        "Este pet está esperando uma família amorosa.",
      ),
    };
  }

  // Busca uma doação no Supabase.
  async function encontrarPetDoSupabase(id) {
    if (!id) return null;

    try {
      const client = await pegarCliente();
      if (!client) return null;

      const { data, error } = await client
        .from("doacoes")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        if (error) console.error("Erro ao buscar doação:", error);
        return null;
      }

      return montarPetDoSupabase(data);
    } catch (err) {
      console.error("Erro ao buscar pet no Supabase:", err);
      return null;
    }
  }

  async function acharPet(id) {
    if (!id) return null;

    const petEstatico = encontrarPetEstatico(id);
    if (petEstatico) return petEstatico;

    return encontrarPetDoSupabase(id);
  }

  // Monta a página do pet.
  function mostrarPet(pet) {
    document.title = `${pet.nome} – Audote Com Amor`;

    const imagem = document.getElementById("petImagem");
    const miniaturas = document.getElementById("petMiniaturas");

    const fotos = Array.isArray(pet.fotos)
      ? pet.fotos.filter(
          (foto) => typeof foto === "string" && foto.trim() !== "",
        )
      : [];

    const fotoPrincipal = fotos[0] || pet.img || "";

    imagem.src = fotoPrincipal;
    imagem.alt = padronizarTexto(pet.nome, "Pet");

    const historia = padronizarTexto(pet.historia);
    const resumo =
      historia.length > 220
        ? historia.slice(0, 217).trimEnd() + "..."
        : historia;

    document.getElementById("petNome").textContent = pet.nome;

    // Linha abaixo do nome: espécie + raça (catálogo antigo) ou espécie + sexo (doações).
    const complemento = pet.raca || pet.sexo;
    const especieTexto = [pet.especie, complemento].filter(Boolean).join(", ");

    document.getElementById("petRaca").textContent = especieTexto || "Pet";
    document.getElementById("petDescricao").textContent = resumo;
    document.getElementById("petCuidados").textContent = pet.cuidados;

    // "Sobre Mim" mostra o Sobre Nós; a história vai numa seção separada.
    // Pets sem Sobre Nós (catálogo antigo ou doação antiga) continuam
    // mostrando a história em "Sobre Mim".
    const sobreNos = String(pet.sobreNos ?? "").trim();
    document.getElementById("petSobre").textContent = sobreNos || historia;

    const secaoHistoria = document.getElementById("secaoHistoria");
    if (secaoHistoria) {
      document.getElementById("petHistoria").textContent = historia;
      secaoHistoria.hidden = !sobreNos;
    }

    // Define a cor da etiqueta de sexo.
    const sexo = String(pet.sexo || "").toLowerCase();

    const classeSexo = sexo.includes("casal")
      ? "casal"
      : sexo.includes("macho")
        ? "macho"
        : sexo.includes("fêmea") || sexo.includes("femea")
          ? "femea"
          : "escuro";

    const tags = [
      { classe: classeSexo, label: `Sexo: ${pet.sexo}` },
      { classe: "claro", label: `Idade: ${pet.idade}` },
      { classe: "azul", label: `Cor: ${pet.cor}` },
    ];

    document.getElementById("petTags").innerHTML = tags
      .map((tag) => `<span class="tag ${tag.classe}">${esc(tag.label)}</span>`)
      .join("");

    // Cria as três miniaturas com imagens diferentes.
    // No catálogo estático, usa as fotos dos outros pets da categoria.
    // No Supabase, usa as fotos adicionais cadastradas na doação.
    let fotosAdicionais = fotos.slice(1, 4);

    // Cria os espaços restantes se houver menos de três fotos adicionais.
    // Quando não houver outra foto disponível, usa a foto principal.
    while (fotosAdicionais.length < 3 && fotoPrincipal) {
      const indice = fotosAdicionais.length % fotos.length;
      fotosAdicionais.push(fotos[indice] || fotoPrincipal);
    }

    miniaturas.innerHTML = fotosAdicionais
      .slice(0, 3)
      .map(
        (src, i) => `
        <img
          src="${esc(src)}"
          alt="${esc(pet.nome)}, foto adicional ${i + 1}"
          tabindex="0"
        >
      `,
      )
      .join("");

    // Clicar ou usar Enter/Espaço troca a foto principal.
    miniaturas.querySelectorAll("img").forEach((mini) => {
      mini.style.cursor = "pointer";

      const trocarFoto = () => {
        imagem.src = mini.src;
        imagem.alt = mini.alt;
      };

      mini.addEventListener("click", trocarFoto);

      mini.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          trocarFoto();
        }
      });
    });
  }

  // ---------- Conheça mais pets (mesma espécie do pet aberto) ----------
  function normalizar(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // Converte "Cães", "caes", "Cachorro", "Gatos"... em uma espécie única.
  function especieCanonica(texto) {
    const t = normalizar(texto);

    if (/\b(cao|caes|cachorr\w*)\b/.test(t)) return "Cachorro";
    if (t.includes("gat")) return "Gato";
    if (t.includes("coelh")) return "Coelho";
    if (t.includes("calopsit")) return "Calopsita";

    return "";
  }

  // Pets do catálogo antigo (window.PETS) da mesma espécie.
  function petsEstaticosDaEspecie(especie, idAtual) {
    if (!window.PETS) return [];

    const lista = [];

    for (const [chave, categoria] of Object.entries(window.PETS)) {
      const especieDaCategoria =
        especieCanonica(categoria?.titulo) || especieCanonica(chave);

      if (especieDaCategoria !== especie) continue;

      (categoria.itens || []).forEach((item) => {
        if (!item?.img || String(item.id) === String(idAtual)) return;

        lista.push({
          nome: padronizarTexto(item.nome, "Pet"),
          img: `${PASTA_PETS}${item.img}`,
          href: `${PAGINA_PET}?id=${encodeURIComponent(item.id)}`,
        });
      });
    }

    return lista;
  }

  // Doações do Supabase da mesma espécie.
  async function petsDoacoesDaEspecie(especie, idAtual) {
    try {
      const client = await pegarCliente();
      if (!client) return [];

      const { data, error } = await client
        .from("doacoes")
        .select("id, nome, fotos")
        .eq("especie", especie)
        .order("criado_em", { ascending: false })
        .limit(MAX_MAIS_PETS);

      if (error) {
        console.error("Erro ao buscar mais pets:", error);
        return [];
      }

      return (data || [])
        .filter((d) => String(d.id) !== String(idAtual))
        .map((d) => {
          const foto = Array.isArray(d.fotos) ? d.fotos.find(Boolean) : "";
          if (!foto) return null;

          return {
            nome: padronizarTexto(d.nome, "Pet"),
            img: foto,
            href: `${PAGINA_PET}?doacao=${encodeURIComponent(d.id)}`,
          };
        })
        .filter(Boolean);
    } catch (err) {
      console.error("Erro ao buscar mais pets:", err);
      return [];
    }
  }

  let resizeMaisPetsLigado = false;

  function configurarSetasMaisPets() {
    const faixa = document.getElementById("maisPetsFaixa");
    const anterior = document.getElementById("maisPetsPrev");
    const proximo = document.getElementById("maisPetsNext");
    if (!faixa || !anterior || !proximo) return;

    const passo = () => {
      const card = faixa.querySelector(".mais-pets__card");
      if (!card) return faixa.clientWidth;

      const gap = parseFloat(getComputedStyle(faixa).columnGap) || 20;
      return card.getBoundingClientRect().width + gap;
    };

    const atualizar = () => {
      const cabeTudo = faixa.scrollWidth <= faixa.clientWidth + 4;

      anterior.hidden = cabeTudo;
      proximo.hidden = cabeTudo;

      anterior.disabled = faixa.scrollLeft <= 4;
      proximo.disabled =
        faixa.scrollLeft + faixa.clientWidth >= faixa.scrollWidth - 4;
    };

    anterior.onclick = () =>
      faixa.scrollBy({ left: -passo(), behavior: "smooth" });

    proximo.onclick = () =>
      faixa.scrollBy({ left: passo(), behavior: "smooth" });

    faixa.onscroll = atualizar;

    if (!resizeMaisPetsLigado) {
      resizeMaisPetsLigado = true;
      window.addEventListener("resize", () => {
        const f = document.getElementById("maisPetsFaixa");
        if (f) f.dispatchEvent(new Event("scroll"));
      });
    }

    faixa.scrollLeft = 0;
    atualizar();
  }

  async function mostrarMaisPets(pet) {
    const secao = document.getElementById("maisPets");
    const faixa = document.getElementById("maisPetsFaixa");
    if (!secao || !faixa) return;

    const especie = especieCanonica(pet.especie);

    if (!especie) {
      secao.hidden = true;
      return;
    }

    const [doacoes, estaticos] = await Promise.all([
      petsDoacoesDaEspecie(especie, pet.id),
      Promise.resolve(petsEstaticosDaEspecie(especie, pet.id)),
    ]);

    const lista = [...doacoes, ...estaticos].slice(0, MAX_MAIS_PETS);

    if (!lista.length) {
      secao.hidden = true;
      return;
    }

    faixa.innerHTML = lista
      .map(
        (p) => `
        <a class="mais-pets__card" href="${esc(p.href)}">
          <img src="${esc(p.img)}" alt="${esc(p.nome)}" loading="lazy" />
          <span>${esc(p.nome)}</span>
        </a>
      `,
      )
      .join("");

    secao.hidden = false;
    configurarSetasMaisPets();
  }

  // ---------- Edição (só para quem fez a doação) ----------
  async function usuarioEhDono(pet) {
    if (!pet.donoId) return false;

    try {
      const client = await pegarCliente();
      if (!client) return false;

      const { data } = await client.auth.getSession();
      return data?.session?.user?.id === pet.donoId;
    } catch (err) {
      console.warn("Não foi possível verificar o login:", err);
      return false;
    }
  }

  async function configurarEdicao(pet) {
    const botao = document.getElementById("btnEditar");
    const adotar = document.getElementById("btnAdotar");
    const dialogo = document.getElementById("dialogoEditar");
    const form = document.getElementById("formEditar");
    const msg = document.getElementById("msgEditar");
    const cancelar = document.getElementById("btnCancelarEdicao");

    const dono = botao && dialogo && form ? await usuarioEhDono(pet) : false;

    // Não é o dono: mostra "Quero Adotar" e não monta a edição
    if (!dono) {
      if (adotar) adotar.hidden = false;
      return;
    }

    // É o dono: "Editar dados" ocupa o lugar do "Quero Adotar"
    if (adotar) adotar.hidden = true;
    botao.hidden = false;

    const campo = (id) => document.getElementById(id);

    const mostrarMsg = (texto, cor = "") => {
      msg.textContent = texto;
      msg.style.color = cor;
    };

    botao.addEventListener("click", () => {
      const d = petAtual?.bruto || {};

      campo("edNome").value = d.nome ?? "";
      campo("edEspecie").value = d.especie ?? "";
      campo("edIdade").value = d.idade ?? "";
      campo("edSexo").value = d.sexo ?? "";
      campo("edCor").value = d.cor ?? "";
      campo("edSobreNos").value = d.sobre_nos ?? "";
      campo("edHistoria").value = d.historia ?? "";
      campo("edCuidados").value = d.cuidados ?? "";

      mostrarMsg("");
      dialogo.showModal();
    });

    cancelar?.addEventListener("click", () => dialogo.close());

    form.addEventListener("submit", async (evento) => {
      evento.preventDefault();

      const dados = {
        nome: campo("edNome").value.trim(),
        especie: campo("edEspecie").value,
        idade: campo("edIdade").value.trim(),
        sexo: campo("edSexo").value,
        cor: campo("edCor").value.trim(),
        sobre_nos: campo("edSobreNos").value.trim() || null,
        historia: campo("edHistoria").value.trim(),
        cuidados: campo("edCuidados").value.trim(),
      };

      const obrigatorios = [
        "nome",
        "especie",
        "idade",
        "sexo",
        "cor",
        "historia",
        "cuidados",
      ];
      if (obrigatorios.some((chave) => !dados[chave])) {
        mostrarMsg("Preencha todos os campos obrigatórios.", "#c0392b");
        return;
      }

      const salvar = form.querySelector('[type="submit"]');
      salvar.disabled = true;
      mostrarMsg("Salvando...");

      try {
        const client = await pegarCliente();

        const { data, error } = await client
          .from("doacoes")
          .update(dados)
          .eq("id", petAtual.id)
          .eq("user_id", petAtual.donoId)
          .select("*")
          .maybeSingle();

        if (error) throw error;


        if (!data) {
          throw new Error(
            "Nenhuma linha atualizada. Confira a policy de UPDATE.",
          );
        }

        petAtual = montarPetDoSupabase(data);
        mostrarPet(petAtual);
        mostrarMaisPets(petAtual); // a espécie pode ter mudado
        dialogo.close();
      } catch (err) {
        console.error("Erro ao salvar edição:", err);
        mostrarMsg("Não foi possível salvar. Tente novamente.", "#c0392b");
      } finally {
        salvar.disabled = false;
      }
    });
  }

  function naoEncontrado() {
    const principal = document.querySelector("main");
    if (!principal) return;

    const destino = recuperarDestinoCatalogo();

    principal.innerHTML = `
    <div class="pet__voltar">
      <a class="btn btn--voltar" href="${esc(destino)}">
        ← Voltar ao catálogo
      </a>
    </div>

    <div>
      <h1>Pet não encontrado</h1>
      <p>O pet solicitado não está mais disponível ou o link está incompleto.</p>
      <a class="btn" href="${esc(destino)}">Voltar para adoção</a>
    </div>
  `;
  }

  function configurarFundoMain() {
    const main = document.querySelector("main");
    if (!main) return;

    main.style.width = "min(1100px, 90%)";
    main.style.margin = "30px auto";
    main.style.padding = "30px";
    main.style.boxSizing = "border-box";
    main.style.backgroundImage =
      'url("../assets/img/fundos/fundo-textura.png")';
    main.style.backgroundRepeat = "repeat";
    main.style.backgroundSize = "260px";
    main.style.borderRadius = "20px";
  }

  async function iniciar() {
    configurarBotaoVoltar();
    configurarFundoMain();

    const pet = await acharPet(idPet);

    if (!pet) {
      naoEncontrado();
      return;
    }

    petAtual = pet;
    mostrarPet(pet);
    configurarEdicao(pet);
    mostrarMaisPets(pet);
  }

  iniciar();
})();
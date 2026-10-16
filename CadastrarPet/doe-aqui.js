const MIN_FOTOS = 4;

const form = document.getElementById("formDoacao");
const inputFotos = document.getElementById("fotosPet");
const previas = document.getElementById("previas");
const avisoFotos = document.getElementById("avisoFotos");
const areaUpload = document.getElementById("areaUpload");
const mensagem = document.getElementById("mensagem");

let fotos = [];

/* ---------- contar os caracteres que a pessoa digitou ---------- */
function ligarContador(idTextarea, idContador) {
  const ta = document.getElementById(idTextarea);
  const cont = document.getElementById(idContador);
  if (!ta || !cont) return;
  const atualizar = () =>
    (cont.textContent = `${ta.value.length} / ${ta.maxLength}`);
  ta.addEventListener("input", atualizar);
  atualizar();
}
ligarContador("sobreNosPet", "contSobreNos");
ligarContador("historiaPet", "contHistoria");
ligarContador("cuidadosPet", "contCuidados");

/* ---------- tentativa de previa + arrastar e soltar de foto ---------- */
function adicionarFotos(lista) {
  const novas = [...lista].filter((f) => f.type.startsWith("image/"));
  fotos = [...fotos, ...novas];
  desenharPrevias();
}

function desenharPrevias() {
  previas.innerHTML = "";
  fotos.forEach((foto, i) => {
    const item = document.createElement("div");
    item.className = "previa";

    const img = document.createElement("img");
    img.alt = foto.name;
    img.src = URL.createObjectURL(foto);
    img.onload = () => URL.revokeObjectURL(img.src);

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "previa-remover";
    remover.textContent = "×";
    remover.setAttribute("aria-label", `Remover a foto ${foto.name}`);
    remover.addEventListener("click", (e) => {
      // a prévia fica dentro do <label>, então sem isso abriria o seletor de arquivos
      e.preventDefault();
      e.stopPropagation();
      fotos.splice(i, 1);
      desenharPrevias();
    });

    item.append(img, remover);
    previas.appendChild(item);
  });
  avisoFotos.textContent =
    fotos.length >= MIN_FOTOS
      ? `${fotos.length} imagens selecionadas`
      : `Mínimo de ${MIN_FOTOS} imagens (${fotos.length} selecionada${fotos.length === 1 ? "" : "s"})`;
  avisoFotos.classList.remove("erro");
}

inputFotos.addEventListener("change", () => {
  adicionarFotos(inputFotos.files);
  inputFotos.value = "";
});

["dragenter", "dragover"].forEach((ev) =>
  areaUpload.addEventListener(ev, (e) => {
    e.preventDefault();
    areaUpload.classList.add("arrastando");
  }),
);
["dragleave", "drop"].forEach((ev) =>
  areaUpload.addEventListener(ev, (e) => {
    e.preventDefault();
    areaUpload.classList.remove("arrastando");
  }),
);
areaUpload.addEventListener("drop", (e) =>
  adicionarFotos(e.dataTransfer.files),
);

/* ---------- coisas do supabase ---------- */
const BUCKET = "pets-fotos";
const TABELA = "doacoes";
const MAX_MB = 5;
const PAGINA_PET = "/PaginaPet/PaginaPet.html";

let clienteSupabase = null;

function pegarCliente() {
  if (clienteSupabase) return clienteSupabase;

  if (typeof SUPABASE_URL === "undefined" || typeof SUPABASE_KEY === "undefined") {
    throw new Error(
      "SUPABASE_URL / SUPABASE_KEY não encontrados. Confira se /Auth/config.js carregou.",
    );
  }

  clienteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  return clienteSupabase;
}

function nomeSeguro(nome) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function enviarFotos(client, arquivos, userId) {
  const pasta = `${userId}/${crypto.randomUUID()}`;
  const urls = [];

  for (let i = 0; i < arquivos.length; i++) {
    const caminho = `${pasta}/${i + 1}-${nomeSeguro(arquivos[i].name)}`;

    const { error } = await client.storage
      .from(BUCKET)
      .upload(caminho, arquivos[i], { contentType: arquivos[i].type });

    if (error) throw error;

    urls.push(client.storage.from(BUCKET).getPublicUrl(caminho).data.publicUrl);
  }

  return urls;
}

/* ---------- verificador de logado pra doar ---------- */
const botaoEnviar = form.querySelector(".btn-adocao");

async function exigirLogin() {
  try {
    const client = pegarCliente();
    const { data } = await client.auth.getSession();
    if (data.session) return data.session.user;
  } catch (err) {
    console.error(err);
  }

  botaoEnviar.disabled = true;
  mensagem.className = "mensagem erro";
  mensagem.innerHTML =
    'Você precisa estar logado para doar um pet. <a href="/Auth/Auth.html">Entrar ou criar conta</a>';
  return null;
}

exigirLogin();

function mostrar(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrar("", "");

  const usuario = await exigirLogin();
  if (!usuario) return;

  form
    .querySelectorAll(".invalido")
    .forEach((el) => el.classList.remove("invalido"));
  const obrigatorios = form.querySelectorAll(
    "input[type=text][required], select[required], textarea[required]",
  );
  let ok = true;
  obrigatorios.forEach((el) => {
    if (!el.value.trim()) {
      el.classList.add("invalido");
      ok = false;
    }
  });

  if (!form.querySelector("input[name=especie]:checked")) {
    form.querySelector(".lista-especie").classList.add("invalido");
    ok = false;
  }

  if (fotos.length < MIN_FOTOS) {
    avisoFotos.classList.add("erro");
    ok = false;
  }

  if (fotos.some((f) => f.size > MAX_MB * 1024 * 1024)) {
    mostrar(`Cada foto pode ter no máximo ${MAX_MB} MB.`, "erro");
    return;
  }

  if (!ok) {
    mostrar("Preencha todos os campos e envie pelo menos 4 fotos.", "erro");
    return;
  }

  const dados = {
    nome: form.nomePet.value.trim(),
    especie: form.querySelector("input[name=especie]:checked").value,
    idade: form.idadePet.value.trim(),
    sexo: form.sexoPet.value,
    cor: form.corPet.value.trim(),
    sobre_nos: form.sobreNosPet.value.trim() || null,
    historia: form.historiaPet.value.trim(),
    cuidados: form.cuidadosPet.value.trim(),
  };

  const botao = botaoEnviar;
  let redirecionando = false;
  botao.disabled = true;

  try {
    const client = pegarCliente();

    const urls = await enviarFotos(client, fotos, usuario.id);

    // devolve o id da doação que acabou de ser criada
    const { data: nova, error } = await client
      .from(TABELA)
      .insert({
        ...dados,
        fotos: urls,
        user_id: usuario.id,
      })
      .select("id")
      .single();

    if (error) throw error;

    mostrar("Pronto! A doação foi publicada. Levando você para a página do pet... 🐾", "ok");

    // botao trava ate o envio
    redirecionando = true;
    setTimeout(() => {
      window.location.href = `${PAGINA_PET}?doacao=${nova.id}`;
    }, 1200);

    form.reset();
    fotos = [];
    desenharPrevias();
    document.getElementById("contSobreNos").textContent = "0 / 1000";
    document.getElementById("contHistoria").textContent = "0 / 1000";
    document.getElementById("contCuidados").textContent = "0 / 1000";
  } catch (err) {
    console.error(err);
    mostrar("Não foi possível enviar. Tente novamente.", "erro");
  } finally {
    if (!redirecionando) botao.disabled = false;
  }
});
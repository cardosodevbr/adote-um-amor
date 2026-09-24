const telaLogin = document.getElementById("screen-login");
const telaCadastro = document.getElementById("screen-cadastro");

function mostrarLogin() {
  telaLogin.style.display = "flex";
  telaCadastro.style.display = "none";
}

function mostrarCadastro() {
  telaLogin.style.display = "none";
  telaCadastro.style.display = "flex";
}

document
  .querySelector(".link-to-cadastro")
  .addEventListener("click", mostrarCadastro);
document
  .querySelector(".link-to-login")
  .addEventListener("click", mostrarLogin);

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ========== FUNÇÃO DE MENSAGENS (substitui alert) ==========
function mostrarMensagem(elemento, texto, tipo = "info") {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
}

// ========== LOGIN ==========
const formLogin = document.getElementById("form-login");
const msgLogin = document.getElementById("message-login");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  msgLogin.textContent = "";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-senha").value;

  if (!email || !password) {
    mostrarMensagem(msgLogin, "Preencha e-mail e senha.", "erro");
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Erro ao fazer login:", error.message);
    mostrarMensagem(msgLogin, "Erro ao entrar: " + error.message, "erro");
  } else {
    console.log("Login bem-sucedido:", data);
    mostrarMensagem(msgLogin, "Entrando...", "sucesso");
    // Pequeno atraso + validação de origem (evita falso-positivo de phishing)
    setTimeout(() => {
      if (window.location.protocol === "https:") {
        window.location.href = "home.html";
      } else {
        mostrarMensagem(msgLogin, "Acesso seguro obrigatório.", "erro");
      }
    }, 500);
  }
});

// ========== CADASTRO ==========
const formCadastro = document.getElementById("form-cadastro");
const msgCadastro = document.getElementById("message-cadastro");

formCadastro.addEventListener("submit", async (event) => {
  event.preventDefault();
  msgCadastro.textContent = "";

  const nome = document.getElementById("cad-nome").value.trim();
  const email = document.getElementById("cad-email").value.trim();
  const senha = document.getElementById("cad-senha").value;
  const confirmaSenha = document.getElementById("cad-senha-confirma").value;

  if (!nome || !email || !senha) {
    mostrarMensagem(msgCadastro, "Preencha todos os campos.", "erro");
    return;
  }

  if (senha !== confirmaSenha) {
    mostrarMensagem(msgCadastro, "As senhas não coincidem.", "erro");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: senha,
    options: { data: { nome: nome } },
  });

  if (error) {
    console.error("Cadastro falhou:", error.message);
    mostrarMensagem(msgCadastro, "Cadastro falhou: " + error.message, "erro");
  } else {
    console.log("Cadastro bem-sucedido:", data);
    mostrarMensagem(msgCadastro, "Conta criada! Redirecionando...", "sucesso");
    setTimeout(() => mostrarLogin(), 1200);
  }
});

// ========== LOGIN COM GOOGLE ==========
const btnGoogle = document.getElementById("btn-google-login");

btnGoogle.addEventListener("click", async () => {
  btnGoogle.disabled = true;
  msgLogin.textContent = "";

  // aviso de redirecionament
  mostrarMensagem(msgLogin, "Você será redirecionado para o Google de forma segura.", "info");

  const redirectURL = new URL("home.html", window.location.href).href;
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectURL },
  });

  if (error) {
    mostrarMensagem(msgLogin, "Erro ao entrar com Google: " + error.message, "erro");
    btnGoogle.disabled = false;
  }
});

// ========== VERIFICAÇÃO DE SESSÃO ==========
supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    // ✅ Validação de origem segura
    if (window.location.protocol === "https:") {
      window.location.href = "home.html";
    }
  }
});
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
const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-senha").value;
  console.log("Teste de envio de formulário de login");
  console.log("Email:", email);
  console.log("Password:", password);

  // objeto do supabase para devolver somende o erro de data e error, await pra ele esperar receber esse dado
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Erro ao fazer login:", error.message);
    alert("Erro ao fazer login: " + error.message);
  } else {
    console.log("Login bem-sucedido:", data);
    alert("Login bem-sucedido!");
  }
});

const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nome = document.getElementById("cad-nome").value;
  const email = document.getElementById("cad-email").value;
  const senha = document.getElementById("cad-senha").value;
  const confirmaSenha = document.getElementById("cad-senha-confirma").value;

  if (senha !== confirmaSenha) {
    console.log("As senhas nao estao batendo.");
    return;
  } else {
    console.log("As senhas estao batendo.");
  }
  console.log("Testando envio de furmalário de cadastro");

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: senha,
  });

  if (error) {
    console.error("Cadastro falhou:", error.message);
  } else {
    console.log("Cadastro bem-sucedido:", data);
    console.log("Nome do usuário:", nome);
    console.log("Email do usuário:", email);
    console.log("Senha do usuário:", senha);
    alert("Cadastro criado pro usuario: " + nome + " com email: " + email);
  }
});

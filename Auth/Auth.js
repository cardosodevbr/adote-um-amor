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

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Teste de envio de formulário de login");
});

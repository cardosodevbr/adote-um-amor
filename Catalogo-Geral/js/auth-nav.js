async function atualizarMenuAutenticado() {
  const menu = document.querySelector(".menu");

  if (
    !menu ||
    !window.supabase ||
    typeof SUPABASE_URL === "undefined" ||
    typeof SUPABASE_KEY === "undefined"
  ) {
    return;
  }

  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const links = Array.from(menu.querySelectorAll("a"));

  if (!links.length) {
    return;
  }

  const linkEntrar = links.find((link) => link.getAttribute("href") === "/Auth/Auth.html");
  const linkFinal = links[links.length - 1];

  if (!session) {
    if (linkEntrar) {
      linkEntrar.textContent = "ENTRAR";
      linkEntrar.href = "/Auth/Auth.html";
    }

    if (linkFinal) {
      linkFinal.textContent = "SAIBA MAIS";
      linkFinal.removeAttribute("data-auth-logout");
    }

    return;
  }

  const user = session.user;
  const meta = user.user_metadata || {};
  const nome = meta.full_name || meta.name || meta.nome || user.email || "Minha conta";

  if (linkEntrar) {
    linkEntrar.textContent = "MINHA CONTA";
    linkEntrar.href = "/Auth/home.html";
    linkEntrar.title = nome;
  }

  if (linkFinal) {
    linkFinal.textContent = "SAIR";
    linkFinal.href = "#";
    linkFinal.dataset.authLogout = "true";
    linkFinal.title = `Sair de ${nome}`;

    linkFinal.onclick = async (event) => {
      event.preventDefault();
      await supabaseClient.auth.signOut();
      window.location.href = "/Auth/Auth.html";
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarMenuAutenticado();
});
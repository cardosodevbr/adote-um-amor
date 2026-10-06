document.addEventListener("DOMContentLoaded", () => {
  const carrossel = document.querySelector(".carrossel");
  if (!carrossel) return;

  const faixa = carrossel.querySelector(".carrossel-faixa");
  const slides = Array.from(carrossel.querySelectorAll(".slide"));
  const prev = carrossel.querySelector(".seta-prev");
  const next = carrossel.querySelector(".seta-next");
  const dotsBox = carrossel.querySelector(".carrossel-dots");

  if (!faixa || slides.length === 0) return;

  const INTERVALO = 4000;
  let atual = 0;
  let timer = null;

  // cria uma bolinha por slide
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    b.addEventListener("click", () => {
      irPara(i);
      reiniciarAutoplay();
    });
    dotsBox.appendChild(b);
    return b;
  });

  function irPara(i) {
    const alvo = Math.max(0, Math.min(i, slides.length - 1));
    faixa.scrollTo({ left: alvo * faixa.clientWidth, behavior: "smooth" });
  }

  function atualizar() {
    atual = Math.round(faixa.scrollLeft / faixa.clientWidth);
    atual = Math.max(0, Math.min(atual, slides.length - 1));

    dots.forEach((d, n) => d.classList.toggle("ativo", n === atual));
    if (prev) prev.disabled = atual === 0;
    if (next) next.disabled = atual === slides.length - 1;
  }

  // ===== Troca automática =====
  function proximoAuto() {
    irPara(atual === slides.length - 1 ? 0 : atual + 1);
  }

  function iniciarAutoplay() {
    pararAutoplay();
    timer = setInterval(proximoAuto, INTERVALO);
  }

  function pararAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  function reiniciarAutoplay() {
    iniciarAutoplay();
  }

  // ===== Controles manuais =====
  if (prev) {
    prev.addEventListener("click", () => {
      irPara(atual - 1);
      reiniciarAutoplay();
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      irPara(atual + 1);
      reiniciarAutoplay();
    });
  }

  carrossel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      irPara(atual - 1);
      reiniciarAutoplay();
    }
    if (e.key === "ArrowRight") {
      irPara(atual + 1);
      reiniciarAutoplay();
    }
  });

  faixa.addEventListener("scroll", atualizar, { passive: true });

  carrossel.addEventListener("mouseenter", pararAutoplay);
  carrossel.addEventListener("mouseleave", iniciarAutoplay);
  carrossel.addEventListener("touchstart", pararAutoplay, { passive: true });
  carrossel.addEventListener("touchend", iniciarAutoplay, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pararAutoplay();
    else iniciarAutoplay();
  });

  window.addEventListener("resize", () => {
    faixa.scrollTo({ left: atual * faixa.clientWidth, behavior: "auto" });
    atualizar();
  });

  atualizar();
  iniciarAutoplay();
});
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const formContato = document.getElementById("formContato");
const mensagem = document.getElementById("mensagem");

formContato.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Verifica se existe alguém logado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const rg = document.getElementById("rg").value;
  const profissao = document.getElementById("profissao").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;

  const { error } = await supabase.from("contatos").insert({
    user_id: user ? user.id : null,
    nome: nome,
    cpf: cpf,
    rg: rg,
    profissao: profissao,
    email: email,
    whatsapp: whatsapp,
  });

  if (error) {
    console.error(error);

    mensagem.textContent = "Erro ao enviar o formulário.";
    mensagem.style.color = "red";

    return;
  }

  mensagem.textContent = "Formulário enviado com sucesso!";
  mensagem.style.color = "green";

  formContato.reset();
});

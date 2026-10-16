// ==========================================================
// CARROSSEL
// ==========================================================
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

  // Cria uma bolinha por slide
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
    b.addEventListener("click", () => {
      irPara(i);
      reiniciarAutoplay();
    });

    if (dotsBox) dotsBox.appendChild(b);
    return b;
  });

  function irPara(i) {
    const alvo = Math.max(0, Math.min(i, slides.length - 1));
    faixa.scrollTo({
      left: alvo * faixa.clientWidth,
      behavior: "smooth",
    });
  }

  function atualizar() {
    if (!faixa.clientWidth) return;

    atual = Math.round(faixa.scrollLeft / faixa.clientWidth);
    atual = Math.max(0, Math.min(atual, slides.length - 1));

    dots.forEach((d, n) => d.classList.toggle("ativo", n === atual));

    if (prev) prev.disabled = atual === 0;
    if (next) next.disabled = atual === slides.length - 1;
  }

  // Troca automática
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

  // Controles manuais
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
    faixa.scrollTo({
      left: atual * faixa.clientWidth,
      behavior: "auto",
    });
    atualizar();
  });

  atualizar();
  iniciarAutoplay();
});

// ==========================================================
// FORMULÁRIO DE CONTATO 
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
  const formContato = document.getElementById("form-adocao");
  if (!formContato) return;

  const mensagem = formContato.querySelector(".form__msg");
  const botao = formContato.querySelector('[type="submit"]');

  const mostrar = (texto, cor = "") => {
    if (!mensagem) return;
    mensagem.textContent = texto;
    mensagem.style.color = cor;
  };

  // Devolve o usuário logado, ou null se não houver ninguém.
  const obterUsuarioOuNull = async (supabase) => {
    try {
      const { data } = await supabase.auth.getSession();
      return data?.session?.user ?? null;
    } catch (erro) {
      console.warn(
        "Não foi possível ler a sessão, enviando como visitante:",
        erro,
      );
      return null;
    }
  };

  formContato.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (botao) botao.disabled = true;
    mostrar("Enviando formulário...");

    try {
      if (typeof window.obterClienteSupabase !== "function") {
        throw new Error(
          "A função obterClienteSupabase não está disponível. Verifique o Nav.js.",
        );
      }

      const supabase = await window.obterClienteSupabase();
      const user = await obterUsuarioOuNull(supabase);

      const valor = (id) => document.getElementById(id).value.trim();

      const dados = {
        user_id: user ? user.id : null, // null quando não está logado
        nome: valor("nome"),
        cpf: valor("cpf"),
        rg: valor("rg"),
        profissao: valor("profissao"),
        email: valor("email"),
        whatsapp: valor("whatsapp"),
      };

      console.log("Enviando:", dados);

      const { error } = await supabase.from("contatos").insert(dados);

      if (error) throw error;

      mostrar("Formulário enviado com sucesso!", "green");
      formContato.reset();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      mostrar("Erro ao enviar o formulário. Tente novamente.", "red");
    } finally {
      if (botao) botao.disabled = false;
    }
  });
});
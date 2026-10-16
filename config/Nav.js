
/* ==========================================================
   MENU DO SITE (um arquivo só para todas as páginas)
   ----------------------------------------------------------
   COMO USAR EM UMA PÁGINA:
   1. Onde ficava o menu, coloque:
      <nav class="menu" id="menu"></nav>

   2. No fim do body, carregue:
      <script src="/config/Nav.js"></script>

   O visual do menu fica no final deste arquivo (const CSS).
========================================================== */

(() => {
  // ================= CONFIGURAÇÃO =================

  const MENU = {
    aposSair: "/index.html",

    // Supabase
    supabaseCdn:
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    configPath: "/Auth/config.js",

    itens: [
      {
        texto: "ENTRAR",
        href: "/Auth/Auth.html",
        logado: {
          texto: "MINHA CONTA",
          href: "/Auth/Auth.html",
        },
      },
      {
        texto: "ADOTE",
        href: "/adote.html",
      },
      {
        tipo: "logo",
        href: "/index.html",
        src: "/assets/img/ui/logo.png",
        alt: "Adote Com Amor, página inicial",
      },
      {
        texto: "DOE AQUI",
        href: "/CadastrarPet/CadastroPet.html",
      },
      {
        texto: "SAIBA MAIS",
        href: "/saiba-mais.html",
      },
      {
        texto: "SAIR",
        acao: "sair",
        visivel: "logado",
      },
    ],
  };

  // ================= SUPABASE =================

  const carregarScript = (src) =>
    new Promise((ok, erro) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = ok;
      script.onerror = () =>
        erro(new Error("Falha ao carregar " + src));

      document.head.appendChild(script);
    });

  let promessaCliente = null;

  const obterCliente = () => {
    if (promessaCliente) return promessaCliente;

    promessaCliente = (async () => {
      if (!window.supabase?.createClient) {
        await carregarScript(MENU.supabaseCdn);
      }

      if (
        typeof SUPABASE_URL === "undefined" ||
        typeof SUPABASE_KEY === "undefined"
      ) {
        await carregarScript(MENU.configPath);
      }

      if (!window.clienteSupabase) {
        window.clienteSupabase = window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_KEY,
        );
      }

      return window.clienteSupabase;
    })();

    promessaCliente.catch(() => {
      promessaCliente = null;
    });

    return promessaCliente;
  };

  // Disponibiliza a função para outros scripts
  window.obterClienteSupabase = obterCliente;

  // ================= SAIR DA CONTA =================

  const sair = async () => {
    try {
      const cliente = await obterCliente();
      await cliente.auth.signOut();
    } catch (erro) {
      console.warn("[menu] erro ao sair:", erro);
    }

    location.href = MENU.aposSair;
  };

  // Primeiro nome da pessoa logada.
  const nomeDe = (usuario) => {
    const meta = usuario?.user_metadata || {};

    const completo =
      meta.full_name ||
      meta.name ||
      usuario?.email?.split("@")[0] ||
      "";

    return completo.trim().split(" ")[0];
  };

  // ================= ITENS DO MENU =================

  const semIndex = (caminho) =>
    caminho.replace(/\/index\.html$/, "/");

  const marcarPaginaAtual = (area) => {
    const atual = semIndex(location.pathname);

    area.querySelectorAll("a[href]").forEach((a) => {
      if (
        a.classList.contains("nav-site__logo") ||
        a.dataset.acao
      ) {
        return;
      }

      if (semIndex(a.pathname) === atual) {
        a.setAttribute("aria-current", "page");
      }
    });
  };

  const montarItens = (area, sessao) => {
    const logado = Boolean(sessao);
    const nome = logado ? nomeDe(sessao.user) : "";

    area.replaceChildren();

    MENU.itens.forEach((base) => {
      const item = logado
        ? { ...base, ...base.logado }
        : base;

      const visivel = item.visivel || "todos";

      if (visivel === "logado" && !logado) return;
      if (visivel === "deslogado" && logado) return;

      const a = document.createElement("a");

      if (item.href) {
        a.href = item.href;
      }

      if (item.tipo === "logo") {
        a.className = "nav-site__logo";
        a.setAttribute(
          "aria-label",
          item.alt || "Página inicial",
        );

        const img = new Image();

        img.src = item.src;
        img.alt = "";
        img.width = 900;
        img.height = 382;

        a.appendChild(img);
      } else {
        // O nome do usuário é inserido como texto, não como HTML.
        a.textContent = (item.texto || "").replaceAll(
          "{nome}",
          nome,
        );
      }

      if (item.acao === "sair") {
        a.dataset.acao = "sair";

        a.addEventListener("click", (evento) => {
          evento.preventDefault();
          sair();
        });
      }

      area.appendChild(a);
    });

    marcarPaginaAtual(area);
  };

  // ================= SESSÃO DO USUÁRIO =================

  const areasDosMenus = [];
  let sessaoAtual = null;
  let acompanhando = false;

  const atualizarTodos = (sessao) => {
    sessaoAtual = sessao;

    areasDosMenus.forEach((area) => {
      montarItens(area, sessao);
    });
  };

  const acompanharSessao = (area) => {
    areasDosMenus.push(area);

    if (acompanhando) {
      montarItens(area, sessaoAtual);
      return;
    }

    acompanhando = true;

    obterCliente()
      .then(async (cliente) => {
        const { data } = await cliente.auth.getSession();

        atualizarTodos(data.session);

        cliente.auth.onAuthStateChange((_evento, sessao) => {
          atualizarTodos(sessao);
        });
      })
      .catch((erro) => {
        acompanhando = false;

        console.warn(
          "[menu] sem Supabase, mostrando menu deslogado:",
          erro,
        );
      });
  };

  // ================= MENU MOBILE =================

  const ativarMenuMobile = (barra) => {
    const botao = barra.querySelector(".nav-site__toggle");

    botao?.addEventListener("click", () => {
      const aberto = barra.classList.toggle(
        "nav-site__barra--aberta",
      );

      botao.setAttribute("aria-expanded", String(aberto));

      botao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu",
      );
    });
  };

  // Efeito de rolagem.
  const ativarEfeitoRolagem = (barra) => {
    const reduzirMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const DISTANCIA = 180;
    let aguardando = false;

    const atualizar = () => {
      aguardando = false;

      if (reduzirMovimento.matches) return;

      const progresso = Math.min(
        window.scrollY / DISTANCIA,
        1,
      );

      barra.style.opacity = String(1 - progresso);

      barra.style.transform =
        `translateY(${-progresso * 28}px) ` +
        `scale(${1 - progresso * 0.06})`;

      barra.style.pointerEvents =
        progresso >= 1 ? "none" : "";
    };

    window.addEventListener(
      "scroll",
      () => {
        if (aguardando) return;

        aguardando = true;
        window.requestAnimationFrame(atualizar);
      },
      { passive: true },
    );

    atualizar();
  };

  // ================= MONTAGEM DO MENU =================

  const montar = (host, numero) => {
    const idLinks = `menu-links-${numero}`;

    host.innerHTML = `
      <div class="nav-site__barra">
        <button
          class="nav-site__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="${idLinks}"
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <div class="nav-site__links" id="${idLinks}"></div>
      </div>
    `;

    const barra = host.querySelector(".nav-site__barra");
    const area = host.querySelector(".nav-site__links");

    const alvoAria =
      host.tagName === "NAV" ? host : barra;

    if (alvoAria === barra) {
      barra.setAttribute("role", "navigation");
    }

    alvoAria.setAttribute("aria-label", "Principal");

    montarItens(area, null);
    ativarMenuMobile(barra);
    ativarEfeitoRolagem(barra);
    acompanharSessao(area);
  };

  // ================= VISUAL DO MENU (CSS) =================

  const CSS = `
    .nav-site {
      box-sizing: border-box;
      width: 100%;
      position: relative;
      z-index: 20;
      padding: 1.25rem 1rem 0;
    }

    .nav-site__barra {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: min(100%, 56rem);
      margin-inline: auto;
      padding: 0.55rem 3rem;
      background: #e57b36;
      border-radius: 1rem;
      transform-origin: top center;
      will-change: transform, opacity;
    }

    .nav-site__links {
      display: contents;
    }

    .nav-site a {
      color: #fff;
      font: 600 0.8rem "Montserrat", system-ui, sans-serif;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-decoration: none;
    }

    .nav-site a[aria-current="page"],
    .nav-site a:hover {
      text-decoration: underline;
      text-underline-offset: 6px;
    }

    .nav-site .nav-site__logo {
      width: 9rem;
    }

    .nav-site .nav-site__logo img {
      display: block;
      width: 100%;
      height: auto;
    }

    .nav-site .nav-site__logo:hover {
      text-decoration: none;
    }

    .nav-site__toggle {
      display: none;
      background: none;
      border: 0;
      color: #fff;
      font-size: 1.6rem;
      line-height: 1;
      cursor: pointer;
    }

    @media (max-width: 48rem) {
      .nav-site__barra {
        flex-wrap: wrap;
        padding: 0.6rem 1.2rem;
      }

      .nav-site .nav-site__logo {
        order: 1;
        width: 8rem;
      }

      .nav-site__toggle {
        display: block;
        order: 2;
      }

      .nav-site a:not(.nav-site__logo) {
        display: none;
        order: 3;
        flex-basis: 100%;
        padding: 0.6rem 0;
        text-align: center;
      }

      .nav-site__barra--aberta a:not(.nav-site__logo) {
        display: block;
      }
    }
  `;

  const colocarCss = () => {
    if (document.getElementById("menu-site-css")) return;

    const estilo = document.createElement("style");

    estilo.id = "menu-site-css";
    estilo.textContent = CSS;

    document.head.appendChild(estilo);
  };

  const iniciar = () => {
    const hosts = document.querySelectorAll(
      "nav.menu, [data-menu-site]",
    );

    if (!hosts.length) return;

    colocarCss();

    hosts.forEach((host, numero) => {
      host.classList.remove("menu");
      host.classList.add("nav-site");

      montar(host, numero);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();

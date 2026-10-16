/*
  footer.js: rodapé do site, num lugar só.

  Uso em qualquer página:
    <footer class="rodape" id="rodape"></footer>
    <script src="/js/footer.js"></script>

  O que ele faz:
    1. coloca o CSS do rodapé na página (o CSS fica no FINAL deste arquivo,
       na const CSS; não precisa de arquivo .css separado)
    2. injeta o HTML do rodapé dentro de <footer class="rodape">

  Para trocar contatos, textos ou imagens, edite só o HTML aqui embaixo.
  Os caminhos começam com "/" para funcionar em qualquer pasta do site.
*/
(() => {
  const HTML = `
    <div class="rodape__container">
      <img
        class="rodape__filhote"
        src="/assets/img/ui/filhote.png"
        alt=""
        width="420"
        height="420"
      />
      <div class="rodape__caixa">
        <div class="rodape__marca">
          <img
            class="rodape__logo"
            src="/assets/img/ui/logo.png"
            alt="Audote com amor"
            width="900"
            height="382"
          />
          <small class="rodape__slogan"
            >Amor que faz o coração aquecer. Adote com Amor!</small
          >
        </div>
        <div class="rodape__contato">
          <h2>Fale conosco</h2>
          <ul>
            <li>
              <a href="tel:+5511900000000">
                <img
                  src="/assets/img/icones/telefone.svg"
                  alt=""
                  width="24"
                  height="24"
                />
                (11) 90000-0000
              </a>
            </li>
            <li>
              <a href="mailto:autodecomamor@gmail.com">
                <img
                  src="/assets/img/icones/email.svg"
                  alt=""
                  width="24"
                  height="24"
                />
                autodecomamor@gmail.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com/autodecomamor" rel="noopener">
                <img
                  src="/assets/img/icones/instagram.svg"
                  alt=""
                  width="24"
                  height="24"
                />
                @autodecomamor
              </a>
            </li>
          </ul>
        </div>
        <img
          class="rodape__pata"
          src="/assets/img/ui/pata.png"
          alt=""
          width="336"
          height="435"
        />
      </div>
    </div>
  `;

  /* ==========================================================
     VISUAL DO RODAPÉ (CSS)
  ========================================================== */
  const CSS = `
    .rodape {
      position: relative;
      margin-top: 14rem;
    }

    .rodape img {
      display: block;
      max-width: 100%;
    }

    .rodape__container {
      position: relative;
      box-sizing: border-box;
      width: min(100%, 75rem);
      margin-inline: auto;
      padding-inline: 1rem;
    }

    .rodape__filhote {
      position: absolute;
      left: 6%;
      top: -13rem;
      width: 22rem;
      height: auto;
      z-index: 2;
      pointer-events: none;
    }

    .rodape__caixa {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2rem;
      padding: 4.5rem 3rem 6rem;
      background: #e57b36;
      color: #fff;
      border-radius: 2rem 2rem 0 0;
    }

    .rodape__marca {
      display: grid;
      justify-items: start;
      gap: 1.6rem;
    }

    .rodape__logo {
      width: 17rem;
      height: auto;
    }

    .rodape__slogan {
      font: 0.75rem "Montserrat", system-ui, sans-serif;
    }

    .rodape__contato {
      padding-left: 2.5rem;
      border-left: 2px solid #fff;
    }

    .rodape__contato h2 {
      margin-bottom: 0.8rem;
      font-size: 1rem;
    }

    .rodape__contato ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .rodape__contato li {
      margin: 0.5rem 0;
    }

    .rodape__contato a {
      color: inherit;
      display: inline-flex;
      align-items: center;
      gap: 0.7rem;
      font: 500 1rem "Montserrat", system-ui, sans-serif;
      text-decoration: none;
    }

    .rodape__contato a:hover {
      text-decoration: underline;
    }

    .rodape__contato img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .rodape__pata {
      position: absolute;
      right: 8%;
      bottom: 0;
      height: 12rem;
      width: auto;
    }

    @media (max-width: 40rem) {
      .rodape {
        margin-top: 9rem;
      }

      .rodape__filhote {
        top: -10.4rem;
        width: 14rem;
      }

      .rodape__caixa {
        grid-template-columns: 1fr;
        padding: 3.5rem 1.5rem 5rem;
      }

      .rodape__logo {
        width: 13rem;
      }

      .rodape__contato {
        padding-left: 1.2rem;
      }

      .rodape__pata {
        height: 7rem;
        right: 4%;
      }
    }
  `;

  const colocarCss = () => {
    if (document.getElementById("rodape-site-css")) return;
    const estilo = document.createElement("style");
    estilo.id = "rodape-site-css";
    estilo.textContent = CSS;
    document.head.appendChild(estilo);
  };

  const iniciar = () => {
    const rodape = document.querySelector("footer.rodape");
    if (!rodape) return;
    colocarCss();
    rodape.innerHTML = HTML;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
const estilo = document.createElement("style");

estilo.textContent = `
  .hero-aviso {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    min-height: 24rem;
    margin-top: 2rem;
    padding: 2.5rem;
    overflow: hidden;
    background: #e57b36;
    color: #fff;
    border-radius: 2rem;
    box-sizing: border-box;
  }
.tema-geral .fundo-topo,
.tema-saiba .fundo-topo {
  background-image: url("../assets/img/fundos/fundo-geral.svg");
  background-repeat: repeat;
  background-size: 260px;
}

  .hero-aviso__texto {
    max-width: 50%;
  }

  .hero-aviso__texto h1 {
    margin-top: 0.8rem;
    font-family: "Fredoka", sans-serif;
    font-weight: 700;
  }

  .hero-aviso__texto p {
    margin-bottom: 1rem;
    font-family: "Lora", Georgia, serif;
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .hero-aviso .tag {
    color: #1b1b1b;
  }

  .hero-aviso__img {
    position: absolute;
    right: 1.5rem;
    bottom: 0;
    width: auto;
    height: 100%;
    max-width: 48%;
    object-fit: contain;
    object-position: right bottom;
  }

  @media (max-width: 48rem) {
    .hero-aviso {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      min-height: 0;
      padding: 1.5rem 1.5rem 0;
    }

    .hero-aviso__texto {
      max-width: none;
    }

    .hero-aviso__img {
      position: static;
      align-self: center;
      width: 100%;
      height: auto;
      max-width: 80%;
      max-height: 18rem;
    }
  }
`;

document.head.appendChild(estilo);

const container = document.querySelector("[data-hero-aviso]");

if (container) {
  container.innerHTML = `
    <section class="hero-aviso" aria-labelledby="aviso">
      <div class="hero-aviso__texto">
        <span class="tag">🐾 Audote com amor</span>

        <h1 id="aviso">
          Antes de mais nada, é importante que saiba!
        </h1>

        <p>
          A adoção responsável de Pets vai muito além de um impulso ou uma
          surpresa. Um animal de estimação não é um presente que pode ser
          trocado ou descartado, é um companheiro para a vida toda.
        </p>

        <p>
          Ao adotar um Pet, um amigo, um parceiro, você está assumindo o
          compromisso de oferecer carinho, cuidado e um ambiente seguro para
          um ser que já enfrentou o abandono e agora busca um recomeço.
        </p>

        <p>
          Se você é residente das zonas Norte, Sul ou Oeste de São Paulo, da
          Baixada ou Capital e está pensando em como adotar um Pet, respire
          fundo e leia com carinho: essa decisão deve ser feita com o
          coração e com consciência.
        </p>
      </div>

      <img
        class="hero-aviso__img"
        src="assets/img/ui/hero-pets.png"
        alt="Um cachorro e um gato sentados lado a lado"
        width="814"
        height="800"
      />
    </section>
  `;
}

const parametros = new URLSearchParams(window.location.search);

const idPet = Number(parametros.get("id"));

let pet = null;

// Procura o pet dentro de todas as categorias
for (const categoria in catalogo) {
  const encontrado = catalogo[categoria].pets.find(
    (p) => p.id === idPet
  );

  if (encontrado) {
    pet = encontrado;
    break;
  }
}

// Se não encontrou
if (!pet) {
  document.querySelector("main").innerHTML = `
    <h1>Pet não encontrado</h1>

    <a class="btn" href="/Catalogo-Geral/home.html#adote">
      Voltar para adoção
    </a>
  `;
} else {
  // Título da página
  document.title = `${pet.nome} – Audote Com Amor`;

  // Imagem principal
  const imagem = document.getElementById("petImagem");

  imagem.src = pet.img;
  imagem.alt = pet.nome;

  // Nome
  document.getElementById("petNome").textContent = pet.nome;

  // Tipo e gênero
  document.getElementById("petRaca").textContent =
    `Pet, ${pet.sexo}`;

  // Descrição
  document.getElementById("petDescricao").textContent =
    pet.desc;

  // Sobre mim
  document.getElementById("petSobre").textContent =
    pet.sobre;

  // Como cuidar
  document.getElementById("petCuidados").textContent =
    pet.cuidados;

  // Tags
  document.getElementById("petTags").innerHTML = `
    <span class="tag azul">
      Sexo: ${pet.sexo}
    </span>

    <span class="tag claro">
      Nascimento: ${pet.nascimento}
    </span>

    <span class="tag azul">
      Cor: ${pet.cor}
    </span>

    <span class="tag claro">
      Olhos: ${pet.olhos}
    </span>

    <span class="tag claro">
      Característica Especial:
      ${pet.caracteristicaEspecial}
    </span>

    ${
      pet.fiv
        ? `<span class="tag escuro">FIV: ${pet.fiv}</span>`
        : ""
    }

    ${
      pet.felv
        ? `<span class="tag escuro">FeLV: ${pet.felv}</span>`
        : ""
    }
  `;

  // Miniaturas
  document.getElementById("petMiniaturas").innerHTML = `
    <img src="${pet.img}" alt="${pet.nome}, foto 1">
    <img src="${pet.img}" alt="${pet.nome}, foto 2">
    <img src="${pet.img}" alt="${pet.nome}, foto 3">
  `;
}
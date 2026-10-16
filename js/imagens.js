/*
  Imagens opcionais (<img data-opcional>): se o arquivo ainda não existir,
  a imagem é ocultada em vez de mostrar o ícone de imagem quebrada.
  Basta salvar o arquivo com o nome indicado no HTML para ela aparecer.
*/
(() => {
  document.querySelectorAll("img[data-opcional]").forEach((img) => {
    const ocultar = () => img.classList.add("is-ausente");
    img.addEventListener("error", ocultar);
    if (img.complete && img.naturalWidth === 0) ocultar();
  });
})();

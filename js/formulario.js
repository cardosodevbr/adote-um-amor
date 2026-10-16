/* Formulário de adoção: máscaras de CPF e WhatsApp.
   O envio fica no saiba-mais.js (Supabase). */
(() => {
  const form = document.getElementById("form-adocao");
  if (!form) return;

  const aplicarMascara = (campo, formatar) => {
    campo.addEventListener("input", () => {
      campo.value = formatar(campo.value.replace(/\D/g, ""));
    });
  };

  aplicarMascara(form.cpf, (v) =>
    v
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  );

  aplicarMascara(form.whatsapp, (v) =>
    v
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
  );
})();
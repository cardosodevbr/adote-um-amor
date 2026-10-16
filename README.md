# Audote com Amor

Site estático (HTML + CSS + JS puros, sem build). Abra `index.html` ou sirva a pasta:
`python3 -m http.server`.

```
index.html          Home (propósitos, FAQ, doação)
adote.html          Catálogo geral (grade com todos os pets)
categoria.html      Catálogo por espécie (?tipo=caes | gatos | coelhos | calopsitas)
saiba-mais.html     Processo de adoção + formulário

css/
  base.css          Reset, tipografia, utilitários
  componentes.css   Botões, tags, navbar, rodapé, animações flutuantes
  paginas.css       Home, hero, catálogo, avaliações, saiba mais, temas por categoria

js/
  data/pets.js      Dados dos pets (edite aqui para adicionar animais)
  catalog.js        Renderiza o catálogo e aplica o tema da categoria
  navbar.js         Menu mobile + efeito de rolagem da navbar
  formulario.js     Máscaras e envio do formulário
  imagens.js        Oculta imagens opcionais que ainda não existem

assets/img/
  pets/             Fotos dos animais
  ui/               Logos, heros, patinha, filhote, tutora, categorias...
  avaliacoes/       Recortes decorativos ao lado das avaliações
  fundos/           Padrões (patinhas, ossos, espinhas, cenouras, pássaros)
  icones/           Ícones SVG
```

## Imagens para enviar (basta salvar com este nome)

| Arquivo                                   | Onde aparece                                  |
| ----------------------------------------- | --------------------------------------------- |
| `assets/img/ui/cao-home.png`              | Home, cachorro sobre o fundo azul (hoje é o recorte cão + gato) |
| `assets/img/ui/papagaio.png`              | Saiba mais, "Por que adotar um pet?"          |
| `assets/img/ui/betta.png`                 | Saiba mais, "Por que adotar um pet?"          |
| `assets/img/avaliacoes/avaliacao-gatos.png`      | Avaliações da página de gatos          |
| `assets/img/avaliacoes/avaliacao-coelhos.png`    | Avaliações da página de coelhos        |
| `assets/img/avaliacoes/avaliacao-calopsitas.png` | Avaliações da página de calopsitas     |

Use PNG com fundo transparente. Enquanto o arquivo não existir, a imagem fica oculta
(sem ícone quebrado). Os nomes das imagens de avaliação são definidos em `js/data/pets.js`.

## Observações

- Temas por categoria: `catalog.js` adiciona `tema-gatos`, `tema-caes` etc. ao `<body>`;
  o `paginas.css` troca o fundo decorativo e a cor do botão (calopsitas = azul).
- Navbar: não é fixa. Ao rolar, ela desliza para cima, encolhe e some com fade
  (ajuste `DISTANCIA` em `js/navbar.js`). Respeita `prefers-reduced-motion`.
- Efeito flutuante: balão + gatinho da home (`.comentario`), e o cachorro com movimento mais leve.
- O CSS não usa `:root` nem variáveis; as cores estão literais:
  laranja `#e57b36`, azul `#70bdee`, azul claro `#cce6f8`, pêssego `#f5cfa0`, bege `#f2edea`.

// ==================================================
// DADOS DOS PETS
// ==================================================
const catalogo = {
  calopsitas: {
    titulo: "CALOPSITAS",
    fundo: "/img/fundo-calopsita.png",
    avaliacao: "/img/calopsita-avaliacao.png",

    pets: [
      {
        id: 1,
        nome: "Raven",
        sexo: "Fêmea",
        nascimento: "15/03/2024",
        cor: "Cinza silvestre",
        olhos: "Marrom",
        caracteristicaEspecial: "Mansa, adora cantar o dia todo",
        img: "/img/calopsita-avaliacao.png",
        desc: "Pequena no tamanho, mas enorme no coração, essa calopsita sonha com um lar para chamar de seu. Ela merece uma família que enxergue todo o encanto que existe nela e esteja disposta a oferecer amor, paciência e muitos cuidados.",
        sobre:
          "Raven é uma calopsita mansa, carinhosa e muito musical. Ela adora cantar e gosta de ficar perto das pessoas.",
        cuidados:
          "Ofereça uma alimentação adequada para calopsitas, água fresca diariamente e uma gaiola espaçosa e segura. Ela também precisa de momentos fora da gaiola, sempre com supervisão.",
      },

      {
        id: 2,
        nome: "Flash",
        sexo: "Macho",
        nascimento: "20/06/2025",
        cor: "Amarelo (Lutino)",
        olhos: "Vermelho",
        caracteristicaEspecial: "Super agitado e assobia músicas",
        img: "/img/calopsita-avaliacao.png",
        desc: "Flash ama passear pela tarde, é ótimo companheiro para ouvir músicas, ama plantas e canta muito! Ele é um pet super dócil que apenas quer uma família nova para ser amado.",
        sobre:
          "Flash é uma calopsita muito ativa, alegre e dócil. Ele adora assobiar músicas e explorar o ambiente ao seu redor.",
        cuidados:
          "Mantenha água fresca, alimentação adequada e brinquedos seguros para ele se distrair. É importante oferecer espaço para ele se movimentar e interagir diariamente.",
      },

      {
        id: 3,
        nome: "Fantoche",
        sexo: "Macho",
        nascimento: "10/01/2025",
        cor: "Canela",
        olhos: "Marrom",
        caracteristicaEspecial: "Curioso e adora imitar barulhos",
        img: "/img/calopsita-avaliacao.png",
        desc: "Chegou a hora desse pequeno encontrar seu lugar no mundo. Com seu jeitinho especial, ele tem muito amor para receber e também para oferecer. Ama andar de skate!",
        sobre:
          "Fantoche é curioso, brincalhão e gosta de imitar sons. Ele adora explorar novos lugares e interagir com sua família.",
        cuidados:
          "Ofereça alimentação balanceada, água limpa e brinquedos próprios para aves. Evite deixar objetos perigosos próximos e mantenha o ambiente sempre seguro.",
      },

      {
        id: 13,
        nome: "Pipoca",
        sexo: "Fêmea",
        nascimento: "05/11/2024",
        cor: "Pérola",
        olhos: "Preto",
        caracteristicaEspecial: "Adora cafuné na cabeça",
        img: "/img/calopsita-avaliacao.png",
        desc: "Pipoca é muito carinhosa e adora ficar empoleirada no ombro enquanto você estuda ou trabalha.",
        sobre:
          "Pipoca é uma calopsita carinhosa que gosta muito de ficar próxima das pessoas. Ela adora receber carinho e companhia.",
        cuidados:
          "Mantenha uma alimentação adequada, água fresca e um espaço confortável para descanso. Reserve um tempo todos os dias para interação e atividades.",
      },
    ],
  },

  // ==================================================
  // COELHOS
  // ==================================================

  coelhos: {
    titulo: "COELHOS",
    fundo: "/img/fundo-coelho.png",
    avaliacao: "/img/coelho-avaliacao.png",

    pets: [
      {
        id: 4,
        nome: "Pompom",
        sexo: "Fêmea",
        nascimento: "15/03/2025",
        cor: "Branco e Marrom",
        olhos: "Castanho",
        caracteristicaEspecial: "Orelhas caídas e muito dócil",
        img: "/img/coelho-avaliacao.png",
        desc: "Pompom é uma coelhinha muito dócil e carinhosa que procura uma família para receber todo o seu amor.",
        sobre:
          "Pompom é uma coelhinha tranquila, dócil e carinhosa. Ela gosta de ambientes tranquilos e de receber atenção.",
        cuidados:
          "Ofereça feno de boa qualidade, água fresca e alimentação adequada para coelhos. Ela também precisa de espaço seguro para se movimentar e explorar.",
      },

      {
        id: 5,
        nome: "Bolinho e Beijinho",
        sexo: "Casal (Macho e Fêmea)",
        nascimento: "20/04/2024",
        cor: "Cinza e Branco",
        olhos: "Castanho",
        caracteristicaEspecial: "Inseparáveis, dormem grudados",
        img: "/img/coelho-avaliacao.png",
        desc: "Bolinho e Beijinho são inseparáveis e procuram uma família que possa receber os dois juntos.",
        sobre:
          "Bolinho e Beijinho são um casal muito unido. Eles gostam de ficar juntos, descansar lado a lado e explorar o ambiente.",
        cuidados:
          "Os dois devem continuar juntos e precisam de um espaço amplo e seguro. Ofereça feno, água fresca e alimentação adequada para coelhos.",
      },

      {
        id: 6,
        nome: "Pulinho",
        sexo: "Macho",
        nascimento: "10/10/2025",
        cor: "Malhado",
        olhos: "Castanho",
        caracteristicaEspecial: "Adora cenouras e dá saltos altos",
        img: "/img/coelho-avaliacao.png",
        desc: "Pulinho é um coelhinho alegre e curioso que adora brincar e explorar.",
        sobre:
          "Pulinho é alegre, curioso e cheio de energia. Ele gosta de brincar, explorar lugares novos e receber atenção.",
        cuidados:
          "Ofereça feno, água fresca e alimentação adequada. Ele precisa de espaço para correr, pular e explorar com segurança.",
      },

      {
        id: 14,
        nome: "Floco",
        sexo: "Macho",
        nascimento: "12/12/2024",
        cor: "Branco Neve",
        olhos: "Azul",
        caracteristicaEspecial: "Pelagem super macia",
        img: "/img/coelho-avaliacao.png",
        desc: "Floco é calmo, adora petiscos de feno e passa o dia tirando sonecas aconchegantes.",
        sobre:
          "Floco é um coelho calmo e tranquilo. Ele gosta de descansar e passar bastante tempo em seu cantinho confortável.",
        cuidados:
          "Mantenha o espaço limpo e seguro, ofereça feno e água fresca diariamente e disponibilize espaço suficiente para ele se movimentar.",
      },
    ],
  },

  // ==================================================
  // CÃES
  // ==================================================

  caes: {
    titulo: "CÃES",
    fundo: "/img/fundo-caes.png",
    avaliacao: "/img/cachorro-avaliacao.png",

    pets: [
      {
        id: 9,
        nome: "Rex",
        sexo: "Macho",
        nascimento: "15/05/2024",
        cor: "Preto e Marrom",
        olhos: "Castanho",
        caracteristicaEspecial: "Muito obediente e adora brincar de buscar",
        img: "/img/cachorro-avaliacao.png",
        desc: "Rex é um cão muito carinhoso e procura uma família que possa oferecer amor e cuidados.",
        sobre:
          "Rex é um cão carinhoso, obediente e cheio de energia. Ele adora brincar de buscar objetos e passar tempo com sua família.",
        cuidados:
          "Ofereça alimentação adequada, água fresca, passeios regulares e momentos de brincadeira. Também é importante manter as vacinas e consultas veterinárias em dia.",
      },

      {
        id: 10,
        nome: "Thor",
        sexo: "Macho",
        nascimento: "20/08/2023",
        cor: "Caramelo",
        olhos: "Castanho",
        caracteristicaEspecial: "Protetor, calmo e adora crianças",
        img: "/img/cachorro-avaliacao.png",
        desc: "Thor é brincalhão, companheiro e está esperando por uma família para chamar de sua.",
        sobre:
          "Thor é um cão tranquilo, companheiro e brincalhão. Ele gosta de estar perto da família e de receber carinho.",
        cuidados:
          "Precisa de alimentação adequada, água fresca, passeios e atividades físicas. Também deve ter acompanhamento veterinário e um ambiente seguro.",
      },

      {
        id: 15,
        nome: "Mel",
        sexo: "Fêmea",
        nascimento: "01/02/2025",
        cor: "Dourado",
        olhos: "Castanho Claro",
        caracteristicaEspecial: "Sociável com outros animais",
        img: "/img/cachorro-avaliacao.png",
        desc: "Mel é uma cachorrinha cheia de energia que adora correr no parque e receber carinho na barriga.",
        sobre:
          "Mel é uma cachorrinha alegre, carinhosa e sociável. Ela gosta de correr, brincar e conviver com outros animais.",
        cuidados:
          "Ofereça alimentação adequada, água fresca e passeios diários. Ela também precisa de brincadeiras, atenção e acompanhamento veterinário.",
      },
    ],
  },

  // ==================================================
  // GATOS
  // ==================================================

  gatos: {
    titulo: "GATOS",
    fundo: "/img/fundo-gato.png",
    avaliacao: "/img/gato-avaliacao.png",

    pets: [
      {
        id: 8,
        nome: "Barto",
        sexo: "Macho",
        nascimento: "15/02/2023",
        cor: "Preto e Branco",
        olhos: "Verde",
        caracteristicaEspecial: "Nenhuma",
        fiv: "Negativo",
        felv: "Negativo",
        img: "/img/gato-avaliacao.png",
        desc: "Barto é um gato carinhoso que procura um lar cheio de amor.",
        sobre:
          "Barto é um gato carinhoso e tranquilo que gosta de receber atenção e ter um cantinho confortável para descansar.",
        cuidados:
          "Ofereça alimentação adequada, água fresca e uma caixa de areia sempre limpa. Disponibilize brinquedos e locais seguros para ele descansar e brincar.",
      },

      {
        id: 11,
        nome: "Mimi",
        sexo: "Fêmea",
        nascimento: "20/04/2024",
        cor: "Branco e Cinza",
        olhos: "Azul",
        caracteristicaEspecial: "Muito carinhosa, ronrona fácil",
        fiv: "Negativo",
        felv: "Negativo",
        img: "/img/gato-avaliacao.png",
        desc: "Mimi é uma gata tranquila e carinhosa que está esperando por uma família.",
        sobre:
          "Mimi é uma gata muito carinhosa e tranquila. Ela gosta de receber atenção e de ficar perto de sua família.",
        cuidados:
          "Mantenha água fresca, alimentação adequada e a caixa de areia limpa. Ofereça brinquedos, locais confortáveis para descanso e acompanhamento veterinário.",
      },

      {
        id: 12,
        nome: "Nino",
        sexo: "Macho",
        nascimento: "10/09/2023",
        cor: "Rajado (Tabby)",
        olhos: "Amarelo",
        caracteristicaEspecial: "Adora caçar brinquedos de pena",
        fiv: "Negativo",
        felv: "Negativo",
        img: "/img/gato-avaliacao.png",
        desc: "Nino é curioso, brincalhão e adora receber carinho.",
        sobre:
          "Nino é um gato curioso e brincalhão. Ele gosta especialmente de brincar com brinquedos que imitam pequenos animais.",
        cuidados:
          "Ofereça alimentação adequada, água fresca e caixa de areia limpa. Reserve momentos para brincadeiras e disponibilize lugares seguros para ele descansar.",
      },
    ],
  },
};

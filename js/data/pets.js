/*
  Dados do catálogo.
  Para adicionar um pet: inclua um objeto em `itens` e salve a foto em assets/img/pets/.
  `avaliacao` é a imagem decorativa (recorte) exibida ao lado das avaliações da categoria,
  salva em assets/img/avaliacoes/. Se o arquivo não existir, a imagem simplesmente não aparece.
*/
window.PETS = {
  caes: {
    titulo: "Cães",
    campo: "Sexo",
    avaliacao: "avaliacao-caes.png",
    avaliacaoAlt: "Filhote de golden retriever deitado",
    itens: [
      {
        id: "caes-cacau",
        nome: "Cacau",
        nasc: "02/2023",
        extra: "Fêmea",
        sexo: "Fêmea",
        raca: "SRD",
        cor: "Caramelo",
        img: "cacau.jpg",
        txt: "Tem um coração enorme e só está esperando alguém para compartilhar todo esse amor. Ela merece uma família que cuide, proteja e esteja ao seu lado em todos os momentos. Que tal ser você a pessoa que vai mudar a história dela?",
        historia: "Cacau chegou ao abrigo com um olhar doce e um coração cheio de afeto. Mesmo com o tempo vivido em rua, ela continua sendo uma cadelinha muito carinhosa, tranquila e cheia de esperança de encontrar um lar que a acolha com cuidado e amor.",
        cuidados: "Ela precisa de rotina, carinho diário, alimentação balanceada e atenção à saúde. Um espaço seguro e atividades leves ajudam ela a se sentir acolhida e feliz.",
        caracteristicas: ["Carinhosa", "Tranquila", "Brincalhona"]
      },
      {
        id: "caes-chefao",
        nome: "Chefão",
        nasc: "07/2025",
        extra: "Macho",
        sexo: "Macho",
        raca: "SRD",
        cor: "Preto e marrom",
        img: "chefao.jpg",
        txt: "Prepare-se para ganhar um companheiro cheio de alegria! Ele adora brincar, receber carinho e transformar qualquer dia comum em um momento especial. Só falta uma coisa para ele ficar completo: uma família para chamar de sua.",
        historia: "Chefão é um filhotinho cheio de energia e curiosidade. Ele gosta de companhia, vive animado e busca alguém que o acolha com paciência e muito amor para crescer ao lado de uma família.",
        cuidados: "Ele precisa de exercícios leves, atenção ao desenvolvimento e um lar que ofereça carinho, segurança e estimulantes para brincar.",
        caracteristicas: ["Energetico", "Curioso", "Amigável"]
      },
      {
        id: "caes-mel",
        nome: "Mel",
        nasc: "01/2026",
        extra: "Fêmea",
        sexo: "Fêmea",
        raca: "SRD",
        cor: "Dourado",
        img: "mel.jpg",
        txt: "Por trás desse olhar existe uma cadelinha cheia de amor para dar e uma esperança enorme de encontrar um lar. Talvez o próximo capítulo da história dela possa ser ao seu lado.",
        historia: "Mel é uma cadelinha meiga, observadora e muito carinhosa. Mesmo sendo tão nova, ela já demonstra um jeito doce de se conectar com as pessoas e encanta quem a conhece.",
        cuidados: "Ela precisa de alimentação adequada para filhotes, atenção aos cuidados veterinários e muito afeto para se adaptar ao novo lar.",
        caracteristicas: ["Meiga", "Observadora", "Carinhosa"]
      }
    ]
  },

  gatos: {
    titulo: "Gatos",
    campo: "Sexo",
    avaliacao: "avaliacao-gatos.png",
    avaliacaoAlt: "Gato listrado em pé",
    itens: [
      {
        id: "gatos-pirata",
        nome: "Pirata",
        nasc: "08/2026",
        extra: "Macho",
        sexo: "Macho",
        raca: "SRD",
        cor: "Cinza e preto",
        img: "pirata.jpg",
        txt: "Ser diferente não diminui todo o amor que ele tem para oferecer. Com os cuidados e adaptações necessários, ele pode ser um companheiro incrível. Tudo o que precisa é de uma família que enxergue seu coração.",
        historia: "Pirata tem um olhar atento e uma personalidade forte, mas muito gentil. Ele espera uma casa com rotina, carinho e um cantinho tranquilo para se sentir em segurança.",
        cuidados: "Mantenha a rotina de alimentação, brinquedos e atenção diária. Gatos de rua podem precisar de tempo para ganhar confiança e se adaptar ao lar.",
        caracteristicas: ["Independente", "Observador", "Gentil"]
      },
      {
        id: "gatos-luna",
        nome: "Luna",
        nasc: "07/2025",
        extra: "Fêmea",
        sexo: "Fêmea",
        raca: "SRD",
        cor: "Bege",
        img: "luna.jpg",
        txt: "Uma pequena exploradora em busca de um lar para chamar de seu! Curiosa, encantadora e cheia de personalidade, ela está pronta para conquistar uma família com muito carinho e ronronadas. Será que o próximo lar dela pode ser o seu?",
        historia: "Luna é uma gatinha curiosa, delicada e muito cheia de personalidade. Ela gosta de explorar, observar e receber atenção com calma, o que a torna uma companhia encantadora.",
        cuidados: "Ela aprecia um ambiente com locais para descansar, brinquedos e a companhia de pessoas gentis. Uma rotina de carinho e cuidados também ajuda na adaptação.",
        caracteristicas: ["Curiosa", "Fofa", "Carinhosa"]
      },
      {
        id: "gatos-bolota",
        nome: "Bolota",
        nasc: "08/2026",
        extra: "Fêmea",
        sexo: "Fêmea",
        raca: "SRD",
        cor: "Cinza",
        img: "bolota.jpg",
        txt: "Delicada, carinhosa e cheia de charme! Ela está esperando uma família que possa oferecer muito amor, cuidado e um cantinho para chamar de lar. Que tal deixar essa fofura fazer parte da sua vida?",
        historia: "Bolota é uma gatinha tranquila e muito afetuosa. Ela se aperta em cantinhos confortáveis e responde bem ao carinho simples, o que a torna uma companheira de lar muito especial.",
        cuidados: "Ela precisa de atenção diária, ambiente seguro e alimentação adequada. Com carinho e rotina, ela se sente em casa muito rápido.",
        caracteristicas: ["Delicada", "Carinhosa", "Reservada"]
      }
    ]
  },

  coelhos: {
    titulo: "Coelhos",
    campo: "Cor",
    avaliacao: "avaliacao-coelhos.png",
    avaliacaoAlt: "Dois coelhos lado a lado",
    itens: [
      {
        id: "coelhos-pompom",
        nome: "Pompom",
        nasc: "12/2025",
        extra: "Castanho claro",
        sexo: "Macho",
        raca: "Coelho doméstico",
        cor: "Castanho claro",
        img: "pompom.jpg",
        txt: "Esse pequeno chegou até nós precisando de carinho e de uma nova chance. Aos poucos, foi mostrando seu jeitinho doce e curioso. Agora, está pronto para encontrar uma família que possa continuar escrevendo uma história cheia de amor ao seu lado.",
        historia: "Pompom é um coelhinho curioso, muito atento ao ambiente e cheio de personalidade. Ele se adapta melhor quando o lar oferece tranquilidade, espaço e cuidados gentis.",
        cuidados: "Coelhos precisam de espaço para se movimentar, alimentação apropriada e atenção à saúde. Um ambiente tranquilo e sem riscos ajuda muito na adaptação.",
        caracteristicas: ["Curioso", "Sociável", "Dócil"]
      },
      {
        id: "coelhos-bolinho-beijinho",
        nome: "Bolinho e Beijinho",
        nasc: "09/2026",
        extra: "Branco",
        sexo: "Casal",
        raca: "Coelho doméstico",
        cor: "Branco",
        img: "bolinho.jpg",
        txt: "Esses dois coelhinhos ainda são filhotinhos e estão começando a descobrir o mundo juntos. Sempre pertinho um do outro, eles são uma duplinha cheia de fofura, curiosidade e muito carinho.",
        historia: "Bolinho e Beijinho vivem juntos e se sentem mais seguros quando há companhia. Eles são fofinhos, curiosos e aguardam uma família que entenda a importância de um lar tranquilo e cheio de atenção.",
        cuidados: "Eles precisam de espaço para se movimentar, alimentação adequada e muito cuidado com higiene e saúde. O contato suave e a rotina ajudam na adaptação.",
        caracteristicas: ["Fofos", "Curiosos", "Apegados"]
      },
      {
        id: "coelhos-pulinho",
        nome: "Pulinho",
        nasc: "06/2025",
        extra: "Creme",
        sexo: "Fêmea",
        raca: "Coelho doméstico",
        cor: "Creme",
        img: "pulinho.jpg",
        txt: "Esse fofinho também está esperando pela sua segunda chance. Com seu jeitinho único e encantador, conquistou todos ao seu redor. Agora, seu maior desejo é encontrar uma família responsável onde possa viver feliz, amado e cuidado para sempre.",
        historia: "Pulinho é um coelhinho alegre, delicado e muito meigo. Ele conquista a todos com a sua calma e com o jeito curioso de olhar para o mundo ao redor.",
        cuidados: "Um lar tranquilo, alimentação apropriada e espaço seguro fazem toda a diferença. Carinho diário e atenção à saúde também são essenciais.",
        caracteristicas: ["Meigo", "Calmo", "Curioso"]
      }
    ]
  },

  calopsitas: {
    titulo: "Calopsitas",
    campo: null,
    avaliacao: "avaliacao-calopsitas.png",
    avaliacaoAlt: "Calopsita de crista amarela",
    itens: [
      {
        id: "calopsitas-raven",
        nome: "Raven",
        nasc: "03/2024",
        sexo: "Fêmea",
        raca: "Calopsita",
        cor: "Amarela",
        img: "raven.jpg",
        txt: "Pequena no tamanho, mas enorme no coração, essa calopsita sonha com um lar para chamar de seu. Ela merece uma família que enxergue todo o encanto que existe nela e esteja disposta a oferecer amor, paciência e muitos cuidados.",
        historia: "Raven é uma calopsita bem sociável e observadora, que ama receber atenção com calma e se sentir segura em um ambiente acolhedor.",
        cuidados: "Ela precisa de ambiente arejado, brincadeiras e atenção aos cuidados com alimentação e higiene. A rotina e o carinho ajudam na adaptação.",
        caracteristicas: ["Sociável", "Curiosa", "Interativa"]
      },
      {
        id: "calopsitas-flash",
        nome: "Flash",
        nasc: "06/2025",
        sexo: "Macho",
        raca: "Calopsita",
        cor: "Amarela e azul",
        img: "flash.jpg",
        txt: "Flash ama passear pela tarde, um ótimo companheiro para ouvir músicas, ama plantas e canta muito! Ele é um pet super dócil que apenas quer uma família nova para ser amado.",
        historia: "Flash é uma calopsita muito ativa e alegre. Ele se comunica com bastante expressão, gosta de companhia e transmite uma energia muito especial para quem percebe seu jeitinho.",
        cuidados: "Ele precisa de ambiente enriquecido, cuidado com alimentação e atenção à saúde. Um lar tranquilo e cheio de estímulos favoráveis faz diferença.",
        caracteristicas: ["Alegre", "Interativo", "Vocal"]
      },
      {
        id: "calopsitas-fantoche",
        nome: "Fantoche",
        nasc: "01/2025",
        sexo: "Macho",
        raca: "Calopsita",
        cor: "Amarela e branca",
        img: "fantoche.jpg",
        txt: "Chegou a hora desse pequeno encontrar seu lugar no mundo. Com seu jeitinho especial, ele tem muito amor para receber e também para oferecer. Ama andar de skate!",
        historia: "Fantoche tem um jeito único de se relacionar com o ambiente e a rotina. Ele gosta de atenção, movimento e um lar que ofereça conforto e carinho todos os dias.",
        cuidados: "Ele precisa de estímulo, alimentação adequada e cuidado com higiene e bem-estar. Dinâmica tranquila e afeto constantes ajudam a dar segurança.",
        caracteristicas: ["Charmoso", "Ativo", "Carinhoso"]
      }
    ]
  }
};

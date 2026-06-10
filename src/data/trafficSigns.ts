import { TrafficSign } from '../types';

export const trafficSigns: TrafficSign[] = [
  // --- REGULAMENTAÇÃO (Vermelho/Branco/Preto, Circulares ou Especiais) ---
  {
    id: "R-1",
    name: "Parada Obrigatória",
    code: "R-1",
    description: "Indica ao condutor que ele deve parar totalmente o seu veículo antes de entrar ou cruzar a via ou pista transversal, avançando somente após certificar-se de que pode fazê-lo com segurança absoluta.",
    category: "regulamentacao",
    svgType: "stop"
  },
  {
    id: "R-2",
    name: "Dê a Preferência",
    code: "R-2",
    description: "Indica ao condutor a obrigatoriedade de dar preferência de passagem aos veículos que transitam pela via transversal à qual se aproxima. A parada só é obrigatória se houver tráfego vindo.",
    category: "regulamentacao",
    svgType: "yield"
  },
  {
    id: "R-3",
    name: "Sentido Proibido",
    code: "R-3",
    description: "Indica que o sentido de circulação da via ou pista é proibido para qualquer veículo automotor ou de tração a partir do ponto onde a sinalização está instalada.",
    category: "regulamentacao",
    svgType: "prohibited",
    extraData: "sentido_proibido"
  },
  {
    id: "R-19-40",
    name: "Velocidade Máxima Permitida (40 km/h)",
    code: "R-19",
    description: "Regulamenta o limite máximo de velocidade em 40 km/h para a via sinalizada. O condutor não pode transitar em velocidade superior a esta sob risco de multa e perda de pontos na CNH.",
    category: "regulamentacao",
    svgType: "speed_limit",
    extraData: "40"
  },
  {
    id: "R-19-60",
    name: "Velocidade Máxima Permitida (60 km/h)",
    code: "R-19",
    description: "Regulamenta o limite máximo de velocidade em 60 km/h. Comum em avenidas e vias arteriais urbanas para organizar o fluxo com segurança.",
    category: "regulamentacao",
    svgType: "speed_limit",
    extraData: "60"
  },
  {
    id: "R-19-80",
    name: "Velocidade Máxima Permitida (80 km/h)",
    code: "R-19",
    description: "Regulamenta o limite máximo de velocidade em 80 km/h. É a velocidade regulamentar para vias rápidas urbanas ou estradas sem pavimentação se desprovidas de placas específicas.",
    category: "regulamentacao",
    svgType: "speed_limit",
    extraData: "80"
  },
  {
    id: "R-4a",
    name: "Proibido Virar à Esquerda",
    code: "R-4a",
    description: "Indica ao condutor a proibição de realizar a conversão (virar) à esquerda na interseção ou ponto sinalizado.",
    category: "regulamentacao",
    svgType: "prohibited_turn_left"
  },
  {
    id: "R-4b",
    name: "Proibido Virar à Direita",
    code: "R-4b",
    description: "Indica ao condutor a proibição de realizar a conversão (virar) à direita na interseção ou ponto sinalizado.",
    category: "regulamentacao",
    svgType: "prohibited_turn_right"
  },
  {
    id: "R-5a",
    name: "Proibido Retornar à Esquerda",
    code: "R-5a",
    description: "Regulamenta a proibição de realizar a manobra de retorno para o sentido oposto à esquerda.",
    category: "regulamentacao",
    svgType: "prohibited_u_turn"
  },
  {
    id: "R-6a",
    name: "Proibido Estacionar",
    code: "R-6a",
    description: "Indica a proibição temporária ou permanente de estacionamento de veículos no trecho da via abrangido pela sinalização. Paradas rápidas para embarque/desembarque são permitidas.",
    category: "regulamentacao",
    svgType: "prohibited_parking"
  },
  {
    id: "R-6b",
    name: "Proibido Parar e Estacionar",
    code: "R-6b",
    description: "Assinala ao condutor que é expressamente proibida tanto a parada rápida quanto o estacionamento de veículos, a qualquer hora do dia ou da noite.",
    category: "regulamentacao",
    svgType: "prohibited_stopping"
  },
  {
    id: "R-7",
    name: "Proibido Ultrapassar",
    code: "R-7",
    description: "Regulamenta a proibição de realizar ultrapassagens em trechos de pistas simples com visibilidade comprometida ou pontos críticos.",
    category: "regulamentacao",
    svgType: "prohibited_overtaking"
  },
  {
    id: "R-9",
    name: "Proibido Trânsito de Bicicletas",
    code: "R-9",
    description: "Indica a proibição do trânsito de bicicletas na área, via ou trecho sob sinalização, para garantir a segurança dos ciclistas.",
    category: "regulamentacao",
    svgType: "prohibited_bikes"
  },
  {
    id: "R-24a",
    name: "Sentido de Circulação da Via",
    code: "R-24a",
    description: "Regulamenta o sentido de circulação de fluxo na via ou pista. Todos os veículos devem seguir no sentido indicado pela seta.",
    category: "regulamentacao",
    svgType: "double_way"
  },
  {
    id: "R-28",
    name: "Velocidade Mínima Permitida",
    code: "R-28",
    description: "Regulamenta o limite mínimo de velocidade (por exemplo, 30 km/h) em que o veículo é obrigado a transitar, visando a fluidez do tráfego.",
    category: "regulamentacao",
    svgType: "speed_min",
    extraData: "30"
  },
  
  // --- ADVERTÊNCIA (Amarelo/Preto, Formato Losango) ---
  {
    id: "A-1a",
    name: "Curva acentuada à Esquerda",
    code: "A-1a",
    description: "Adverte o condutor da existência de uma curva extremamente fechada (acentuada) à esquerda na via à frente. Reduza a velocidade preventivamente.",
    category: "advertencia",
    svgType: "warning_curve",
    extraData: "esquerda"
  },
  {
    id: "A-1b",
    name: "Curva acentuada à Direita",
    code: "A-1b",
    description: "Adverte o condutor sobre a existência de uma curva muito fechada para a direita. Exige redução de marcha e posicionamento defensivo.",
    category: "advertencia",
    svgType: "warning_curve",
    extraData: "direita"
  },
  {
    id: "A-2a",
    name: "Curva à Direita",
    code: "A-2a",
    description: "Adverte o condutor da existência de uma curva à direita na via à frente. Reduza a velocidade de forma preventiva.",
    category: "advertencia",
    svgType: "warning_curve_moderate",
    extraData: "direita"
  },
  {
    id: "A-2b",
    name: "Curva à Esquerda",
    code: "A-2b",
    description: "Adverte o condutor da aproximação de uma curva para a esquerda na via à frente. Reduza a velocidade de forma preventiva.",
    category: "advertencia",
    svgType: "warning_curve_moderate",
    extraData: "esquerda"
  },
  {
    id: "A-14",
    name: "Semáforo à Frente",
    code: "A-14",
    description: "Adverte o condutor da aproximação de uma interseção controlada por semáforo eletrônico onde a visibilidade imediata pode ser comprometida.",
    category: "advertencia",
    svgType: "warning_traffic_light"
  },
  {
    id: "A-15",
    name: "Obras na Via",
    code: "A-15",
    description: "Adverte o condutor sobre a presença de obras na pista ou adjacências, demandando velocidade muito reduzida e atenção especial a operários e maquinários.",
    category: "advertencia",
    svgType: "warning_works"
  },
  {
    id: "A-22",
    name: "Passagem de Escolares",
    code: "A-22",
    description: "Adverte o condutor da proximidade de um trecho de via com trânsito frequente de escolares e crianças atravessando.",
    category: "advertencia",
    svgType: "warning_school"
  },
  {
    id: "A-26b",
    name: "Passagem em Nível com Barreira",
    code: "A-26b",
    description: "Adverte o condutor da existência de um cruzamento rodoferroviário (passagem em nível) dotado de cancela, barreira ou portão à frente.",
    category: "advertencia",
    svgType: "warning_barrier"
  },
  {
    id: "A-27",
    name: "Pista Escorregadia",
    code: "A-27",
    description: "Adverte o condutor que o trecho de pista à frente apresenta condições escorregadias decorrente de umidade, óleo ou asfalto liso.",
    category: "advertencia",
    svgType: "warning_slippery"
  },
  {
    id: "A-29",
    name: "Saliência ou Lombada",
    code: "A-29",
    description: "Adverte o condutor da existência de uma saliência, quebra-molas ou lombada física instalada no pavimento à frente.",
    category: "advertencia",
    svgType: "warning_bump"
  },
  {
    id: "A-32b",
    name: "Passagem de Pedestres",
    code: "A-32b",
    description: "Adverte o condutor sobre uma área adiante com travessia frequente de pedestres, geralmente demarcada por faixa zebrada na pista.",
    category: "advertencia",
    svgType: "warning_pedestrian"
  },

  // --- SINAIS LUMINOSOS ---
  {
    id: "LUM-1",
    name: "Semáforo Tríplice (Motoristas)",
    description: "Controla o fluxo de veículos com 3 posições: VERMELHO indica parada obrigatória; AMARELO indica atenção imediata para parar o veículo (salvo se isso causar freada de pânico e colisão traseira); VERDE indica tráfego livre com segurança de passagem.",
    category: "luminosos",
    svgType: "light_regular"
  },
  {
    id: "LUM-2",
    name: "Semáforo Bidirecional (Pedestres)",
    description: "Sinalizador específico de pedestre. VERMELHO indica perigo e proibição total de início de travessia; VERDE indica que o pedestre possui preferência no cruzamento sinalizado sobre a faixa.",
    category: "luminosos",
    svgType: "light_pedestrian"
  },

  // --- TOQUES DE BUZINA ---
  {
    id: "BUZ-1",
    name: "Buzina: Um Toque Breve (Advertência)",
    description: "Utilizado com civilidade e em toques curtos apenas para advertir pedestres distraídos na travessia ou motoristas prestes a realizar manobra perigosa (exemplo: saída incorreta de vagas). Permitido a qualquer hora fora do horário de silêncio.",
    category: "buzinas",
    svgType: "horn_short",
    extraData: "1 toque breve"
  },
  {
    id: "BUZ-2",
    name: "Buzina: Uso Prolongado ou Sucessivo",
    description: "Expressamente PROIBIDO pelo Artigo 224 do CTB. Constitui infração leve com perca de pontos. A buzina de veículos nunca pode ser utilizada para manifestações festivas, brigas de trânsito ou como campainha predial residencial.",
    category: "buzinas",
    svgType: "horn_long",
    extraData: "Toque prolongado"
  },

  // --- SINAIS HORIZONTAIS ---
  {
    id: "HOR-1",
    name: "Linha Contínua Simples Amarela",
    description: "Separadora de via dupla. Indica que o condutor NÃO pode efetuar manobra de ultrapassagem em nenhuma das direções pavimentadas. Transpor essa linha é infração gravíssima perigosa.",
    category: "horizontais",
    svgType: "line_continuous",
    extraData: "amarela"
  },
  {
    id: "HOR-2",
    name: "Linha Seccionada Branca/Amarela",
    description: "Indica via seccionada por traços pontilhados. Permite realizar ultrapassagens e manobras de mudança de faixa cruzada com total segurança e sinalização prévia.",
    category: "horizontais",
    svgType: "line_broken"
  },
  {
    id: "HOR-3",
    name: "Linha Dupla Contínua Amarela",
    description: "Indica proibição dupla total e absoluta de ultrapassem nos dois fluxos de trânsito. Muito comum em curvas de serras de mão dupla e vias com alta taxa de acidentes frontais severos.",
    category: "horizontais",
    svgType: "line_double"
  },

  // --- GESTOS DO AGENTE E CONDUTOR ---
  {
    id: "GES-1",
    name: "Agente: Braço em Vertical",
    description: "Agente de trânsito com braço levantado verticalmente apresentando a palma da mão para a frente. Ordem de parada total imediata e incondicional para todos os condutores da via.",
    category: "gestos",
    svgType: "gest_agent_stop"
  },
  {
    id: "GES-2",
    name: "Condutor: Braço Horizontal",
    description: "Condutor estende o braço esquerdo horizontalmente para o lado de fora do veículo. Indica claramente aos motoristas traseiros que o carro efetuará conversão ou mudança de faixa para a Esquerda.",
    category: "gestos",
    svgType: "gest_driver_left"
  },
  {
    id: "GES-3",
    name: "Condutor: Braço dobrado para cima",
    description: "Condutor estende o braço esquerdo e dobra-o em ângulo de 90 graus apontando para o alto. Indica que o automóvel pretende realizar uma conversão de tráfego para a Direita.",
    category: "gestos",
    svgType: "gest_driver_right"
  },
  {
    id: "GES-4",
    name: "Condutor: Braço oscilando verticalmente",
    description: "Condutor estende o braço esquerdo e realiza movimentos oscilantes suaves de cima para baixo. Sinaliza aos motoristas que reduzam a velocidade ou parem o veículo decorrente de perigo à frente.",
    category: "gestos",
    svgType: "gest_driver_slow"
  }
];

import { TrafficSign } from '../types';

export const trafficSigns: TrafficSign[] = [
  // --- REGULAMENTAÇÃO (Vermelho/Branco/Preto, Circulares ou Especiais) ---
  {
    id: "R-1",
    name: "Parada Obrigatória",
    code: "R-1",
    description: "Indica ao condutor que ele deve parar totalmente o seu veículo antes de entrar ou cruzar a via ou pista transversal, avançando somente após certificar-se de que pode fazê-lo com segurança absoluta.",
    category: "regulamentacao",
    svgType: "R-1"
  },
  {
    id: "R-2",
    name: "Dê a Preferência",
    code: "R-2",
    description: "Indica ao condutor a obrigatoriedade de dar preferência de passagem aos veículos que transitam pela via transversal à qual se aproxima. A parada só é obrigatória se houver tráfego vindo.",
    category: "regulamentacao",
    svgType: "R-2"
  },
  {
    id: "R-3",
    name: "Sentido Proibido",
    code: "R-3",
    description: "Indica que o sentido de circulação da via ou pista é proibido para qualquer veículo a partir do ponto onde a sinalização está instalada.",
    category: "regulamentacao",
    svgType: "R-3"
  },
  {
    id: "R-4a",
    name: "Proibido Virar à Esquerda",
    code: "R-4a",
    description: "Indica ao condutor a proibição de realizar a conversão (virar) à esquerda na interseção ou ponto sinalizado.",
    category: "regulamentacao",
    svgType: "R-4a"
  },
  {
    id: "R-4b",
    name: "Proibido Virar à Direita",
    code: "R-4b",
    description: "Indica ao condutor a proibição de realizar a conversão (virar) à direita na interseção ou ponto sinalizado.",
    category: "regulamentacao",
    svgType: "R-4b"
  },
  {
    id: "R-5a",
    name: "Proibido Retornar à Esquerda",
    code: "R-5a",
    description: "Regulamenta a proibição de realizar a manobra de retorno para o sentido oposto à esquerda.",
    category: "regulamentacao",
    svgType: "R-5a"
  },
  {
    id: "R-5b",
    name: "Proibido Retornar à Direita",
    code: "R-5b",
    description: "Regulamenta a proibição de realizar a manobra de retorno para o sentido oposto à direita.",
    category: "regulamentacao",
    svgType: "R-5b"
  },
  {
    id: "R-6a",
    name: "Proibido Estacionar",
    code: "R-6a",
    description: "Indica a proibição temporária ou permanente de estacionamento de veículos no trecho da via abrangido pela sinalização. Paradas rápidas para embarque/desembarque são permitidas.",
    category: "regulamentacao",
    svgType: "R-6a"
  },
  {
    id: "R-6b",
    name: "Estacionamento Regulamentado",
    code: "R-6b",
    description: "Indica que o estacionamento de veículos na via pública é permitido e regulamentado, sujeitando-se às condições estabelecidas pela sinalização e regras locais.",
    category: "regulamentacao",
    svgType: "R-6b"
  },
  {
    id: "R-6c",
    name: "Proibido Parar e Estacionar",
    code: "R-6c",
    description: "Assinala ao condutor que é expressamente proibida tanto a parada rápida quanto o estacionamento de veículos, a qualquer hora do dia ou da noite.",
    category: "regulamentacao",
    svgType: "R-6c"
  },
  {
    id: "R-7",
    name: "Proibido Ultrapassar",
    code: "R-7",
    description: "Regulamenta a proibição de realizar ultrapassagens em trechos de pistas simples com visibilidade comprometida ou pontos críticos.",
    category: "regulamentacao",
    svgType: "R-7"
  },
  {
    id: "R-8a",
    name: "Proibido Mudar de Faixa ou Pista da Esquerda para a Direita",
    code: "R-8a",
    description: "Indica a proibição de transição ou mudança de faixa de rolamento do sentido da esquerda para o sentido da direita.",
    category: "regulamentacao",
    svgType: "R-8a"
  },
  {
    id: "R-8b",
    name: "Proibido Mudar de Faixa ou Pista da Direita para a Esquerda",
    code: "R-8b",
    description: "Indica a proibição de transição ou mudança de faixa de rolamento do sentido da direita para o sentido da esquerda.",
    category: "regulamentacao",
    svgType: "R-8b"
  },
  {
    id: "R-9",
    name: "Proibido Trânsito de Caminhões",
    code: "R-9",
    description: "Indica a proibição do trânsito de caminhões e veículos de carga pesada na área, via ou trecho sob sinalização.",
    category: "regulamentacao",
    svgType: "R-9"
  },
  {
    id: "R-10",
    name: "Proibido Trânsito de Veículos Automotores",
    code: "R-10",
    description: "Indica que a via ou área sinalizada é de trânsito proibido para qualquer veículo automotor.",
    category: "regulamentacao",
    svgType: "R-10"
  },
  {
    id: "R-11",
    name: "Proibido Trânsito de Veículos de Tração Animal",
    code: "R-11",
    description: "Indica a proibição de trânsito de carroças, charretes e qualquer outro veículo tracionado por animais.",
    category: "regulamentacao",
    svgType: "R-11"
  },
  {
    id: "R-12",
    name: "Proibido Trânsito de Bicicletas",
    code: "R-12",
    description: "Indica a proibição do trânsito de bicicletas na área, via ou trecho sob sinalização, para garantir a segurança dos ciclistas.",
    category: "regulamentacao",
    svgType: "R-12"
  },
  {
    id: "R-13",
    name: "Proibido Trânsito de Tratores e Máquinas de Obras",
    code: "R-13",
    description: "Regulamenta que tratores agrícolas, retroescavadeiras e máquinas pesadas estão proibidos de trafegar pela via.",
    category: "regulamentacao",
    svgType: "R-13"
  },
  {
    id: "R-14",
    name: "Peso Bruto Total Máximo Permitido",
    code: "R-14",
    description: "Regulamenta o peso bruto total limite para veículos trafegarem na via. Veículos acima do peso são proibidos.",
    category: "regulamentacao",
    svgType: "R-14",
    extraData: "10 t"
  },
  {
    id: "R-15",
    name: "Altura Máxima Permitida",
    code: "R-15",
    description: "Indica a altura limite para a passagem segura sob viadutos, pontes ou fiações. Veículos mais altos são proibidos.",
    category: "regulamentacao",
    svgType: "R-15",
    extraData: "4,0 m"
  },
  {
    id: "R-16",
    name: "Largura Máxima Permitida",
    code: "R-16",
    description: "Indica a largura máxima permitida para veículos que transitam na via ou passam por obstáculos estreitos.",
    category: "regulamentacao",
    svgType: "R-16",
    extraData: "3,0 m"
  },
  {
    id: "R-17",
    name: "Peso Máximo Permitido por Eixo",
    code: "R-17",
    description: "Regulamenta o limite máximo de peso transmitido ao pavimento por eixo de veículo comercial.",
    category: "regulamentacao",
    svgType: "R-17",
    extraData: "2 t"
  },
  {
    id: "R-18",
    name: "Comprimento Máximo Permitido",
    code: "R-18",
    description: "Regulamenta a extensão/comprimento total máximo permitido para veículos ou combinações de veículos.",
    category: "regulamentacao",
    svgType: "R-18",
    extraData: "10 m"
  },
  {
    id: "R-19",
    name: "Velocidade Máxima Permitida",
    code: "R-19",
    description: "Regulamenta o limite máximo de velocidade em km/h para a via sinalizada. O condutor não pode transitar em velocidade superior.",
    category: "regulamentacao",
    svgType: "R-19",
    extraData: "80"
  },
  {
    id: "R-20",
    name: "Proibido Acionar Buzina ou Sinal Sonoro",
    code: "R-20",
    description: "Regulamenta a proibição de acionar a buzina ou outros sinais sonoros de forma excessiva ou em locais restritos (ex: hospitais).",
    category: "regulamentacao",
    svgType: "R-20"
  },
  {
    id: "R-21",
    name: "Alfândega",
    code: "R-21",
    description: "Indica a presença de uma repartição alfandegária, onde a parada é obrigatória para fiscalização e liberação aduaneira.",
    category: "regulamentacao",
    svgType: "R-21"
  },
  {
    id: "R-22",
    name: "Uso Obrigatório de Corrente",
    code: "R-22",
    description: "Indica a obrigatoriedade do uso de correntes acopladas aos pneus para trafegar em vias cobertas por neve, lama ou de difícil aderência.",
    category: "regulamentacao",
    svgType: "R-22"
  },
  {
    id: "R-23",
    name: "Conserve-se à Direita",
    code: "R-23",
    description: "Regulamenta a obrigação de os condutores de veículos manterem-se na faixa da direita, liberando as faixas da esquerda para ultrapassagens.",
    category: "regulamentacao",
    svgType: "R-23"
  },
  {
    id: "R-24a",
    name: "Sentido de Circulação da Via/Pista",
    code: "R-24a",
    description: "Regulamenta o sentido único de circulação de fluxo na via ou pista. Todos os veículos devem seguir no sentido indicado pela seta.",
    category: "regulamentacao",
    svgType: "R-24a"
  },
  {
    id: "R-24b",
    name: "Passagem Obrigatória",
    code: "R-24b",
    description: "Indica ao condutor que é obrigatório transitar pelo lado da placa indicado pela seta, desviando de obstáculos na pista.",
    category: "regulamentacao",
    svgType: "R-24b"
  },
  {
    id: "R-25a",
    name: "Vire à Esquerda",
    code: "R-25a",
    description: "Indica a obrigatoriedade de virar à esquerda na interseção à frente, proibindo seguir em frente ou virar à direita.",
    category: "regulamentacao",
    svgType: "R-25a"
  },
  {
    id: "R-25b",
    name: "Vire à Direita",
    code: "R-25b",
    description: "Indica a obrigatoriedade de virar à direita na interseção à frente, proibindo seguir em frente ou virar à esquerda.",
    category: "regulamentacao",
    svgType: "R-25b"
  },
  {
    id: "R-25c",
    name: "Siga em Frente ou à Esquerda",
    code: "R-25c",
    description: "Regulamenta que os movimentos permitidos são apenas seguir em frente ou converter à esquerda.",
    category: "regulamentacao",
    svgType: "R-25c"
  },
  {
    id: "R-25d",
    name: "Siga em Frente ou à Direita",
    code: "R-25d",
    description: "Regulamenta que os movimentos permitidos são apenas seguir em frente ou converter à direita.",
    category: "regulamentacao",
    svgType: "R-25d"
  },
  {
    id: "R-26",
    name: "Siga em Frente",
    code: "R-26",
    description: "Regulamenta que o condutor deve obrigatoriamente continuar na mesma via em frente, proibindo quaisquer conversões.",
    category: "regulamentacao",
    svgType: "R-26"
  },
  {
    id: "R-27",
    name: "Veículos de Grande Porte, mantenham-se à Direita",
    code: "R-27",
    description: "Regulamenta a obrigação de ônibus, caminhões e veículos lentos ou pesados trafegarem estritamente nas faixas da direita.",
    category: "regulamentacao",
    svgType: "R-27"
  },
  {
    id: "R-28",
    name: "Duplo Sentido de Circulação",
    code: "R-28",
    description: "Regulamenta que a via ou pista passa a ter trânsito nos dois sentidos (mão dupla), exigindo cautela nas faixas opostas.",
    category: "regulamentacao",
    svgType: "R-28"
  },
  {
    id: "R-29",
    name: "Proibido Trânsito de Pedestres",
    code: "R-29",
    description: "Indica que o trânsito de pedestres é expressamente proibido na via, pista ou área sinalizada por questões de segurança.",
    category: "regulamentacao",
    svgType: "R-29"
  },
  {
    id: "R-30",
    name: "Pedestre, ande pela Esquerda",
    code: "R-30",
    description: "Regulamenta a obrigatoriedade de os pedestres caminharem pela esquerda da via pública (de frente para o fluxo).",
    category: "regulamentacao",
    svgType: "R-30"
  },
  {
    id: "R-31",
    name: "Pedestre, ande pela Direita",
    code: "R-31",
    description: "Regulamenta a obrigatoriedade de os pedestres caminharem pela direita da via pública.",
    category: "regulamentacao",
    svgType: "R-31"
  },
  {
    id: "R-32",
    name: "Circulação Exclusiva de Ônibus",
    code: "R-32",
    description: "Regulamenta que a via, pista ou faixa sinalizada é de trânsito restrito e exclusivo para ônibus de transporte público.",
    category: "regulamentacao",
    svgType: "R-32"
  },
  {
    id: "R-33",
    name: "Sentido de Circulação na Rotatória",
    code: "R-33",
    description: "Regulamenta o sentido giratório obrigatório de circulação na rotatória, devendo dar preferência a quem já está circulando.",
    category: "regulamentacao",
    svgType: "R-33"
  },
  {
    id: "R-34",
    name: "Circulação Exclusiva de Bicicletas",
    code: "R-34",
    description: "Regulamenta que a via, pista ou faixa sinalizada é de uso exclusivo para bicicletas, protegendo os ciclistas do fluxo automotor.",
    category: "regulamentacao",
    svgType: "R-34"
  },
  {
    id: "R-35a",
    name: "Ciclista, transite à Esquerda",
    code: "R-35a",
    description: "Regulamenta a obrigação de os ciclistas circularem estritamente pelo lado esquerdo da via ou ciclovia.",
    category: "regulamentacao",
    svgType: "R-35a"
  },
  {
    id: "R-35b",
    name: "Ciclista, transite à Direita",
    code: "R-35b",
    description: "Regulamenta a obrigação de os ciclistas circularem estritamente pelo lado direito da via ou ciclovia.",
    category: "regulamentacao",
    svgType: "R-35b"
  },
  {
    id: "R-36a",
    name: "Ciclistas à Esquerda, Pedestres à Direita",
    code: "R-36a",
    description: "Regulamenta a divisão de espaço compartilhado, com ciclistas à esquerda e pedestres à direita.",
    category: "regulamentacao",
    svgType: "R-36a"
  },
  {
    id: "R-36b",
    name: "Pedestres à Esquerda, Ciclistas à Direita",
    code: "R-36b",
    description: "Regulamenta a divisão de espaço compartilhado, com pedestres à esquerda e ciclistas à direita.",
    category: "regulamentacao",
    svgType: "R-36b"
  },
  {
    id: "R-36c",
    name: "Circulação Compartilhada de Ciclistas e Pedestres",
    code: "R-36c",
    description: "Regulamenta a permissão de circulação conjunta de ciclistas e pedestres na mesma calçada ou via compartilhada.",
    category: "regulamentacao",
    svgType: "R-36c"
  },
  {
    id: "R-37",
    name: "Proibido Trânsito de Motocicletas, Motonetas e Ciclomotores",
    code: "R-37",
    description: "Regulamenta a proibição de trânsito de veículos motorizados de duas ou três rodas no local sinalizado.",
    category: "regulamentacao",
    svgType: "R-37"
  },
  {
    id: "R-38",
    name: "Proibido Trânsito de Ônibus",
    code: "R-38",
    description: "Regulamenta que ônibus e micro-ônibus estão expressamente proibidos de circular na via ou área.",
    category: "regulamentacao",
    svgType: "R-38"
  },
  {
    id: "R-39",
    name: "Circulação Exclusiva de Caminhão",
    code: "R-39",
    description: "Regulamenta que a pista ou faixa é de uso e trânsito exclusivo de caminhões e veículos comerciais de carga.",
    category: "regulamentacao",
    svgType: "R-39"
  },
  {
    id: "R-40",
    name: "Trânsito Proibido a Carros de Mão",
    code: "R-40",
    description: "Indica a proibição de circulação de carrinhos de mão e veículos similares de propulsão humana na via.",
    category: "regulamentacao",
    svgType: "R-40"
  },
  {
    id: "R-41",
    name: "Circulação Exclusiva de VLT/Bonde",
    code: "R-41",
    description: "Regulamenta que a via ou faixa é de circulação restrita e exclusiva para o Veículo Leve sobre Trilhos (VLT) ou bonde.",
    category: "regulamentacao",
    svgType: "R-41"
  },
  {
    id: "R-42a",
    name: "Ciclistas à Direita, VLT à Esquerda",
    code: "R-42a",
    description: "Regulamenta a segregação de tráfego na via compartilhada: ciclistas à direita e VLT/bonde à esquerda.",
    category: "regulamentacao",
    svgType: "R-42a"
  },
  {
    id: "R-42b",
    name: "Ciclistas à Esquerda, VLT à Direita",
    code: "R-42b",
    description: "Regulamenta a segregação de tráfego na via compartilhada: ciclistas à esquerda e VLT/bonde à direita.",
    category: "regulamentacao",
    svgType: "R-42b"
  },
  {
    id: "R-43a",
    name: "Veículos à Esquerda, VLT à Direita",
    code: "R-43a",
    description: "Regulamenta a divisão da pista para veículos automotores à esquerda e VLT/bonde à direita.",
    category: "regulamentacao",
    svgType: "R-43a"
  },
  {
    id: "R-43b",
    name: "Veículos à Direita, VLT à Esquerda",
    code: "R-43b",
    description: "Regulamenta a divisão da pista para veículos automotores à direita e VLT/bonde à esquerda.",
    category: "regulamentacao",
    svgType: "R-43b"
  },
  
  // --- ADVERTÊNCIA (Amarelo/Preto, Formato Losango) ---
  {
    id: "A-1a",
    name: "Curva Acentuada à Esquerda",
    code: "A-1a",
    description: "Adverte a existência de uma curva acentuada (fechada) à esquerda à frente na via.",
    category: "advertencia",
    svgType: "A-1a"
  },
  {
    id: "A-1b",
    name: "Curva Acentuada à Direita",
    code: "A-1b",
    description: "Adverte a existência de uma curva acentuada (fechada) à direita à frente na via.",
    category: "advertencia",
    svgType: "A-1b"
  },
  {
    id: "A-2a",
    name: "Curva à Esquerda",
    code: "A-2a",
    description: "Adverte a existência de uma curva moderada à esquerda à frente na via.",
    category: "advertencia",
    svgType: "A-2a"
  },
  {
    id: "A-2b",
    name: "Curva à Direita",
    code: "A-2b",
    description: "Adverte a existência de uma curva moderada à direita à frente na via.",
    category: "advertencia",
    svgType: "A-2b"
  },
  {
    id: "A-3a",
    name: "Pista Sinuosa à Esquerda",
    code: "A-3a",
    description: "Adverte a existência de uma sequência de curvas sinuosas à frente, iniciando-se à esquerda.",
    category: "advertencia",
    svgType: "A-3a"
  },
  {
    id: "A-3b",
    name: "Pista Sinuosa à Direita",
    code: "A-3b",
    description: "Adverte a existência de uma sequência de curvas sinuosas à frente, iniciando-se à direita.",
    category: "advertencia",
    svgType: "A-3b"
  },
  {
    id: "A-4a",
    name: "Curva Acentuada em 'S' à Esquerda",
    code: "A-4a",
    description: "Adverte a aproximação de duas curvas acentuadas e sucessivas no formato de 'S', a primeira à esquerda.",
    category: "advertencia",
    svgType: "A-4a"
  },
  {
    id: "A-4b",
    name: "Curva Acentuada em 'S' à Direita",
    code: "A-4b",
    description: "Adverte a aproximação de duas curvas acentuadas e sucessivas no formato de 'S', a primeira à direita.",
    category: "advertencia",
    svgType: "A-4b"
  },
  {
    id: "A-5a",
    name: "Curva em 'S' à Esquerda",
    code: "A-5a",
    description: "Adverte a aproximação de duas curvas moderadas e sucessivas no formato de 'S', a primeira à esquerda.",
    category: "advertencia",
    svgType: "A-5a"
  },
  {
    id: "A-5b",
    name: "Curva em 'S' à Direita",
    code: "A-5b",
    description: "Adverte a aproximação de duas curvas moderadas e sucessivas no formato de 'S', a primeira à direita.",
    category: "advertencia",
    svgType: "A-5b"
  },
  {
    id: "A-6",
    name: "Cruzamento de Vias",
    code: "A-6",
    description: "Adverte o cruzamento de duas vias em nível à frente, com risco de fluxo de tráfego conflitante.",
    category: "advertencia",
    svgType: "A-6"
  },
  {
    id: "A-7a",
    name: "Via Lateral à Esquerda",
    code: "A-7a",
    description: "Adverte a aproximação de uma interseção com via lateral que se junta à esquerda.",
    category: "advertencia",
    svgType: "A-7a"
  },
  {
    id: "A-7b",
    name: "Via Lateral à Direita",
    code: "A-7b",
    description: "Adverte a aproximação de uma interseção com via lateral que se junta à direita.",
    category: "advertencia",
    svgType: "A-7b"
  },
  {
    id: "A-8",
    name: "Interseção em 'T'",
    code: "A-8",
    description: "Adverte a aproximação de uma interseção em formato de 'T', onde a via atual termina.",
    category: "advertencia",
    svgType: "A-8"
  },
  {
    id: "A-9",
    name: "Bifurcação em 'Y'",
    code: "A-9",
    description: "Adverte que a via se bifurca no formato de 'Y' à frente.",
    category: "advertencia",
    svgType: "A-9"
  },
  {
    id: "A-10a",
    name: "Entroncamento Oblíquo à Esquerda",
    code: "A-10a",
    description: "Adverte a aproximação de um entroncamento oblíquo de via secundária que se junta à esquerda.",
    category: "advertencia",
    svgType: "A-10a"
  },
  {
    id: "A-10b",
    name: "Entroncamento Oblíquo à Direita",
    code: "A-10b",
    description: "Adverte a aproximação de um entroncamento oblíquo de via secundária que se junta à direita.",
    category: "advertencia",
    svgType: "A-10b"
  },
  {
    id: "A-11a",
    name: "Junções Sucessivas Contrárias, Primeira à Esquerda",
    code: "A-11a",
    description: "Adverte a aproximação de duas junções laterais consecutivas em sentidos contrários, a primeira à esquerda.",
    category: "advertencia",
    svgType: "A-11a"
  },
  {
    id: "A-11b",
    name: "Junções Sucessivas Contrárias, Primeira à Direita",
    code: "A-11b",
    description: "Adverte a aproximação de duas junções laterais consecutivas em sentidos contrários, a primeira à direita.",
    category: "advertencia",
    svgType: "A-11b"
  },
  {
    id: "A-12",
    name: "Interseção em Círculo",
    code: "A-12",
    description: "Adverte a existência de uma interseção em círculo (rotatória) à frente.",
    category: "advertencia",
    svgType: "A-12"
  },
  {
    id: "A-13a",
    name: "Confluência à Esquerda",
    code: "A-13a",
    description: "Adverte a confluência e aproximação de tráfego de outra via à esquerda.",
    category: "advertencia",
    svgType: "A-13a"
  },
  {
    id: "A-13b",
    name: "Confluência à Direita",
    code: "A-13b",
    description: "Adverte a confluência e aproximação de tráfego de outra via à direita.",
    category: "advertencia",
    svgType: "A-13b"
  },
  {
    id: "A-14",
    name: "Semáforo à Frente",
    code: "A-14",
    description: "Adverte a presença de controle semafórico na interseção ou trecho à frente.",
    category: "advertencia",
    svgType: "A-14"
  },
  {
    id: "A-15",
    name: "Parada Obrigatória à Frente",
    code: "A-15",
    description: "Adverte a aproximação de uma sinalização de parada obrigatória à frente.",
    category: "advertencia",
    svgType: "A-15"
  },
  {
    id: "A-16",
    name: "Bonde",
    code: "A-16",
    description: "Adverte a circulação ou cruzamento de bondes (ou VLT) na via pública à frente.",
    category: "advertencia",
    svgType: "A-16"
  },
  {
    id: "A-17",
    name: "Pista Irregular",
    code: "A-17",
    description: "Adverte a existência de irregularidades e depressões contínuas no pavimento da pista.",
    category: "advertencia",
    svgType: "A-17"
  },
  {
    id: "A-18",
    name: "Saliência ou Lombada",
    code: "A-18",
    description: "Adverte a presença física de uma saliência, quebra-molas ou lombada no pavimento à frente.",
    category: "advertencia",
    svgType: "A-18"
  },
  {
    id: "A-19",
    name: "Depressão",
    code: "A-19",
    description: "Adverte a presença de uma depressão física acentuada na pista adiante.",
    category: "advertencia",
    svgType: "A-19"
  },
  {
    id: "A-20a",
    name: "Declive Acentuado",
    code: "A-20a",
    description: "Adverte a aproximação de uma descida íngreme (declive acentuado) na pista.",
    category: "advertencia",
    svgType: "A-20a"
  },
  {
    id: "A-20b",
    name: "Aclive Acentuado",
    code: "A-20b",
    description: "Adverte a aproximação de uma subida íngreme (aclive acentuado) na pista.",
    category: "advertencia",
    svgType: "A-20b"
  },
  {
    id: "A-21a",
    name: "Estreitamento de Pista ao Centro",
    code: "A-21a",
    description: "Adverte a aproximação de um estreitamento de pista por ambos os lados.",
    category: "advertencia",
    svgType: "A-21a"
  },
  {
    id: "A-21b",
    name: "Estreitamento de Pista à Esquerda",
    code: "A-21b",
    description: "Adverte a aproximação de um estreitamento de pista pelo lado esquerdo.",
    category: "advertencia",
    svgType: "A-21b"
  },
  {
    id: "A-21c",
    name: "Estreitamento de Pista à Direita",
    code: "A-21c",
    description: "Adverte a aproximação de um estreitamento de pista pelo lado direito.",
    category: "advertencia",
    svgType: "A-21c"
  },
  {
    id: "A-21d",
    name: "Alargamento de Pista à Esquerda",
    code: "A-21d",
    description: "Adverte a aproximação de um alargamento de pista pelo lado esquerdo.",
    category: "advertencia",
    svgType: "A-21d"
  },
  {
    id: "A-21e",
    name: "Alargamento de Pista à Direita",
    code: "A-21e",
    description: "Adverte a aproximação de um alargamento de pista pelo lado direito.",
    category: "advertencia",
    svgType: "A-21e"
  },
  {
    id: "A-22",
    name: "Ponte Estreita",
    code: "A-22",
    description: "Adverte a aproximação de uma ponte estreita com largura de pista reduzida.",
    category: "advertencia",
    svgType: "A-22"
  },
  {
    id: "A-23",
    name: "Ponte Móvel",
    code: "A-23",
    description: "Adverte a aproximação de uma ponte levadiça ou móvel que pode estar temporariamente interrompida.",
    category: "advertencia",
    svgType: "A-23"
  },
  {
    id: "A-24",
    name: "Obras na Via",
    code: "A-24",
    description: "Adverte o condutor sobre a presença de obras na via pública, requerendo velocidade muito reduzida.",
    category: "advertencia",
    svgType: "A-24"
  },
  {
    id: "A-25",
    name: "Mão Dupla Adiante",
    code: "A-25",
    description: "Adverte que o trecho de pista de sentido único passará a ter sentido duplo de circulação (mão dupla).",
    category: "advertencia",
    svgType: "A-25"
  },
  {
    id: "A-26a",
    name: "Sentido Único",
    code: "A-26a",
    description: "Adverte o sentido único de circulação de tráfego à frente na via.",
    category: "advertencia",
    svgType: "A-26a"
  },
  {
    id: "A-26b",
    name: "Sentido Duplo",
    code: "A-26b",
    description: "Adverte o sentido duplo de circulação de tráfego à frente na via.",
    category: "advertencia",
    svgType: "A-26b"
  },
  {
    id: "A-27",
    name: "Área com Desmoronamento",
    code: "A-27",
    description: "Adverte sobre trechos sob risco de desmoronamento de encostas ou barreiras sobre a pista.",
    category: "advertencia",
    svgType: "A-27"
  },
  {
    id: "A-28",
    name: "Pista Escorregadia",
    code: "A-28",
    description: "Adverte que a pista pode estar escorregadia devido a condições de aderência reduzida.",
    category: "advertencia",
    svgType: "A-28"
  },
  {
    id: "A-29",
    name: "Projeção de Cascalho",
    code: "A-29",
    description: "Adverte o condutor que há risco de projeção de britas ou cascalho ao passar pelo trecho.",
    category: "advertencia",
    svgType: "A-29"
  },
  {
    id: "A-30a",
    name: "Trânsito de Ciclistas",
    code: "A-30a",
    description: "Adverte sobre a circulação ou travessia de ciclistas na via pública.",
    category: "advertencia",
    svgType: "A-30a"
  },
  {
    id: "A-30b",
    name: "Passagem Sinalizada de Ciclistas",
    code: "A-30b",
    description: "Adverte a aproximação de uma travessia específica e sinalizada para ciclistas.",
    category: "advertencia",
    svgType: "A-30b"
  },
  {
    id: "A-30c",
    name: "Trânsito Compartilhado por Ciclistas e Pedestres",
    code: "A-30c",
    description: "Adverte que a via ou calçada possui trânsito compartilhado entre ciclistas e pedestres.",
    category: "advertencia",
    svgType: "A-30c"
  },
  {
    id: "A-31",
    name: "Trânsito de Tratores ou Maquinária Agrícola",
    code: "A-31",
    description: "Adverte a possibilidade de trânsito ou travessia de tratores e máquinas agrícolas pesadas.",
    category: "advertencia",
    svgType: "A-31"
  },
  {
    id: "A-32a",
    name: "Trânsito de Pedestres",
    code: "A-32a",
    description: "Adverte a circulação regular ou travessia informal de pedestres na via.",
    category: "advertencia",
    svgType: "A-32a"
  },
  {
    id: "A-32b",
    name: "Passagem Sinalizada de Pedestres",
    code: "A-32b",
    description: "Adverte a presença de faixa específica e sinalizada para a travessia de pedestres.",
    category: "advertencia",
    svgType: "A-32b"
  },
  {
    id: "A-33a",
    name: "Área Escolar",
    code: "A-33a",
    description: "Adverte a aproximação de um trecho de via adjacente a uma escola ou área com escolares.",
    category: "advertencia",
    svgType: "A-33a"
  },
  {
    id: "A-33b",
    name: "Passagem Sinalizada de Escolares",
    code: "A-33b",
    description: "Adverte a presença de faixa sinalizada para a travessia segura de escolares e crianças.",
    category: "advertencia",
    svgType: "A-33b"
  },
  {
    id: "A-34",
    name: "Crianças",
    code: "A-34",
    description: "Adverte a proximidade de locais com circulação ou presença frequente de crianças (ex: parques).",
    category: "advertencia",
    svgType: "A-34"
  },
  {
    id: "A-35",
    name: "Animais",
    code: "A-35",
    description: "Adverte sobre a possibilidade de animais (como gado) cruzarem a pista.",
    category: "advertencia",
    svgType: "A-35"
  },
  {
    id: "A-36",
    name: "Animais Selvagens",
    code: "A-36",
    description: "Adverte sobre a presença ou passagem de animais silvestres na região da pista.",
    category: "advertencia",
    svgType: "A-36"
  },
  {
    id: "A-37",
    name: "Altura Limitada",
    code: "A-37",
    description: "Adverte a aproximação de um obstáculo físico com limitação de altura (ex: viaduto).",
    category: "advertencia",
    svgType: "A-37",
    extraData: "4,0m"
  },
  {
    id: "A-38",
    name: "Largura Limitada",
    code: "A-38",
    description: "Adverte a aproximação de um obstáculo físico com limitação de largura de passagem.",
    category: "advertencia",
    svgType: "A-38",
    extraData: "3,0m"
  },
  {
    id: "A-39",
    name: "Passagem de Nível Sem Barreira",
    code: "A-39",
    description: "Adverte a aproximação de um cruzamento de ferrovia (passagem em nível) sem barreiras ou cancelas.",
    category: "advertencia",
    svgType: "A-39"
  },
  {
    id: "A-40",
    name: "Passagem de Nível Com Barreira",
    code: "A-40",
    description: "Adverte a aproximação de um cruzamento ferroviário dotado de barreira ou cancela de segurança.",
    category: "advertencia",
    svgType: "A-40"
  },
  {
    id: "A-41",
    name: "Cruz de Santo André",
    code: "A-41",
    description: "Adverte a localização exata de um cruzamento em nível com linha férrea (Cruz de Santo André).",
    category: "advertencia",
    svgType: "A-41"
  },
  {
    id: "A-42a",
    name: "Início de Pista Dupla",
    code: "A-42a",
    description: "Adverte que o fluxo de sentido único passará a ser dividido por canteiro físico (início de pista dupla).",
    category: "advertencia",
    svgType: "A-42a"
  },
  {
    id: "A-42b",
    name: "Fim de Pista Dupla",
    code: "A-42b",
    description: "Adverte que o canteiro divisor de fluxos termina, retornando à pista única comum de mão dupla.",
    category: "advertencia",
    svgType: "A-42b"
  },
  {
    id: "A-42c",
    name: "Pista Dividida",
    code: "A-42c",
    description: "Adverte a aproximação de um canteiro divisor central que separa os fluxos no mesmo sentido.",
    category: "advertencia",
    svgType: "A-42c"
  },
  {
    id: "A-43",
    name: "Aeroporto",
    code: "A-43",
    description: "Adverte a aproximação de uma zona aeroportuária, com sobrevoos de aeronaves em baixa altitude.",
    category: "advertencia",
    svgType: "A-43"
  },
  {
    id: "A-44",
    name: "Vento Lateral",
    code: "A-44",
    description: "Adverte a ocorrência frequente de ventos laterais fortes que podem instabilizar o veículo.",
    category: "advertencia",
    svgType: "A-44"
  },
  {
    id: "A-45",
    name: "Rua Sem Saída",
    code: "A-45",
    description: "Adverte que a via adiante é sem saída e sem retorno direto para tráfego contínuo.",
    category: "advertencia",
    svgType: "A-45"
  },
  {
    id: "A-46",
    name: "Peso Bruto Total Limitado",
    code: "A-46",
    description: "Adverte sobre a limitação do peso bruto total máximo suportado pela estrutura da via ou ponte.",
    category: "advertencia",
    svgType: "A-46",
    extraData: "10 t"
  },
  {
    id: "A-47",
    name: "Peso Limitado por Eixo",
    code: "A-47",
    description: "Adverte sobre a limitação do peso por eixo suportado pela estrutura da via.",
    category: "advertencia",
    svgType: "A-47",
    extraData: "2 t"
  },
  {
    id: "A-48",
    name: "Comprimento Limitado",
    code: "A-48",
    description: "Adverte sobre a limitação do comprimento total máximo do veículo permitido no trecho.",
    category: "advertencia",
    svgType: "A-48",
    extraData: "10 m"
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
  },

  // --- ORIENTAÇÃO DE DESTINO E INDICAÇÃO ---
  {
    id: "IND-1",
    name: "Lapa / Zona Oeste",
    code: "IND-1",
    description: "Placa de identificação de bairros ou regiões urbanas, indicando a rota para a Lapa e Zona Oeste.",
    category: "indicacao",
    svgType: "IND-1"
  },
  {
    id: "IND-2",
    name: "B. Ouro Preto / Regional Pampulha",
    code: "IND-2",
    description: "Placa indicativa de localidade, direcionando para o Bairro Ouro Preto e a Regional Pampulha.",
    category: "indicacao",
    svgType: "IND-2"
  },
  {
    id: "IND-3",
    name: "Boqueirão",
    code: "IND-3",
    description: "Placa de identificação de bairro ou localidade (Boqueirão) em cor azul regulamentar.",
    category: "indicacao",
    svgType: "IND-3"
  },
  {
    id: "IND-4",
    name: "Av. Navegantes",
    code: "IND-4",
    description: "Placa de identificação de logradouro público, indicando a Avenida Navegantes.",
    category: "indicacao",
    svgType: "IND-4"
  },
  {
    id: "IND-5",
    name: "Marco Quilométrico: km 321",
    code: "IND-5",
    description: "Placa indicativa de quilometragem da via, situando o condutor no quilômetro 321 da rodovia.",
    category: "indicacao",
    svgType: "IND-5"
  },
  {
    id: "IND-6",
    name: "Marco Quilométrico com Sentido: Norte km 77",
    code: "IND-6",
    description: "Placa de indicação de quilometragem da via associada ao sentido de direção (Norte, quilômetro 77).",
    category: "indicacao",
    svgType: "IND-6"
  },
  {
    id: "IND-7",
    name: "Limite de Municípios: Recife / Jaboatão dos Guararapes",
    code: "IND-7",
    description: "Placa indicadora de limite geográfico entre os municípios de Recife e Jaboatão dos Guararapes.",
    category: "indicacao",
    svgType: "IND-7"
  },
  {
    id: "IND-8",
    name: "Divisa de Estados: Mato Grosso / Mato Grosso do Sul",
    code: "IND-8",
    description: "Placa de indicação de limite estadual, demarcando a divisa entre Mato Grosso e Mato Grosso do Sul.",
    category: "indicacao",
    svgType: "IND-8"
  },
  {
    id: "IND-9",
    name: "Perímetro Urbano: Porto Alegre",
    code: "IND-9",
    description: "Placa indicadora de início ou limite de perímetro urbano para o município de Porto Alegre.",
    category: "indicacao",
    svgType: "IND-9"
  },
  {
    id: "IND-10",
    name: "Direção: CEAGESP / Inst. Butantã",
    code: "IND-10",
    description: "Placa verde de orientação de destino indicando rotas de saída para o CEAGESP e Instituto Butantã.",
    category: "indicacao",
    svgType: "IND-10"
  },
  {
    id: "IND-11",
    name: "Conexão de Vias: Zona Leste / Rod. Dutra",
    code: "IND-11",
    description: "Placa mista (verde e azul) orientando o fluxo local para a Zona Leste e de rodovia para a Rodovia Presidente Dutra.",
    category: "indicacao",
    svgType: "IND-11"
  },
  {
    id: "IND-12",
    name: "Direções: São Luís / Teresina",
    code: "IND-12",
    description: "Placa de orientação de destino rodoviário indicando direções bifurcadas para São Luís e Teresina.",
    category: "indicacao",
    svgType: "IND-12"
  },
  {
    id: "IND-13",
    name: "Indicação de Retorno",
    code: "IND-13",
    description: "Placa verde que indica a aproximação de uma alça ou local regulamentado para manobra de retorno.",
    category: "indicacao",
    svgType: "IND-13"
  },
  {
    id: "IND-14",
    name: "Bifurcação: Goiânia / Retorno",
    code: "IND-14",
    description: "Placa verde pré-indicativa de direções bifurcadas em rodovia: Goiânia (em frente) ou Retorno (saída lateral).",
    category: "indicacao",
    svgType: "IND-14"
  },
  {
    id: "IND-15",
    name: "Faixas: Zona Oeste / Centro / Zona Norte",
    code: "IND-15",
    description: "Placa de orientação de faixas de tráfego, direcionando motoristas para a Zona Oeste, Centro ou Zona Norte.",
    category: "indicacao",
    svgType: "IND-15"
  },
  {
    id: "IND-16",
    name: "Placa de Distâncias: Vassouras / Paraíba do Sul / Três Rios",
    code: "IND-16",
    description: "Placa verde de distância indicando os quilômetros restantes para Vassouras (5 km), Paraíba do Sul (57 km) e Três Rios (64 km).",
    category: "indicacao",
    svgType: "IND-16"
  },
  {
    id: "IND-17",
    name: "Direção e Distância: Florianópolis / São José / Palhoça",
    code: "IND-17",
    description: "Placa de destino e distância indicando saídas à direita com distâncias para Florianópolis (7 km), São José (6 km) e Palhoça (14 km).",
    category: "indicacao",
    svgType: "IND-17"
  },

  // --- PLACAS EDUCATIVAS ---
  {
    id: "ED-1",
    name: "Use o Cinto de Segurança",
    code: "ED-1",
    description: "Placa educativa alertando condutores e passageiros sobre a obrigatoriedade do uso do cinto de segurança.",
    category: "educativa",
    svgType: "ED-1"
  },
  {
    id: "ED-2",
    name: "Obedeça a Sinalização",
    code: "ED-2",
    description: "Placa educativa exortando a importância do respeito integral às leis e placas de trânsito.",
    category: "educativa",
    svgType: "ED-2"
  },
  {
    id: "ED-3",
    name: "Só Ultrapasse com Segurança",
    code: "ED-3",
    description: "Placa educativa orientando os condutores a realizarem ultrapassagens somente sob condições seguras.",
    category: "educativa",
    svgType: "ED-3"
  },
  {
    id: "ED-4",
    name: "Pare Fora da Pista",
    code: "ED-4",
    description: "Placa educativa alertando para que paradas de emergência ou descanso sejam realizadas fora da pista de rolamento (no acostamento ou refúgio).",
    category: "educativa",
    svgType: "ED-4"
  },
  {
    id: "ED-5",
    name: "Ultrapasse Somente pela Esquerda",
    code: "ED-5",
    description: "Placa educativa instruindo que a ultrapassagem deve ser efetuada exclusivamente pelo lado esquerdo da via.",
    category: "educativa",
    svgType: "ED-5"
  },
  {
    id: "ED-6",
    name: "Longo Trecho em Declive",
    code: "ED-6",
    description: "Placa educativa alertando sobre um declive acentuado prolongado, instruindo o uso de freio motor.",
    category: "educativa",
    svgType: "ED-6"
  },
  {
    id: "ED-7",
    name: "Luz Baixa ao Cruzar Veículos",
    code: "ED-7",
    description: "Placa educativa solicitando o uso de luz baixa ao cruzar com outros veículos em sentido oposto para evitar ofuscamento.",
    category: "educativa",
    svgType: "ED-7"
  },
  {
    id: "ED-8",
    name: "Não Ultrapasse com Faixa Contínua",
    code: "ED-8",
    description: "Placa educativa relembrando a proibição absoluta de ultrapassar em trechos com faixa amarela contínua.",
    category: "educativa",
    svgType: "ED-8"
  },
  {
    id: "ED-9",
    name: "Sob Neblina Use Luz Baixa",
    code: "ED-9",
    description: "Placa educativa orientando o uso obrigatório de faróis baixos sob condições climáticas de neblina ou cerração.",
    category: "educativa",
    svgType: "ED-9"
  },
  {
    id: "ED-10",
    name: "Sob Neblina Reduza Velocidade",
    code: "ED-10",
    description: "Placa educativa instruindo a redução de velocidade sob neblina ou fumaça densa na via.",
    category: "educativa",
    svgType: "ED-10"
  },
  {
    id: "ED-11",
    name: "Verifique os Freios",
    code: "ED-11",
    description: "Placa educativa alertando os motoristas (especialmente de caminhões e ônibus) para testar e revisar o sistema de freios antes de descidas acentuadas.",
    category: "educativa",
    svgType: "ED-11"
  },

  // --- SERVIÇOS AUXILIARES ---
  {
    id: "S-1",
    name: "Área de Estacionamento",
    code: "S-1",
    description: "Indica a existência de uma área regulamentada para o estacionamento de veículos de forma geral.",
    category: "servicos",
    svgType: "S-1"
  },
  {
    id: "S-2",
    name: "Serviço Telefônico",
    code: "S-2",
    description: "Indica a existência de um telefone público ou posto telefônico de autoatendimento nas proximidades da via.",
    category: "servicos",
    svgType: "S-2"
  },
  {
    id: "S-3",
    name: "Serviço Mecânico",
    code: "S-3",
    description: "Indica a presença de uma oficina mecânica ou socorro mecânico para veículos nas proximidades.",
    category: "servicos",
    svgType: "S-3"
  },
  {
    id: "S-4",
    name: "Abastecimento",
    code: "S-4",
    description: "Indica a proximidade de um posto de abastecimento de combustíveis (gasolina, álcool, diesel ou GNV).",
    category: "servicos",
    svgType: "S-4"
  },
  {
    id: "S-5",
    name: "Pronto Socorro",
    code: "S-5",
    description: "Indica a presença de um hospital, clínica de pronto atendimento médico ou socorro de emergência nas proximidades.",
    category: "servicos",
    svgType: "S-5"
  },
  {
    id: "S-6",
    name: "Serviço Sanitário",
    code: "S-6",
    description: "Indica a existência de instalações sanitárias (banheiros públicos) de livre acesso nas proximidades da via.",
    category: "servicos",
    svgType: "S-6"
  },
  {
    id: "S-7",
    name: "Restaurante",
    code: "S-7",
    description: "Indica a existência de um estabelecimento para refeições (restaurante, lanchonete) nas proximidades.",
    category: "servicos",
    svgType: "S-7"
  },
  {
    id: "S-8",
    name: "Hotel",
    code: "S-8",
    description: "Indica a presença de estabelecimento hoteleiro ou hospedagem (hotel, pousada, motel) nas proximidades.",
    category: "servicos",
    svgType: "S-8"
  },
  {
    id: "S-9",
    name: "Área de Campismo",
    code: "S-9",
    description: "Indica a existência de uma área própria de camping (campismo) com infraestrutura para acampamento.",
    category: "servicos",
    svgType: "S-9"
  },
  {
    id: "S-10",
    name: "Aeroporto",
    code: "S-10",
    description: "Indica a existência de um aeródromo ou aeroporto com conexões de voo comerciais/privados nas proximidades.",
    category: "servicos",
    svgType: "S-10"
  },
  {
    id: "S-11",
    name: "Estacionamento de Trailer",
    code: "S-11",
    description: "Indica uma área regulamentada para o estacionamento ou repouso de trailers e veículos recreativos similares.",
    category: "servicos",
    svgType: "S-11"
  },
  {
    id: "S-12",
    name: "Transporte sobre Água",
    code: "S-12",
    description: "Indica a proximidade de um terminal de balsa, ferry boat ou transporte de veículos sobre vias fluviais ou marítimas.",
    category: "servicos",
    svgType: "S-12"
  },
  {
    id: "S-14",
    name: "Ponto de Parada",
    code: "S-14",
    description: "Indica o local estabelecido para parada de ônibus de transporte coletivo de passageiros na via pública.",
    category: "servicos",
    svgType: "S-14"
  },
  {
    id: "S-15",
    name: "Passagem Protegida para Pedestres",
    code: "S-15",
    description: "Indica que o local à frente conta com faixa, passarela ou passagem subterrânea de pedestres dotada de segurança.",
    category: "servicos",
    svgType: "S-15"
  },

  // --- ATRATIVOS TURÍSTICOS ---
  {
    id: "TUR-1",
    name: "Atrativos: Cach. Santa Maria / Mirante / Pq. Pinheiro / Prainha",
    code: "TUR-1",
    description: "Placa diagrama marrom pré-indicativa de rotas e direções para atrativos ecológicos e de lazer locais.",
    category: "turismo",
    svgType: "TUR-1"
  },
  {
    id: "TUR-2",
    name: "Patrimônio Natural",
    code: "TUR-2",
    description: "Placa indicadora de atrativo turístico ecológico protegido por lei de conservação ambiental (Patrimônio Natural).",
    category: "turismo",
    svgType: "TUR-2"
  },
  {
    id: "TUR-3",
    name: "Praia",
    code: "TUR-3",
    description: "Placa indicadora de atrativo de lazer litorâneo ou balneário de praia e recreação aquática.",
    category: "turismo",
    svgType: "TUR-3"
  },
  {
    id: "TUR-4",
    name: "Distâncias: Taperapuã / Rio dos Mangues / Ponta Grande",
    code: "TUR-4",
    description: "Placa turística indicadora de distâncias em quilômetros restantes para pontos turísticos e balneários.",
    category: "turismo",
    svgType: "TUR-4"
  },
  {
    id: "TUR-5",
    name: "Direção de Atrativos Históricos e Culturais",
    code: "TUR-5",
    description: "Placa de indicação de atrativos turísticos de cunho histórico ou arquitetônico, como igrejas e museus.",
    category: "turismo",
    svgType: "TUR-5"
  },
  {
    id: "TUR-6",
    name: "Parque Nacional do Itatiaia",
    code: "TUR-6",
    description: "Placa indicadora de sentido posicionada sobre a pista orientando a direção imediata para o Parque Nacional do Itatiaia.",
    category: "turismo",
    svgType: "TUR-6"
  },

  // --- SINALIZAÇÃO DE OBRAS ---
  {
    id: "OBR-1",
    name: "Obras na Pista",
    code: "OBR-1",
    description: "Indica a presença de serviços de conservação ou construção na pista de rolamento, exigindo atenção redobrada e redução de velocidade pelo condutor.",
    category: "obras",
    svgType: "OBR-1"
  },
  {
    id: "OBR-2",
    name: "Lama na Pista",
    code: "OBR-2",
    description: "Alerta para a presença de lama ou material escorregadio lançado na pista por veículos de obra, tornando o asfalto instável.",
    category: "obras",
    svgType: "OBR-2"
  },
  {
    id: "OBR-3",
    name: "Cascalho na Pista",
    code: "OBR-3",
    description: "Avisa que existem pedras ou cascalhos espalhados na pista, podendo projetar fragmentos e danificar veículos ou causar acidentes.",
    category: "obras",
    svgType: "OBR-3"
  },
  {
    id: "OBR-4",
    name: "Saliência ou Lombada",
    code: "OBR-4",
    description: "Indica a existência de saliência transversal na pista, como lombada artificial, elevação de tampão ou ondulações causadas pela obra.",
    category: "obras",
    svgType: "OBR-4"
  },
  {
    id: "OBR-5",
    name: "Mão Dupla (em Obras)",
    code: "OBR-5",
    description: "Informa que o trecho de obra está em regime de mão dupla temporário, onde o fluxo de veículos nos dois sentidos ocorre na mesma faixa.",
    category: "obras",
    svgType: "OBR-5"
  },
  {
    id: "OBR-6",
    name: "Caminhão de Obras",
    code: "OBR-6",
    description: "Sinaliza a circulação ou cruzamento de caminhões e maquinário pesado de obras na pista, exigindo cuidado extra pelos motoristas.",
    category: "obras",
    svgType: "OBR-6"
  },
  {
    id: "OBR-7",
    name: "Projeção de Pedras",
    code: "OBR-7",
    description: "Alerta que o trecho possui material granular solto que pode ser projetado pelos pneus dos veículos, podendo atingir para-brisas e outros veículos.",
    category: "obras",
    svgType: "OBR-7"
  },
  {
    id: "OBR-8",
    name: "Pista Escorregadia (em Obras)",
    code: "OBR-8",
    description: "Indica que a pista no trecho de obras está molhada, com graxa ou material escorregadio, aumentando o risco de derrapagem.",
    category: "obras",
    svgType: "OBR-8"
  },
  {
    id: "OBR-9",
    name: "Estreitamento de Pista à Direita",
    code: "OBR-9",
    description: "Indica que a faixa de rolamento à direita está bloqueada pela obra, obrigando os veículos a se deslocarem para a faixa da esquerda.",
    category: "obras",
    svgType: "OBR-9"
  },
  {
    id: "OBR-10",
    name: "Estreitamento de Pista à Esquerda",
    code: "OBR-10",
    description: "Indica que a faixa de rolamento à esquerda está bloqueada pela obra, obrigando os veículos a se deslocarem para a faixa da direita.",
    category: "obras",
    svgType: "OBR-10"
  },
  {
    id: "OBR-11",
    name: "Bifurcação de Faixas",
    code: "OBR-11",
    description: "Indica o ponto onde as faixas se separam em desvio de obras, com duas vias alternativas disponíveis para o trânsito.",
    category: "obras",
    svgType: "OBR-11"
  },
  {
    id: "OBR-12",
    name: "Altura Máxima Permitida (Obras)",
    code: "OBR-12",
    description: "Informa a altura máxima permitida de passagem de veículos no trecho, geralmente em função de estruturas provisórias montadas para a obra.",
    category: "obras",
    svgType: "OBR-12"
  },
  {
    id: "OBR-13",
    name: "PARE — Sinalização de Obras",
    code: "OBR-13",
    description: "Exige a parada total do veículo antes de prosseguir no trecho de obras. Usualmente associada a um sistema de controle manual de tráfego.",
    category: "obras",
    svgType: "OBR-13"
  },
  {
    id: "OBR-14",
    name: "Largura Máxima Permitida (Obras)",
    code: "OBR-14",
    description: "Indica a largura máxima de passagem no trecho de obras, normalmente causada pelo estreitamento da pista ou corredor formado pelos equipamentos.",
    category: "obras",
    svgType: "OBR-14"
  },
  {
    id: "OBR-15",
    name: "Trabalhadores na Pista",
    code: "OBR-15",
    description: "Indica que há operários e trabalhadores realizando serviços na pista ou nas suas imediações. Exige redução de velocidade e atenção máxima.",
    category: "obras",
    svgType: "OBR-15"
  },
  {
    id: "OBR-16",
    name: "Estreitamento de Ambos os Lados",
    code: "OBR-16",
    description: "Indica que a pista é estreitada de ambos os lados devido à obra, resultando em um corredor central para o tráfego.",
    category: "obras",
    svgType: "OBR-16"
  },
  {
    id: "OBR-D1",
    name: "Desvio à Esquerda",
    code: "OBR-D1",
    description: "Placa retangular laranja indicando que o trânsito deve ser desviado à esquerda a determinada distância, em função das obras na pista.",
    category: "obras",
    svgType: "OBR-D1"
  },
  {
    id: "OBR-D2",
    name: "Desvio",
    code: "OBR-D2",
    description: "Placa retangular laranja com seta diagonal, indicando que há um desvio obrigatório do trajeto normal em função das obras.",
    category: "obras",
    svgType: "OBR-D2"
  },
  {
    id: "OBR-D3",
    name: "Desvio à Direita",
    code: "OBR-D3",
    description: "Placa retangular laranja indicando que o trânsito deve ser desviado à direita a determinada distância, em função das obras na pista.",
    category: "obras",
    svgType: "OBR-D3"
  },

  // --- SINALIZAÇÃO HORIZONTAL ---
  {
    id: "MH-AMA",
    name: "Linha Amarela",
    code: "MH-AMA",
    description: "Linha longitudinal pintada no asfalto na cor amarela. Separa fluxos de sentidos opostos de tráfego. Quando contínua, é proibido ultrapassar; quando tracejada, permite ultrapassagem desde que segura.",
    category: "horizontal",
    svgType: "MH-AMA"
  },
  {
    id: "MH-BRA",
    name: "Linha Branca",
    code: "MH-BRA",
    description: "Linha longitudinal pintada no asfalto na cor branca. Separa faixas de mesmo sentido de circulação. Quando tracejada, permite troca de faixa; quando contínua, o trânsito deve permanecer na faixa.",
    category: "horizontal",
    svgType: "MH-BRA"
  },
  {
    id: "MH-VRM",
    name: "Linha Vermelha",
    code: "MH-VRM",
    description: "Marcação horizontal pintada no asfalto na cor vermelha. Demarca áreas reservadas exclusivamente para serviços de saúde e emergência, como espaço de estacionamento de ambulâncias em hospitais.",
    category: "horizontal",
    svgType: "MH-VRM"
  },
  {
    id: "MH-AZL",
    name: "Linha Azul",
    code: "MH-AZL",
    description: "Marcação horizontal pintada no asfalto na cor azul. Demarca vagas de estacionamento exclusivas para pessoas com deficiência (PCD), acompanhando o símbolo internacional de acessibilidade.",
    category: "horizontal",
    svgType: "MH-AZL"
  },
  {
    id: "MH-PRT",
    name: "Linha Preta",
    code: "MH-PRT",
    description: "Marcação horizontal pintada no asfalto na cor preta. Utilizada como delimitação de contraste em superfícies de pavimento claro (como calçadas claras, ciclovias ou pistas de concreto branco), demarcando limites de faixas.",
    category: "horizontal",
    svgType: "MH-PRT"
  }
];


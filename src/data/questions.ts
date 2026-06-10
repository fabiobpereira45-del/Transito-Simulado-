import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    question: "Diante da placa de regulamentação 'Parada Obrigatória' (R-1), qual deve ser a atitude imediata do condutor?",
    options: [
      "Diminuir a velocidade e passar se não houver outros veículos vindo na direção transversal.",
      "Parar o veículo obrigatoriamente antes de entrar na interseção, certificar-se da segurança e então prosseguir.",
      "Dar preferência apenas aos pedestres que estão atravessando, sem necessidade de parada total do automóvel.",
      "Reduzir a marcha lentamente e buzinar antes de cruzar a via secundária."
    ],
    correctAnswer: 1,
    explanation: "A placa R-1 exige a PARADA TOTAL do veículo antes da faixa de retenção ou da interseção. Não basta reduzir a velocidade; a imobilização completa do veículo é obrigatória mesmo se a via transversal estiver visualmente vazia.",
    category: "Sinalização"
  },
  {
    id: 2,
    question: "Nas vias urbanas de trânsito rápido, quando não houver sinalização regulamentadora, a velocidade máxima permitida pelo Código de Trânsito Brasileiro (CTB) é de:",
    options: [
      "60 km/h.",
      "80 km/h.",
      "110 km/h.",
      "40 km/h."
    ],
    correctAnswer: 1,
    explanation: "Em vias de trânsito rápido não sinalizadas, a velocidade máxima estabelecida por lei é de 80 km/h. Vias de trânsito rápido caracterizam-se por acessos especiais com trânsito livre, sem cruzamentos e sem travessias de pedestres em nível.",
    category: "Legislação"
  },
  {
    id: 3,
    question: "Dirigir sob a influência de álcool ou de qualquer outra substância psicoativa que determine dependência é classificado como infração:",
    options: [
      "Grave, com multa de 5 vezes e apreensão dos documentos.",
      "Gravíssima, com multa multiplicada por 10 (dez vezes) e suspensão do direito de dirigir por 12 meses.",
      "Média, somando 4 pontos na CNH e retenção temporária do veículo até a chegada do proprietário.",
      "Grave, acarretando cassação imediata e irrevogável da Permissão para Dirigir."
    ],
    correctAnswer: 1,
    explanation: "Segundo o Artigo 165 do CTB, conduzir veículo sob efeito de álcool é infração gravíssima. A penalidade inclui multa multiplicada por 10 e suspensão do direito de dirigir por 12 (doze) meses, além da retenção do veículo.",
    category: "Legislação"
  },
  {
    id: 4,
    question: "O fenômeno da aquaplanagem ou hidroplanagem ocorre frequentemente em dias de chuva forte. O que o condutor deve fazer para evitar esse perigo na pista?",
    options: [
      "Aumentar a velocidade para cortar o volume d'água mais rapidamente.",
      "Reduzir a velocidade preventivamente, manter pneus com boa profundidade de sulcos (não 'carecas') e calibrados corretamente.",
      "Efetuar freadas bruscas e consecutivas ao perceber o espelho de água na pista para testar a aderência.",
      "Manter o pedal de freio totalmente acionado e girar o volante vigorosamente para os lados."
    ],
    correctAnswer: 1,
    explanation: "A aquaplanagem é a perda de contato dos pneus com o solo devido a uma camada de água. Para prevenir, reduza a velocidade antes de poças e mantém os sulcos dos pneus acima do limite legal de 1,6 milímetros de profundidade (TWI).",
    category: "Direção Defensiva"
  },
  {
    id: 5,
    question: "Ao deparar-se com um acidente de trânsito onde há vítimas, qual deve ser a PRIMEIRA ação do socorrista voluntário?",
    options: [
      "Remover imediatamente as vítimas das ferragens e deitá-las no acostamento.",
      "Oferecer água fria e medicamentos para acalmar as pessoas feridas.",
      "Sinalizar o local do acidente adequadamente e acionar o socorro profissional de emergência (como SAMU ou Bombeiros).",
      "Retirar o capacete de motociclistas acidentados para facilitar a respiração pulmonar rápida."
    ],
    correctAnswer: 2,
    explanation: "A sinalização do local é primordial para evitar novos acidentes (colisões traseiras) e proteger as vítimas e o próprio socorrista. Em seguida, aciona-se o socorro profissional. Vítimas não devem ser movidas sem técnica profissional para evitar lesões na coluna.",
    category: "Primeiros Socorros"
  },
  {
    id: 6,
    question: "No motor do automóvel, qual a principal função atribuída ao sistema de lubrificação, que utiliza o óleo de cárter de motor?",
    options: [
      "Aumentar a potência máxima gerada pelos cilindros e pistões.",
      "Filtrar as impurezas do combustível antes mesmo de entrar nos bicos injetores.",
      "Reduzir o atrito entre as peças móveis do motor, evitando o desgaste excessivo e dissipando calor interno.",
      "Controlar de forma eletrônica a temperatura da água no reservatório de expansão."
    ],
    correctAnswer: 2,
    explanation: "O óleo lubrificante cria uma película protetora que reduz o atrito mecânico direto entre as peças móveis (como pistões e bielas), ajudando a refrigerar o motor e arrastar fragmentos de desgaste metálico ao filtro.",
    category: "Mecânica Básica"
  },
  {
    id: 7,
    question: "O monóxido de carbono (CO) emitido pelos canos de escapamento dos veículos de combustão interna é um gás que provoca:",
    options: [
      "Um odor agradável, além de regenerar a camada de ozônio urbana.",
      "Intoxicação do organismo humano por reduzir a capacidade de transporte de oxigênio do sangue.",
      "Efeito estufa ameno, sendo benéfico para a umidade relativa do ar das metrópoles.",
      "Ativação do sistema imunológico, prevenindo doenças pulmonares graves."
    ],
    correctAnswer: 1,
    explanation: "O monóxido de carbono é um gás inodoro e incolor altamente tóxico. Quando inalado, ele se liga de forma estável à hemoglobina sanguínea, impedindo a oxigenação cerebral e celular normal, podendo levar ao desmaio ou à morte.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 8,
    question: "A sinalização horizontal de cor amarela na pista de rolamento indica que o sentido de circulação das faixas é de:",
    options: [
      "Sentido único de direção para todos os veículos na faixa de rodagem.",
      "Sentidos opostos de circulação (via de mão dupla).",
      "Vias destinadas exclusivamente a veículos comerciais ou de transporte coletivo.",
      "Vias interditadas temporariamente devido a obras públicas autorizadas."
    ],
    correctAnswer: 1,
    explanation: "A cor amarela na sinalização horizontal (linhas divisórias de fluxo) serve para separar fluxos de tráfego de sentidos opostos (indica pista de mão dupla). Linhas brancas separam fluxos de mesmo sentido (mão única).",
    category: "Sinalização"
  },
  {
    id: 9,
    question: "Segundo as normas gerais do CTB, a buzina do veículo só pode ser utilizada pelo motorista sob quais condições específicas?",
    options: [
      "Livremente entre as 22 horas e as 6 horas da manhã para alertar porteiros prediais.",
      "Com toques breves, estritamente para fazer advertências necessárias a fim de evitar acidentes ou fora das áreas urbanas para indicar ultrapassagem.",
      "Como sinal sonoro prolongado sempre que houver congestionamento de veículos para apressar os demais.",
      "Para saudações amigáveis a pedestres conhecidos nas calçadas ou vias públicas."
    ],
    correctAnswer: 1,
    explanation: "Conforme o Artigo 224 do CTB, a buzina deve ser usada em toques breves. É terminantemente proibido o uso prolongado, repetitivo ou em horários restritos pela sinalização (das 22h às 6h - infração leve).",
    category: "Legislação"
  },
  {
    id: 10,
    question: "Qual o procedimento correto de direção defensiva ao transitar sob condições severas de neblina ou cerração densa?",
    options: [
      "Ligar o pisca-alerta com o veículo ainda em movimento e continuar na mesma velocidade padrão da via.",
      "Acender os faróis altos para cortar a névoa e ultrapassar rapidamente os veículos mais lentos.",
      "Ligar os faróis de neblina ou de luz baixa, reduzir consideravelmente a velocidade e aumentar a distância de segurança em relação ao veículo da frente.",
      "Parar o carro sobre a faixa de tráfego central até a névoa se dispersar por completo."
    ],
    correctAnswer: 2,
    explanation: "Na neblina, reduza a velocidade e use farol baixo (ou de neblina). O farol alto reflete nas gotículas d'água em suspensão e cega o próprio motorista. O pisca-alerta só deve ser usado com o veículo parado em emergência no acostamento.",
    category: "Direção Defensiva"
  },
  {
    id: 11,
    question: "Se uma vítima de trânsito apresentar sangramento abundante em um ferimento no braço, o socorrista deve primordialmente:",
    options: [
      "Colocar pó de café ou urina sobre o corte para estancar o sangramento.",
      "Aplicar um garrote rígido no pescoço imediatamente.",
      "Fazer compressão direta sobre a ferida utilizando uma gaze limpa ou pano limpo.",
      "Lavar o corte com álcool em gel de alta concentração sob fricção vigorosa."
    ],
    correctAnswer: 2,
    explanation: "Para hemorragias externas em membros, a compressão direta com pano limpo e pressão firme é o método mais seguro e eficaz para estancar o sangue temporariamente até o atendimento médico qualificado.",
    category: "Primeiros Socorros"
  },
  {
    id: 12,
    question: "O catalisador é um dispositivo acoplado ao sistema de escapamento dos automóveis modernos. Sua função técnica é:",
    options: [
      "Filtrar o ruído promovido pelas explosões de combustão nos pistões.",
      "Purificar o ar ambiente que entra pelos coletores de admissão.",
      "Transformar gases expelidos altamente tóxicos em substâncias menos nocivas ao meio ambiente mediante reação química interna.",
      "Dosar a entrada exata de aditivo lubrificante no tanque de combustível primário."
    ],
    correctAnswer: 2,
    explanation: "O conversor catalítico (catalisador) acelera reações químicas que convertem gases venenosos provenientes da queima dos cilindros (como monóxido de carbono e óxidos de nitrogênio) em nitrogênio gasoso, vapor d'água e gás carbônico.",
    category: "Mecânica Básica"
  },
  {
    id: 13,
    question: "O condutor recém-habilitado recebe inicialmente a 'Permissão para Dirigir' (PPD), válida por 1 ano. Para obter a CNH definitiva ao término deste prazo, ele não deve ter cometido nenhuma infração de natureza:",
    options: [
      "Média por mais de três vezes apenas.",
      "Gravíssima, grave, ou ser reincidente em infração média.",
      "Leve em áreas escolares urbanas residenciais.",
      "Grave, ficando as infrações gravíssimas perdoadas mediante curso de reciclagem simples."
    ],
    correctAnswer: 1,
    explanation: "Segundo o Artigo 148 do CTB, a CNH definitiva só será concedida ao portador da PPD que não tenha cometido infração grave ou gravíssima, ou não seja reincidente em infrações de natureza média no período de 12 meses.",
    category: "Legislação"
  },
  {
    id: 14,
    question: "Que distância aproximada de segurança deve ser mantida em relação ao veículo que trafega imediatamente à sua frente (em condições normais de clima e pista)?",
    options: [
      "Uma distância física correspondente a exatamente 5 metros.",
      "A distância equivalente ao tempo de reação de aproximadamente 2 segundos de intervalo.",
      "Nenhuma distância, pois colar na traseira reduz o consumo aerodinâmico de combustível.",
      "Uma distância fixa correspondente ao tamanho de doze carros populares alinhados."
    ],
    correctAnswer: 1,
    explanation: "A regra recomendada defensivamente é a distância dos '2 segundos'. Para calculá-la, use um ponto de referência fixo na margem da via. Conte dois segundos após o veículo da frente passar por ele; seu carro não deve passar por esse ponto antes da contagem acabar.",
    category: "Direção Defensiva"
  },
  {
    id: 15,
    question: "O descarte incorreto de baterias usadas de veículos na natureza representa um grave problema ambiental decorrente de:",
    options: [
      "Contaminação do solo e dos lençóis freáticos por metais pesados altamente poluentes, como o chumbo.",
      "Formação de poças de água ácida propícias para proliferação de insetos gigantes.",
      "Emissão de raios gama solares prejudiciais à saúde da agricultura local.",
      "Acúmulo de carcaças plásticas biodegradáveis ricas em açúcares orgânicos."
    ],
    correctAnswer: 0,
    explanation: "As baterias automotivas contêm chumbo (metal pesado tóxico acumulativo) e soluções ácidas corrosivas. O descarte em lixo comum degrada severamente o solo e polui águas subterrâneas. Devem ser devolvidas aos revendedores.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 16,
    question: "O instrumento no painel do veículo que indica as rotações por minuto (RPM) desenvolvidas pelo motor é denominado:",
    options: [
      "Velocímetro eletrônico.",
      "Hodômetro parcial digi-analógico.",
      "Conta-giros ou Tacômetro.",
      "Termômetro de arrefecimento interno."
    ],
    correctAnswer: 2,
    explanation: "O tacômetro ou conta-giros exibe quantas vezes o virabrequim gira por minuto (RPM). Auxilia o condutor nas trocas de marcha corretas, prevenindo tanto o excesso de giro nocivo quanto a condução abaixo da rotação ideal.",
    category: "Mecânica Básica"
  },
  {
    id: 17,
    question: "Sinalizações luminosas de fluxo intermitente na cor amarela (luz única piscante) alertam aos motoristas sobre:",
    options: [
      "Obrigação incondicional de parar totalmente o veículo na zona de cruzamento urbano.",
      "Disponibilidade de vaga aberta livre no estacionamento público regulamentado.",
      "Necessidade de redobrar a atenção devido a situações de perigo iminente ou cruzamento especial.",
      "Indicação de que a pista está interditada permanentemente na linha longitudinal."
    ],
    correctAnswer: 2,
    explanation: "Sinal luminoso amarelo intermitente adverte sobre atenção redobrada, perigo ou prioridade diferenciada. O condutor deve diminuir a velocidade e preparar-se para frear caso necessário, com extrema cautela.",
    category: "Sinalização"
  },
  {
    id: 18,
    question: "Qual das seguintes ações do cidadão constitui um exemplo claro de civilidade e respeito recíproco nas vias públicas?",
    options: [
      "Atravessar correndo em diagonal fora da faixa de pedestres para economizar tempo.",
      "Parar o carro sobre a calçada ao necessitar descarregar compras pesadas.",
      "Dar preferência de passagem aos pedestres, idosos e pessoas com deficiência física quando estes iniciem a travessia na faixa.",
      "Buzinar repetidamente para apressar uma pessoa de idade avançada que faz a travessia de uma avenida."
    ],
    correctAnswer: 2,
    explanation: "Dar prioridade e proteger os mais vulneráveis do trânsito (pedestres, idosos, portadores de mobilidade reduzida) é preceito de cidadania e dever regulamentado de acordo com as normas gerais de trânsito.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 19,
    question: "Se um incêndio ocorrer no compartimento do motor de um veículo que trafega na rodovia, a primeira atitude do condutor defensivo deve ser:",
    options: [
      "Jogar água fria em baldes seguidos sobre o motor sem desligar a ignição elétrica.",
      "Estacionar rapidamente o veículo em local seguro, retirar todos os ocupantes, desligar o motor e, se seguro, direcionar o extintor para a base do fogo.",
      "Permanecer dentro da cabine com os vidros fechados até que as chamas se apaguem por falta de oxigênio.",
      "Acelerar o veículo ao máximo na rodovia aberta para soprar o fogo com o vento contrário."
    ],
    correctAnswer: 1,
    explanation: "Desligar o motor imediatamente interrompe o fluxo de combustível do cárter. Retirar os ocupantes preserva as vidas, que são prioridade absoluta. Se for utilizar o extintor ABC, deve-se usá-lo na base das chamas através de pequena fresta do capô inicialmente.",
    category: "Direção Defensiva"
  },
  {
    id: 20,
    question: "Quando o motorista aciona o pedal de embreagem do veículo manual, qual processo mecânico ocorre de forma imediata?",
    options: [
      "Os freios das quatro rodas travam instantaneamente sem o uso do pedal de freio principal.",
      "A transmissão de força mecânica produzida pelo motor é desconectada (desacoplada) da caixa de marchas.",
      "A rotação do alternador elétrico dobra de capacidade de fornecimento imediato.",
      "A injeção de mistura ar-combustível é totalmente abortada da câmara de explosão."
    ],
    correctAnswer: 1,
    explanation: "A embreagem tem a função de acoplar e desacoplar a árvore de manivelas (motor) do sistema de transmissão (câmbio). Pressionar o pedal interrompe o torque, liberando as engrenagens para as trocas suaves de marcha.",
    category: "Mecânica Básica"
  },
  {
    id: 21,
    question: "O uso de cinto de segurança de três pontos é obrigatório para o condutor e todos os passageiros de veículos de passeio. Comprovadamente, esse dispositivo reduz:",
    options: [
      "O consumo térmico instantâneo de combustível nas frenagens rápidos.",
      "A gravidade das lesões em acidentes por impedir que os ocupantes colidam com o painel ou sejam arremessados para fora do veículo.",
      "O desgaste prematuro de pastilhas de freio a vácuo nas descidas de serra.",
      "Os pontos acumulados na carteira caso o condutor avance um sinal vermelho à noite."
    ],
    correctAnswer: 1,
    explanation: "O cinto de segurança retém os passageiros nas posições corretas de sobrevivência, minimizando impactos internos contra vidros ou colunas de portas do Habitáculo e prevenindo ejetamento do veículo.",
    category: "Direção Defensiva"
  },
  {
    id: 22,
    question: "A placa de advertência em formato de losango amarelo com as figuras de duas crianças brincando com uma bola indica área de:",
    options: [
      "Recreação infantil ou área escolar próxima, exigindo velocidade reduzida e extrema atenção do condutor.",
      "Venda autorizada de material esportivo importado de baixo valor.",
      "Instalação de câmeras térmicas de monitoramento facial público.",
      "Treinamento de corrida profissional de atletismo mirim."
    ],
    correctAnswer: 0,
    explanation: "A placa A-33a (Área Escolar) ou A-35 (Recreação Infantil) adverte o condutor sobre a alta probabilidade de travessia intempestiva de crianças no local, impondo obrigatoriamente atenção e redução severa de velocidade.",
    category: "Sinalização"
  },
  {
    id: 23,
    question: "Perante as leis nacionais do CTB, a ultrapassagem de outro veículo em movimento deve ser efetuada sempre:",
    options: [
      "Pela pista da direita, utilizando o acostamento pavimentado se livre de pedestres.",
      "Pela via da esquerda, utilizando a faixa correta destinada e retornando em segurança após sinalizar.",
      "Pela contramão de direção mesmo sob presença constante de curvas cegas na pista de serra.",
      "Pela ciclovia sinalizada em áreas marginais metropolitanas de baixa circulação."
    ],
    correctAnswer: 1,
    explanation: "A regra de trânsito padrão estipula a ultrapassagem pela esquerda, sinalizando eletronicamente ou com gestos, e retornando à faixa de origem após distância segura. Ultrapassar pela direita é infração média, com raras exceções previstas por lei.",
    category: "Legislação"
  },
  {
    id: 24,
    question: "Qual o limite de velocidade máxima padrão para uma via arterial urbana desprovida de quaisquer placas de sinalização de velocidade?",
    options: [
      "30 km/h.",
      "40 km/h.",
      "60 km/h.",
      "80 km/h."
    ],
    correctAnswer: 2,
    explanation: "Segundo diretivas organizadas no CTB, vias arteriais urbanas que não contêm sinalização de velocidade limite possuem teto padrão de 60 km/h. Vias coletoras possuem limite de 40 km/h e locais possuem limite de 30 km/h.",
    category: "Legislação"
  },
  {
    id: 25,
    question: "Em caso de paradas cardiorrespiratórias em vítimas acidentadas na via, o procedimento correto de reanimação cardiopulmonar manual (RCP) compreende:",
    options: [
      "Doses repetidas de ventilação mecânica soprando com uma mangueira no estômago.",
      "Compressões torácicas profundas em ritmo contínuo no centro do peito (esterno) com os braços esticados.",
      "Esfregar as solas dos pés da vítima vigorosamente até o retorno dos batimentos.",
      "Oferecer respingos de água fervente no rosto até a vítima tossir."
    ],
    correctAnswer: 1,
    explanation: "A RCP padrão é realizada posicionando-se as mãos sobrepostas no centro do peito da vítima, realizando compressões rápidas e profundas (com frequência de 100 a 120 por minuto, reduzindo no tórax de 5 a 6 cm) sem dobrar os cotovelos.",
    category: "Primeiros Socorros"
  },
  {
    id: 26,
    question: "Os gases resultantes do funcionamento do motor são purificados no catalisador, mas ruídos fortes dependem de qual item do escapamento para atenuação acústica?",
    options: [
      "O distribuidor de faísca elétrica sequencial.",
      "O silencioso ou abafador secundário.",
      "A junta elástica do cárter de distribuição superior.",
      "O tanque de gasolina pressurizado eletronicamente."
    ],
    correctAnswer: 1,
    explanation: "O silencioso (ou abafador) localizado no escapamento reduz drasticamente o barulho de explosão dos cilindros através de câmaras de passagens cruzadas e ressonância. A ausência ou avaria do silenciador é infração de trânsito grave.",
    category: "Mecânica Básica"
  },
  {
    id: 27,
    question: "As chamadas 'linhas de retenção' horizontais pintadas no asfalto servem para advertir o condutor sobre o que?",
    options: [
      "Área onde pedestres devem caminhar para limpar os calçados das areias.",
      "O local exato onde o motorista deve imobilizar o veículo perante um bloqueio ou sinalização de parada.",
      "A zona reservada a estacionamentos rotativos em feriados nacionais.",
      "Faixas reservadas à corrida amadora de motociclistas autorizados."
    ],
    correctAnswer: 1,
    explanation: "As linhas de retenção são linhas brancas transversais pintadas antes de cruzamentos com sinalização de parada obrigatória (R-1) ou semáforos, indicando o ponto exato onde o veículo deve estacionar para não invadir o cruzamento.",
    category: "Sinalização"
  },
  {
    id: 28,
    question: "Que órgão federal é o responsável direto por emitir as diretrizes das resoluções normativas e regulamentações do trânsito em todo o Brasil?",
    options: [
      "O DETRAN estadual.",
      "A Guarda Municipal urbana.",
      "O CONTRAN (Conselho Nacional de Trânsito).",
      "O DER (Departamento de Estradas de Rodagem)."
    ],
    correctAnswer: 2,
    explanation: "O CONTRAN é o órgão coordenador máximo do SNT, responsável por criar resoluções unificadas, regulamentações técnicas da sinalização de trânsito e definir as normas operacionais nacionais.",
    category: "Legislação"
  },
  {
    id: 29,
    question: "Qual o maior fator causador de acidentes de trânsito graves registrados anualmente no Brasil?",
    options: [
      "Falhas imprevisíveis estruturais nas pistas federais rodoviárias.",
      "Falha humana decorrente de imprudência, imperícia ou negligência do motorista.",
      "Quebra espontânea de eixos traseiros de caminhonetes novas.",
      "Ataques intempestivos de animais da fauna silvestre na pista."
    ],
    correctAnswer: 1,
    explanation: "Mais de 90% dos acidentes de trânsito no país são causados por erro humano — como dirigir cansado, excesso de velocidade, uso de celular ao volante, avanço de sinal vermelho ou desobediência a normas básicas.",
    category: "Direção Defensiva"
  },
  {
    id: 30,
    question: "Substâncias químicas nocivas emitidas por veículos automotores podem provocar a chamada 'chuva ácida' com graves prejuízos naturais. Os principais gases poluidores causadores deste efeito são:",
    options: [
      "O vapor d'água mineralizado filtrado.",
      "Oxigênio e Nitrogênio atmosféricos puros.",
      "Os óxidos de Enxofre e de Nitrogênio resultantes das queimas de poluentes industriais ou veiculares pesados.",
      "Hélio e Argônio leves para inflar balões promocionais."
    ],
    correctAnswer: 2,
    explanation: "Os óxidos de enxofre (SOx) e de nitrogênio (NOx), emitidos amplamente por queima de óleo diesel ou carvão, reagem com o vapor de água da atmosfera formando ácidos fortes (nítrico e sulfúrico), gerando chuva ácida prejudicial.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 31,
    question: "O condutor ao dirigir na chuva nota que o freio perdeu consideravelmente a capacidade de frenagem por estar encharcado. Para restabelecer os freios com segurança, o procedimento defensivo é:",
    options: [
      "Subir ladeiras íngremes sob tração total em velocidade máxima constante.",
      "Efetuar toques intermitentes leves no pedal do freio enquanto mantém o carro em marcha leve em via plana e retas para secar as pastilhas e discos.",
      "Descer serras extensas desengatado ('na banguela') com freio de mão totalmente puxado.",
      "Adicionar graxa ou aditivos deslizantes nas pinças de freio imediatamente."
    ],
    correctAnswer: 1,
    explanation: "Em pistas inundadas de água, os componentes de fricção do freio (pastilhas, lonas, discos e tambores) molham-se, reduzindo o atrito necessário. Ao sair da água, aplique com cuidado leves toques sequenciais no pedal do freio, facilitando a evaporação do calor para restaurar a eficiência.",
    category: "Direção Defensiva"
  },
  {
    id: 32,
    question: "Durante um atendimento de Primeiros Socorros sob forte calor solar, uma vítima consciente que apresenta queimaduras leves de segundo grau no dorso da mão deve ser tratada com:",
    options: [
      "Aplicação de pasta de dente dita refrescante ou clara de ovo gelada sobre o local.",
      "Compressas de água fria limpa corrente sobre a área e cobertura sem pressão com curativo úmido, não estourando as bolhas.",
      "Fricção vigorosa de álcool absoluto para forçar a assepsia epidérmica imediata.",
      "Estouramento intencional de todas as bolhas e remoção da derme queimada."
    ],
    correctAnswer: 1,
    explanation: "Em queimaduras, refresque a pele apenas com água corrente fria limpa por cerca de 10 minutos para conter a lesão. Nunca coloque sabão, pomadas comerciais, borra de café ou substâncias estranhas. Preserve bolhas intactas para evitar infecção oportunista bacteriana profunda.",
    category: "Primeiros Socorros"
  },
  {
    id: 33,
    question: "Qual é a cor de fundo padrão das placas de regulamentação do trânsito no Brasil?",
    options: [
      "Fundo amarelo com símbolos em preto.",
      "Fundo verde com inscrições em branco.",
      "Fundo branco com bordas vermelhas e símbolos em preto.",
      "Fundo azul escuro com símbolos brancos."
    ],
    correctAnswer: 2,
    explanation: "As placas de regulamentação têm fundo branco, borda vermelha e símbolos/inscrições em preto. A exceção é a placa R-1 (Parada Obrigatória), que possui fundo totalmente vermelho e letras brancas.",
    category: "Sinalização"
  },
  {
    id: 34,
    question: "O que indica uma linha contínua simples pintada na cor amarela no centro de uma pista de rolamento?",
    options: [
      "Que a via é de mão única e a ultrapassagem é permitida.",
      "Que a via é de mão dupla e a ultrapassagem é expressamente proibida para ambos os sentidos.",
      "Que a ultrapassagem é permitida apenas para os veículos leves de passeio.",
      "Que a via está interditada temporariamente devido a obras na pista."
    ],
    correctAnswer: 1,
    explanation: "A linha longitudinal contínua amarela separa fluxos de tráfego de sentidos opostos (pista de mão dupla) e indica que a ultrapassagem é proibida para veículos de ambos os sentidos de direção.",
    category: "Sinalização"
  },
  {
    id: 35,
    question: "Ao aproximar-se de um cruzamento, o pedestre percebe que o semáforo de pedestres está com a luz verde piscando. Qual deve ser sua atitude?",
    options: [
      "Iniciar a travessia correndo para chegar ao outro lado antes que o sinal feche.",
      "Não iniciar a travessia e aguardar o próximo ciclo verde; caso já tenha iniciado, deve concluí-la em ritmo seguro.",
      "Atravessar de costas para vigiar a aproximação de eventuais carros rápidos.",
      "Pedir para o agente de trânsito segurar o tráfego de veículos imediatamente."
    ],
    correctAnswer: 1,
    explanation: "O sinal verde de pedestres piscando indica que o tempo destinado à travessia está terminando. Os pedestres que ainda não iniciaram a travessia não devem começá-la. Quem já iniciou deve concluí-la com agilidade e segurança.",
    category: "Sinalização"
  },
  {
    id: 36,
    question: "Em termos de obediência e prioridade regulamentar, qual a hierarquia correta entre os sinais de trânsito segundo o CTB?",
    options: [
      "O semáforo tem prioridade máxima sobre as ordens de agentes e placas.",
      "As placas de regulamentação têm prioridade sobre o semáforo e as ordens dos agentes de trânsito.",
      "As ordens do agente de trânsito sobrepõem-se às indicações dos semáforos, placas e demais sinalizações viárias.",
      "Todos os sinais e ordens têm exatamente a mesma hierarquia em cruzamentos urbanos."
    ],
    correctAnswer: 2,
    explanation: "De acordo com o Artigo 89 do CTB, as ordens do agente de trânsito têm prioridade máxima sobre as normas de circulação e as indicações de outros sinais (como semáforos e placas de trânsito).",
    category: "Legislação"
  },
  {
    id: 37,
    question: "A cometimento de uma infração de trânsito de natureza gravíssima gera o acúmulo de quantos pontos na Carteira Nacional de Habilitação (CNH)?",
    options: [
      "5 pontos.",
      "4 pontos.",
      "7 pontos.",
      "3 pontos."
    ],
    correctAnswer: 2,
    explanation: "De acordo com o CTB, as infrações de trânsito acumulam pontos de acordo com a sua gravidade: Gravíssima = 7 pontos; Grave = 5 pontos; Média = 4 pontos; Leve = 3 pontos.",
    category: "Legislação"
  },
  {
    id: 38,
    question: "Um motorista acumula 21 pontos em infrações de trânsito em um período de 12 meses. Sabendo que entre elas há uma infração de natureza grave, o que acontecerá?",
    options: [
      "Ele não sofrerá suspensão, pois o limite máximo é de 40 pontos para qualquer condutor.",
      "Ele terá o direito de dirigir suspenso por ultrapassar o limite de 20 pontos aplicável a quem cometeu infração grave.",
      "Sua habilitação será cassada imediatamente de forma definitiva.",
      "Ele será obrigado a fazer um exame de direção prático no DETRAN."
    ],
    correctAnswer: 1,
    explanation: "O limite de pontos para suspensão da CNH em 12 meses varia: 40 pontos se não houver nenhuma infração gravíssima; 30 pontos se houver uma infração gravíssima; e 20 pontos se houver duas ou mais infrações gravíssimas. Para infratores graves e médios comuns, cometer uma infração grave com acúmulo de 20 ou mais pontos gera a suspensão.",
    category: "Legislação"
  },
  {
    id: 39,
    question: "Em um cruzamento não sinalizado entre duas vias urbanas, dois veículos se aproximam simultaneamente em sentidos transversais. Quem tem a preferência de passagem?",
    options: [
      "O veículo de maior porte ou peso comercial.",
      "O veículo que estiver trafegando em maior velocidade.",
      "O veículo que se aproxima pelo lado direito do outro condutor.",
      "O veículo que piscar os faróis primeiro."
    ],
    correctAnswer: 2,
    explanation: "Segundo o Artigo 29 do CTB, em cruzamentos não sinalizados, a preferência de passagem é do veículo que se aproxima pela direita do outro motorista.",
    category: "Legislação"
  },
  {
    id: 40,
    question: "Qual categoria de CNH habilita o condutor a dirigir um veículo destinado ao transporte coletivo de passageiros que exceda a capacidade de 8 lugares?",
    options: [
      "Categoria B.",
      "Categoria C.",
      "Categoria D.",
      "Categoria E."
    ],
    correctAnswer: 2,
    explanation: "A Categoria D da CNH é a exigida para a condução de veículos de transporte coletivo de passageiros, como vans escolares, ônibus e micro-ônibus, cuja capacidade exceda 8 lugares (excluindo o motorista).",
    category: "Legislação"
  },
  {
    id: 41,
    question: "Nas rodovias brasileiras de pista simples, quando não houver sinalização regulamentadora específica de velocidade, a máxima permitida para ônibus é de:",
    options: [
      "110 km/h.",
      "100 km/h.",
      "90 km/h.",
      "80 km/h."
    ],
    correctAnswer: 2,
    explanation: "Em rodovias de pista simples não sinalizadas, a velocidade máxima regulamentar é de 100 km/h para automóveis, camionetas, caminhonetes e motocicletas; 90 km/h para ônibus e micro-ônibus; e 90 km/h para os demais veículos (caminhões).",
    category: "Legislação"
  },
  {
    id: 42,
    question: "A validade dos exames de aptidão física e mental para a renovação da CNH de condutores com idade inferior a 50 anos é de:",
    options: [
      "5 anos.",
      "3 anos.",
      "10 anos.",
      "8 anos."
    ],
    correctAnswer: 2,
    explanation: "Conforme a nova regra de trânsito em vigor, a validade máxima da CNH é de: 10 anos para condutores com menos de 50 anos; 5 anos para condutores entre 50 e 69 anos; e 3 anos para condutores com 70 anos ou mais.",
    category: "Legislação"
  },
  {
    id: 43,
    question: "Qual o dispositivo de retenção infantil obrigatório para transportar crianças de até 1 ano de idade ou peso limite de até 13 kg?",
    options: [
      "Cadeirinha convencional voltada para a frente.",
      "Bebê conforto instalado de costas para o sentido de marcha do veículo.",
      "Assento de elevação com cinto de segurança de três pontos.",
      "Apenas o cinto de segurança original do veículo no banco de trás."
    ],
    correctAnswer: 1,
    explanation: "Crianças de até 1 ano de idade ou com peso de até 13 kg devem ser transportadas obrigatoriamente no dispositivo denominado 'Bebê Conforto', fixado no banco traseiro e voltado de costas para a frente do veículo.",
    category: "Direção Defensiva"
  },
  {
    id: 44,
    question: "Transitar em velocidade superior à máxima permitida em mais de 50% é considerado infração gravíssima. Quais as penalidades adicionais aplicadas por lei?",
    options: [
      "Apenas advertência simples do agente de trânsito.",
      "Suspensão imediata do direito de dirigir e apreensão do documento de habilitação (CNH).",
      "Multa de 3 vezes e obrigatoriedade de refazer a prova teórica em 5 dias.",
      "Retenção definitiva do veículo para leilão público estadual."
    ],
    correctAnswer: 1,
    explanation: "Trafegar com velocidade acima de 50% do limite regulamentado é infração gravíssima que acarreta multa com multiplicador de 3 vezes e suspensão imediata do direito de dirigir (CNH retida pelo agente).",
    category: "Legislação"
  },
  {
    id: 45,
    question: "Ao conduzir um veículo, segurar ou manusear o telefone celular é considerado infração de trânsito de qual natureza?",
    options: [
      "Infração Grave.",
      "Infração Média.",
      "Infração Gravíssima.",
      "Infração Leve."
    ],
    correctAnswer: 2,
    explanation: "Segurar ou manusear telefone celular enquanto dirige constitui infração de trânsito gravíssima (7 pontos), devido ao enorme desvio de atenção visual e cognitiva gerado no motorista.",
    category: "Legislação"
  },
  {
    id: 46,
    question: "A placa de regulamentação R-4a indica:",
    options: [
      "Proibido Virar à Direita.",
      "Proibido Virar à Esquerda.",
      "Proibido Retornar à Esquerda.",
      "Passagem obrigatória à esquerda."
    ],
    correctAnswer: 1,
    explanation: "A placa R-4a proíbe expressamente a conversão à esquerda na via intersectada.",
    category: "Sinalização"
  },
  {
    id: 47,
    question: "A placa R-6a (Proibido Estacionar) difere da placa R-6b (Proibido Parar e Estacionar) pois:",
    options: [
      "A R-6a permite a parada rápida para embarque ou desembarque de passageiros; a R-6b proíbe qualquer imobilização.",
      "A R-6b é válida apenas para caminhões pesados nas rodovias.",
      "A R-6a proíbe parar apenas em feriados e finais de semana.",
      "Não há diferença legal prática entre as duas placas."
    ],
    correctAnswer: 0,
    explanation: "Estacionar caracteriza-se por imobilização prolongada. Parar é a imobilização rápida estritamente necessária para embarque/desembarque. A R-6a permite a parada rápida; a R-6b proíbe qualquer tipo de parada, mesmo que por segundos.",
    category: "Sinalização"
  },
  {
    id: 48,
    question: "Para obter a Permissão para Dirigir (PPD) ou CNH na categoria B, o candidato deve realizar aulas práticas e ser aprovado no exame em veículo de quatro rodas com peso bruto total de até:",
    options: [
      "3.500 kg.",
      "5.000 kg.",
      "1.500 kg.",
      "6.000 kg."
    ],
    correctAnswer: 0,
    explanation: "A categoria B habilita a condução de veículos motorizados cujo peso bruto total (PBT) não exceda 3.500 kg e cuja lotação não exceda 8 lugares, excluído o do motorista.",
    category: "Legislação"
  },
  {
    id: 49,
    question: "Qual categoria de CNH permite conduzir veículos motorizados de duas ou três rodas, com ou sem carro lateral (side-car)?",
    options: [
      "Categoria A.",
      "Categoria B.",
      "Categoria ACC (Autorização para Conduzir Ciclomotores).",
      "Categoria D."
    ],
    correctAnswer: 0,
    explanation: "A categoria A é a única categoria de habilitação que permite conduzir motocicletas, motonetas e triciclos de qualquer cilindrada.",
    category: "Legislação"
  },
  {
    id: 50,
    question: "Para conduzir um veículo motorizado utilizado no transporte de carga cujo peso bruto total (PBT) exceda 3.500 kg, o motorista deve ser habilitado no mínimo na categoria:",
    options: [
      "Categoria B.",
      "Categoria C.",
      "Categoria D.",
      "Categoria E."
    ],
    correctAnswer: 1,
    explanation: "A categoria C é exigida para conduzir veículos de carga cujo Peso Bruto Total (PBT) seja superior a 3.500 kg (como caminhões médios).",
    category: "Legislação"
  },
  {
    id: 51,
    question: "Qual categoria de CNH é exigida para conduzir combinação de veículos em que o veículo trator se enquadre nas categorias B, C ou D e a unidade acoplada (reboque, semirreboque ou articulada) tenha 6.000 kg ou mais de PBT?",
    options: [
      "Categoria C.",
      "Categoria D.",
      "Categoria E.",
      "Categoria B."
    ],
    correctAnswer: 2,
    explanation: "A categoria E é a indicada para combinações de veículos pesados, carretas, bitrens e veículos com unidades acopladas que excedam 6.000 kg de peso bruto total.",
    category: "Legislação"
  },
  {
    id: 52,
    question: "Na direção defensiva, a soma do 'Tempo de Reação' com o 'Tempo de Frenagem' resulta no:",
    options: [
      "Tempo de Percepção.",
      "Tempo de Aceleração.",
      "Tempo de Parada Total.",
      "Tempo de Retardo Mecânico."
    ],
    correctAnswer: 2,
    explanation: "O Tempo de Parada Total compreende a distância/tempo desde o momento em que o motorista avista o perigo (reação) até a imobilização completa do veículo após acionar os freios (frenagem).",
    category: "Direção Defensiva"
  },
  {
    id: 53,
    question: "Como se conceitua a 'Direção Preventiva' em oposição à 'Direção Corretiva'?",
    options: [
      "Preventiva é aquela em que o condutor prevê situações de perigo e age antecipadamente; Corretiva é quando ele reage a um perigo já consolidado para evitar o pior.",
      "Preventiva é fazer manutenções preventivas; Corretiva é consertar batidas.",
      "Preventiva é andar devagar nas cidades; Corretiva é dirigir rápido nas rodovias.",
      "Não há diferença conceitual prática na engenharia de tráfego."
    ],
    correctAnswer: 0,
    explanation: "A direção preventiva exige antecipação constante dos perigos (olhar adiante, prever erros alheios). A corretiva ocorre quando o motorista precisa consertar um erro imediato (derrapagem, desvio brusco de obstáculo) por falta de prevenção.",
    category: "Direção Defensiva"
  },
  {
    id: 54,
    question: "O acidente de trânsito classificado como 'Colisão Misteriosa' é caracterizado por:",
    options: [
      "Ocorrência de acidentes envolvendo veículos de carga de valor desconhecido.",
      "Acidente com apenas um veículo que sai da pista ou colide, onde as causas não são claras de imediato e o condutor pode não sobreviver para explicar.",
      "Batidas em cruzamentos onde nenhum dos motoristas assume o erro.",
      "Queda de raios elétricos diretamente sobre a lataria em movimento."
    ],
    correctAnswer: 1,
    explanation: "A colisão misteriosa envolve apenas um veículo (normalmente capotamento ou choque contra obstáculo fixo), ocorrendo sem testemunhas e restando dúvidas se foi cansaço, falha mecânica, mal súbito ou desvio de animal.",
    category: "Direção Defensiva"
  },
  {
    id: 55,
    question: "Ao trafegar em rodovia sem iluminação pública à noite, qual o procedimento correto do condutor defensivo ao cruzar com outro veículo vindo no sentido contrário?",
    options: [
      "Manter o farol alto ligado para enxergar melhor os limites da pista oposta.",
      "Piscar os faróis repetidamente para forçar o outro condutor a parar no acostamento.",
      "Alternar para farol baixo com antecedência para não ofuscar a visão do outro motorista.",
      "Ligar o pisca-alerta e desviar levemente para a sarjeta lateral."
    ],
    correctAnswer: 2,
    explanation: "Trafegar com farol alto em vias de sentido oposto cega temporariamente o condutor contrário, podendo causar colisões frontais. Alterne sempre para farol baixo antes de cruzar.",
    category: "Direção Defensiva"
  },
  {
    id: 56,
    question: "O termo 'Ponto Cego' nos espelhos retrovisores dos veículos refere-se a:",
    options: [
      "Uma falha estrutural de fábrica nos espelhos que distorce imagens.",
      "Áreas ao redor do veículo que não podem ser refletidas nos espelhos retrovisores comuns, ocultando outros veículos ou motos.",
      "Vidros embaçados por forte umidade interna do ar condicionado.",
      "Espelhos quebrados ou desalinhados intencionalmente pelo motorista."
    ],
    correctAnswer: 1,
    explanation: "Pontos cegos são regiões fora do campo visual dos retrovisores. O motorista deve mover levemente a cabeça ou usar espelhos convexos auxiliares para certificar-se antes de mudar de faixa.",
    category: "Direção Defensiva"
  },
  {
    id: 57,
    question: "Transitar sob efeito de fadiga extrema ou cansaço excessivo é um ato negligente. Qual o procedimento defensivo indicado?",
    options: [
      "Aumentar a velocidade para chegar logo ao destino antes de dormir.",
      "Ligar o rádio em alto volume e abrir todas as janelas para espantar o sono.",
      "Estacionar o veículo em local seguro e iluminado (como postos de serviço) e descansar antes de prosseguir.",
      "Tomar café forte seguidamente enquanto dirige com farol alto piscando."
    ],
    correctAnswer: 2,
    explanation: "O sono ao volante é fatal. Truques como música alta ou café apenas mascaram a fadiga por minutos. Parar para descansar é a única atitude defensiva segura.",
    category: "Direção Defensiva"
  },
  {
    id: 58,
    question: "Ao deparar-se com um motociclista acidentado no asfalto com suspeita de lesões na coluna cervical, qual a conduta adequada de primeiros socorros?",
    options: [
      "Retirar o capacete imediatamente para facilitar a respiração pulmonar.",
      "Colocar a vítima sentada no meio-fio para aguardar a ambulância.",
      "Sinalizar a via, chamar o socorro profissional e NÃO remover o capacete ou movimentar a vítima.",
      "Fazer massagens vigorosas no pescoço para restabelecer a circulação."
    ],
    correctAnswer: 2,
    explanation: "Retirar o capacete de um motociclista acidentado sem técnica profissional pode agravar lesões na coluna cervical e causar paralisia definitiva. Deixe o capacete e imobilize a vítima.",
    category: "Primeiros Socorros"
  },
  {
    id: 59,
    question: "Se uma vítima de trânsito apresentar crise convulsiva (contrações musculares desordenadas), o que o socorrista deve fazer?",
    options: [
      "Segurar os braços e pernas da vítima com força para conter os movimentos.",
      "Proteger a cabeça da vítima com algo macio, afastar objetos perigosos ao redor e virar a cabeça de lado para evitar sufocamento.",
      "Inserir uma colher ou objeto rígido na boca para evitar que ela morda a língua.",
      "Dar água gelada com açúcar imediatamente durante as contrações."
    ],
    correctAnswer: 1,
    explanation: "Na convulsão, proteja a cabeça contra traumas e limpe a saliva lateralizando a cabeça para evitar aspiração de líquidos. Nunca force nada para dentro da boca nem segure os membros com força.",
    category: "Primeiros Socorros"
  },
  {
    id: 60,
    question: "Caso uma vítima de acidente possua um objeto (como estilhaço de vidro ou ferro) encravado em seu corpo, a atitude correta é:",
    options: [
      "Remover o objeto imediatamente para aplicar curativo adesivo rápido.",
      "Empurrar o objeto ainda mais para conter o sangramento interno.",
      "Não tentar remover o objeto; estabilizá-lo na posição em que se encontra e aguardar o socorro profissional.",
      "Passar álcool em gel abundante ao redor do objeto sob fricção forte."
    ],
    correctAnswer: 2,
    explanation: "Remover objetos encravados pode provocar hemorragias massivas fatais, pois o próprio objeto pode estar atuando como um 'tampão' em artérias. Deixe-o fixado e chame o socorro.",
    category: "Primeiros Socorros"
  },
  {
    id: 61,
    question: "Para reportar um acidente ocorrido em uma rodovia federal (BR) e acionar a Polícia Rodoviária Federal, deve-se discar o número de emergência:",
    options: [
      "190.",
      "191.",
      "192.",
      "193."
    ],
    correctAnswer: 1,
    explanation: "O número de telefone de emergência da Polícia Rodoviária Federal (PRF) em âmbito nacional é o 191.",
    category: "Primeiros Socorros"
  },
  {
    id: 62,
    question: "O número de telefone de emergência utilizado para acionar o Corpo de Bombeiros em casos de incêndios ou resgate de vítimas presas em ferragens é:",
    options: [
      "190.",
      "193.",
      "192.",
      "197."
    ],
    correctAnswer: 1,
    explanation: "O Corpo de Bombeiros atende emergências de resgate veicular e combate a incêndios por meio do número 193.",
    category: "Primeiros Socorros"
  },
  {
    id: 63,
    question: "O uso indevido e frequente da buzina em áreas urbanas residenciais gera poluição sonora. Segundo a legislação, isso constitui:",
    options: [
      "Crime ambiental inafiançável com detenção imediata.",
      "Infração leve com perda de pontos na CNH e multa.",
      "Infração gravíssima com suspensão do direito de dirigir por 6 meses.",
      "Apenas advertência simples, sem qualquer acúmulo de pontos."
    ],
    correctAnswer: 1,
    explanation: "O uso indevido da buzina (toques prolongados, fora dos horários permitidos ou em locais proibidos) é infração leve, gerando multa e pontuação na CNH.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 64,
    question: "O descarte inadequado de óleo lubrificante usado de motor no solo ou em bueiros urbanos provoca grave dano ecológico porque:",
    options: [
      "O óleo dissolve o cimento das tubulações públicas rapidamente.",
      "O óleo contamina o lençol freático e cria uma película impermeável na água que impede a oxigenação da fauna aquática.",
      "O óleo atrai insetos gigantes para a rede de esgoto.",
      "O óleo evapora gerando gases de efeito estufa adocicados."
    ],
    correctAnswer: 1,
    explanation: "O óleo de motor é altamente poluente e persistente. Apenas um litro de óleo usado pode contaminar um milhão de litros de água, bloqueando a troca de oxigênio.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 65,
    question: "A falta de manutenção periódica em motores de combustão interna (filtros sujos, velas desgastadas) interfere diretamente na sustentabilidade pois:",
    options: [
      "Aumenta a emissão de gases poluentes (como CO e hidrocarbonetos) e eleva o consumo de combustível.",
      "Reduz a vida útil da lataria externa contra ferrugem.",
      "Causa superaquecimento das baterias elétricas recicláveis.",
      "Não tem qualquer relação prática com o meio ambiente."
    ],
    correctAnswer: 0,
    explanation: "Motores desregulados queimam combustível de forma incompleta, expelindo fumaça preta altamente tóxica e consumindo mais combustíveis fósseis.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 66,
    question: "Atirar do veículo ou abandonar na via objetos ou substâncias (lixo em geral) é uma atitude contrária à cidadania. No CTB, isso constitui:",
    options: [
      "Infração grave com multa administrativa.",
      "Infração média, gerando multa e pontuação.",
      "Crime de trânsito hediondo.",
      "Apenas desvio ético, sem penalidade prevista por lei."
    ],
    correctAnswer: 1,
    explanation: "De acordo com o Artigo 172 do CTB, atirar objetos ou substâncias de dentro do veículo ou abandoná-las na via é infração média.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 67,
    question: "Para realizar a verificação correta do nível de óleo lubrificante do motor na vareta de medição, o procedimento indicado é:",
    options: [
      "Medir com o motor quente e funcionando em rotação média.",
      "Medir com o veículo em declive acentuado para acumular o óleo na frente.",
      "Medir com o veículo estacionado em local plano, com o motor desligado e preferencialmente frio.",
      "Adicionar aditivo antes de retirar a vareta de controle."
    ],
    correctAnswer: 2,
    explanation: "Para uma leitura precisa na vareta de nível (entre as marcas Mín e Máx), o óleo deve estar todo depositado no cárter (motor desligado por alguns minutos e em plano horizontal).",
    category: "Mecânica Básica"
  },
  {
    id: 68,
    question: "Qual o componente mecânico responsável por resfriar a água/aditivo que circula pelo motor, evitando o superaquecimento catastrófico do bloco?",
    options: [
      "Alternador de carga elétrica.",
      "Carburador ou Bico Injetor primário.",
      "Radiador.",
      "Cárter inferior."
    ],
    correctAnswer: 2,
    explanation: "O radiador realiza a troca térmica do calor gerado no bloco do motor com o ar externo, mantendo o motor na temperatura ideal de funcionamento.",
    category: "Mecânica Básica"
  },
  {
    id: 69,
    question: "Um desgaste prematuro e irregular nas bordas internas ou externas da banda de rodagem dos pneus dianteiros geralmente indica falha de:",
    options: [
      "Calibragem muito alta nos quatro pneus.",
      "Falta de alinhamento da direção (geometria) ou balanceamento das rodas.",
      "Uso excessivo de freio de mão em declives.",
      "Falta de troca do fluido de freio traseiro."
    ],
    correctAnswer: 1,
    explanation: "Rodas desalinhadas (com convergência ou divergência fora de especificação) forçam o arrasto lateral do pneu contra o asfalto, provocando desgaste acelerado em apenas um lado da banda.",
    category: "Mecânica Básica"
  },
  {
    id: 70,
    question: "Ao trafegar, a luz vermelha com o símbolo de uma almotolia (lata de óleo) acende no painel. Qual a ação correta do motorista?",
    options: [
      "Continuar dirigindo até o próximo posto e completar o óleo.",
      "Acelerar o motor para forçar a bomba de óleo a trabalhar mais rápido.",
      "Parar o veículo imediatamente em local seguro, desligar o motor e verificar o nível de óleo (pois indica falta de pressão no sistema de lubrificação).",
      "Ignorar a luz caso o veículo esteja com desempenho normal."
    ],
    correctAnswer: 2,
    explanation: "A luz de óleo indica falta de pressão de lubrificação no motor, o que pode fundir os componentes internos metálicos em minutos por atrito extremo. Pare o veículo imediatamente.",
    category: "Mecânica Básica"
  },
  {
    id: 71,
    question: "A sinalização horizontal constituída por linhas brancas contínuas pintadas nas extremidades laterais da pista de rolamento indica:",
    options: [
      "Proibição de mudança de faixa rápida.",
      "Faixas destinadas a ciclistas urbanos.",
      "As linhas de bordo, que delimitam a largura útil da pista reservada ao tráfego.",
      "Linhas de travessia preferencial de pedestres locais."
    ],
    correctAnswer: 2,
    explanation: "As linhas de bordo servem para demarcar os limites externos da pista de rodagem, auxiliando a visualização espacial do limite físico da pista especialmente sob neblina ou à noite.",
    category: "Sinalização"
  },
  {
    id: 72,
    question: "A placa de advertência de formato de losango amarelo com o símbolo de um trabalhador cavando com uma pá (A-15) avisa sobre:",
    options: [
      "Área de mineração pesada autorizada.",
      "Obras na pista adiante, exigindo redução de velocidade e atenção extra.",
      "Treinamento agrícola regional.",
      "Fim de trecho pavimentado urbano."
    ],
    correctAnswer: 1,
    explanation: "A placa A-15 adverte sobre homens trabalhando na via. Exige atenção redobrada do motorista a fim de evitar acidentes com operários e máquinas.",
    category: "Sinalização"
  },
  {
    id: 73,
    question: "Efetuar a ultrapassagem de outro veículo trafegando pelo acostamento em rodovias constitui qual tipo de infração de trânsito?",
    options: [
      "Infração Grave.",
      "Infração Gravíssima (com multa multiplicada por 5x).",
      "Infração Média com advertência escrita do DETRAN.",
      "Não constitui infração caso a pista principal esteja congestionada."
    ],
    correctAnswer: 1,
    explanation: "Ultrapassar pelo acostamento é infração gravíssima com fator multiplicador de 5 vezes na multa, devido ao alto risco de colisão com pedestres ou veículos parados em emergência.",
    category: "Legislação"
  },
  {
    id: 74,
    question: "Nas vias urbanas coletoras brasileiras não sinalizadas, o limite máximo regulamentar de velocidade é de:",
    options: [
      "60 km/h.",
      "30 km/h.",
      "40 km/h.",
      "50 km/h."
    ],
    correctAnswer: 2,
    explanation: "Nas vias coletoras (responsáveis por coletar e distribuir o trânsito dentro dos bairros) não sinalizadas, a velocidade máxima padrão estabelecida pelo CTB é de 40 km/h.",
    category: "Legislação"
  },
  {
    id: 75,
    question: "Nas vias urbanas classificadas como 'Vias Locais' desprovidas de sinalização de velocidade, o limite máximo regulamentar de velocidade é de:",
    options: [
      "40 km/h.",
      "30 km/h.",
      "20 km/h.",
      "50 km/h."
    ],
    correctAnswer: 1,
    explanation: "Vias locais são destinadas apenas ao acesso a áreas restritas ou garagens. Sem placas de velocidade, o limite geral definido por lei é de 30 km/h.",
    category: "Legislação"
  },
  {
    id: 76,
    question: "O proprietário do veículo que receber uma Notificação de Autuação de infração possui qual prazo legal para apresentar a Defesa Prévia ou Indicação de Condutor Infrator?",
    options: [
      "Prazo mínimo de 30 dias contados a partir da data de expedição da notificação.",
      "Exatamente 15 dias contados da infração física.",
      "Até o vencimento do licenciamento anual seguinte.",
      "Não há prazo limite para recurso no JARI."
    ],
    correctAnswer: 0,
    explanation: "O CTB determina que o prazo para indicação de condutor infrator ou apresentação de defesa de autuação não deve ser inferior a 30 (trinta) dias, contados da data de notificação.",
    category: "Legislação"
  },
  {
    id: 77,
    question: "Em relação à responsabilidade pelas infrações cometidas no trânsito, quem responde legalmente pelas infrações decorrentes de atos praticados na direção do veículo (como ultrapassar sinal vermelho)?",
    options: [
      "O proprietário do veículo de forma solidária incondicional.",
      "O condutor que estava de fato dirigindo o veículo no momento da infração.",
      "A seguradora contratada do automóvel.",
      "O DETRAN emissor da CNH."
    ],
    correctAnswer: 1,
    explanation: "O proprietário responde pelas infrações administrativas e de documentação/conservação do veículo. O condutor cadastrado ou identificado responde civil e criminalmente pelas infrações de direção e circulação.",
    category: "Legislação"
  },
  {
    id: 78,
    question: "Em relação ao porte do documento do veículo (CRLV), qual a regra atual vigente no Brasil?",
    options: [
      "O porte físico em papel oficial verde continua sendo estritamente obrigatório em todas as vias.",
      "O porte é dispensado se a fiscalização policial puder consultar os dados sistêmicos online no momento da abordagem, ou se o condutor apresentar a versão digital no app Carteira Digital de Trânsito.",
      "Não há necessidade de portar qualquer documento físico ou digital se o motorista tiver CNH.",
      "Basta portar o comprovante de pagamento do IPVA do ano corrente."
    ],
    correctAnswer: 1,
    explanation: "O CRLV-e digital possui o mesmo valor legal do físico. O porte é obrigatório, mas pode ser dispensado se o agente de trânsito puder consultar a placa no sistema central online durante a abordagem.",
    category: "Legislação"
  },
  {
    id: 79,
    question: "Ao cruzar pontes extensas sob forte vento lateral, qual o procedimento correto do motorista defensivo para manter a estabilidade do veículo?",
    options: [
      "Aumentar a velocidade ao máximo para romper a resistência aerodinâmica lateral.",
      "Reduzir a velocidade de condução e abrir levemente os vidros das portas para reduzir o efeito de arrasto de ar no chassi.",
      "Efetuar ziguezagues rápidos no volante para anular as correntes de ar.",
      "Parar o carro no centro da pista até a tempestade de vento cessar."
    ],
    correctAnswer: 1,
    explanation: "O vento lateral pode desestabilizar o carro, especialmente SUVs ou furgões. Reduzir a velocidade aumenta a aderência dos pneus e abrir as janelas diminui a diferença de pressão interna/externa.",
    category: "Direção Defensiva"
  },
  {
    id: 80,
    question: "Se um pneu do veículo estourar inesperadamente com o automóvel em movimento na rodovia, a conduta defensiva correta é:",
    options: [
      "Pisar no freio com força total imediatamente para parar o veículo no asfalto.",
      "Girar o volante rapidamente para o lado do pneu estourado para compensar a puxada.",
      "Manter o volante firme e alinhado, soltar o pedal do acelerador de forma gradual e aplicar os freios suavemente apenas quando o veículo estiver sob controle, direcionando-o para o acostamento.",
      "Desligar a chave de ignição com o veículo ainda engatado em alta rotação."
    ],
    correctAnswer: 2,
    explanation: "Freadas bruscas com pneu estourado causam perda de controle lateral catastrófica. Segure firme o volante para manter a trajetória e deixe a velocidade cair gradualmente antes de encostar.",
    category: "Direção Defensiva"
  },
  {
    id: 81,
    question: "Ao transitar sob neblina densa, o pisca-alerta do veículo em movimento:",
    options: [
      "Deve ser ligado sempre para alertar os motoristas de trás sobre a baixa visibilidade.",
      "Só deve ser usado em caso de perigo iminente ou quando o veículo estiver imobilizado no acostamento ou faixa de emergência.",
      "Substitui o farol baixo obrigatório.",
      "Serve para indicar que o motorista fará uma ultrapassagem rápida."
    ],
    correctAnswer: 1,
    explanation: "O pisca-alerta piscando em movimento com neblina confunde os motoristas de trás, fazendo-os pensar que o carro está parado, podendo causar colisões severas. Use farol baixo e lanterna de neblina.",
    category: "Direção Defensiva"
  },
  {
    id: 82,
    question: "Se o veículo iniciar um processo de aquaplanagem (deslizar sobre poça de água perdendo o contato dos pneus com o solo), o motorista deve:",
    options: [
      "Virar o volante rapidamente para a esquerda e para a direita alternadamente.",
      "Pisar fundo no pedal do freio para forçar o carro a afundar na poça.",
      "Retirar suavemente o pé do acelerador, manter o volante firme em linha reta e NÃO pisar no freio nem girar a direção até que os pneus recuperem a aderência com o solo seco.",
      "Puxar o freio de mão de forma brusca para travar as rodas traseiras."
    ],
    correctAnswer: 2,
    explanation: "Frenagem ou esterçamento das rodas enquanto o carro flutua na água causam rodopios violentos assim que o pneu toca o asfalto seco novamente. Alivie o acelerador e mantenha o rumo.",
    category: "Direção Defensiva"
  },
  {
    id: 83,
    question: "O uso do cinto de segurança de três pontos nos assentos traseiros de carros de passeio:",
    options: [
      "É opcional por lei, sendo obrigatório apenas nos bancos da frente.",
      "É obrigatório e de extrema importância, pois evita que os passageiros traseiros colidam uns com os outros ou sejam arremessados contra o para-brisa ou para fora do veículo em caso de colisão.",
      "É dispensado para crianças de até 10 anos.",
      "Só é obrigatório em viagens interestaduais rápidas."
    ],
    correctAnswer: 1,
    explanation: " Passageiros sem cinto no banco traseiro são arremessados contra os ocupantes da frente com força multiplicada pela velocidade, esmagando-os contra o painel. O uso traseiro é obrigatório e salva vidas.",
    category: "Direção Defensiva"
  },
  {
    id: 84,
    question: "Ao estacionar nas proximidades de cruzamentos urbanos (esquinas), a legislação determina uma distância mínima de afastamento do alinhamento da via transversal de:",
    options: [
      "3 metros.",
      "8 metros.",
      "5 metros.",
      "10 metros."
    ],
    correctAnswer: 2,
    explanation: "Segundo o Artigo 181, I do CTB, estacionar o veículo nas esquinas e a menos de 5 metros do bordo do alinhamento da via transversal é infração média (sujeita a multa e remoção do veículo).",
    category: "Legislação"
  },
  {
    id: 85,
    question: "Estacionar o veículo em frente a guias rebaixadas destinadas a entradas e saídas de veículos (garagens) constitui:",
    options: [
      "Infração média, gerando multa e remoção do veículo por guincho.",
      "Infração grave com perda da CNH definitiva.",
      "Apenas desrespeito de trânsito, sem previsão de multa na lei.",
      "Infração permitida caso o condutor deixe o pisca-alerta aceso."
    ],
    correctAnswer: 0,
    explanation: "Bloquear entrada/saída de garagens é infração média de trânsito. A medida administrativa aplicável é a remoção do veículo por guincho público.",
    category: "Legislação"
  },
  {
    id: 86,
    question: "Parar o veículo sobre a faixa de pedestres na mudança de sinal luminoso (semáforo fechando) constitui:",
    options: [
      "Infração média, gerando multa.",
      "Infração grave com perda de 5 pontos.",
      "Infração leve, permitida em grandes congestionamentos.",
      "Não constitui infração caso o veículo não tenha espaço à frente."
    ],
    correctAnswer: 0,
    explanation: "Obstruir a faixa de pedestres na mudança de semáforo é infração média. O motorista deve prever o fluxo e não entrar na interseção se notar que o trânsito à frente está parado.",
    category: "Legislação"
  },
  {
    id: 87,
    question: "Ao prestar socorro a uma vítima de acidente que apresenta sintomas de 'Estado de Choque' (pele fria e pálida, pulso rápido e fraco, respiração rápida), a conduta correta é:",
    options: [
      "Dar água gelada com sal e forçá-la a caminhar.",
      "Manter a vítima deitada em local plano, afrouxar suas roupas, cobri-la para evitar perda de calor corporal e elevar ligeiramente suas pernas (se não houver fratura de membros inferiores ou coluna).",
      "Aplicar compressas de água quente na testa.",
      "Fazer respiração boca a boca imediata."
    ],
    correctAnswer: 1,
    explanation: "O estado de choque indica falha circulatória. Manter a vítima deitada e aquecida ajuda a manter o fluxo de sangue no cérebro e órgãos vitais. Elevar as pernas facilita o retorno venoso.",
    category: "Primeiros Socorros"
  },
  {
    id: 88,
    question: "Como o socorrista pode identificar rapidamente uma parada respiratória em uma vítima de acidente inconsciente?",
    options: [
      "Verificando se há fraturas visíveis nas costelas inferiores.",
      "Observando a ausência de movimentos de expansão do tórax, a falta de saída de ar pela boca/nariz (sentir o sopro) e coloração azulada/roxa nos lábios e unhas (cianose).",
      "Fazendo cócegas na planta dos pés da vítima.",
      "Perguntando em voz alta se ela está respirando normalmente."
    ],
    correctAnswer: 1,
    explanation: "A parada respiratória é detectada pela técnica do 'Ver, Ouvir e Sentir' os movimentos respiratórios da vítima por até 10 segundos, associada à cianose por falta de oxigênio.",
    category: "Primeiros Socorros"
  },
  {
    id: 67, // wait, let's keep sequence unique
    question: "Ao deparar-se com uma vítima de queimadura causada por contato com produto químico corrosivo (ácido), qual a primeira conduta indicada de primeiros socorros?",
    options: [
      "Passar pomada hidratante e óleo de cozinha no local.",
      "Lavar o local abundantemente com água corrente limpa por pelo menos 15 a 20 minutos para remover o agente químico corrosivo da derme.",
      "Cobrir a lesão com poeira ou terra seca para neutralizar o ácido.",
      "Estourar as bolhas que se formarem usando uma agulha esterilizada."
    ],
    correctAnswer: 1,
    explanation: "Queimaduras químicas exigem lavagem exaustiva com água corrente para diluir e remover o reagente químico das camadas da pele. Nunca aplique substâncias oleosas.",
    category: "Primeiros Socorros"
  },
  {
    id: 90,
    question: "Qual o principal gás emitido em grande escala pela queima de combustíveis fósseis (gasolina e diesel) dos veículos automotores que contribui diretamente para o aquecimento global (Efeito Estufa)?",
    options: [
      "Oxigênio puro (O2).",
      "Dióxido de Carbono ou Gás Carbônico (CO2).",
      "Metano líquido (CH4).",
      "Gás Hélio."
    ],
    correctAnswer: 1,
    explanation: "O dióxido de carbono (CO2) é o principal gás estufa gerado pela queima de hidrocarbonetos fósseis nos motores veiculares, retendo calor solar na atmosfera terrestre.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 91,
    question: "O descarte ou abandono incorreto de pneus velhos usados em terrenos baldios ou margens de rodovias representa qual tipo de perigo ambiental urbano?",
    options: [
      "Acúmulo de poeira que acelera a erosão do asfalto vizinho.",
      "Acúmulo de água das chuvas nas cavidades internas dos pneus, criando o criadouro perfeito para o mosquito transmissor da Dengue, Zika e Chikungunya (Aedes aegypti).",
      "Emissão espontânea de gases inflamáveis de enxofre.",
      "Redução da umidade relativa do ar urbano."
    ],
    correctAnswer: 1,
    explanation: "Pneus descartados incorretamente acumulam água parada e protegida do sol, propiciando a reprodução acelerada do vetor de graves arboviroses.",
    category: "Meio Ambiente & Cidadania"
  },
  {
    id: 92,
    question: "No sistema elétrico do veículo, qual a função atribuída ao componente mecânico denominado 'Alternador'?",
    options: [
      "Gerar faísca elétrica nas velas para explodir a mistura nos cilindros.",
      "Gerar energia elétrica necessária para manter carregada a bateria e alimentar todos os sistemas elétricos do veículo enquanto o motor está funcionando.",
      "Armazenar carga elétrica indefinidamente para dar a partida matinal.",
      "Controlar a temperatura interna do ar condicionado digital."
    ],
    correctAnswer: 1,
    explanation: "A bateria fornece energia inicial de partida. Com o motor rodando, o alternador passa a gerar energia elétrica, recarregando a bateria e suprindo faróis, som e ignição.",
    category: "Mecânica Básica"
  },
  {
    id: 93,
    question: "Qual a função primária desempenhada pelo 'Sistema de Suspensão' (amortecedores e molas) em um automóvel?",
    options: [
      "Aumentar o torque mecânico nas rodas dianteiras.",
      "Absorver os impactos das irregularidades do solo, mantendo a estabilidade direcional e os pneus em constante contato com o asfalto.",
      "Controlar as frenagens de emergência em curvas acentuadas.",
      "Evitar o consumo excessivo de combustível mineral."
    ],
    correctAnswer: 1,
    explanation: "A suspensão garante o conforto dos ocupantes e a segurança direcional do veículo, evitando oscilações excessivas e perda de aderência em irregularidades ou curvas.",
    category: "Mecânica Básica"
  },
  {
    id: 94,
    question: "O condutor nota que o pedal de freio está cedendo excessivamente (muito baixo e mole) e o reservatório de fluido de freio está abaixo do nível mínimo. O que isso pode indicar?",
    options: [
      "Vazamento no sistema hidráulico de freios ou desgaste acentuado das pastilhas de freio, exigindo revisão mecânica imediata.",
      "Nível de água do radiador baixo, influenciando o freio a vácuo.",
      "Bateria com carga reduzida.",
      "Necessidade de lubrificação mecânica nas rodas traseiras."
    ],
    correctAnswer: 0,
    explanation: "O fluido de freio baixo é sinal de alerta grave. Conforme as pastilhas gastam, os pistões avançam e o nível do fluido desce. Um declínio súbito aponta vazamentos nas linhas hidráulicas, o que pode causar perda total de freios.",
    category: "Mecânica Básica"
  },
  {
    id: 95,
    question: "A placa de regulamentação R-24a regulamenta:",
    options: [
      "Sentido Proibido de tráfego.",
      "Sentido de Circulação da Via ou Pista.",
      "Passagem obrigatória para caminhões.",
      "Mão Dupla Adiante na rodovia."
    ],
    correctAnswer: 1,
    explanation: "A placa R-24a assinala o sentido único de direção em que os veículos devem trafegar na via regulamentada.",
    category: "Sinalização"
  },
  {
    id: 96,
    question: "A placa de regulamentação de cor azul circular contendo o número '30' (R-28) indica ao motorista a obrigatoriedade de trafegar a uma:",
    options: [
      "Velocidade máxima permitida de 30 km/h.",
      "Velocidade mínima obrigatória de 30 km/h.",
      "Distância de segurança de 30 metros.",
      "Altura máxima permitida de 3,0 metros."
    ],
    correctAnswer: 1,
    explanation: "Diferente das placas circulares brancas com borda vermelha (velocidade máxima R-19), as placas de cor azul circular com número indicam a velocidade mínima obrigatória (R-28) permitida na via.",
    category: "Sinalização"
  },
  {
    id: 97,
    question: "Deixar o condutor de prestar socorro à vítima de acidente de trânsito quando solicitado por autoridade ou quando puder fazê-lo sem risco pessoal é classificado como:",
    options: [
      "Apenas desrespeito moral, sem punição legal administrativa.",
      "Infração média, gerando multa.",
      "Infração gravíssima (sujeita a multa) e crime de trânsito com previsão de detenção de 6 meses a 1 ano (Artigo 304 do CTB).",
      "Infração grave, resolvida apenas com pagamento de fiança na delegacia."
    ],
    correctAnswer: 2,
    explanation: "Omissão de socorro é ato gravíssimo e tipificado como crime de trânsito pelo CTB (Art. 304), visando obrigar a prestação de auxílio mínimo a vidas em perigo.",
    category: "Legislação"
  },
  {
    id: 98,
    question: "Realizar manobra de retorno em locais proibidos por sinalização regulamentadora (placa R-5a ou R-5b) constitui infração de qual natureza?",
    options: [
      "Infração Grave.",
      "Infração Média.",
      "Infração Gravíssima (7 pontos e multa).",
      "Infração Leve."
    ],
    correctAnswer: 2,
    explanation: "Efetuar retorno em locais proibidos pela sinalização (como cruzamentos com placas proibitivas) é infração gravíssima, devido ao imenso risco de colisão transversal ou engavetamento lateral.",
    category: "Legislação"
  },
  {
    id: 99,
    question: "Ao trafegar e realizar curvas em alta velocidade, qual força física empurra o chassi do veículo para o lado de fora (exterior) da curva, exigindo firmeza direcional?",
    options: [
      "Força Centrípeta.",
      "Força Centrífuga.",
      "Inércia Gravitacional reversa.",
      "Resistência de atrito estático de rolamento."
    ],
    correctAnswer: 1,
    explanation: "A força centrífuga é a força física gerada pelo movimento curvilíneo que tende a ejetar o corpo (veículo) para fora do centro da curva. A força centrípeta atua mantendo-o na trajetória (gerada pela aderência dos pneus).",
    category: "Direção Defensiva"
  },
  {
    id: 100,
    question: "Transitar com o veículo automotor sobre ciclovias ou ciclofaixas exclusivas de ciclistas constitui qual tipo de infração de trânsito segundo o CTB?",
    options: [
      "Infração Grave.",
      "Infração Gravíssima com fator multiplicador de multa de 3 vezes (multa no valor de R$ 880,41).",
      "Infração Média com remoção do veículo para depósito público.",
      "Permitido apenas se a ciclovia estiver sem ciclistas circulando."
    ],
    correctAnswer: 1,
    explanation: "De acordo com o Artigo 193 do CTB, transitar com veículo em locais exclusivos de pedestres/ciclistas (calçadas, ciclovias) é infração gravíssima. A multa é multiplicada por 3 vezes devido ao grave risco de atropelamento.",
    category: "Legislação"
  }
];

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
    explanation: "A aquaplanagem é a perda de contato dos pneus com o solo devido a uma camada de água. Para prevenir, reduza a velocidade antes de poças e mantenha sulcos dos pneus acima do limite legal de 1,6 milímetros de profundidade (TWI).",
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
      "O consumo térmico instantâneo de combustível nas frenagens rápidas.",
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
    explanation: "O CONTRAN é o órgão coordenador máximo do Sistema Nacional de Trânsito, responsável por criar resoluções unificadas, regulamentações técnicas da sinalização de trânsito e definir as normas operacionais nacionais.",
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
    explanation: "Os óxidos de enxofre (SOx) e de nitrogênio (NOx), emitidos amplamente por queima de óleo diesel ou carvão, reagem com o vapor de água da atmosfera formando ácidos forte (nítrico e sulfúrico), gerando chuva ácida prejudicial.",
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
  }
];

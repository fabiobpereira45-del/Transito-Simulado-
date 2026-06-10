import React from 'react';

interface SignRendererProps {
  type: string;
  extraData?: string;
  size?: number | string;
}

export const SignRenderer: React.FC<SignRendererProps> = ({ type, extraData, size = 96 }) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div 
      className="flex items-center justify-center select-none"
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-md filter"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Placa R-1: Parada Obrigatória (Octógono Vermelho) */}
        {type === 'stop' && (
          <g>
            <polygon 
              points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" 
              fill="#E11D48" 
              stroke="#FFFFFF" 
              strokeWidth="3.5"
            />
            <polygon 
              points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="1.5"
            />
            <text 
              x="50" 
              y="58" 
              fill="#FFFFFF" 
              fontSize="20" 
              fontWeight="900" 
              fontFamily="system-ui, sans-serif" 
              textAnchor="middle"
              letterSpacing="0.5"
            >
              PARE
            </text>
          </g>
        )}

        {/* Placa R-2: Dê a Preferência (Triângulo Invertido) */}
        {type === 'yield' && (
          <g>
            <polygon 
              points="5,10 95,10 50,90" 
              fill="#FFFFFF" 
              stroke="#E11D48" 
              strokeWidth="8"
            />
            <polygon 
              points="12,14 88,14 50,80" 
              fill="none" 
              stroke="#E11D48" 
              strokeWidth="2"
            />
          </g>
        )}

        {/* Placa R-3: Sentido Proibido (Círculo Vermelho com Traço Transversal) */}
        {type === 'prohibited' && (
          <g>
            <circle cx="50" cy="50" r="43" fill="#FFFFFF" stroke="#E11D48" strokeWidth="8"/>
            <line x1="19" y1="19" x2="81" y2="81" stroke="#E11D48" strokeWidth="9"/>
            {extraData === 'sentido_proibido' && (
              <g transform="translate(50, 50) rotate(-45)">
                <path d="M-25,0 L20,0 M10,-8 L22,0 L10,8" fill="none" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            )}
          </g>
        )}

        {/* Placa R-19: Limite de Velocidade (Círculo Vermelho) */}
        {type === 'speed_limit' && (
          <g>
            <circle cx="50" cy="50" r="43" fill="#FFFFFF" stroke="#E11D48" strokeWidth="8"/>
            <text 
              x="50" 
              y="53" 
              fill="#111827" 
              fontSize="31" 
              fontWeight="900" 
              fontFamily="system-ui, sans-serif" 
              textAnchor="middle"
            >
              {extraData || '80'}
            </text>
            <text 
              x="50" 
              y="71" 
              fill="#4B5563" 
              fontSize="10" 
              fontWeight="700" 
              fontFamily="system-ui, sans-serif" 
              textAnchor="middle"
              letterSpacing="0.2"
            >
              km/h
            </text>
          </g>
        )}

        {/* Placas de Advertência: Formato Losango Amarelo com Borda Preta */}
        {type === 'warning_curve' && (
          <g>
            <rect x="15" y="15" width="70" height="70" rx="4" transform="rotate(45 50 50)" fill="#F59E0B" stroke="#1F2937" strokeWidth="4"/>
            {extraData === 'esquerda' ? (
              <path 
                d="M60,65 L60,45 C60,35 40,35 40,35 M50,25 L35,35 L50,45" 
                fill="none" 
                stroke="#1F2937" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            ) : (
              <path 
                d="M40,65 L40,45 C40,35 60,35 60,35 M50,25 L65,35 L50,45" 
                fill="none" 
                stroke="#1F2937" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            )}
          </g>
        )}

        {type === 'warning_pedestrian' && (
          <g>
            <rect x="15" y="15" width="70" height="70" rx="4" transform="rotate(45 50 50)" fill="#F59E0B" stroke="#1F2937" strokeWidth="4"/>
            {/* Desenho do pedestre andando */}
            <circle cx="50" cy="35" r="5" fill="#1F2937"/>
            {/* Tronco */}
            <line x1="50" y1="40" x2="50" y2="55" stroke="#1F2937" strokeWidth="4" strokeLinecap="round"/>
            {/* Pernas em passo */}
            <line x1="50" y1="55" x2="42" y2="70" stroke="#1F2937" strokeWidth="4" strokeLinecap="round"/>
            <line x1="50" y1="55" x2="58" y2="68" stroke="#1F2937" strokeWidth="4" strokeLinecap="round"/>
            {/* Braços */}
            <line x1="50" y1="44" x2="40" y2="52" stroke="#1F2937" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="44" x2="56" y2="52" stroke="#1F2937" strokeWidth="3" strokeLinecap="round"/>
            {/* Faixa de pedestre abaixo */}
            <line x1="30" y1="75" x2="70" y2="75" stroke="#1F2937" strokeWidth="3"/>
            <line x1="35" y1="78" x2="65" y2="78" stroke="#1F2937" strokeWidth="1.5"/>
          </g>
        )}

        {type === 'warning_traffic_light' && (
          <g>
            <rect x="15" y="15" width="70" height="70" rx="4" transform="rotate(45 50 50)" fill="#F59E0B" stroke="#1F2937" strokeWidth="4"/>
            {/* Mini Semáforo dentro da placa */}
            <rect x="42" y="32" width="16" height="36" rx="3" fill="#1F2937"/>
            <circle cx="50" cy="38" r="4.5" fill="#EF4444"/>
            <circle cx="50" cy="50" r="4.5" fill="#FBBF24"/>
            <circle cx="50" cy="62" r="4.5" fill="#10B981"/>
          </g>
        )}

        {/* Semáforo Regular */}
        {type === 'light_regular' && (
          <g>
            <rect x="30" y="10" width="40" height="80" rx="8" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
            {/* Encaixes das luzes */}
            <circle cx="50" cy="24" r="11" fill="#111827"/>
            <circle cx="50" cy="50" r="11" fill="#111827"/>
            <circle cx="50" cy="76" r="11" fill="#111827"/>
            {/* Luzes acesas com glow suave */}
            <circle cx="50" cy="24" r="9" fill="#EF4444" className="animate-pulse filter drop-shadow-[0_0_4px_#EF4444]"/>
            <circle cx="50" cy="50" r="9" fill="#FBBF24" opacity="0.3"/>
            <circle cx="50" cy="76" r="9" fill="#10B981" opacity="0.3"/>
          </g>
        )}

        {/* Semáforo Pedestres */}
        {type === 'light_pedestrian' && (
          <g>
            <rect x="33" y="15" width="34" height="70" rx="6" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
            {/* Seções */}
            <rect x="39" y="21" width="22" height="26" rx="2" fill="#111827"/>
            <rect x="39" y="53" width="22" height="26" rx="2" fill="#111827"/>
            {/* Boneco Pare (Vermelho) */}
            <circle cx="50" cy="28" r="3.5" fill="#EF4444"/>
            <path d="M50,31 L50,41 M45,34 L55,34 M47,45 L50,41 L53,45" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Boneco Ande (Verde - aceso na ilustração) */}
            <circle cx="50" cy="59" r="3" fill="#10B981" opacity="0.2"/>
            <path d="M48,62 L52,65 M48,59 Q51,62 50,67 M46,73 L50,68 L54,72" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" className="animate-pulse"/>
          </g>
        )}

        {/* Toques de buzina - Símbolo de Corneta/Megafone */}
        {type === 'horn_short' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="2"/>
            {/* Megafone lateral */}
            <path d="M25,40 L45,40 L55,25 L55,75 L45,60 L25,60 Z" fill="#475569" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="18" y="44" width="8" height="12" rx="1" fill="#64748B"/>
            {/* Sound Wave rápido/curto */}
            <path d="M63,38 Q67,50 63,62" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
            <path d="M72,31 Q78,50 72,69" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
            {/* Simbolo de OK/Curto */}
            <circle cx="20" cy="20" r="8" fill="#10B981"/>
            <path d="M17,20 L19,22 L23,17" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </g>
        )}

        {type === 'horn_long' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="2"/>
            <path d="M22,40 L42,40 L52,25 L52,75 L42,60 L22,60 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="15" y="44" width="8" height="12" rx="1" fill="#B91C1C"/>
            {/* Ondas muito longas e barulhentas */}
            <path d="M60,35 Q65,50 60,65" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
            <path d="M68,27 Q75,50 68,73" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
            <path d="M76,19 Q85,50 76,81" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
            {/* Simbolo de Proibição */}
            <circle cx="20" cy="20" r="8" fill="#EF4444"/>
            <line x1="15" y1="15" x2="25" y2="25" stroke="#FFFFFF" strokeWidth="2"/>
          </g>
        )}

        {/* Sinalização Horizontal (Pistas de asfalto desenhadas) */}
        {type === 'line_continuous' && (
          <g>
            <rect x="10" y="5" width="80" height="90" rx="4" fill="#374151"/>
            {/* Linha contínua amarela dupla ou simples */}
            {extraData === 'amarela' ? (
              <line x1="50" y1="5" x2="50" y2="95" stroke="#FBBF24" strokeWidth="6"/>
            ) : (
              <line x1="50" y1="5" x2="50" y2="95" stroke="#FFFFFF" strokeWidth="6"/>
            )}
            {/* Bordas laterais de pista */}
            <line x1="16" y1="5" x2="16" y2="95" stroke="#9CA3AF" strokeWidth="2"/>
            <line x1="84" y1="5" x2="84" y2="95" stroke="#9CA3AF" strokeWidth="2"/>
            {/* Carros simulados estilizados */}
            <rect x="25" y="60" width="14" height="22" rx="2" fill="#2563EB" opacity="0.8"/>
            <rect x="61" y="15" width="14" height="22" rx="2" fill="#EF4444" opacity="0.8"/>
            {/* Indicadores de direção de ultrapassagem proibida (X vermelhos de proibido) */}
            <path d="M43,45 L47,49 M47,45 L43,49" stroke="#EF4444" strokeWidth="2.5"/>
            <path d="M53,45 L57,49 M57,45 L53,49" stroke="#EF4444" strokeWidth="2.5"/>
          </g>
        )}

        {type === 'line_broken' && (
          <g>
            <rect x="10" y="5" width="80" height="90" rx="4" fill="#374151"/>
            {/* Linha verde/permitido ou amarela seccionada branca */}
            <line x1="50" y1="12" x2="50" y2="28" stroke="#FBBF24" strokeWidth="4"/>
            <line x1="50" y1="42" x2="50" y2="58" stroke="#FBBF24" strokeWidth="4"/>
            <line x1="50" y1="72" x2="50" y2="88" stroke="#FBBF24" strokeWidth="4"/>
            {/* Carros */}
            <rect x="25" y="55" width="14" height="22" rx="2" fill="#10B981" opacity="0.75"/>
            {/* Linha de ultrapassagem permitida com setas verdes */}
            <path d="M32,45 L45,35 L58,45" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
          </g>
        )}

        {type === 'line_double' && (
          <g>
            <rect x="10" y="5" width="80" height="90" rx="4" fill="#374151"/>
            {/* Duas linhas amarelas contínuas lado a lado */}
            <line x1="45" y1="5" x2="45" y2="95" stroke="#FBBF24" strokeWidth="4"/>
            <line x1="55" y1="5" x2="55" y2="95" stroke="#FBBF24" strokeWidth="4"/>
            {/* Bordas */}
            <line x1="16" y1="5" x2="16" y2="95" stroke="#9CA3AF" strokeWidth="2"/>
            <line x1="84" y1="5" x2="84" y2="95" stroke="#9CA3AF" strokeWidth="2"/>
            {/* Seta de bloqueio */}
            <rect x="25" y="65" width="12" height="18" rx="2" fill="#D1D5DB" opacity="0.4"/>
            <rect x="63" y="15" width="12" height="18" rx="2" fill="#D1D5DB" opacity="0.4"/>
          </g>
        )}

        {/* Gestos do Agente (Ordem de Parada) */}
        {type === 'gest_agent_stop' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#F1F5F9" stroke="#475569" strokeWidth="2"/>
            {/* Agente com quepe */}
            <circle cx="50" cy="35" r="10" fill="#334155"/>
            {/* Quepe do Agente */}
            <path d="M38,30 Q50,20 62,30 Z" fill="#1E293B"/>
            <line x1="36" y1="30" x2="64" y2="30" stroke="#FBBF24" strokeWidth="2"/>
            {/* Corpo */}
            <rect x="38" y="45" width="24" height="40" rx="4" fill="#334155"/>
            {/* Gravata / Distintivo */}
            <rect x="48" y="48" width="4" height="15" fill="#FBBF24"/>
            {/* Braço levantado com a mão estendida de Pare */}
            <line x1="62" y1="50" x2="76" y2="25" stroke="#334155" strokeWidth="5" strokeLinecap="round"/>
            {/* Mão de pare */}
            <circle cx="78" cy="21" r="5" fill="#0F172A"/>
            <line x1="78" y1="16" x2="78" y2="26" stroke="#EF4444" strokeWidth="2"/>
            {/* Outro braço relaxado */}
            <line x1="38" y1="50" x2="28" y2="70" stroke="#334155" strokeWidth="5" strokeLinecap="round"/>
          </g>
        )}

        {/* Gestos do Condutor - dobrar esquerda */}
        {type === 'gest_driver_left' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#F1F5F9" stroke="#475569" strokeWidth="2"/>
            {/* Carro visto de costas */}
            <rect x="25" y="40" width="50" height="35" rx="5" fill="#475569"/>
            <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
            {/* Lanternas vermelhas */}
            <rect x="28" y="62" width="8" height="4" fill="#EF4444"/>
            <rect x="64" y="62" width="8" height="4" fill="#EF4444"/>
            {/* Braço estendido horizontalmente para fora da janela esquerda */}
            <line x1="25" y1="48" x2="8" y2="48" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="6" cy="48" r="3.5" fill="#CBD5E1"/>
            {/* Seta esquerda indicativa */}
            <path d="M12,32 L2,48 L12,64" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}

        {/* Gestos do Condutor - dobrar direita */}
        {type === 'gest_driver_right' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#F1F5F9" stroke="#475569" strokeWidth="2"/>
            <rect x="25" y="40" width="50" height="35" rx="5" fill="#475569"/>
            <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
            <rect x="28" y="62" width="8" height="4" fill="#EF4444"/>
            <rect x="64" y="62" width="8" height="4" fill="#EF4444"/>
            {/* Braço dobrado em L para cima */}
            <line x1="25" y1="48" x2="16" y2="48" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round"/>
            <line x1="16" y1="48" x2="16" y2="28" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="16" cy="26" r="3.5" fill="#CBD5E1"/>
            {/* Seta direita indicativa */}
            <path d="M42,24 L55,14 L68,24" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}

        {/* Gestos do Condutor - Diminuir velocidade */}
        {type === 'gest_driver_slow' && (
          <g>
            <rect x="5" y="5" width="90" height="90" rx="10" fill="#F1F5F9" stroke="#475569" strokeWidth="2"/>
            <rect x="25" y="40" width="50" height="35" rx="5" fill="#475569"/>
            <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
            <rect x="28" y="62" width="8" height="4" fill="#EF4444"/>
            <rect x="64" y="62" width="8" height="4" fill="#EF4444"/>
            {/* Braço estendido movendo para cima e para baixo */}
            <line x1="25" y1="48" x2="8" y2="48" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" className="animate-bounce"/>
            <circle cx="6" cy="48" r="3.5" fill="#CBD5E1" className="animate-bounce"/>
            {/* Ondas indicando balanço */}
            <path d="M4,55 Q1,60 4,65" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M4,41 Q1,36 4,31" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
          </g>
        )}
      </svg>
    </div>
  );
};

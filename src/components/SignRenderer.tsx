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
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Drop shadow filter for 3D depth of plates */}
          <filter id="plateShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.35" />
          </filter>
          
          {/* Drop shadow for details/symbols on plates */}
          <filter id="symbolShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.4" />
          </filter>

          {/* Color Gradients */}
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="60%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="metalBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          
          <linearGradient id="blackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
        </defs>

        {/* 1. PLACA R-1: Parada Obrigatória (Octógono Vermelho) */}
        {type === 'stop' && (
          <g>
            <polygon 
              points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" 
              fill="url(#metalBorderGrad)" 
              filter="url(#plateShadow)"
            />
            <polygon 
              points="30.5,6 69.5,6 94,30.5 94,69.5 69.5,94 30.5,94 6,69.5 6,30.5" 
              fill="url(#redGrad)" 
            />
            <polygon 
              points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" 
              fill="none" 
              stroke="url(#whiteGrad)" 
              strokeWidth="2"
            />
            <text 
              x="50" 
              y="58" 
              fill="url(#whiteGrad)" 
              fontSize="20" 
              fontWeight="900" 
              fontFamily="Arial, system-ui, sans-serif" 
              textAnchor="middle"
              letterSpacing="0.5"
              filter="url(#symbolShadow)"
            >
              PARE
            </text>
            {/* Screws */}
            <circle cx="50" cy="11" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="89" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* 2. PLACA R-2: Dê a Preferência (Triângulo Invertido) */}
        {type === 'yield' && (
          <g>
            <polygon 
              points="2,6 98,6 50,94" 
              fill="url(#metalBorderGrad)" 
              filter="url(#plateShadow)"
            />
            <polygon 
              points="5,9 95,9 50,90" 
              fill="url(#whiteGrad)" 
              stroke="url(#redGrad)" 
              strokeWidth="8.5"
            />
            <polygon 
              points="14,13 86,13 50,78" 
              fill="none" 
              stroke="url(#redGrad)" 
              strokeWidth="2.5"
            />
            {/* Screws */}
            <circle cx="28" cy="12" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="72" cy="12" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* 3. PLACAS CIRCULARES DE REGULAMENTAÇÃO COM BORDA METÁLICA (Fundo Branco, Anel Vermelho) */}
        {[
          'prohibited', 'speed_limit', 'prohibited_turn_left', 'prohibited_turn_right',
          'prohibited_u_turn', 'prohibited_parking', 'prohibited_stopping',
          'prohibited_overtaking', 'prohibited_bikes', 'double_way'
        ].includes(type) && (
          <g>
            {/* Metallic backplate */}
            <circle cx="50" cy="50" r="46" fill="url(#metalBorderGrad)" filter="url(#plateShadow)" />
            {/* Main white reflection face */}
            <circle cx="50" cy="50" r="44.2" fill="url(#whiteGrad)" />
            {/* Regulatory red outer ring */}
            <circle cx="50" cy="50" r="39.5" fill="none" stroke="url(#redGrad)" strokeWidth="8.2" />
            
            {/* Content for specific circular types */}
            {type === 'prohibited' && (
              <g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
                {extraData === 'sentido_proibido' && (
                  <g transform="translate(50, 50) rotate(-45)" filter="url(#symbolShadow)">
                    <path d="M-22,0 L18,0 M10,-7 L20,0 L10,7" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                )}
              </g>
            )}

            {type === 'speed_limit' && (
              <g filter="url(#symbolShadow)">
                <text 
                  x="50" 
                  y="53" 
                  fill="url(#blackGrad)" 
                  fontSize="31" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                >
                  {extraData || '80'}
                </text>
                <text 
                  x="50" 
                  y="71" 
                  fill="#4B5563" 
                  fontSize="10" 
                  fontWeight="800" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  letterSpacing="0.2"
                >
                  km/h
                </text>
              </g>
            )}

            {type === 'prohibited_turn_left' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M55,66 L55,46 Q55,36 45,36 L30,36" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M34,29 L24,36 L34,43 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_turn_right' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M45,66 L45,46 Q45,36 55,36 L70,36" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M66,29 L76,36 L66,43 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_u_turn' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M56,66 L56,44 Q56,31 46,31 Q36,31 36,44 L36,54" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29,50 L36,59 L43,50 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_parking' && (
              <g>
                <text 
                  x="50" 
                  y="64" 
                  fill="url(#blackGrad)" 
                  fontSize="44" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  E
                </text>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_stopping' && (
              <g>
                <text 
                  x="50" 
                  y="64" 
                  fill="url(#blackGrad)" 
                  fontSize="44" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  E
                </text>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
                <line x1="78" y1="22" x2="22" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_overtaking' && (
              <g>
                <g filter="url(#symbolShadow)">
                  {/* Left car (red prohibited) */}
                  <g transform="translate(23, 38) scale(0.22)">
                    <rect x="10" y="30" width="30" height="25" rx="5" fill="url(#redGrad)" />
                    <rect x="15" y="10" width="20" height="22" rx="4" fill="url(#redGrad)" />
                    <rect x="18" y="14" width="14" height="8" fill="#FFFFFF" />
                    <circle cx="18" cy="55" r="4.5" fill="#111827" />
                    <circle cx="32" cy="55" r="4.5" fill="#111827" />
                  </g>
                  {/* Right car (black) */}
                  <g transform="translate(53, 38) scale(0.22)">
                    <rect x="10" y="30" width="30" height="25" rx="5" fill="url(#blackGrad)" />
                    <rect x="15" y="10" width="20" height="22" rx="4" fill="url(#blackGrad)" />
                    <rect x="18" y="14" width="14" height="8" fill="#FFFFFF" />
                    <circle cx="18" cy="55" r="4.5" fill="#111827" />
                    <circle cx="32" cy="55" r="4.5" fill="#111827" />
                  </g>
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'prohibited_bikes' && (
              <g>
                <g stroke="url(#blackGrad)" strokeWidth="4.2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(5, 7)" filter="url(#symbolShadow)">
                  <circle cx="33" cy="50" r="8.5" fill="none" strokeWidth="3" />
                  <circle cx="67" cy="50" r="8.5" fill="none" strokeWidth="3" />
                  <path d="M33,50 L48,50 L58,38 L67,50 M48,50 L42,34 L37,34 M58,38 L54,31 L58,31" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'double_way' && (
              <g filter="url(#symbolShadow)">
                {/* Left Down Arrow */}
                <path d="M37,28 L37,70" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M30,62 L37,71 L44,62" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                {/* Right Up Arrow */}
                <path d="M63,72 L63,30" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M56,38 L63,29 L70,38" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* Common Screws for circles */}
            <circle cx="50" cy="9.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="90.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* 4. PLACA R-28: Velocidade Mínima (Circular Azul) */}
        {type === 'speed_min' && (
          <g>
            <circle cx="50" cy="50" r="46" fill="url(#metalBorderGrad)" filter="url(#plateShadow)" />
            <circle cx="50" cy="50" r="44.2" fill="url(#blueGrad)" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#whiteGrad)" strokeWidth="3" />
            <g filter="url(#symbolShadow)">
              <text 
                x="50" 
                y="55" 
                fill="url(#whiteGrad)" 
                fontSize="34" 
                fontWeight="900" 
                fontFamily="Arial, system-ui, sans-serif" 
                textAnchor="middle"
              >
                {extraData || '30'}
              </text>
              <text 
                x="50" 
                y="72" 
                fill="#E2E8F0" 
                fontSize="9" 
                fontWeight="800" 
                fontFamily="Arial, system-ui, sans-serif" 
                textAnchor="middle"
              >
                km/h
              </text>
            </g>
            {/* Screws */}
            <circle cx="50" cy="9.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="90.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* 5. PLACAS DE ADVERTÊNCIA: Formato Losango Amarelo/Laranja com Borda Preta */}
        {[
          'warning_curve', 'warning_pedestrian', 'warning_traffic_light', 'warning_curve_moderate',
          'warning_works', 'warning_school', 'warning_barrier', 'warning_slippery', 'warning_bump'
        ].includes(type) && (
          <g>
            {/* Metallic backplate */}
            <rect x="15" y="15" width="70" height="70" rx="6" transform="rotate(45 50 50)" fill="url(#metalBorderGrad)" filter="url(#plateShadow)"/>
            {/* Main yellow/orange face */}
            <rect x="16.5" y="16.5" width="67" height="67" rx="4.5" transform="rotate(45 50 50)" fill={type === 'warning_works' ? 'url(#orangeGrad)' : 'url(#yellowGrad)'} />
            {/* Black border ring */}
            <rect x="19.8" y="19.8" width="60.4" height="60.4" rx="3.5" transform="rotate(45 50 50)" fill="none" stroke="url(#blackGrad)" strokeWidth="3.2" />

            {/* Content for warning types */}
            {type === 'warning_curve' && (
              <g filter="url(#symbolShadow)">
                {extraData === 'esquerda' ? (
                  <path 
                    d="M60,65 L60,45 C60,35 40,35 40,35 M50,25 L35,35 L50,45" 
                    fill="none" 
                    stroke="url(#blackGrad)" 
                    strokeWidth="5.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                ) : (
                  <path 
                    d="M40,65 L40,45 C40,35 60,35 60,35 M50,25 L65,35 L50,45" 
                    fill="none" 
                    stroke="url(#blackGrad)" 
                    strokeWidth="5.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                )}
              </g>
            )}

            {type === 'warning_curve_moderate' && (
              <g filter="url(#symbolShadow)">
                {extraData === 'esquerda' ? (
                  <g>
                    <path d="M54,65 L54,48 Q54,38 40,38" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M46,31 L36,38 L46,45 Z" fill="url(#blackGrad)"/>
                  </g>
                ) : (
                  <g>
                    <path d="M46,65 L46,48 Q46,38 60,38" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M54,31 L64,38 L54,45 Z" fill="url(#blackGrad)"/>
                  </g>
                )}
              </g>
            )}

            {type === 'warning_pedestrian' && (
              <g filter="url(#symbolShadow)">
                <circle cx="50" cy="35" r="5" fill="url(#blackGrad)"/>
                <line x1="50" y1="40" x2="50" y2="55" stroke="url(#blackGrad)" strokeWidth="4.2" strokeLinecap="round"/>
                <line x1="50" y1="55" x2="42" y2="70" stroke="url(#blackGrad)" strokeWidth="4.2" strokeLinecap="round"/>
                <line x1="50" y1="55" x2="58" y2="68" stroke="url(#blackGrad)" strokeWidth="4.2" strokeLinecap="round"/>
                <line x1="50" y1="44" x2="39" y2="52" stroke="url(#blackGrad)" strokeWidth="3.2" strokeLinecap="round"/>
                <line x1="50" y1="44" x2="57" y2="52" stroke="url(#blackGrad)" strokeWidth="3.2" strokeLinecap="round"/>
                {/* Crosswalk */}
                <line x1="30" y1="75" x2="70" y2="75" stroke="url(#blackGrad)" strokeWidth="3.5"/>
                <line x1="34" y1="79" x2="66" y2="79" stroke="url(#blackGrad)" strokeWidth="2"/>
              </g>
            )}

            {type === 'warning_traffic_light' && (
              <g filter="url(#symbolShadow)">
                <rect x="42" y="32" width="16" height="36" rx="3" fill="url(#blackGrad)" stroke="#1F2937" strokeWidth="1"/>
                <circle cx="50" cy="38" r="4.5" fill="#EF4444"/>
                <circle cx="50" cy="50" r="4.5" fill="#F59E0B"/>
                <circle cx="50" cy="62" r="4.5" fill="#10B981"/>
              </g>
            )}

            {type === 'warning_works' && (
              <g filter="url(#symbolShadow)" stroke="url(#blackGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="30" y1="68" x2="70" y2="68" strokeWidth="3" />
                <circle cx="45" cy="36" r="4.5" fill="url(#blackGrad)" stroke="none" />
                <path d="M45,42 L45,55 M45,45 L32,54 L26,48 M45,45 L58,54 L62,60" />
                <path d="M45,55 L38,68 M45,55 L50,68" />
                <line x1="58" y1="54" x2="64" y2="62" strokeWidth="2.5" />
                <polygon points="62,60 67,65 60,65" fill="url(#blackGrad)" strokeWidth="1" />
              </g>
            )}

            {type === 'warning_school' && (
              <g fill="url(#blackGrad)" stroke="none" transform="translate(6, 6)" filter="url(#symbolShadow)">
                {/* Adult */}
                <circle cx="39" cy="32" r="4.5"/>
                <path d="M34,38 H44 V57 H40 V69 H38 V57 H34 Z"/>
                <path d="M31,38 L33,53 H35 L33,38 Z"/>
                <path d="M44,41 L50,48 L51,47 L45,40 Z"/>
                
                {/* Child */}
                <circle cx="54" cy="44" r="3.2"/>
                <path d="M50,48 H58 V62 H55 V69 H53 V62 H50 Z"/>
                <rect x="56" y="49" width="4.5" height="5.5" rx="1" fill="url(#blackGrad)"/>
              </g>
            )}

            {type === 'warning_barrier' && (
              <g stroke="url(#blackGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#symbolShadow)">
                <line x1="28" y1="40" x2="72" y2="40" />
                <line x1="28" y1="50" x2="72" y2="50" />
                <line x1="28" y1="60" x2="72" y2="60" />
                <line x1="32" y1="35" x2="32" y2="65" />
                <line x1="41" y1="35" x2="41" y2="65" />
                <line x1="50" y1="35" x2="50" y2="65" />
                <line x1="59" y1="35" x2="59" y2="65" />
                <line x1="68" y1="35" x2="68" y2="65" />
              </g>
            )}

            {type === 'warning_slippery' && (
              <g filter="url(#symbolShadow)">
                <path d="M37,68 Q41,58 33,52 Q26,46 36,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M59,68 Q63,58 55,52 Q48,46 58,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round"/>
                <g transform="translate(48, 35) rotate(-15) scale(0.24)">
                  <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#blackGrad)"/>
                  <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#blackGrad)"/>
                  <circle cx="-11" cy="12" r="5.5" fill="#111827"/>
                  <circle cx="11" cy="12" r="5.5" fill="#111827"/>
                </g>
              </g>
            )}

            {type === 'warning_bump' && (
              <g stroke="url(#blackGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#symbolShadow)">
                <path d="M22,58 L38,58 Q50,40 62,58 L78,58" />
              </g>
            )}

            {/* Screws for Warning diamonds */}
            <circle cx="50" cy="11.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="88.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* 6. SEMÁFORO REGULAR (Semáforo Tríplice Motoristas) */}
        {type === 'light_regular' && (
          <g filter="url(#plateShadow)">
            <rect x="30" y="8" width="40" height="84" rx="8" fill="url(#blackGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            {/* Visors */}
            <path d="M26,20 Q50,8 74,20" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26,46 Q50,34 74,46" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26,72 Q50,60 74,72" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Lights bg */}
            <circle cx="50" cy="24" r="11" fill="#111827"/>
            <circle cx="50" cy="50" r="11" fill="#111827"/>
            <circle cx="50" cy="76" r="11" fill="#111827"/>
            {/* Lights glow */}
            <circle cx="50" cy="24" r="9" fill="#EF4444" filter="url(#symbolShadow)" className="animate-pulse" />
            <circle cx="50" cy="50" r="9" fill="#F59E0B" opacity="0.25"/>
            <circle cx="50" cy="76" r="9" fill="#10B981" opacity="0.25"/>
            {/* Metal pole backing */}
            <rect x="47" y="92" width="6" height="8" fill="url(#metalBorderGrad)" />
          </g>
        )}

        {/* 7. SEMÁFORO PEDESTRES */}
        {type === 'light_pedestrian' && (
          <g filter="url(#plateShadow)">
            <rect x="33" y="14" width="34" height="72" rx="6" fill="url(#blackGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            {/* Sections */}
            <rect x="39" y="20" width="22" height="26" rx="2" fill="#111827"/>
            <rect x="39" y="54" width="22" height="26" rx="2" fill="#111827"/>
            {/* Don't Walk (Red) */}
            <g filter="url(#symbolShadow)">
              <circle cx="50" cy="27" r="3.5" fill="#EF4444"/>
              <path d="M50,30.5 L50,40 M45,33.5 L55,33.5 M47,44 L50,40 L53,44" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            {/* Walk (Green - blinking as action) */}
            <g filter="url(#symbolShadow)" opacity="0.3">
              <circle cx="50" cy="60" r="3" fill="#10B981"/>
              <path d="M48,63 L52,66 M48,60 Q51,63 50,68 M46,74 L50,69 L54,73" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            {/* Blinking overlay */}
            <g className="animate-pulse" filter="url(#symbolShadow)">
              <circle cx="50" cy="60" r="3" fill="#10B981"/>
              <path d="M48,63 L52,66 M48,60 Q51,63 50,68 M46,74 L50,69 L54,73" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        )}

        {/* 8. TOQUES DE BUZINA - Símbolo de Corneta/Megafone */}
        {type === 'horn_short' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <path d="M25,40 L45,40 L55,25 L55,75 L45,60 L25,60 Z" fill="url(#blackGrad)" stroke="#1F2937" strokeWidth="1.5" strokeLinejoin="round"/>
              <rect x="18" y="44" width="8" height="12" rx="1" fill="#94A3B8"/>
              {/* Sound waves (green) */}
              <path d="M63,38 Q67,50 63,62" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M72,31 Q78,50 72,69" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" opacity="0.55"/>
            </g>
            {/* Green OK badge */}
            <circle cx="82" cy="18" r="8" fill="#10B981" filter="url(#symbolShadow)"/>
            <path d="M79,18 L81,20 L85,15" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
          </g>
        )}

        {type === 'horn_long' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <path d="M22,40 L42,40 L52,25 L52,75 L42,60 L22,60 Z" fill="url(#redGrad)" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round"/>
              <rect x="15" y="44" width="8" height="12" rx="1" fill="#DC2626"/>
              {/* Loud waves */}
              <path d="M60,35 Q65,50 60,65" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M68,27 Q75,50 68,73" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M76,19 Q85,50 76,81" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
            </g>
            {/* Prohibited cross badge */}
            <circle cx="82" cy="18" r="8" fill="#EF4444" filter="url(#symbolShadow)"/>
            <path d="M78,14 L86,22 M86,14 L78,22" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
          </g>
        )}

        {/* 9. SINALIZAÇÃO HORIZONTAL (Asfalto Realista) */}
        {type === 'line_continuous' && (
          <g filter="url(#plateShadow)">
            {/* Asfalt pattern */}
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748" />
            
            {/* Continuous line */}
            {extraData === 'amarela' ? (
              <line x1="50" y1="4" x2="50" y2="96" stroke="#FBBF24" strokeWidth="6.5" />
            ) : (
              <line x1="50" y1="4" x2="50" y2="96" stroke="url(#whiteGrad)" strokeWidth="6.5" />
            )}
            {/* Lane edges */}
            <line x1="16" y1="4" x2="16" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <line x1="84" y1="4" x2="84" y2="96" stroke="#4A5568" strokeWidth="2"/>
            
            {/* Interactive Cars */}
            <rect x="24" y="60" width="14" height="23" rx="3" fill="#2563EB" opacity="0.95" filter="url(#symbolShadow)"/>
            <rect x="62" y="16" width="14" height="23" rx="3" fill="#EF4444" opacity="0.95" filter="url(#symbolShadow)"/>
            
            {/* No Overtaking X markings */}
            <path d="M43,45 L47,49 M47,45 L43,49" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
            <path d="M53,45 L57,49 M57,45 L53,49" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
          </g>
        )}

        {type === 'line_broken' && (
          <g filter="url(#plateShadow)">
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748"/>
            
            {/* Broken divider lines */}
            <line x1="50" y1="12" x2="50" y2="28" stroke="#FBBF24" strokeWidth="4.5" />
            <line x1="50" y1="44" x2="50" y2="60" stroke="#FBBF24" strokeWidth="4.5" />
            <line x1="50" y1="76" x2="50" y2="92" stroke="#FBBF24" strokeWidth="4.5" />
            
            <rect x="24" y="55" width="14" height="23" rx="3" fill="#10B981" opacity="0.9" filter="url(#symbolShadow)"/>
            
            {/* Arrow indicating OK to overtake */}
            <path d="M31,45 L45,34 L59,45" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" className="animate-pulse"/>
          </g>
        )}

        {type === 'line_double' && (
          <g filter="url(#plateShadow)">
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748"/>
            
            {/* Double lines */}
            <line x1="45" y1="4" x2="45" y2="96" stroke="#FBBF24" strokeWidth="4" />
            <line x1="55" y1="4" x2="55" y2="96" stroke="#FBBF24" strokeWidth="4" />
            
            <line x1="16" y1="4" x2="16" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <line x1="84" y1="4" x2="84" y2="96" stroke="#4A5568" strokeWidth="2"/>
            
            <rect x="25" y="66" width="12" height="20" rx="2" fill="#718096" opacity="0.5"/>
            <rect x="63" y="14" width="12" height="20" rx="2" fill="#718096" opacity="0.5"/>
          </g>
        )}

        {/* 10. GESTOS DO AGENTE E CONDUTOR */}
        {type === 'gest_agent_stop' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              {/* Agent body */}
              <circle cx="50" cy="34" r="10.5" fill="#334155"/>
              <path d="M36,29 Q50,18 64,29 Z" fill="#1E293B"/>
              <line x1="34" y1="29" x2="66" y2="29" stroke="#F59E0B" strokeWidth="2"/>
              <rect x="37" y="44" width="26" height="42" rx="4" fill="#334155"/>
              <rect x="48" y="47" width="4" height="15" fill="#F59E0B"/>
              {/* Stop hand raise */}
              <line x1="62" y1="49" x2="77" y2="23" stroke="#334155" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="78" cy="19" r="5" fill="#1E293B"/>
              <line x1="78" y1="13" x2="78" y2="25" stroke="#EF4444" strokeWidth="2.5"/>
              {/* Relaxed hand */}
              <line x1="37" y1="49" x2="26" y2="69" stroke="#334155" strokeWidth="5.5" strokeLinecap="round"/>
            </g>
          </g>
        )}

        {type === 'gest_driver_left' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <rect x="25" y="40" width="50" height="36" rx="5" fill="#475569"/>
              <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
              <rect x="28" y="63" width="8" height="4.5" fill="#EF4444"/>
              <rect x="64" y="63" width="8" height="4.5" fill="#EF4444"/>
              {/* Hand left */}
              <line x1="25" y1="48" x2="7" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="5" cy="48" r="3.5" fill="#CBD5E1"/>
              {/* Directive arrow */}
              <path d="M12,32 L2,48 L12,64" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        )}

        {type === 'gest_driver_right' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <rect x="25" y="40" width="50" height="36" rx="5" fill="#475569"/>
              <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
              <rect x="28" y="63" width="8" height="4.5" fill="#EF4444"/>
              <rect x="64" y="63" width="8" height="4.5" fill="#EF4444"/>
              {/* Hand right up */}
              <line x1="25" y1="48" x2="15" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <line x1="15" y1="48" x2="15" y2="28" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="15" cy="26" r="3.5" fill="#CBD5E1"/>
              {/* Directive arrow */}
              <path d="M42,24 L55,14 L68,24" fill="none" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        )}

        {type === 'gest_driver_slow' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <rect x="25" y="40" width="50" height="36" rx="5" fill="#475569"/>
              <rect x="30" y="44" width="40" height="14" rx="2" fill="#E2E8F0"/>
              <rect x="28" y="63" width="8" height="4.5" fill="#EF4444"/>
              <rect x="64" y="63" width="8" height="4.5" fill="#EF4444"/>
              {/* Waving arm */}
              <line x1="25" y1="48" x2="7" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round" className="animate-bounce"/>
              <circle cx="5" cy="48" r="3.5" fill="#CBD5E1" className="animate-bounce"/>
              {/* Oscillating marks */}
              <path d="M4,55 Q1,60 4,65" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M4,41 Q1,36 4,31" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
            </g>
          </g>
        )}

      </svg>
    </div>
  );
};

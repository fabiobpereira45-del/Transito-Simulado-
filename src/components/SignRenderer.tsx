import React from 'react';

interface SignRendererProps {
  type: string;
  extraData?: string;
  size?: number | string;
}

export const SignRenderer: React.FC<SignRendererProps> = ({ type, extraData, size = 96 }) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  // Set containing all 55 circular regulatory signs codes
  const circularRegulatoryCodes = [
    'R-3', 'R-4a', 'R-4b', 'R-5a', 'R-5b', 'R-6a', 'R-6b', 'R-6c', 'R-7', 'R-8a', 'R-8b', 
    'R-9', 'R-10', 'R-11', 'R-12', 'R-13', 'R-14', 'R-15', 'R-16', 'R-17', 'R-18', 'R-19', 
    'R-20', 'R-21', 'R-22', 'R-23', 'R-24a', 'R-24b', 'R-25a', 'R-25b', 'R-25c', 'R-25d', 
    'R-26', 'R-27', 'R-28', 'R-29', 'R-30', 'R-31', 'R-32', 'R-33', 'R-34', 'R-35a', 'R-35b', 
    'R-36a', 'R-36b', 'R-36c', 'R-37', 'R-38', 'R-39', 'R-40', 'R-41', 'R-42a', 'R-42b', 
    'R-43a', 'R-43b'
  ];

  // Set containing all 69 warning signs codes
  const warningSignCodes = [
    'A-1a', 'A-1b', 'A-2a', 'A-2b', 'A-3a', 'A-3b', 'A-4a', 'A-4b', 'A-5a', 'A-5b', 'A-6', 
    'A-7a', 'A-7b', 'A-8', 'A-9', 'A-10a', 'A-10b', 'A-11a', 'A-11b', 'A-12', 'A-13a', 'A-13b', 
    'A-14', 'A-15', 'A-16', 'A-17', 'A-18', 'A-19', 'A-20a', 'A-20b', 'A-21a', 'A-21b', 'A-21c', 
    'A-21d', 'A-21e', 'A-22', 'A-23', 'A-24', 'A-25', 'A-26a', 'A-26b', 'A-27', 'A-28', 'A-29', 
    'A-30a', 'A-30b', 'A-30c', 'A-31', 'A-32a', 'A-32b', 'A-33a', 'A-33b', 'A-34', 'A-35', 'A-36', 
    'A-37', 'A-38', 'A-39', 'A-40', 'A-41', 'A-42a', 'A-42b', 'A-42c', 'A-43', 'A-44', 'A-45', 
    'A-46', 'A-47', 'A-48'
  ];

  const destinationGuidanceCodes = [
    'IND-1', 'IND-2', 'IND-3', 'IND-4', 'IND-5', 'IND-6', 'IND-7', 'IND-8', 'IND-9', 
    'IND-10', 'IND-11', 'IND-12', 'IND-13', 'IND-14', 'IND-15', 'IND-16', 'IND-17'
  ];

  const educationalCodes = [
    'ED-1', 'ED-2', 'ED-3', 'ED-4', 'ED-5', 'ED-6', 'ED-7', 'ED-8', 'ED-9', 'ED-10', 'ED-11'
  ];

  // Aliases for backward compatibility
  const isCircularRegulatory = circularRegulatoryCodes.includes(type) || 
    ['prohibited', 'speed_limit', 'prohibited_turn_left', 'prohibited_turn_right', 
     'prohibited_u_turn', 'prohibited_parking', 'prohibited_stopping', 
     'prohibited_overtaking', 'prohibited_bikes', 'double_way'].includes(type);

  const isWarningSign = warningSignCodes.includes(type) || 
    ['warning_curve', 'warning_pedestrian', 'warning_traffic_light', 'warning_curve_moderate', 
     'warning_works', 'warning_school', 'warning_barrier', 'warning_slippery', 'warning_bump'].includes(type);

  const isDestinationGuidance = destinationGuidanceCodes.includes(type);
  const isEducational = educationalCodes.includes(type);

  // Helper for bike SVG drawing
  const renderBikeIcon = (x: number, y: number, scale: number) => (
    <g stroke="url(#blackGrad)" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="33" cy="50" r="9" strokeWidth={3} />
      <circle cx="67" cy="50" r="9" strokeWidth={3} />
      <path d="M33,50 L48,50 L58,38 L67,50 M48,50 L42,34 L37,34 M58,38 L54,31 L58,31" />
    </g>
  );

  // Helper for pedestrian SVG drawing
  const renderPedestrianIcon = (x: number, y: number, scale: number) => (
    <g fill="url(#blackGrad)" stroke="none" transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="50" cy="30" r="5.5" />
      <path d="M46,38 H54 V55 H51 V68 H49 V55 H46 Z" />
      <path d="M42,38 L44,52 H46 L44,38 Z" />
      <path d="M54,38 L56,52 H54 L56,38 Z" />
    </g>
  );

  // Helper for truck SVG drawing
  const renderTruckIcon = (x: number, y: number, scale: number) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="5" y="15" width="22" height="25" rx="3" fill="url(#blackGrad)" />
      <rect x="27" y="5" width="32" height="35" rx="4" fill="url(#blackGrad)" />
      <circle cx="16" cy="45" r="6" fill="#111827" />
      <circle cx="48" cy="45" r="6" fill="#111827" />
    </g>
  );

  // Helper for VLT/train drawing
  const renderVLTIcon = (x: number, y: number, scale: number) => (
    <g fill="url(#blackGrad)" transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="5" y="8" width="38" height="36" rx="6" />
      <rect x="9" y="13" width="30" height="14" fill="#FFFFFF" />
      <circle cx="13" cy="35" r="3.2" fill="#FFFFFF" />
      <circle cx="35" cy="35" r="3.2" fill="#FFFFFF" />
      <line x1="-5" y1="48" x2="53" y2="48" stroke="url(#blackGrad)" strokeWidth="4" />
      <line x1="12" y1="48" x2="12" y2="54" stroke="url(#blackGrad)" strokeWidth="3" />
      <line x1="36" y1="48" x2="36" y2="54" stroke="url(#blackGrad)" strokeWidth="3" />
      <path d="M24,8 L20,0 H28 L24,8" fill="none" stroke="url(#blackGrad)" strokeWidth="2.5" />
    </g>
  );

  // Helper for car silhouette drawing
  const renderCarIcon = (x: number, y: number, scale: number) => (
    <g fill="url(#blackGrad)" transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="5" y="12" width="40" height="18" rx="4" />
      <rect x="10" y="3" width="30" height="11" rx="2.5" />
      <rect x="13" y="6" width="24" height="5" fill="#FFFFFF" />
      <circle cx="12" cy="22" r="3.2" fill="#FFFFFF" />
      <circle cx="38" cy="22" r="3.2" fill="#FFFFFF" />
    </g>
  );

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

          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* --- 1. R-1: Parada Obrigatória (Octógono) --- */}
        {(type === 'stop' || type === 'R-1') && (
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
            <circle cx="50" cy="11" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="89" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 2. R-2: Dê a Preferência (Triângulo Invertido) --- */}
        {(type === 'yield' || type === 'R-2') && (
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
            <circle cx="28" cy="12" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="72" cy="12" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 3. PLACAS CIRCULARES DE REGULAMENTAÇÃO (R-3 a R-43b) --- */}
        {isCircularRegulatory && (
          <g>
            <circle cx="50" cy="50" r="46" fill="url(#metalBorderGrad)" filter="url(#plateShadow)" />
            <circle cx="50" cy="50" r="44.2" fill="url(#whiteGrad)" />
            <circle cx="50" cy="50" r="39.5" fill="none" stroke="url(#redGrad)" strokeWidth="8.2" />

            {(type === 'R-3' || type === 'prohibited') && (
              <g>
                {extraData === 'sentido_proibido' ? (
                  <g>
                    <g transform="translate(50, 50) rotate(-45)" filter="url(#symbolShadow)">
                      <path d="M-22,0 L18,0 M10,-7 L20,0 L10,7" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
                  </g>
                ) : (
                  <rect x="24" y="46" width="52" height="8" rx="1.5" fill="url(#blackGrad)" filter="url(#symbolShadow)" />
                )}
              </g>
            )}

            {(type === 'R-4a' || type === 'prohibited_turn_left') && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M55,66 L55,46 Q55,36 45,36 L30,36" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M34,29 L24,36 L34,43 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {(type === 'R-4b' || type === 'prohibited_turn_right') && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M45,66 L45,46 Q45,36 55,36 L70,36" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M66,29 L76,36 L66,43 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {(type === 'R-5a' || type === 'prohibited_u_turn') && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M56,66 L56,44 Q56,31 46,31 Q36,31 36,44 L36,54" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29,50 L36,59 L43,50 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-5b' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <path d="M44,66 L44,44 Q44,31 54,31 Q64,31 64,44 L64,54" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M71,50 L64,59 L57,50 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {(type === 'R-6a' || type === 'prohibited_parking') && (
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

            {type === 'R-6b' && (
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
            )}

            {(type === 'R-6c' || type === 'prohibited_stopping') && (
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

            {(type === 'R-7' || type === 'prohibited_overtaking') && (
              <g>
                <g filter="url(#symbolShadow)">
                  {renderCarIcon(23, 38, 0.22)}
                  <g transform="translate(53, 38) scale(0.22)">
                    <rect x="10" y="30" width="30" height="25" rx="5" fill="url(#redGrad)" />
                    <rect x="15" y="10" width="20" height="22" rx="4" fill="url(#redGrad)" />
                    <rect x="18" y="14" width="14" height="8" fill="#FFFFFF" />
                    <circle cx="18" cy="55" r="4.5" fill="#111827" />
                    <circle cx="32" cy="55" r="4.5" fill="#111827" />
                  </g>
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-8a' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <line x1="38" y1="26" x2="38" y2="74" stroke="url(#blackGrad)" strokeWidth="3.2" strokeDasharray="4,4" />
                  <line x1="62" y1="26" x2="62" y2="74" stroke="url(#blackGrad)" strokeWidth="3.2" />
                  <path d="M38,52 C45,52 48,46 56,46" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M52,40 L61,46 L52,52 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-8b' && (
              <g>
                <g filter="url(#symbolShadow)">
                  <line x1="38" y1="26" x2="38" y2="74" stroke="url(#blackGrad)" strokeWidth="3.2" />
                  <line x1="62" y1="26" x2="62" y2="74" stroke="url(#blackGrad)" strokeWidth="3.2" strokeDasharray="4,4" />
                  <path d="M62,52 C55,52 52,46 44,46" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M48,40 L39,46 L48,52 Z" fill="url(#blackGrad)" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-9' && (
              <g>
                {renderTruckIcon(23, 33, 0.25)}
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-10' && (
              <g>
                {renderCarIcon(26, 36, 0.24)}
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-11' && (
              <g>
                <g stroke="url(#blackGrad)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(30, 36) scale(0.68)" filter="url(#symbolShadow)">
                  <rect x="15" y="10" width="25" height="15" />
                  <path d="M15,20 L2,20 M15,13 L2,13" />
                  <circle cx="27.5" cy="32" r="7" strokeWidth="2.5" />
                  <path d="M2,20 L-10,20 L-15,10 M-10,20 L-12,32 M-7,20 L-9,32" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {(type === 'R-12' || type === 'prohibited_bikes') && (
              <g>
                {renderBikeIcon(22, 28, 0.55)}
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-13' && (
              <g>
                <g fill="url(#blackGrad)" transform="translate(30, 33) scale(0.7)" filter="url(#symbolShadow)">
                  <circle cx="12" cy="32" r="10" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="32" r="5" />
                  <circle cx="42" cy="35" r="7" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                  <circle cx="42" cy="35" r="3.5" />
                  <rect x="18" y="18" width="22" height="15" rx="2" />
                  <rect x="12" y="10" width="10" height="10" />
                  <path d="M12,10 L18,2 H30 L35,10" stroke="url(#blackGrad)" strokeWidth="3" fill="none" />
                  <line x1="38" y1="18" x2="38" y2="8" stroke="url(#blackGrad)" strokeWidth="2.5" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-14' && (
              <text 
                x="50" 
                y="58" 
                fill="url(#blackGrad)" 
                fontSize="24" 
                fontWeight="900" 
                fontFamily="Arial, system-ui, sans-serif" 
                textAnchor="middle"
                filter="url(#symbolShadow)"
              >
                {extraData || '10 t'}
              </text>
            )}

            {type === 'R-15' && (
              <g>
                <g fill="url(#blackGrad)" filter="url(#symbolShadow)">
                  <polygon points="50,22 44,28 56,28" />
                  <polygon points="50,78 44,72 56,72" />
                </g>
                <text 
                  x="50" 
                  y="56" 
                  fill="url(#blackGrad)" 
                  fontSize="21" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  {extraData || '4,0 m'}
                </text>
              </g>
            )}

            {type === 'R-16' && (
              <g>
                <g fill="url(#blackGrad)" filter="url(#symbolShadow)">
                  <polygon points="22,50 28,44 28,56" />
                  <polygon points="78,50 72,44 72,56" />
                </g>
                <text 
                  x="50" 
                  y="56" 
                  fill="url(#blackGrad)" 
                  fontSize="21" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  {extraData || '3,0 m'}
                </text>
              </g>
            )}

            {type === 'R-17' && (
              <g filter="url(#symbolShadow)">
                <text x="50" y="38" fill="url(#blackGrad)" fontSize="20" fontWeight="900" fontFamily="Arial, system-ui" textAnchor="middle">{extraData || '2 t'}</text>
                <g stroke="url(#blackGrad)" strokeWidth="4.5" fill="none" transform="translate(0, 12)">
                  <line x1="30" y1="46" x2="70" y2="46" />
                  <rect x="24" y="38" width="6" height="16" rx="1.5" fill="url(#blackGrad)" stroke="none" />
                  <rect x="70" y="38" width="6" height="16" rx="1.5" fill="url(#blackGrad)" stroke="none" />
                </g>
              </g>
            )}

            {type === 'R-18' && (
              <g filter="url(#symbolShadow)">
                <text x="50" y="36" fill="url(#blackGrad)" fontSize="20" fontWeight="900" fontFamily="Arial, system-ui" textAnchor="middle">{extraData || '10 m'}</text>
                <g transform="translate(0, 7)">
                  <path d="M22,50 L78,50" stroke="url(#blackGrad)" strokeWidth="2.2" strokeDasharray="3,3" />
                  <polygon points="20,50 26,45 26,55" fill="url(#blackGrad)" />
                  <polygon points="80,50 74,45 74,55" fill="url(#blackGrad)" />
                  {renderTruckIcon(38, 54, 0.16)}
                </g>
              </g>
            )}

            {(type === 'R-19' || type === 'speed_limit') && (
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

            {type === 'R-20' && (
              <g>
                <g stroke="url(#blackGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(30, 36) scale(0.8)" filter="url(#symbolShadow)">
                  <path d="M5,12 L18,12 L28,2 L28,26 L18,16 L5,16 Z" fill="url(#blackGrad)" stroke="none" />
                  <path d="M33,9 A6,6 0 0,1 33,19" />
                  <path d="M38,4 A12,12 0 0,1 38,24" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-21' && (
              <rect x="22" y="46" width="56" height="8" rx="1" fill="url(#blackGrad)" filter="url(#symbolShadow)" />
            )}

            {type === 'R-22' && (
              <g stroke="url(#blackGrad)" strokeWidth="3" fill="none" transform="translate(35, 35) scale(0.6)" filter="url(#symbolShadow)">
                <circle cx="25" cy="25" r="22" strokeWidth="6" />
                <line x1="25" y1="3" x2="25" y2="47" />
                <line x1="3" y1="25" x2="47" y2="25" />
                <line x1="9" y1="9" x2="41" y2="41" />
                <line x1="9" y1="41" x2="41" y2="9" />
              </g>
            )}

            {type === 'R-23' && (
              <g filter="url(#symbolShadow)">
                <path d="M55,28 L55,70" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M49,36 L55,28 L61,36" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                {renderCarIcon(26, 44, 0.32)}
              </g>
            )}

            {(type === 'R-24a' || type === 'double_way') && (
              <g filter="url(#symbolShadow)">
                <path d="M26,50 L74,50" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M66,42 L74,50 L66,58" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-24b' && (
              <g filter="url(#symbolShadow)">
                <path d="M32,32 L68,68" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M58,68 L68,68 L68,58" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-25a' && (
              <g filter="url(#symbolShadow)">
                <path d="M62,64 L62,48 Q62,38 52,38 L30,38" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M36,31 L26,38 L36,45 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {type === 'R-25b' && (
              <g filter="url(#symbolShadow)">
                <path d="M38,64 L38,48 Q38,38 48,38 L70,38" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M64,31 L74,38 L64,45 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {type === 'R-25c' && (
              <g filter="url(#symbolShadow)">
                <path d="M50,70 L50,32 M44,42 L50,32 L56,42" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50,52 Q50,42 42,42 L28,42 M34,35 L24,42 L34,49" fill="none" stroke="url(#blackGrad)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-25d' && (
              <g filter="url(#symbolShadow)">
                <path d="M50,70 L50,32 M44,42 L50,32 L56,42" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50,52 Q50,42 58,42 L72,42 M66,35 L76,42 L66,49" fill="none" stroke="url(#blackGrad)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-26' && (
              <g filter="url(#symbolShadow)">
                <path d="M50,26 L50,74" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M42,36 L50,26 L58,36" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-27' && (
              <g filter="url(#symbolShadow)">
                <path d="M66,28 L66,70" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M60,36 L66,28 L72,36" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                {renderTruckIcon(21, 38, 0.22)}
              </g>
            )}

            {type === 'R-28' && (
              <g filter="url(#symbolShadow)">
                <path d="M37,28 L37,70" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M30,62 L37,71 L44,62" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M63,72 L63,30" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M56,38 L63,29 L70,38" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-29' && (
              <g>
                {renderPedestrianIcon(12, 10, 0.75)}
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-30' && (
              <g filter="url(#symbolShadow)">
                {renderPedestrianIcon(14, 12, 0.7)}
                <path d="M65,72 L35,72 M41,66 L35,72 L41,78" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-31' && (
              <g filter="url(#symbolShadow)">
                {renderPedestrianIcon(14, 12, 0.7)}
                <path d="M35,72 L65,72 M59,66 L65,72 L59,78" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-32' && (
              <g fill="url(#blackGrad)" transform="translate(33, 28) scale(0.68)" filter="url(#symbolShadow)">
                <rect x="5" y="10" width="40" height="36" rx="8" />
                <rect x="8" y="15" width="34" height="12" fill="#FFFFFF" />
                <circle cx="12" cy="38" r="3.2" fill="#FFFFFF" />
                <circle cx="38" cy="38" r="3.2" fill="#FFFFFF" />
                <rect x="8" y="46" width="8" height="6" />
                <rect x="34" y="46" width="8" height="6" />
                <rect x="18" y="36" width="14" height="4" fill="#CBD5E1" />
              </g>
            )}

            {type === 'R-33' && (
              <g stroke="url(#blackGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(50, 50) scale(0.8)" filter="url(#symbolShadow)">
                <path d="M-15,-20 A25,25 0 0,1 20,-15" />
                <polygon points="20,-15 12,-22 22,-24" fill="url(#blackGrad)" stroke="none" />
                <path d="M25,10 A25,25 0 0,1 -10,22" />
                <polygon points="-10,22 -8,13 -18,17" fill="url(#blackGrad)" stroke="none" />
                <path d="M-22,5 A25,25 0 0,1 -15,-20" />
                <polygon points="-15,-20 -22,-12 -12,-8" fill="url(#blackGrad)" stroke="none" />
              </g>
            )}

            {type === 'R-34' && (
              renderBikeIcon(22, 22, 0.55)
            )}

            {type === 'R-35a' && (
              <g filter="url(#symbolShadow)">
                {renderBikeIcon(22, 16, 0.55)}
                <path d="M65,72 L35,72 M41,66 L35,72 L41,78" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-35b' && (
              <g filter="url(#symbolShadow)">
                {renderBikeIcon(22, 16, 0.55)}
                <path d="M35,72 L65,72 M59,66 L65,72 L59,78" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {type === 'R-36a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderBikeIcon(14, 26, 0.42)}
                {renderPedestrianIcon(14, 18, 0.65)}
              </g>
            )}

            {type === 'R-36b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderPedestrianIcon(-14, 18, 0.65)}
                {renderBikeIcon(29, 26, 0.42)}
              </g>
            )}

            {type === 'R-36c' && (
              <g filter="url(#symbolShadow)">
                {renderBikeIcon(13, 20, 0.45)}
                {renderPedestrianIcon(14, 16, 0.68)}
              </g>
            )}

            {type === 'R-37' && (
              <g>
                <g fill="url(#blackGrad)" transform="translate(30, 36) scale(0.8)" filter="url(#symbolShadow)">
                  <circle cx="10" cy="22" r="7" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                  <circle cx="40" cy="22" r="7" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                  <path d="M10,22 L22,12 L33,12 L40,22" stroke="url(#blackGrad)" strokeWidth="3.5" fill="none" />
                  <line x1="16" y1="17" x2="25" y2="17" stroke="url(#blackGrad)" strokeWidth="3" />
                  <line x1="33" y1="12" x2="31" y2="5" stroke="url(#blackGrad)" strokeWidth="3.5" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-38' && (
              <g>
                <g fill="url(#blackGrad)" transform="translate(26, 36) scale(0.24)" filter="url(#symbolShadow)">
                  <rect x="5" y="10" width="60" height="25" rx="4" />
                  <rect x="10" y="14" width="12" height="8" fill="#FFFFFF" />
                  <rect x="26" y="14" width="12" height="8" fill="#FFFFFF" />
                  <rect x="42" y="14" width="12" height="8" fill="#FFFFFF" />
                  <circle cx="18" cy="40" r="6" fill="#111827" />
                  <circle cx="52" cy="40" r="6" fill="#111827" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-39' && (
              renderTruckIcon(22, 32, 0.26)
            )}

            {type === 'R-40' && (
              <g>
                <g stroke="url(#blackGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" transform="translate(30, 38) scale(0.8)" filter="url(#symbolShadow)">
                  <circle cx="8" cy="22" r="4.5" fill="url(#blackGrad)" stroke="none" />
                  <path d="M8,22 L42,10 M16,19 L32,26 L42,26 M32,26 L35,32 M24,21 L26,30" />
                </g>
                <line x1="22" y1="22" x2="78" y2="78" stroke="url(#redGrad)" strokeWidth="8.2" />
              </g>
            )}

            {type === 'R-41' && (
              renderVLTIcon(34, 26, 0.65)
            )}

            {type === 'R-42a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderVLTIcon(12, 28, 0.44)}
                {renderBikeIcon(29, 28, 0.44)}
              </g>
            )}

            {type === 'R-42b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderBikeIcon(13, 28, 0.44)}
                {renderVLTIcon(29, 28, 0.44)}
              </g>
            )}

            {type === 'R-43a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderCarIcon(13, 38, 0.44)}
                {renderVLTIcon(29, 28, 0.44)}
              </g>
            )}

            {type === 'R-43b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="20" x2="50" y2="80" stroke="url(#blackGrad)" strokeWidth="2.5" />
                {renderVLTIcon(12, 28, 0.44)}
                {renderCarIcon(29, 38, 0.44)}
              </g>
            )}

            <circle cx="50" cy="9.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="90.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 4. PLACA R-28 (Velocidade Mínima permitida / Antigo do acervo) --- */}
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
            <circle cx="50" cy="9.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="90.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 5. PLACAS DE ADVERTÊNCIA: Losango Amarelo/Laranja com Borda Preta --- */}
        {isWarningSign && type !== 'A-41' && (
          <g>
            <rect x="15" y="15" width="70" height="70" rx="6" transform="rotate(45 50 50)" fill="url(#metalBorderGrad)" filter="url(#plateShadow)"/>
            <rect x="16.5" y="16.5" width="67" height="67" rx="4.5" transform="rotate(45 50 50)" fill={['A-24', 'warning_works'].includes(type) ? 'url(#orangeGrad)' : 'url(#yellowGrad)'} />
            <rect x="19.8" y="19.8" width="60.4" height="60.4" rx="3.5" transform="rotate(45 50 50)" fill="none" stroke="url(#blackGrad)" strokeWidth="3.2" />

            {/* A-1a: Curva acentuada à esquerda */}
            {(type === 'A-1a' || (type === 'warning_curve' && extraData === 'esquerda')) && (
              <g filter="url(#symbolShadow)">
                <path d="M60,65 L60,45 C60,35 40,35 40,35 M50,25 L35,35 L50,45" fill="none" stroke="url(#blackGrad)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-1b: Curva acentuada à direita */}
            {(type === 'A-1b' || (type === 'warning_curve' && extraData === 'direita')) && (
              <g filter="url(#symbolShadow)">
                <path d="M40,65 L40,45 C40,35 60,35 60,35 M50,25 L65,35 L50,45" fill="none" stroke="url(#blackGrad)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-2a: Curva à esquerda */}
            {(type === 'A-2a' || (type === 'warning_curve_moderate' && extraData === 'esquerda')) && (
              <g filter="url(#symbolShadow)">
                <path d="M55,65 Q55,48 40,38" fill="none" stroke="url(#blackGrad)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M46,31 L36,38 L46,45 Z" fill="url(#blackGrad)"/>
              </g>
            )}

            {/* A-2b: Curva à direita */}
            {(type === 'A-2b' || (type === 'warning_curve_moderate' && extraData === 'direita')) && (
              <g filter="url(#symbolShadow)">
                <path d="M45,65 Q45,48 60,38" fill="none" stroke="url(#blackGrad)" strokeWidth="5.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54,31 L64,38 L54,45 Z" fill="url(#blackGrad)"/>
              </g>
            )}

            {/* A-3a: Pista sinuosa à esquerda */}
            {type === 'A-3a' && (
              <g filter="url(#symbolShadow)">
                <path d="M50,68 C40,56 60,44 50,22" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M44,30 L50,20 L56,30 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-3b: Pista sinuosa à direita */}
            {type === 'A-3b' && (
              <g filter="url(#symbolShadow)">
                <path d="M50,68 C60,56 40,44 50,22" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M44,30 L50,20 L56,30 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-4a: Curva acentuada em S à esquerda */}
            {type === 'A-4a' && (
              <g filter="url(#symbolShadow)">
                <path d="M55,65 L55,48 L45,48 L45,30" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M39,36 L45,26 L51,36 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-4b: Curva acentuada em S à direita */}
            {type === 'A-4b' && (
              <g filter="url(#symbolShadow)">
                <path d="M45,65 L45,48 L55,48 L55,30" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M49,36 L55,26 L61,36 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-5a: Curva em S à esquerda */}
            {type === 'A-5a' && (
              <g filter="url(#symbolShadow)">
                <path d="M55,65 Q55,50 45,50 Q35,50 45,30" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M39,36 L45,26 L51,36 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-5b: Curva em S à direita */}
            {type === 'A-5b' && (
              <g filter="url(#symbolShadow)">
                <path d="M45,65 Q45,50 55,50 Q65,50 55,30" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M49,36 L55,26 L61,36 Z" fill="url(#blackGrad)" />
              </g>
            )}

            {/* A-6: Cruzamento de vias */}
            {type === 'A-6' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="26" x2="50" y2="74" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="26" y1="50" x2="74" y2="50" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-7a: Via lateral à esquerda */}
            {type === 'A-7a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="26" y1="50" x2="50" y2="50" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-7b: Via lateral à direita */}
            {type === 'A-7b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="50" x2="74" y2="50" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-8: Interseção em T */}
            {type === 'A-8' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="50" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="26" y1="50" x2="74" y2="50" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-9: Bifurcação em Y */}
            {type === 'A-9' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="54" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="54" x2="30" y2="34" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="54" x2="70" y2="34" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-10a: Entroncamento oblíquo à esquerda */}
            {type === 'A-10a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="54" x2="30" y2="34" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-10b: Entroncamento oblíquo à direita */}
            {type === 'A-10b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="54" x2="70" y2="34" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-11a: Junções sucessivas contrárias, primeira à esquerda */}
            {type === 'A-11a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="28" y1="56" x2="50" y2="56" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="50" y1="40" x2="72" y2="40" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-11b: Junções sucessivas contrárias, primeira à direita */}
            {type === 'A-11b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <line x1="50" y1="56" x2="72" y2="56" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="28" y1="40" x2="50" y2="40" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-12: Interseção em círculo */}
            {type === 'A-12' && (
              <g stroke="url(#blackGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(50, 50) scale(0.8)" filter="url(#symbolShadow)">
                <path d="M-15,-20 A25,25 0 0,1 20,-15" />
                <polygon points="20,-15 12,-22 22,-24" fill="url(#blackGrad)" stroke="none" />
                <path d="M25,10 A25,25 0 0,1 -10,22" />
                <polygon points="-10,22 -8,13 -18,17" fill="url(#blackGrad)" stroke="none" />
                <path d="M-22,5 A25,25 0 0,1 -15,-20" />
                <polygon points="-15,-20 -22,-12 -12,-8" fill="url(#blackGrad)" stroke="none" />
              </g>
            )}

            {/* A-13a: Confluência à esquerda */}
            {type === 'A-13a' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M30,66 Q44,54 50,54" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-13b: Confluência à direita */}
            {type === 'A-13b' && (
              <g filter="url(#symbolShadow)">
                <line x1="50" y1="24" x2="50" y2="76" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M70,66 Q56,54 50,54" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-14: Semáforo à frente */}
            {(type === 'A-14' || type === 'warning_traffic_light') && (
              <g filter="url(#symbolShadow)">
                <rect x="42" y="32" width="16" height="36" rx="3" fill="url(#blackGrad)" stroke="#1F2937" strokeWidth="1"/>
                <circle cx="50" cy="38" r="4.5" fill="#EF4444"/>
                <circle cx="50" cy="50" r="4.5" fill="#F59E0B"/>
                <circle cx="50" cy="62" r="4.5" fill="#10B981"/>
              </g>
            )}

            {/* A-15: Parada obrigatória à frente */}
            {type === 'A-15' && (
              <g filter="url(#symbolShadow)">
                <polygon points="40,32 60,32 72,44 72,56 60,68 40,68 28,56 28,44" fill="url(#redGrad)" stroke="#FFFFFF" strokeWidth="2.5" />
                <text x="50" y="54.5" fill="#FFFFFF" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="Arial, sans-serif">PARE</text>
              </g>
            )}

            {/* A-16: Bonde */}
            {type === 'A-16' && (
              <g fill="url(#blackGrad)" transform="translate(32, 32) scale(0.75)" filter="url(#symbolShadow)">
                <rect x="5" y="10" width="30" height="18" rx="2" />
                <rect x="8" y="13" width="6" height="6" fill="#FFFFFF" />
                <rect x="17" y="13" width="6" height="6" fill="#FFFFFF" />
                <rect x="26" y="13" width="6" height="6" fill="#FFFFFF" />
                <circle cx="12" cy="31" r="3.5" />
                <circle cx="28" cy="31" r="3.5" />
                <line x1="20" y1="10" x2="10" y2="0" stroke="url(#blackGrad)" strokeWidth="2" />
                <line x1="10" y1="0" x2="30" y2="0" stroke="url(#blackGrad)" strokeWidth="1.5" />
              </g>
            )}

            {/* A-17: Pista irregular */}
            {type === 'A-17' && (
              <g filter="url(#symbolShadow)">
                <path d="M22,56 Q29,42 36,56 Q43,42 50,56 Q57,42 64,56 L78,56 L22,56" fill="url(#blackGrad)" stroke="none" />
              </g>
            )}

            {/* A-18: Saliência ou lombada */}
            {(type === 'A-18' || type === 'warning_bump') && (
              <g stroke="url(#blackGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#symbolShadow)">
                <path d="M22,58 L38,58 Q50,40 62,58 L78,58" />
              </g>
            )}

            {/* A-19: Depressão */}
            {type === 'A-19' && (
              <g filter="url(#symbolShadow)">
                <path d="M22,50 L36,50 Q50,66 64,50 L78,50" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-20a: Declive acentuado */}
            {type === 'A-20a' && (
              <g filter="url(#symbolShadow)">
                <polygon points="22,66 78,66 78,50" fill="url(#blackGrad)" />
                <g transform="translate(34, 38) rotate(16) scale(0.24)">
                  <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#yellowGrad)" stroke="url(#blackGrad)" strokeWidth="3" />
                  <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#yellowGrad)" stroke="url(#blackGrad)" strokeWidth="3" />
                </g>
              </g>
            )}

            {/* A-20b: Aclive acentuado */}
            {type === 'A-20b' && (
              <g filter="url(#symbolShadow)">
                <polygon points="22,66 78,66 22,50" fill="url(#blackGrad)" />
                <g transform="translate(44, 38) rotate(-16) scale(0.24)">
                  <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#yellowGrad)" stroke="url(#blackGrad)" strokeWidth="3" />
                  <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#yellowGrad)" stroke="url(#blackGrad)" strokeWidth="3" />
                </g>
              </g>
            )}

            {/* A-21a: Estreitamento de pista ao centro */}
            {type === 'A-21a' && (
              <g filter="url(#symbolShadow)">
                <path d="M30,68 L30,55 L42,42 L42,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M70,68 L70,55 L58,42 L58,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-21b: Estreitamento de pista à esquerda */}
            {type === 'A-21b' && (
              <g filter="url(#symbolShadow)">
                <path d="M30,68 L30,55 L42,42 L42,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M70,68 L70,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-21c: Estreitamento de pista à direita */}
            {type === 'A-21c' && (
              <g filter="url(#symbolShadow)">
                <path d="M30,68 L30,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M70,68 L70,55 L58,42 L58,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-21d: Alargamento de pista à esquerda */}
            {type === 'A-21d' && (
              <g filter="url(#symbolShadow)">
                <path d="M42,68 L42,55 L30,42 L30,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M70,68 L70,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-21e: Alargamento de pista à direita */}
            {type === 'A-21e' && (
              <g filter="url(#symbolShadow)">
                <path d="M30,68 L30,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M58,68 L58,55 L70,42 L70,26" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-22: Ponte estreita */}
            {(type === 'A-22' || type === 'warning_school') && (
              // Note that 'warning_school' alias from task checklist was used for A-22 earlier. Let's support both.
              <g filter="url(#symbolShadow)">
                <path d="M32,68 L32,54 Q32,48 40,48 L40,36 Q32,36 32,30 L32,18" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M68,68 L68,54 Q68,48 60,48 L60,36 Q68,36 68,30 L68,18" fill="none" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-23: Ponte móvel */}
            {type === 'A-23' && (
              <g filter="url(#symbolShadow)">
                <path d="M22,70 Q50,66 78,70" stroke="#2563EB" strokeWidth="3.5" fill="none" />
                <path d="M22,76 Q50,72 78,76" stroke="#2563EB" strokeWidth="2" fill="none" />
                <line x1="22" y1="52" x2="44" y2="42" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="78" y1="52" x2="56" y2="34" stroke="url(#blackGrad)" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            )}

            {/* A-24: Obras (Orange) */}
            {(type === 'A-24' || type === 'warning_works') && (
              <g filter="url(#symbolShadow)" stroke="url(#blackGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="30" y1="68" x2="70" y2="68" strokeWidth="3" />
                <circle cx="45" cy="36" r="4.5" fill="url(#blackGrad)" stroke="none" />
                <path d="M45,42 L45,55 M45,45 L32,54 L26,48 M45,45 L58,54 L62,60" />
                <path d="M45,55 L38,68 M45,55 L50,68" />
                <line x1="58" y1="54" x2="64" y2="62" strokeWidth="2.5" />
                <polygon points="62,60 67,65 60,65" fill="url(#blackGrad)" strokeWidth="1" />
              </g>
            )}

            {/* A-25: Mão dupla adiante */}
            {type === 'A-25' && (
              <g filter="url(#symbolShadow)">
                <path d="M37,28 L37,70" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M30,62 L37,71 L44,62" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M63,72 L63,30" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" />
                <path d="M56,38 L63,29 L70,38" fill="none" stroke="url(#blackGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-26a: Sentido único */}
            {type === 'A-26a' && (
              <g filter="url(#symbolShadow)">
                <path d="M28,50 L72,50" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M62,42 L72,50 L62,58" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-26b: Sentido duplo / Passagem em nível com barreira */}
            {(type === 'A-26b' || type === 'warning_barrier') && (
              // Note: warning_barrier code used to represent A-26b. We support both.
              <g filter="url(#symbolShadow)">
                {type === 'warning_barrier' ? (
                  // Old fence rendering
                  <g stroke="url(#blackGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round">
                    <line x1="28" y1="40" x2="72" y2="40" />
                    <line x1="28" y1="50" x2="72" y2="50" />
                    <line x1="28" y1="60" x2="72" y2="60" />
                    <line x1="32" y1="35" x2="32" y2="65" />
                    <line x1="41" y1="35" x2="41" y2="65" />
                    <line x1="50" y1="35" x2="50" y2="65" />
                    <line x1="59" y1="35" x2="59" y2="65" />
                    <line x1="68" y1="35" x2="68" y2="65" />
                  </g>
                ) : (
                  // Double headed horizontal arrow
                  <g>
                    <path d="M28,50 L72,50" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" />
                    <path d="M38,42 L28,50 L38,58" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M62,42 L72,50 L62,58" fill="none" stroke="url(#blackGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}
              </g>
            )}

            {/* A-27: Área com desmoronamento */}
            {(type === 'A-27' || type === 'warning_slippery') && (
              // In old codebase, warning_slippery could trigger A-27 as well.
              <g filter="url(#symbolShadow)">
                {type === 'warning_slippery' ? (
                  // Old slippery slide marks
                  <g>
                    <path d="M37,68 Q41,58 33,52 Q26,46 36,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M59,68 Q63,58 55,52 Q48,46 58,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round"/>
                    <g transform="translate(48, 35) rotate(-15) scale(0.24)">
                      <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#blackGrad)"/>
                      <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#blackGrad)"/>
                      <circle cx="-11" cy="12" r="5.5" fill="#111827"/>
                      <circle cx="11" cy="12" r="5.5" fill="#111827"/>
                    </g>
                  </g>
                ) : (
                  // Hill with falling rocks
                  <g>
                    <path d="M22,68 H78 L58,32 Z" fill="url(#blackGrad)" />
                    <circle cx="34" cy="56" r="3" fill="url(#blackGrad)" />
                    <circle cx="28" cy="62" r="2.5" fill="url(#blackGrad)" />
                    <circle cx="38" cy="64" r="2" fill="url(#blackGrad)" />
                  </g>
                )}
              </g>
            )}

            {/* A-28: Pista escorregadia */}
            {type === 'A-28' && (
              <g filter="url(#symbolShadow)">
                <path d="M37,68 Q41,58 33,52 Q26,46 36,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3.2" strokeLinecap="round"/>
                <path d="M59,68 Q63,58 55,52 Q48,46 58,38" fill="none" stroke="url(#blackGrad)" strokeWidth="3.2" strokeLinecap="round"/>
                <g transform="translate(48, 35) rotate(-15) scale(0.24)">
                  <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#blackGrad)"/>
                  <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#blackGrad)"/>
                  <circle cx="-11" cy="12" r="5.5" fill="#111827"/>
                  <circle cx="11" cy="12" r="5.5" fill="#111827"/>
                </g>
              </g>
            )}

            {/* A-29: Projeção de cascalho */}
            {(type === 'A-29' || type === 'warning_bump') && (
              // warning_bump might code for A-29 in history
              <g filter="url(#symbolShadow)">
                {type === 'warning_bump' ? (
                  // Lombada
                  <path d="M22,58 L38,58 Q50,40 62,58 L78,58" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  // Flying rocks from car
                  <g>
                    <g transform="translate(42, 36) scale(0.22)">
                      <rect x="-20" y="-10" width="40" height="20" rx="4" fill="url(#blackGrad)"/>
                      <rect x="-14" y="-22" width="28" height="15" rx="3" fill="url(#blackGrad)"/>
                      <circle cx="-11" cy="12" r="5.5" fill="#111827"/>
                      <circle cx="11" cy="12" r="5.5" fill="#111827"/>
                    </g>
                    <circle cx="68" cy="55" r="2" fill="url(#blackGrad)"/>
                    <circle cx="74" cy="58" r="3" fill="url(#blackGrad)"/>
                    <circle cx="70" cy="64" r="1.5" fill="url(#blackGrad)"/>
                    <path d="M60,56 Q68,60 76,57" fill="none" stroke="url(#blackGrad)" strokeWidth="1.5" strokeDasharray="2,2" />
                  </g>
                )}
              </g>
            )}

            {/* A-30a: Trânsito de ciclistas */}
            {type === 'A-30a' && (
              renderBikeIcon(22, 22, 0.55)
            )}

            {/* A-30b: Passagem sinalizada de ciclistas */}
            {type === 'A-30b' && (
              <g filter="url(#symbolShadow)">
                {renderBikeIcon(22, 18, 0.55)}
                <line x1="24" y1="68" x2="76" y2="68" stroke="url(#blackGrad)" strokeWidth="3.5" strokeDasharray="4,4" />
              </g>
            )}

            {/* A-30c: Trânsito compartilhado por ciclistas e pedestres */}
            {type === 'A-30c' && (
              <g filter="url(#symbolShadow)">
                {renderBikeIcon(13, 20, 0.45)}
                {renderPedestrianIcon(14, 16, 0.68)}
              </g>
            )}

            {/* A-31: Trânsito de tratores ou maquinaria agrícola */}
            {type === 'A-31' && (
              <g fill="url(#blackGrad)" transform="translate(30, 33) scale(0.7)" filter="url(#symbolShadow)">
                <circle cx="12" cy="32" r="10" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                <circle cx="12" cy="32" r="5" />
                <circle cx="42" cy="35" r="7" stroke="url(#blackGrad)" strokeWidth="2" fill="none" />
                <circle cx="42" cy="35" r="3.5" />
                <rect x="18" y="18" width="22" height="15" rx="2" />
                <rect x="12" y="10" width="10" height="10" />
                <path d="M12,10 L18,2 H30 L35,10" stroke="url(#blackGrad)" strokeWidth="3" fill="none" />
                <line x1="38" y1="18" x2="38" y2="8" stroke="url(#blackGrad)" strokeWidth="2.5" />
              </g>
            )}

            {/* A-32a: Trânsito de pedestres */}
            {type === 'A-32a' && (
              renderPedestrianIcon(14, 16, 0.7)
            )}

            {/* A-32b: Passagem sinalizada de pedestres */}
            {(type === 'A-32b' || type === 'warning_pedestrian') && (
              <g filter="url(#symbolShadow)">
                {renderPedestrianIcon(14, 12, 0.7)}
                <line x1="30" y1="75" x2="70" y2="75" stroke="url(#blackGrad)" strokeWidth="3.5"/>
                <line x1="34" y1="79" x2="66" y2="79" stroke="url(#blackGrad)" strokeWidth="2"/>
              </g>
            )}

            {/* A-33a: Área escolar */}
            {type === 'A-33a' && (
              <g fill="url(#blackGrad)" stroke="none" transform="translate(6, 6)" filter="url(#symbolShadow)">
                <circle cx="39" cy="32" r="4.5"/>
                <path d="M34,38 H44 V57 H40 V69 H38 V57 H34 Z"/>
                <path d="M31,38 L33,53 H35 L33,38 Z"/>
                <path d="M44,41 L50,48 L51,47 L45,40 Z"/>
                <circle cx="54" cy="44" r="3.2"/>
                <path d="M50,48 H58 V62 H55 V69 H53 V62 H50 Z"/>
                <rect x="56" y="49" width="4.5" height="5.5" rx="1" fill="url(#blackGrad)"/>
              </g>
            )}

            {/* A-33b: Passagem sinalizada de escolares */}
            {type === 'A-33b' && (
              <g filter="url(#symbolShadow)">
                <g fill="url(#blackGrad)" stroke="none" transform="translate(6, 3)">
                  <circle cx="39" cy="32" r="4.5"/>
                  <path d="M34,38 H44 V57 H40 V69 H38 V57 H34 Z"/>
                  <path d="M31,38 L33,53 H35 L33,38 Z"/>
                  <path d="M44,41 L50,48 L51,47 L45,40 Z"/>
                  <circle cx="54" cy="44" r="3.2"/>
                  <path d="M50,48 H58 V62 H55 V69 H53 V62 H50 Z"/>
                  <rect x="56" y="49" width="4.5" height="5.5" rx="1" fill="url(#blackGrad)"/>
                </g>
                {/* Crosswalk stripes */}
                <line x1="30" y1="75" x2="70" y2="75" stroke="url(#blackGrad)" strokeWidth="3.5"/>
                <line x1="34" y1="79" x2="66" y2="79" stroke="url(#blackGrad)" strokeWidth="2"/>
              </g>
            )}

            {/* A-34: Crianças */}
            {type === 'A-34' && (
              <g fill="url(#blackGrad)" filter="url(#symbolShadow)">
                <circle cx="44" cy="33" r="4.5" />
                <path d="M39,39 H49 V58 H46 V68 H42 V58 H39 Z" />
                <path d="M37,39 L40,52 H42 L40,39 Z" />
                <circle cx="64" cy="65" r="4" />
              </g>
            )}

            {/* A-35: Animais */}
            {type === 'A-35' && (
              <g fill="url(#blackGrad)" transform="translate(25, 34) scale(0.9)" filter="url(#symbolShadow)">
                <path d="M5,15 C5,10 12,8 20,8 H40 C44,8 48,12 48,18 V28 H10 V38 H5 Z M10,28 V44 H15 V28 Z M38,28 V44 H43 V28 Z" />
                <circle cx="3" cy="12" r="2" />
              </g>
            )}

            {type === 'A-36' && (
              <g fill="none" filter="url(#symbolShadow)">
                <path d="M36,25 L38,15 L43,15 M38,15 Q30,12 28,6" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M42,22 Q54,12 66,18 M66,18 L74,24 L66,28 M54,20 L60,38 H64 L56,20" stroke="url(#blackGrad)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M36,25 L32,34 Q24,38 14,38 M14,38 L6,24 H0 L8,45" stroke="url(#blackGrad)" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* A-37: Altura limitada */}
            {type === 'A-37' && (
              <g>
                <g fill="url(#blackGrad)" filter="url(#symbolShadow)">
                  <polygon points="50,22 44,28 56,28" />
                  <polygon points="50,78 44,72 56,72" />
                </g>
                <text 
                  x="50" 
                  y="56" 
                  fill="url(#blackGrad)" 
                  fontSize="21" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  {extraData || '4,0m'}
                </text>
              </g>
            )}

            {/* A-38: Largura limitada */}
            {type === 'A-38' && (
              <g>
                <g fill="url(#blackGrad)" filter="url(#symbolShadow)">
                  <polygon points="22,50 28,44 28,56" />
                  <polygon points="78,50 72,44 72,56" />
                </g>
                <text 
                  x="50" 
                  y="56" 
                  fill="url(#blackGrad)" 
                  fontSize="21" 
                  fontWeight="900" 
                  fontFamily="Arial, system-ui, sans-serif" 
                  textAnchor="middle"
                  filter="url(#symbolShadow)"
                >
                  {extraData || '3,0m'}
                </text>
              </g>
            )}

            {/* A-39: Passagem de nível sem barreira */}
            {type === 'A-39' && (
              renderVLTIcon(30, 24, 0.8)
            )}

            {/* A-40: Passagem de nível com barreira */}
            {type === 'A-40' && (
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

            {/* A-42a: Início de pista dupla */}
            {type === 'A-42a' && (
              <g filter="url(#symbolShadow)">
                <path d="M44,22 L56,22 L50,34 Z" fill="url(#blackGrad)" />
                <path d="M36,66 L36,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M30,58 L36,66 L42,58" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M64,66 L64,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M58,40 L64,32 L70,40" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-42b: Fim de pista dupla */}
            {type === 'A-42b' && (
              <g filter="url(#symbolShadow)">
                <path d="M44,78 L56,78 L50,66 Z" fill="url(#blackGrad)" />
                <path d="M36,66 L36,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M30,58 L36,66 L42,58" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M64,66 L64,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M58,40 L64,32 L70,40" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-42c: Pista dividida */}
            {type === 'A-42c' && (
              <g filter="url(#symbolShadow)">
                <path d="M44,22 L56,22 L50,34 Z" fill="url(#blackGrad)" />
                <path d="M36,66 L36,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M30,40 L36,32 L42,40" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M64,66 L64,32" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M58,40 L64,32 L70,40" fill="none" stroke="url(#blackGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* A-43: Aeroporto */}
            {type === 'A-43' && (
              <g fill="url(#blackGrad)" transform="translate(50, 50) rotate(-45)" filter="url(#symbolShadow)">
                <path d="M-4,-24 L4,-24 L2,24 L-2,24 Z" />
                <path d="M-22,-8 L22,-8 L20,-2 L-20,-2 Z" />
                <path d="M-8,16 L8,16 L7,22 L-7,22 Z" />
              </g>
            )}

            {/* A-44: Vento lateral */}
            {type === 'A-44' && (
              <g filter="url(#symbolShadow)">
                <line x1="32" y1="68" x2="32" y2="28" stroke="url(#blackGrad)" strokeWidth="3" />
                <path d="M32,32 L66,38 L64,52 L32,48 Z" fill="url(#orangeGrad)" stroke="url(#blackGrad)" strokeWidth="1.5" />
                <line x1="42" y1="34" x2="42" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="52" y1="36" x2="52" y2="51" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            )}

            {/* A-45: Rua sem saída */}
            {type === 'A-45' && (
              <g filter="url(#symbolShadow)">
                <rect x="44" y="38" width="12" height="34" fill="url(#blackGrad)" />
                <rect x="36" y="28" width="28" height="10" fill="url(#redGrad)" stroke="url(#blackGrad)" strokeWidth="1.5" />
              </g>
            )}

            {/* A-46: Peso bruto total limitado */}
            {type === 'A-46' && (
              <text 
                x="50" 
                y="58" 
                fill="url(#blackGrad)" 
                fontSize="24" 
                fontWeight="900" 
                fontFamily="Arial, system-ui, sans-serif" 
                textAnchor="middle"
                filter="url(#symbolShadow)"
              >
                {extraData || '10 t'}
              </text>
            )}

            {/* A-47: Peso limitado por eixo */}
            {type === 'A-47' && (
              <g filter="url(#symbolShadow)">
                <text x="50" y="38" fill="url(#blackGrad)" fontSize="20" fontWeight="900" fontFamily="Arial, system-ui" textAnchor="middle">{extraData || '2 t'}</text>
                <g stroke="url(#blackGrad)" strokeWidth="4.5" fill="none" transform="translate(0, 12)">
                  <line x1="30" y1="46" x2="70" y2="46" />
                  <rect x="24" y="38" width="6" height="16" rx="1.5" fill="url(#blackGrad)" stroke="none" />
                  <rect x="70" y="38" width="6" height="16" rx="1.5" fill="url(#blackGrad)" stroke="none" />
                </g>
              </g>
            )}

            {/* A-48: Comprimento limitado */}
            {type === 'A-48' && (
              <g filter="url(#symbolShadow)">
                <text x="50" y="36" fill="url(#blackGrad)" fontSize="20" fontWeight="900" fontFamily="Arial, system-ui" textAnchor="middle">{extraData || '10 m'}</text>
                <g transform="translate(0, 7)">
                  <path d="M22,50 L78,50" stroke="url(#blackGrad)" strokeWidth="2.2" strokeDasharray="3,3" />
                  <polygon points="20,50 26,45 26,55" fill="url(#blackGrad)" />
                  <polygon points="80,50 74,45 74,55" fill="url(#blackGrad)" />
                  {renderTruckIcon(38, 54, 0.16)}
                </g>
              </g>
            )}

            <circle cx="50" cy="11.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
            <circle cx="50" cy="88.5" r="1.5" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 5.1 SPECIAL RENDER FOR A-41 (Cruz de Santo André - Crossed Bars) --- */}
        {isWarningSign && type === 'A-41' && (
          <g filter="url(#plateShadow)" transform="translate(0, 0)">
            <rect x="12" y="42" width="76" height="16" rx="2" transform="rotate(45 50 50)" fill="url(#yellowGrad)" stroke="url(#metalBorderGrad)" strokeWidth="1.8" />
            <rect x="12" y="42" width="76" height="16" rx="2" transform="rotate(-45 50 50)" fill="url(#yellowGrad)" stroke="url(#metalBorderGrad)" strokeWidth="1.8" />
            <rect x="16" y="45" width="68" height="10" rx="1" transform="rotate(45 50 50)" fill="none" stroke="url(#blackGrad)" strokeWidth="2" />
            <rect x="16" y="45" width="68" height="10" rx="1" transform="rotate(-45 50 50)" fill="none" stroke="url(#blackGrad)" strokeWidth="2" />
            {/* Center screw */}
            <circle cx="50" cy="50" r="1.8" fill="url(#metalGrad)" stroke="#475569" strokeWidth="0.5" />
          </g>
        )}

        {/* --- 6. SEMÁFORO REGULAR --- */}
        {type === 'light_regular' && (
          <g filter="url(#plateShadow)">
            <rect x="30" y="8" width="40" height="84" rx="8" fill="url(#blackGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <path d="M26,20 Q50,8 74,20" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26,46 Q50,34 74,46" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26,72 Q50,60 74,72" fill="none" stroke="url(#metalBorderGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="24" r="11" fill="#111827"/>
            <circle cx="50" cy="50" r="11" fill="#111827"/>
            <circle cx="50" cy="76" r="11" fill="#111827"/>
            <circle cx="50" cy="24" r="9" fill="#EF4444" filter="url(#symbolShadow)" className="animate-pulse" />
            <circle cx="50" cy="50" r="9" fill="#F59E0B" opacity="0.25"/>
            <circle cx="50" cy="76" r="9" fill="#10B981" opacity="0.25"/>
            <rect x="47" y="92" width="6" height="8" fill="url(#metalBorderGrad)" />
          </g>
        )}

        {/* --- 7. SEMÁFORO PEDESTRES --- */}
        {type === 'light_pedestrian' && (
          <g filter="url(#plateShadow)">
            <rect x="33" y="14" width="34" height="72" rx="6" fill="url(#blackGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="39" y="20" width="22" height="26" rx="2" fill="#111827"/>
            <rect x="39" y="54" width="22" height="26" rx="2" fill="#111827"/>
            <g filter="url(#symbolShadow)">
              <circle cx="50" cy="27" r="3.5" fill="#EF4444"/>
              <path d="M50,30.5 L50,40 M45,33.5 L55,33.5 M47,44 L50,40 L53,44" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g filter="url(#symbolShadow)" opacity="0.3">
              <circle cx="50" cy="60" r="3" fill="#10B981"/>
              <path d="M48,63 L52,66 M48,60 Q51,63 50,68 M46,74 L50,69 L54,73" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g className="animate-pulse" filter="url(#symbolShadow)">
              <circle cx="50" cy="60" r="3" fill="#10B981"/>
              <path d="M48,63 L52,66 M48,60 Q51,63 50,68 M46,74 L50,69 L54,73" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        )}

        {/* --- 8. TOQUES DE BUZINA --- */}
        {type === 'horn_short' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <path d="M25,40 L45,40 L55,25 L55,75 L45,60 L25,60 Z" fill="url(#blackGrad)" stroke="#1F2937" strokeWidth="1.5" strokeLinejoin="round"/>
              <rect x="18" y="44" width="8" height="12" rx="1" fill="#94A3B8"/>
              <path d="M63,38 Q67,50 63,62" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M72,31 Q78,50 72,69" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" opacity="0.55"/>
            </g>
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
              <path d="M60,35 Q65,50 60,65" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M68,27 Q75,50 68,73" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M76,19 Q85,50 76,81" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round"/>
            </g>
            <circle cx="82" cy="18" r="8" fill="#EF4444" filter="url(#symbolShadow)"/>
            <path d="M78,14 L86,22 M86,14 L78,22" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
          </g>
        )}

        {/* --- 9. SINALIZAÇÃO HORIZONTAL --- */}
        {type === 'line_continuous' && (
          <g filter="url(#plateShadow)">
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748" />
            {extraData === 'amarela' ? (
              <line x1="50" y1="4" x2="50" y2="96" stroke="#FBBF24" strokeWidth="6.5" />
            ) : (
              <line x1="50" y1="4" x2="50" y2="96" stroke="url(#whiteGrad)" strokeWidth="6.5" />
            )}
            <line x1="16" y1="4" x2="16" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <line x1="84" y1="4" x2="84" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <rect x="24" y="60" width="14" height="23" rx="3" fill="#2563EB" opacity="0.95" filter="url(#symbolShadow)"/>
            <rect x="62" y="16" width="14" height="23" rx="3" fill="#EF4444" opacity="0.95" filter="url(#symbolShadow)"/>
            <path d="M43,45 L47,49 M47,45 L43,49" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
            <path d="M53,45 L57,49 M57,45 L53,49" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
          </g>
        )}

        {type === 'line_broken' && (
          <g filter="url(#plateShadow)">
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748"/>
            <line x1="50" y1="12" x2="50" y2="28" stroke="#FBBF24" strokeWidth="4.5" />
            <line x1="50" y1="44" x2="50" y2="60" stroke="#FBBF24" strokeWidth="4.5" />
            <line x1="50" y1="76" x2="50" y2="92" stroke="#FBBF24" strokeWidth="4.5" />
            <rect x="24" y="55" width="14" height="23" rx="3" fill="#10B981" opacity="0.9" filter="url(#symbolShadow)"/>
            <path d="M31,45 L45,34 L59,45" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" className="animate-pulse"/>
          </g>
        )}

        {type === 'line_double' && (
          <g filter="url(#plateShadow)">
            <rect x="6" y="4" width="88" height="92" rx="6" fill="#1F2937" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <rect x="10" y="4" width="80" height="92" fill="#2D3748"/>
            <line x1="45" y1="4" x2="45" y2="96" stroke="#FBBF24" strokeWidth="4" />
            <line x1="55" y1="4" x2="55" y2="96" stroke="#FBBF24" strokeWidth="4" />
            <line x1="16" y1="4" x2="16" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <line x1="84" y1="4" x2="84" y2="96" stroke="#4A5568" strokeWidth="2"/>
            <rect x="25" y="66" width="12" height="20" rx="2" fill="#718096" opacity="0.5"/>
            <rect x="63" y="14" width="12" height="20" rx="2" fill="#718096" opacity="0.5"/>
          </g>
        )}

        {/* --- 10. GESTOS DO AGENTE E CONDUTOR --- */}
        {type === 'gest_agent_stop' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="4" width="92" height="92" rx="10" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2"/>
            <g filter="url(#symbolShadow)">
              <circle cx="50" cy="34" r="10.5" fill="#334155"/>
              <path d="M36,29 Q50,18 64,29 Z" fill="#1E293B"/>
              <line x1="34" y1="29" x2="66" y2="29" stroke="#F59E0B" strokeWidth="2"/>
              <rect x="37" y="44" width="26" height="42" rx="4" fill="#334155"/>
              <rect x="48" y="47" width="4" height="15" fill="#F59E0B"/>
              <line x1="62" y1="49" x2="77" y2="23" stroke="#334155" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="78" cy="19" r="5" fill="#1E293B"/>
              <line x1="78" y1="13" x2="78" y2="25" stroke="#EF4444" strokeWidth="2.5"/>
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
              <line x1="25" y1="48" x2="7" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="5" cy="48" r="3.5" fill="#CBD5E1"/>
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
              <line x1="25" y1="48" x2="15" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <line x1="15" y1="48" x2="15" y2="28" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round"/>
              <circle cx="15" cy="26" r="3.5" fill="#CBD5E1"/>
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
              <line x1="25" y1="48" x2="7" y2="48" stroke="#F1F5F9" strokeWidth="5.5" strokeLinecap="round" className="animate-bounce"/>
              <circle cx="5" cy="48" r="3.5" fill="#CBD5E1" className="animate-bounce"/>
              <path d="M4,55 Q1,60 4,65" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
<path d="M4,41 Q1,36 4,31" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
            </g>
          </g>
        )}

        {/* --- PLACAS DE ORIENTAÇÃO DE DESTINO (IND-1 a IND-9 em Azul) --- */}
        {type === 'IND-1' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="38" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Lapa</text>
            <text x="50" y="69" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Zona Oeste</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-2' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="38" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">B. Ouro Preto</text>
            <text x="50" y="69" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Regional Pampulha</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-3' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="20" width="92" height="60" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="24" width="84" height="52" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="56" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Boqueirão</text>
            <circle cx="50" cy="12" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="88" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-4' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="20" width="92" height="60" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="24" width="84" height="52" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="56" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Av. Navegantes</text>
            <circle cx="50" cy="12" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="88" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-5' && (
          <g filter="url(#plateShadow)">
            <rect x="25" y="10" width="50" height="80" rx="6" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="29" y="14" width="42" height="72" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="38" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">km</text>
            <text x="50" y="68" fill="#FFFFFF" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">321</text>
            <circle cx="50" cy="5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="95" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-6' && (
          <g filter="url(#plateShadow)">
            <rect x="25" y="10" width="50" height="80" rx="6" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="29" y="14" width="42" height="72" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="29" y1="36" x2="71" y2="36" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="28" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">NORTE</text>
            <text x="50" y="54" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">km</text>
            <text x="50" y="74" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">77</text>
            <circle cx="50" cy="5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="95" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-7' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="38" x2="92" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="30" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LIMITE DE MUNICÍPIOS</text>
            <text x="50" y="53" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Recife</text>
            <text x="50" y="71" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Jaboatão dos Guararapes</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-8' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="38" x2="92" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="30" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DIVISA DE ESTADOS</text>
            <text x="50" y="53" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Mato Grosso</text>
            <text x="50" y="71" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Mato Grosso do Sul</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-9' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#blueGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="38" x2="92" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="30" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PERÍMETRO URBANO</text>
            <text x="50" y="62" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Porto Alegre</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {/* --- PLACAS DE ORIENTAÇÃO DE DESTINO (IND-10 a IND-17 em Verde) --- */}
        {type === 'IND-10' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="14" y="38" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">CEAGESP</text>
            <path d="M78,35 L86,27 M86,27 L80,27 M86,27 L86,33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18,66 L18,78 M18,66 L14,70 M18,66 L22,70" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="28" y="76" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Inst. Butantã</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-11' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <path d="M5,50 L95,50 L95,77 A8,8 0 0 1 87,85 L13,85 A8,8 0 0 1 5,77 Z" fill="url(#blueGrad)" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="14" y="38" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Zona Leste</text>
            <path d="M78,35 L86,27 M86,27 L80,27 M86,27 L86,33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="58" width="22" height="16" rx="3" fill="#FFFFFF" />
            <rect x="15" y="59" width="20" height="14" rx="2" fill="url(#blueGrad)" />
            <text x="25" y="69" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">BR-116</text>
            <text x="42" y="70" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Dutra</text>
            <path d="M78,65 L86,73 M86,73 L80,73 M86,73 L86,67" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-12' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="8" y1="50" x2="92" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M22,32 L14,32 M14,32 L18,28 M14,32 L18,36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="30" y="36" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">São Luís</text>
            <text x="14" y="70" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Teresina</text>
            <path d="M78,68 L86,68 M86,68 L82,64 M86,68 L82,72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-13' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="20" width="92" height="60" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="24" width="84" height="52" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="12" y="55" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Retorno</text>
            <path d="M74,52 L84,42 M84,42 L78,42 M84,42 L84,48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="12" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="88" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-14' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M20,74 L20,30" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M20,30 L16,36 M20,30 L24,36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20,54 Q20,44 36,44 L42,44" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M42,44 L36,40 M42,44 L36,48" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="52" y="35" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Goiânia</text>
            <text x="52" y="68" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Retorno</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-15' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M22,35 L14,27 M14,27 L20,27 M14,27 L14,33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="28" y="34" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Zona Oeste</text>
            <line x1="8" y1="46" x2="92" y2="46" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M18,60 L18,78 M18,60 L14,64 M18,60 L22,64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="28" y="62" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Centro</text>
            <text x="28" y="76" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Zona Norte</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-16' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="12" y="36" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Vassouras</text>
            <text x="88" y="36" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">5 km</text>
            <text x="12" y="56" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Paraíba do Sul</text>
            <text x="88" y="56" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">57 km</text>
            <text x="12" y="76" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Três Rios</text>
            <text x="88" y="76" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">64 km</text>
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {type === 'IND-17' && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="15" width="92" height="70" rx="8" fill="url(#greenGrad)" stroke="url(#metalBorderGrad)" strokeWidth="3" />
            <rect x="8" y="19" width="84" height="62" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="12" y="32" fill="#FFFFFF" fontSize="5.8" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Florianópolis</text>
            <text x="82" y="32" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">7</text>
            <line x1="8" y1="42" x2="92" y2="42" stroke="#FFFFFF" strokeWidth="1" />
            <text x="12" y="55" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">São José</text>
            <text x="70" y="55" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">6</text>
            <path d="M78,52 L86,52 M86,52 L82,48 M86,52 L82,56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="8" y1="65" x2="92" y2="65" stroke="#FFFFFF" strokeWidth="1" />
            <text x="12" y="78" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">Palhoça</text>
            <text x="70" y="78" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">14</text>
            <path d="M78,75 L86,75 M86,75 L82,71 M86,75 L82,79" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="9.5" r="2" fill="url(#blackGrad)" />
            <circle cx="50" cy="90.5" r="2" fill="url(#blackGrad)" />
          </g>
        )}

        {/* --- PLACAS EDUCATIVAS (ED-1 a ED-11 em Branco/Preto) --- */}
        {isEducational && (
          <g filter="url(#plateShadow)">
            <rect x="4" y="20" width="92" height="60" rx="6" fill="url(#whiteGrad)" stroke="url(#metalBorderGrad)" strokeWidth="2.5" />
            <rect x="8" y="24" width="84" height="52" rx="4" fill="none" stroke="#000000" strokeWidth="1.5" />
            <rect x="10" y="26" width="80" height="48" rx="3" fill="none" stroke="#000000" strokeWidth="0.8" />
            <circle cx="2" cy="50" r="1.5" fill="url(#blackGrad)" />
            <circle cx="98" cy="50" r="1.5" fill="url(#blackGrad)" />

            {/* Render conditional texts inside educational borders */}
            {type === 'ED-1' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">USE O CINTO</text>
                <text x="50" y="60">DE SEGURANÇA</text>
              </g>
            )}

            {type === 'ED-2' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">OBEDEÇA A</text>
                <text x="50" y="60">SINALIZAÇÃO</text>
              </g>
            )}

            {type === 'ED-3' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">SÓ ULTRAPASSE</text>
                <text x="50" y="60">COM SEGURANÇA</text>
              </g>
            )}

            {type === 'ED-4' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">PARE FORA</text>
                <text x="50" y="60">DA PISTA</text>
              </g>
            )}

            {type === 'ED-5' && (
              <g fill="#000000" fontSize="6.8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="40">ULTRAPASSE</text>
                <text x="50" y="52">SOMENTE</text>
                <text x="50" y="64">PELA ESQUERDA</text>
              </g>
            )}

            {type === 'ED-6' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">LONGO TRECHO</text>
                <text x="50" y="60">EM DECLIVE</text>
              </g>
            )}

            {type === 'ED-7' && (
              <g fill="#000000" fontSize="6.8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="40">LUZ BAIXA</text>
                <text x="50" y="52">AO CRUZAR</text>
                <text x="50" y="64">VEÍCULOS</text>
              </g>
            )}

            {type === 'ED-8' && (
              <g fill="#000000" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">NÃO ULTRAPASSE</text>
                <text x="50" y="60">COM FAIXA CONTÍNUA</text>
              </g>
            )}

            {type === 'ED-9' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">SOB NEBLINA</text>
                <text x="50" y="60">USE LUZ BAIXA</text>
              </g>
            )}

            {type === 'ED-10' && (
              <g fill="#000000" fontSize="6.8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="40">SOB NEBLINA</text>
                <text x="50" y="52">REDUZA</text>
                <text x="50" y="64">VELOCIDADE</text>
              </g>
            )}

            {type === 'ED-11' && (
              <g fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                <text x="50" y="46">VERIFIQUE</text>
                <text x="50" y="60">OS FREIOS</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

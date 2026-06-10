export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string; // Specialist explanation
  category: 'Legislação' | 'Direção Defensiva' | 'Sinalização' | 'Primeiros Socorros' | 'Meio Ambiente & Cidadania' | 'Mecânica Básica';
}

export type SignCategory = 
  | 'regulamentacao' // R-1, R-2, etc.
  | 'advertencia' // A-1, A-2, etc.
  | 'indicacao' // Servicos, etc.
  | 'educativa' // Educational signs
  | 'servicos' // Auxiliary services
  | 'turismo' // Tourist attractions
  | 'obras' // Construction/roadwork signs
  | 'horizontal' // Horizontal road markings
  | 'luminosos' // Traffic lights
  | 'buzinas' // Horn signals
  | 'horizontais' // Road lanes
  | 'verticais_outros' // More signs
  | 'gestos'; // Hand gestures

export interface TrafficSign {
  id: string;
  name: string;
  code?: string;
  description: string;
  category: SignCategory;
  svgType: 
    | 'stop' 
    | 'yield' 
    | 'prohibited' 
    | 'speed_limit' 
    | 'warning_curve' 
    | 'warning_pedestrian' 
    | 'warning_traffic_light' 
    | 'indicator_service' 
    | 'light_regular' 
    | 'light_pedestrian' 
    | 'horn_short' 
    | 'horn_long' 
    | 'line_continuous' 
    | 'line_broken' 
    | 'line_double' 
    | 'gest_agent_stop' 
    | 'gest_driver_left' 
    | 'gest_driver_right' 
    | 'gest_driver_slow'
    | 'prohibited_turn_left'
    | 'prohibited_turn_right'
    | 'prohibited_u_turn'
    | 'prohibited_parking'
    | 'prohibited_stopping'
    | 'prohibited_overtaking'
    | 'prohibited_bikes'
    | 'double_way'
    | 'speed_min'
    | 'warning_curve_moderate'
    | 'warning_works'
    | 'warning_school'
    | 'warning_barrier'
    | 'warning_slippery'
    | 'warning_bump'
    | 'R-1' | 'R-2' | 'R-3' | 'R-4a' | 'R-4b' | 'R-5a' | 'R-5b' | 'R-6a' | 'R-6b' | 'R-6c' 
    | 'R-7' | 'R-8a' | 'R-8b' | 'R-9' | 'R-10' | 'R-11' | 'R-12' | 'R-13' | 'R-14' | 'R-15' 
    | 'R-16' | 'R-17' | 'R-18' | 'R-19' | 'R-20' | 'R-21' | 'R-22' | 'R-23' | 'R-24a' | 'R-24b' 
    | 'R-25a' | 'R-25b' | 'R-25c' | 'R-25d' | 'R-26' | 'R-27' | 'R-28' | 'R-29' | 'R-30' | 'R-31' 
    | 'R-32' | 'R-33' | 'R-34' | 'R-35a' | 'R-35b' | 'R-36a' | 'R-36b' | 'R-36c' | 'R-37' | 'R-38' 
    | 'R-39' | 'R-40' | 'R-41' | 'R-42a' | 'R-42b' | 'R-43a' | 'R-43b'
    | 'A-1a' | 'A-1b' | 'A-2a' | 'A-2b' | 'A-3a' | 'A-3b' | 'A-4a' | 'A-4b' | 'A-5a' | 'A-5b'
    | 'A-6' | 'A-7a' | 'A-7b' | 'A-8' | 'A-9' | 'A-10a' | 'A-10b' | 'A-11a' | 'A-11b' | 'A-12'
    | 'A-13a' | 'A-13b' | 'A-14' | 'A-15' | 'A-16' | 'A-17' | 'A-18' | 'A-19' | 'A-20a' | 'A-20b'
    | 'A-21a' | 'A-21b' | 'A-21c' | 'A-21d' | 'A-21e' | 'A-22' | 'A-23' | 'A-24' | 'A-25' | 'A-26a'
    | 'A-26b' | 'A-27' | 'A-28' | 'A-29' | 'A-30a' | 'A-30b' | 'A-30c' | 'A-31' | 'A-32a' | 'A-32b'
    | 'A-33a' | 'A-33b' | 'A-34' | 'A-35' | 'A-36' | 'A-37' | 'A-38' | 'A-39' | 'A-40' | 'A-41'
    | 'A-42a' | 'A-42b' | 'A-42c' | 'A-43' | 'A-44' | 'A-45' | 'A-46' | 'A-47' | 'A-48'
    | 'IND-1' | 'IND-2' | 'IND-3' | 'IND-4' | 'IND-5' | 'IND-6' | 'IND-7' | 'IND-8' | 'IND-9' 
    | 'IND-10' | 'IND-11' | 'IND-12' | 'IND-13' | 'IND-14' | 'IND-15' | 'IND-16' | 'IND-17'
    | 'ED-1' | 'ED-2' | 'ED-3' | 'ED-4' | 'ED-5' | 'ED-6' | 'ED-7' | 'ED-8' | 'ED-9' | 'ED-10' | 'ED-11'
    | 'S-1' | 'S-2' | 'S-3' | 'S-4' | 'S-5' | 'S-6' | 'S-7' | 'S-8' | 'S-9' | 'S-10' | 'S-11' | 'S-12' | 'S-14' | 'S-15'
    | 'TUR-1' | 'TUR-2' | 'TUR-3' | 'TUR-4' | 'TUR-5' | 'TUR-6'
    | 'OBR-1' | 'OBR-2' | 'OBR-3' | 'OBR-4' | 'OBR-5' | 'OBR-6' | 'OBR-7' | 'OBR-8'
    | 'OBR-9' | 'OBR-10' | 'OBR-11' | 'OBR-12' | 'OBR-13' | 'OBR-14' | 'OBR-15' | 'OBR-16'
    | 'OBR-D1' | 'OBR-D2' | 'OBR-D3'
    | 'MH-AMA' | 'MH-BRA' | 'MH-VRM' | 'MH-AZL' | 'MH-PRT';
  extraData?: string; // Limit speed, toque count, description of gestures
}

export interface ExamHistory {
  id: string;
  date: string;
  correctCount: number;
  totalQuestions: number;
  scorePercentage: number;
  durationSeconds: number;
  passed: boolean;
  questionIds?: number[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  iconName: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirementType: 'first_exam' | 'perfect_exam' | 'game_score' | 'study_all' | 'level_3' | 'category_change';
}

export interface UserProfile {
  name: string;
  category: 'Primeira Habilitação (A)' | 'Primeira Habilitação (B)' | 'Primeira Habilitação (A+B)' | 'Mudança C para D' | 'Mudança D para E';
  level: number;
  xp: number;
  xpNeededForNextLevel: number;
  totalExamsCompleted: number;
  highScoreGame: number;
  achievements: Achievement[];
  examHistory: ExamHistory[];
  isOffline: boolean;
}

export interface RankingItem {
  name: string;
  xp: number;
  level: number;
  category: string;
  isCurrentUser?: boolean;
}

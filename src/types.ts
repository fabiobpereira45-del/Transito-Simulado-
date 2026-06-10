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
    | 'R-39' | 'R-40' | 'R-41' | 'R-42a' | 'R-42b' | 'R-43a' | 'R-43b';
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

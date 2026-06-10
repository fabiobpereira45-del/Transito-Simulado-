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
  svgType: 'stop' | 'yield' | 'prohibited' | 'speed_limit' | 'warning_curve' | 'warning_pedestrian' | 'warning_traffic_light' | 'indicator_service' | 'light_regular' | 'light_pedestrian' | 'horn_short' | 'horn_long' | 'line_continuous' | 'line_broken' | 'line_double' | 'gest_agent_stop' | 'gest_driver_left' | 'gest_driver_right' | 'gest_driver_slow';
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

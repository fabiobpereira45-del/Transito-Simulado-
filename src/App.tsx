import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Wifi, 
  WifiOff, 
  Award, 
  Calendar, 
  Clock, 
  Play, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Settings,
  X,
  User,
  Flame,
  CheckCircle,
  PlusCircle,
  Home,
  Check
} from 'lucide-react';

import { UserProfile, ExamHistory, Achievement } from './types';
import { ExamSimulator } from './components/ExamSimulator';
import { MemorizationGame } from './components/MemorizationGame';
import { StudyReference } from './components/StudyReference';
import { RankingBoard } from './components/RankingBoard';
import { Tutorial } from './components/Tutorial';
import { supabase } from './lib/supabase';
import { AuthModal } from './components/AuthModal';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_exam',
    title: 'Partida Inicial',
    description: 'Completou com sucesso o seu primeiro simulado teórico do DETRAN.',
    xpReward: 120,
    iconName: 'book',
    isUnlocked: false,
    requirementType: 'first_exam'
  },
  {
    id: 'perfect_exam',
    title: 'Gabarito de Ouro',
    description: 'Alcançou 100% de aproveitamento correto em qualquer simulado.',
    xpReward: 300,
    iconName: 'award',
    isUnlocked: false,
    requirementType: 'perfect_exam'
  },
  {
    id: 'game_score',
    title: 'Piloto de Reflexos',
    description: 'Ultrapassou a marca de 1.000 pontos no Mini-Game de Memorização.',
    xpReward: 180,
    iconName: 'zap',
    isUnlocked: false,
    requirementType: 'game_score'
  },
  {
    id: 'study_all',
    title: 'Enciclopédia de Trânsito',
    description: 'Estudou a fundo os detalhes práticos de 5 ou mais sinalizações diferentes.',
    xpReward: 90,
    iconName: 'sign',
    isUnlocked: false,
    requirementType: 'study_all'
  },
  {
    id: 'level_3',
    title: 'Condutor Exemplar',
    description: 'Alcançou o nível de evolução de aprendizagem de Grau 3.',
    xpReward: 200,
    iconName: 'trending',
    isUnlocked: false,
    requirementType: 'level_3'
  }
];

export default function App() {
  // Navigation: 'dashboard' | 'simulator' | 'game' | 'reference' | 'ranking'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // User Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "Aluno Provisório",
    category: "Primeira Habilitação (A+B)",
    level: 1,
    xp: 0,
    xpNeededForNextLevel: 600,
    totalExamsCompleted: 0,
    highScoreGame: 0,
    achievements: DEFAULT_ACHIEVEMENTS,
    examHistory: [],
    isOffline: false
  });

  // Interactive controls
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');
  const [tempCategory, setTempCategory] = useState<UserProfile['category']>("Primeira Habilitação (A+B)");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Micro animations notifications triggers
  const [congratulationsNotification, setCongratulationsNotification] = useState<string | null>(null);
  const [unlockedAchievementPop, setUnlockedAchievementPop] = useState<Achievement | null>(null);
  const [reviewedSignsCount, setReviewedSignsCount] = useState<number>(0);

  // Supabase state
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Sync profile data to Supabase
  const syncProfileToSupabase = async (p: UserProfile, userId: string = sessionUser?.id) => {
    if (!userId) return;
    try {
      // 1. Upsert profile
      const { error: profileErr } = await supabase.from('profiles').upsert({
        id: userId,
        name: p.name,
        category: p.category,
        level: p.level,
        xp: p.xp,
        xp_needed_for_next_level: p.xpNeededForNextLevel,
        total_exams_completed: p.totalExamsCompleted,
        high_score_game: p.highScoreGame,
        updated_at: new Date().toISOString()
      });

      if (profileErr) {
        console.error('Erro ao salvar perfil no Supabase:', profileErr);
      }

      // 2. Batch upsert exam history
      if (p.examHistory && p.examHistory.length > 0) {
        const historyRecords = p.examHistory.map(h => ({
          id: h.id,
          user_id: userId,
          date: h.date,
          correct_count: h.correctCount,
          total_questions: h.totalQuestions,
          score_percentage: h.scorePercentage,
          duration_seconds: h.durationSeconds,
          passed: h.passed
        }));

        const { error: historyErr } = await supabase
          .from('exam_history')
          .upsert(historyRecords);

        if (historyErr) {
          console.error('Erro ao salvar histórico de exames no Supabase:', historyErr);
        }
      }

      // 3. Batch upsert achievements
      const unlockedAchs = p.achievements.filter(ach => ach.isUnlocked);
      if (unlockedAchs.length > 0) {
        const achRecords = unlockedAchs.map(ach => ({
          user_id: userId,
          achievement_id: ach.id,
          unlocked_at: ach.unlockedAt || new Date().toLocaleDateString('pt-BR')
        }));

        const { error: achErr } = await supabase
          .from('unlocked_achievements')
          .upsert(achRecords);

        if (achErr) {
          console.error('Erro ao salvar conquistas no Supabase:', achErr);
        }
      }
    } catch (err) {
      console.error('Erro ao sincronizar com Supabase:', err);
    }
  };

  // Fetch and sync profile from Supabase on login
  const fetchAndSyncProfile = async (user: any) => {
    try {
      const { data: dbProfile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileErr && profileErr.code !== 'PGRST116') {
        console.error('Erro ao buscar perfil:', profileErr);
        return;
      }

      const { data: dbHistory, error: historyErr } = await supabase
        .from('exam_history')
        .select('*')
        .eq('user_id', user.id);

      if (historyErr) {
        console.error('Erro ao buscar histórico:', historyErr);
      }

      const { data: dbAchievements, error: achievementsErr } = await supabase
        .from('unlocked_achievements')
        .select('*')
        .eq('user_id', user.id);

      if (achievementsErr) {
        console.error('Erro ao buscar conquistas:', achievementsErr);
      }

      const localSaved = localStorage.getItem('cnh_smart_user_profile_v2');
      let localProfile: UserProfile | null = null;
      if (localSaved) {
        try {
          localProfile = JSON.parse(localSaved);
        } catch (e) {
          console.error(e);
        }
      }

      let mergedName = user.user_metadata?.name || 'Aluno Provisório';
      let mergedCategory = user.user_metadata?.category || 'Primeira Habilitação (A+B)';
      let mergedLevel = 1;
      let mergedXp = 0;
      let mergedXpNeeded = 600;
      let mergedTotalExams = 0;
      let mergedHighScore = 0;

      const dbXpVal = dbProfile?.xp || 0;
      const dbLvlVal = dbProfile?.level || 1;
      const dbTotalXp = (dbLvlVal - 1) * 600 + dbXpVal;

      const localXpVal = localProfile?.xp || 0;
      const localLvlVal = localProfile?.level || 1;
      const localTotalXp = (localLvlVal - 1) * 600 + localXpVal;

      if (localProfile && localTotalXp > dbTotalXp) {
        mergedName = localProfile.name;
        mergedCategory = localProfile.category;
        mergedLevel = localProfile.level;
        mergedXp = localProfile.xp;
        mergedXpNeeded = localProfile.xpNeededForNextLevel;
        mergedTotalExams = localProfile.totalExamsCompleted;
        mergedHighScore = localProfile.highScoreGame;
      } else if (dbProfile) {
        mergedName = dbProfile.name || mergedName;
        mergedCategory = dbProfile.category || mergedCategory;
        mergedLevel = dbProfile.level;
        mergedXp = dbProfile.xp;
        mergedXpNeeded = dbProfile.xp_needed_for_next_level;
        mergedTotalExams = dbProfile.total_exams_completed;
        mergedHighScore = dbProfile.high_score_game;
      } else if (localProfile) {
        mergedName = localProfile.name;
        mergedCategory = localProfile.category;
        mergedLevel = localProfile.level;
        mergedXp = localProfile.xp;
        mergedXpNeeded = localProfile.xpNeededForNextLevel;
        mergedTotalExams = localProfile.totalExamsCompleted;
        mergedHighScore = localProfile.highScoreGame;
      }

      const historyMap = new Map<string, ExamHistory>();
      if (localProfile?.examHistory) {
        localProfile.examHistory.forEach(h => historyMap.set(h.id, h));
      }
      if (dbHistory) {
        dbHistory.forEach(h => {
          historyMap.set(h.id, {
            id: h.id,
            date: h.date,
            correctCount: h.correct_count,
            totalQuestions: h.total_questions,
            scorePercentage: h.score_percentage,
            durationSeconds: h.duration_seconds,
            passed: h.passed
          });
        });
      }
      const mergedHistory = Array.from(historyMap.values()).sort((a, b) => b.date.localeCompare(a.date));

      const unlockedDbIds = new Set<string>();
      if (dbAchievements) {
        dbAchievements.forEach(a => unlockedDbIds.add(a.achievement_id));
      }

      const mergedAchievements = DEFAULT_ACHIEVEMENTS.map(ach => {
        let isUnlocked = ach.isUnlocked;
        let unlockedAt = ach.unlockedAt;

        const localAch = localProfile?.achievements?.find(la => la.id === ach.id);
        if (localAch?.isUnlocked) {
          isUnlocked = true;
          unlockedAt = localAch.unlockedAt;
        }

        if (unlockedDbIds.has(ach.id)) {
          isUnlocked = true;
          const dbAch = dbAchievements?.find(da => da.achievement_id === ach.id);
          if (dbAch) {
            unlockedAt = dbAch.unlocked_at;
          }
        }

        return {
          ...ach,
          isUnlocked,
          unlockedAt
        };
      });

      const updatedProfile: UserProfile = {
        name: mergedName,
        category: mergedCategory as any,
        level: mergedLevel,
        xp: mergedXp,
        xpNeededForNextLevel: mergedXpNeeded,
        totalExamsCompleted: mergedTotalExams,
        highScoreGame: mergedHighScore,
        achievements: mergedAchievements,
        examHistory: mergedHistory,
        isOffline: false
      };

      setProfile(updatedProfile);
      localStorage.setItem('cnh_smart_user_profile_v2', JSON.stringify(updatedProfile));

      // Sync back to database to make sure they are fully matched
      await syncProfileToSupabase(updatedProfile, user.id);
    } catch (err) {
      console.error('Erro ao sincronizar com Supabase:', err);
    }
  };

  // Load profile from localStorage on boot & setup auth listener
  useEffect(() => {
    // 1. Initial load from localstorage
    const saved = localStorage.getItem('cnh_smart_user_profile_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.achievements || parsed.achievements.length === 0) {
          parsed.achievements = DEFAULT_ACHIEVEMENTS;
        }
        setProfile(parsed);
      } catch (e) {
        console.error("Local storage corrompido, resetando ao padrão", e);
      }
    } else {
      setTimeout(() => {
        setIsTutorialOpen(true);
      }, 1200);
    }

    // 2. Setup Supabase Auth Subscription
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionUser(session.user);
        fetchAndSyncProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSessionUser(session.user);
        fetchAndSyncProfile(session.user);
      } else {
        setSessionUser(null);
        // Reload from localstorage on logout to reset
        const localSaved = localStorage.getItem('cnh_smart_user_profile_v2');
        if (localSaved) {
          try {
            setProfile(JSON.parse(localSaved));
          } catch (e) {
            console.error(e);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync state to localStorage whenever profile changes
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('cnh_smart_user_profile_v2', JSON.stringify(newProfile));
    
    // Asynchronously push to Supabase if logged in and not in offline mode
    if (sessionUser && !newProfile.isOffline) {
      syncProfileToSupabase(newProfile);
    }
  };

  // Helper level-up engine
  const addXp = (amount: number, currentProfile: UserProfile): UserProfile => {
    let newXp = currentProfile.xp + amount;
    let newLvl = currentProfile.level;
    let needed = currentProfile.xpNeededForNextLevel;
    let leveledUp = false;

    while (newXp >= needed) {
      newXp -= needed;
      newLvl += 1;
      needed = newLvl * 600; // Level 2: 1200XP, Level 3: 1800XP
      leveledUp = true;
    }

    let updatedAchievements = [...currentProfile.achievements];
    // Check level 3 achievement trigger
    if (newLvl >= 3) {
      const idx = updatedAchievements.findIndex(a => a.id === 'level_3');
      if (idx !== -1 && !updatedAchievements[idx].isUnlocked) {
        updatedAchievements[idx].isUnlocked = true;
        updatedAchievements[idx].unlockedAt = new Date().toLocaleDateString('pt-BR');
        // schedule unlock notification popup
        setUnlockedAchievementPop(updatedAchievements[idx]);
        newXp += updatedAchievements[idx].xpReward; // auto add reward
      }
    }

    if (leveledUp) {
      setCongratulationsNotification(`Parabéns! Subiu de Nível! Você alcançou o Nível de Estudos ${newLvl}!`);
    }

    return {
      ...currentProfile,
      xp: newXp,
      level: newLvl,
      xpNeededForNextLevel: needed,
      achievements: updatedAchievements
    };
  };

  // Triggered when any driving simulation finishes
  const handleExamCompleted = (result: ExamHistory, xpEarned: number) => {
    let updatedHistory = [result, ...profile.examHistory];
    let totalExams = profile.totalExamsCompleted + 1;
    let updatedAchievements = [...profile.achievements];

    // Evaluate first test achievement
    const testIdx = updatedAchievements.findIndex(a => a.id === 'first_exam');
    if (testIdx !== -1 && !updatedAchievements[testIdx].isUnlocked) {
      updatedAchievements[testIdx].isUnlocked = true;
      updatedAchievements[testIdx].unlockedAt = new Date().toLocaleDateString('pt-BR');
      setUnlockedAchievementPop(updatedAchievements[testIdx]);
      xpEarned += updatedAchievements[testIdx].xpReward;
    }

    // Evaluate perfect test achievement
    if (result.scorePercentage === 100) {
      const perfIdx = updatedAchievements.findIndex(a => a.id === 'perfect_exam');
      if (perfIdx !== -1 && !updatedAchievements[perfIdx].isUnlocked) {
        updatedAchievements[perfIdx].isUnlocked = true;
        updatedAchievements[perfIdx].unlockedAt = new Date().toLocaleDateString('pt-BR');
        setUnlockedAchievementPop(updatedAchievements[perfIdx]);
        xpEarned += updatedAchievements[perfIdx].xpReward;
      }
    }

    const intermediateProfile = {
      ...profile,
      totalExamsCompleted: totalExams,
      examHistory: updatedHistory,
      achievements: updatedAchievements
    };

    const finalProfile = addXp(xpEarned, intermediateProfile);
    saveProfile(finalProfile);
  };

  // Triggered when memorization speed game finishes
  const handleGameScoreCompleted = (gameScore: number, xpEarned: number) => {
    let newHighScore = Math.max(gameScore, profile.highScoreGame);
    let updatedAchievements = [...profile.achievements];

    // Evaluate high score game achievement
    if (gameScore >= 1000) {
      const idx = updatedAchievements.findIndex(a => a.id === 'game_score');
      if (idx !== -1 && !updatedAchievements[idx].isUnlocked) {
        updatedAchievements[idx].isUnlocked = true;
        updatedAchievements[idx].unlockedAt = new Date().toLocaleDateString('pt-BR');
        setUnlockedAchievementPop(updatedAchievements[idx]);
        xpEarned += updatedAchievements[idx].xpReward;
      }
    }

    const intermediateProfile = {
      ...profile,
      highScoreGame: newHighScore,
      achievements: updatedAchievements
    };

    const finalProfile = addXp(xpEarned, intermediateProfile);
    saveProfile(finalProfile);
  };

  // Triggered when user views detailed plaque cards
  const handleSignReviewed = () => {
    const nextCount = reviewedSignsCount + 1;
    setReviewedSignsCount(nextCount);

    // Dynamic sign study achievement (requires looking at >= 5 signs)
    if (nextCount === 5) {
      let updatedAchievements = [...profile.achievements];
      const idx = updatedAchievements.findIndex(a => a.id === 'study_all');
      if (idx !== -1 && !updatedAchievements[idx].isUnlocked) {
        updatedAchievements[idx].isUnlocked = true;
        updatedAchievements[idx].unlockedAt = new Date().toLocaleDateString('pt-BR');
        setUnlockedAchievementPop(updatedAchievements[idx]);
        
        const finalProfile = addXp(updatedAchievements[idx].xpReward + 15, {
          ...profile,
          achievements: updatedAchievements
        });
        saveProfile(finalProfile);
        return;
      }
    }

    // Small incremental engagement score (5 XP per sign click, up to 100 total)
    if (nextCount <= 20) {
      const finalProfile = addXp(8, profile);
      saveProfile(finalProfile);
    }
  };

  // Toggle offline simulator mode
  const handleToggleOffline = () => {
    const isNowOffline = !profile.isOffline;
    const finalProfile = {
      ...profile,
      isOffline: isNowOffline
    };
    saveProfile(finalProfile);

    if (isNowOffline) {
      setCongratulationsNotification("Modo Prática Offline Ativado! Conexão de rede local estabelecida.");
    } else {
      setCongratulationsNotification("Modo Online Restaurado! Dados de carreira sincronizados.");
    }
  };

  // Save changes from Edit Profile Modal
  const handleSaveProfileChanges = () => {
    const hadCategoryChange = profile.category !== tempCategory;
    
    const finalProfile = {
      ...profile,
      name: tempName.trim() === '' ? profile.name : tempName,
      category: tempCategory
    };

    saveProfile(finalProfile);
    setIsEditProfileOpen(false);

    if (hadCategoryChange) {
      setCongratulationsNotification(`Nova Categoria Selecionada: ${tempCategory}! Prepare-se para novos desafios.`);
    }
  };

  // Triggers open editor modal
  const openEditProfileModal = () => {
    setTempName(profile.name);
    setTempCategory(profile.category);
    setIsEditProfileOpen(true);
  };

  // Level progress percentage helper
  const levelProgressPct = (profile.xp / profile.xpNeededForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-300 selection:text-indigo-900" id="application-container">
      
      {/* --- TOP HEADER NAVIGATION NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-slate-100 backdrop-blur-md dark:bg-slate-900/95 dark:border-slate-850 px-4 sm:px-6 py-3 shadow-sm" id="main-navigation-navbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between" id="header-row">
          
          {/* Logo with Traffic visual cues */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-2.5 text-left border-none bg-transparent cursor-pointer"
            id="logo-brand-block"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-100 dark:shadow-none" id="logo-icon">
              <span>🛞</span>
            </div>
            <div>
              <span className="text-sm font-black text-slate-800 dark:text-white tracking-tight uppercase block leading-none"> AutoEscola Smart</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold tracking-widest block mt-0.5 font-mono uppercase">Especialista CTB</span>
            </div>
          </button>

          {/* Center desktop tabs */}
          <div className="hidden lg:flex items-center space-x-1" id="desktop-tabs-wrapper">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
              id="tab-btn-dashboard"
            >
              <Home className="w-4 h-4" />
              <span>Painel do Aluno</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${activeTab === 'simulator' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              id="tab-btn-simulator"
            >
              <BookOpen className="w-4 h-4" />
              <span>Simular Prova</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${activeTab === 'game' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              id="tab-btn-game"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Memorizar Placas</span>
            </button>
            <button
              onClick={() => setActiveTab('reference')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${activeTab === 'reference' ? 'bg-purple-100/40 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              id="tab-btn-reference"
            >
              <Award className="w-4 h-4" />
              <span>Central Sinais</span>
            </button>
            <button
              onClick={() => setActiveTab('ranking')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 ${activeTab === 'ranking' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              id="tab-btn-ranking"
            >
              <Trophy className="w-4 h-4" />
              <span>Ranking Mensal</span>
            </button>
          </div>

          {/* Right actions widget */}
          <div className="flex items-center space-x-3" id="navbar-actions">
            
            {/* SUPABASE AUTHENTICATION STATUS */}
            {sessionUser ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setCongratulationsNotification("Desconectado do Supabase. Progresso salvo localmente.");
                }}
                className="p-2 bg-indigo-50 border border-indigo-150 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-all text-xs font-bold flex items-center space-x-1.5"
                title={`Conectado como ${sessionUser.email}. Clique para desconectar.`}
                id="btn-supabase-logout"
              >
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden md:inline">Sair ({profile.name.split(' ')[0]})</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-100/40 dark:shadow-none"
                title="Sincronizar progresso na nuvem com Supabase"
                id="btn-supabase-login"
              >
                <Lock className="w-4 h-4" />
                <span>Entrar</span>
              </button>
            )}

            {/* OFFLINE TOGGLER - REQUERIMENTO DO USUÁRIO */}
            <button
              onClick={handleToggleOffline}
              className={`p-2 rounded-xl flex items-center space-x-1.5 transition-all text-xs font-bold border ${profile.isOffline ? 'bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900/40' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}`}
              title={profile.isOffline ? "Praticando sem gastar internet" : "Modo Online ativo"}
              id="btn-toggle-offline-status"
            >
              {profile.isOffline ? <WifiOff className="w-4 h-4 text-sky-500" /> : <Wifi className="w-4 h-4 text-emerald-500" />}
              <span className="hidden md:inline">{profile.isOffline ? 'Praticar Offline' : 'Deseja Offline'}</span>
            </button>

            {/* Help/Tutorial manual button */}
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition"
              title="Apresentar Tutorial Passo-a-Passo"
              id="btn-trigger-onboarding-tut"
            >
              <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
            </button>

            {/* Mobile hamburger toggle (target touch size > 44px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl hover:bg-slate-105 transition flex items-center justify-center min-w-[44px] min-h-[44px]"
              title="Abrir Menu de Guias"
              id="btn-hamburger-menu"
            >
              <span>☰</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- RESPONSIVE MOBILE NAVIGATION DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 border-b border-indigo-50 dark:bg-slate-900/95 dark:border-slate-850 flex flex-col p-4 space-y-2 z-30 sticky top-[65px] h-auto shadow-inner"
            id="mobile-drawer-menu"
          >
            <button
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-left font-bold text-xs flex items-center space-x-2 ${activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              id="btn-mobile-tab-dashboard"
            >
              <Home className="w-4 h-4 text-indigo-500" />
              <span>Painel do Aluno</span>
            </button>
            <button
              onClick={() => { setActiveTab('simulator'); setIsMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-left font-bold text-xs flex items-center space-x-2 ${activeTab === 'simulator' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20' : 'text-slate-500 hover:bg-slate-50'}`}
              id="btn-mobile-tab-simulator"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Simular Prova</span>
            </button>
            <button
              onClick={() => { setActiveTab('game'); setIsMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-left font-bold text-xs flex items-center space-x-2 ${activeTab === 'game' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20' : 'text-slate-500 hover:bg-slate-50'}`}
              id="btn-mobile-tab-game"
            >
              <Gamepad2 className="w-4 h-4 text-amber-500" />
              <span>Memorizar Placas</span>
            </button>
            <button
              onClick={() => { setActiveTab('reference'); setIsMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-left font-bold text-xs flex items-center space-x-2 ${activeTab === 'reference' ? 'bg-purple-100/40 text-purple-700 dark:bg-purple-950/20' : 'text-slate-500 hover:bg-slate-50'}`}
              id="btn-mobile-tab-reference"
            >
              <Award className="w-4 h-4 text-purple-500" />
              <span>Central Sinais</span>
            </button>
            <button
              onClick={() => { setActiveTab('ranking'); setIsMobileMenuOpen(false); }}
              className={`w-full py-2.5 px-4 rounded-xl text-left font-bold text-xs flex items-center space-x-2 ${activeTab === 'ranking' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/20' : 'text-slate-500 hover:bg-slate-50'}`}
              id="btn-mobile-tab-ranking"
            >
              <Trophy className="w-4 h-4 text-rose-500" />
              <span>Ranking Mensal</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NOTIFICATIONS POPUPS TO REPORT XP / LEVEL-UP EVENTS --- */}
      <AnimatePresence>
        {congratulationsNotification && (
          <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:w-96 z-50 pointer-events-none" id="alert-toast-notification">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-indigo-900 border border-indigo-700 text-white p-4 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-auto"
              id="inner-toast"
            >
              <div className="bg-white/10 rounded-xl p-2 text-yellow-400 animate-pulse">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div className="flex-grow">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">Nova Realização</h4>
                <p className="text-xs font-bold leading-normal mt-0.5">{congratulationsNotification}</p>
              </div>
              <button 
                onClick={() => setCongratulationsNotification(null)}
                className="p-1 text-indigo-300 hover:text-white"
                id="btn-close-toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- UNLOCKED ACHIEVEMENT CONGRATULATIONS MODAL POPUP --- */}
      <AnimatePresence>
        {unlockedAchievementPop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" id="achievement-unlocked-overlay">
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-3xl border border-indigo-150 shadow-2xl max-w-sm w-full relative text-center"
              id="achievement-unlocked-modal"
            >
              <div className="p-4 bg-yellow-400 text-yellow-950 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 font-black shadow-lg shadow-yellow-200/50 dark:shadow-none animate-bounce">
                <Trophy className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Conquista Bloqueada Anteriormente Desbloqueada!
              </span>

              <h3 className="text-xl font-black text-slate-800 dark:text-white mt-1.5 leading-none">
                {unlockedAchievementPop.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-350 text-xs sm:text-sm leading-relaxed mt-3">
                "{unlockedAchievementPop.description}"
              </p>

              {/* Reward Block */}
              <div className="my-5 bg-yellow-400/10 border border-yellow-250/20 p-3 rounded-2xl flex items-center justify-center space-x-2 text-sm font-extrabold text-indigo-700 dark:text-yellow-400" id="reward-achievement-block">
                <Sparkles className="w-4 h-4 fill-current text-yellow-500 animate-pulse" />
                <span>Prêmio instantâneo: +{unlockedAchievementPop.xpReward} XP recolhidos!</span>
              </div>

              <button
                onClick={() => setUnlockedAchievementPop(null)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl transition shadow-md shadow-indigo-100 dark:shadow-none"
                id="btn-dismiss-achievement-popup"
              >
                Esplêndido! Continuar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ACTIVE TAB SCREEN RENDERER WITH TRANSITIONS --- */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6" id="main-content-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
            id="tab-rendering-core"
          >
            
            {/* --- 1. STUDENT PERSONAL DASHBOARD --- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6" id="dashboard-tab">
                
                {/* MAIN BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="bento-grid-dashboard">
                  
                  {/* TILE 1: Exam Simulator & Career Hero Block (Primary Indigo Card) */}
                  <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-[2rem] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-lg h-[380px] group transition" id="bento-tile-simulator">
                    {/* Glowing vector background pattern */}
                    <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                      <svg width="280" height="280" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-white/15 text-white text-[10px] font-black rounded-full border border-white/20 uppercase tracking-widest font-mono">
                          Simulado Realista CPC
                        </span>
                        <div className="flex gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${profile.isOffline ? 'bg-emerald-500 text-white' : 'bg-white/10 text-indigo-200'}`}>
                            {profile.isOffline ? 'Modo Offline Ativo' : 'Sincronizado'}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none italic mt-2">
                        Simulado Realista
                      </h2>
                      <p className="text-indigo-100/90 text-xs sm:text-sm max-w-sm font-medium">
                        Prepare-se para a prova oficial teórico do DETRAN com o nosso banco analítico de leis e sinalizações.
                      </p>
                    </div>

                    {/* Pre-Exam Launch Options Inside */}
                    <div className="relative z-10 flex flex-wrap gap-2 py-3" id="quick-launcher-hub">
                      <button 
                        onClick={() => setActiveTab('simulator')}
                        className="px-4 py-2 bg-white text-indigo-700 hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-lg hover:scale-[1.03] transition duration-200"
                        id="bento-btn-quiz-30"
                      >
                        Iniciar Simulado
                      </button>
                      <button
                        onClick={() => setActiveTab('game')}
                        className="px-4 py-2 bg-indigo-5050 bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-extrabold text-xs rounded-xl border border-white/25 transition"
                        id="bento-btn-quiz-game"
                      >
                        Prática Exclusiva
                      </button>
                    </div>

                    {/* Footer: User Identity Strip with XP bar */}
                    <div className="relative z-10 border-t border-white/15 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto" id="bento-identity-bar">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg font-bold">
                          👤
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-sm font-black text-white hover:underline cursor-pointer" onClick={openEditProfileModal}>
                              {profile.name}
                            </span>
                            <Settings className="w-3.5 h-3.5 text-indigo-200 cursor-pointer hover:text-white" onClick={openEditProfileModal} />
                          </div>
                          <span className="text-[10px] text-indigo-200 font-bold block uppercase tracking-wider">{profile.category}</span>
                        </div>
                      </div>

                      {/* Micro XP metrics */}
                      <div className="text-right sm:max-w-[200px] w-full sm:w-auto" id="bento-tile-xp-metrics">
                        <div className="flex justify-between text-[10px] font-bold font-mono mb-1 text-indigo-200">
                          <span>Nível {profile.level}</span>
                          <span>{profile.xp} / {profile.xpNeededForNextLevel} XP</span>
                        </div>
                        <div className="w-full sm:w-40 bg-white/15 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${levelProgressPct}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TILE 2: Study Progress Metrics (Emerald Card) */}
                  <div className="col-span-12 md:col-span-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-[2rem] p-6 border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col justify-between h-[380px] text-slate-800 dark:text-emerald-100" id="bento-tile-analytics">
                    <div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold uppercase tracking-widest">
                        Rastreamento Geral
                      </span>
                      <h3 className="text-xl font-black mt-1 text-emerald-950 dark:text-emerald-200 italic">
                        Seu Progresso
                      </h3>
                      <p className="text-emerald-700/80 dark:text-emerald-350/80 text-[11px] font-medium mt-0.5">
                        Faltam {Math.max(0, 5 - profile.achievements.filter(a => a.isUnlocked).length)} conquistas para a graduação de Condutor Mestre.
                      </p>
                    </div>

                    {/* Progress bars matching style from design spec */}
                    <div className="space-y-4 my-4" id="bento-progress-bars">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                          <span>Legislação Geral</span>
                          <span>{Math.min(65 + profile.totalExamsCompleted * 10, 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-emerald-200/50 dark:bg-emerald-900/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all" 
                            style={{ width: `${Math.min(65 + profile.totalExamsCompleted * 10, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                          <span>Direção Defensiva</span>
                          <span>{Math.min(40 + profile.totalExamsCompleted * 8, 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-emerald-200/50 dark:bg-emerald-900/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all" 
                            style={{ width: `${Math.min(40 + profile.totalExamsCompleted * 8, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                          <span>Placas e Sinalização</span>
                          <span>{Math.min(30 + reviewedSignsCount * 14, 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-emerald-200/50 dark:bg-emerald-900/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all" 
                            style={{ width: `${Math.min(30 + reviewedSignsCount * 14, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider" id="metric-summary-footer">
                      Última atividade: Hoje • {profile.totalExamsCompleted} Simulados Realizados
                    </div>
                  </div>

                  {/* TILE 3: Knowledge Library - Signs & Game Launch (White Grid Card) */}
                  <div className="col-span-12 md:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[380px]" id="bento-tile-library">
                    <div id="bento-library-lead">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold tracking-widest uppercase mb-1 block">Estudo Rápido</span>
                          <h3 className="text-lg font-black text-slate-800 dark:text-white leading-none">Biblioteca de Sinais</h3>
                        </div>
                        <button 
                          onClick={() => setActiveTab('reference')} 
                          className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 hover:underline"
                        >
                          Ver Todos ({reviewedSignsCount} vistos)
                        </button>
                      </div>

                      {/* Sign row representations styled exactly matching design spec */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4" id="bento-library-previews">
                        
                        <div 
                          onClick={() => { setActiveTab('reference'); handleSignReviewed(); }}
                          className="bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-400 cursor-pointer flex flex-col items-center justify-center text-center transition"
                        >
                          <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center mb-2">
                            <span className="text-[8px] font-black text-white tracking-tighter">PARE</span>
                          </div>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Regulamentação</span>
                        </div>

                        <div 
                          onClick={() => { setActiveTab('reference'); handleSignReviewed(); }}
                          className="bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-400 cursor-pointer flex flex-col items-center justify-center text-center transition"
                        >
                          <div className="w-10 h-10 bg-amber-400 rotate-45 border-2 border-black/10 shadow-sm flex items-center justify-center mb-2 overflow-hidden">
                            <div className="-rotate-45 font-black text-base">↱</div>
                          </div>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Advertência</span>
                        </div>

                        <div 
                          onClick={() => { setActiveTab('reference'); handleSignReviewed(); }}
                          className="bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-400 cursor-pointer flex flex-col items-center justify-center text-center transition"
                        >
                          <div className="w-12 h-8 bg-blue-600 rounded border-2 border-white shadow-sm flex items-center justify-center mb-2">
                            <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center text-[9px] text-blue-600 font-bold italic">i</div>
                          </div>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Indicação</span>
                        </div>

                        <div 
                          onClick={() => { setActiveTab('reference'); handleSignReviewed(); }}
                          className="bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-400 cursor-pointer flex flex-col items-center justify-center text-center transition"
                        >
                          <div className="flex gap-1 mb-2">
                            <div className="w-2.5 h-7 bg-red-500 rounded-full shadow-inner animate-pulse"></div>
                            <div className="w-2.5 h-7 bg-amber-450 rounded-full shadow-inner opacity-40"></div>
                            <div className="w-2.5 h-7 bg-emerald-500 rounded-full shadow-inner opacity-40"></div>
                          </div>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">Luminosos</span>
                        </div>

                      </div>
                    </div>

                    {/* Integrated mini play game widget at bottom */}
                    <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between" id="bento-library-game-callout">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-lg">🕹️</div>
                        <div className="text-left">
                          <p className="font-bold text-xs sm:text-sm">Game de Memorização</p>
                          <p className="opacity-70 text-[10px] font-semibold">Seu recorde atual: <span className="text-amber-400 font-mono font-black">{profile.highScoreGame} pts</span></p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('game')}
                        className="px-4 py-1.5 bg-white text-slate-900 hover:bg-slate-100 text-[10px] font-black rounded-lg uppercase tracking-wider"
                      >
                        Jogar
                      </button>
                    </div>
                  </div>

                  {/* TILE 4: Competitive Rankings (White Lobe Card) */}
                  <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[380px]" id="bento-tile-leaderboard">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] text-rose-500 font-mono font-bold tracking-widest uppercase mb-1 block">Estágio Competitivo</span>
                          <h3 className="text-lg font-black text-slate-800 dark:text-white leading-none">Ranking Mensal</h3>
                        </div>
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest font-mono">DETRAN SP</span>
                      </div>

                      {/* High quality list matching style of the spec */}
                      <div className="space-y-3" id="bento-leaderboard-items">
                        
                        <div className="flex items-center justify-between p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100/40">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-black text-amber-600">1</span>
                            <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-xs flex items-center justify-center font-bold">🥇</div>
                            <span className="text-xs font-bold text-slate-850 dark:text-slate-100">Thiago Mendes</span>
                          </div>
                          <span className="text-xs font-black text-amber-700 dark:text-amber-400 font-mono">3,200 pts</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-black text-slate-400">2</span>
                            <div className="w-7 h-7 rounded-xl bg-slate-200/60 dark:bg-slate-800 text-xs flex items-center justify-center font-bold">🥈</div>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Isabela Lima</span>
                          </div>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">2,850 pts</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100/30">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-black text-indigo-600">3</span>
                            <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-xs flex items-center justify-center font-bold">👤</div>
                            <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 truncate max-w-[80px]">{profile.name} (Você)</span>
                          </div>
                          <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 font-mono">{profile.xp} pts</span>
                        </div>

                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('ranking')}
                      className="w-full py-2.5 mt-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-855 dark:hover:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-wider text-center text-slate-600 dark:text-slate-350 transition"
                    >
                      Acessar Classificação Geral
                    </button>
                  </div>

                  {/* TILE 5: Achievements Grid Catalog (Large Bottom Grid Card) */}
                  <div className="col-span-12 md:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col space-y-4" id="bento-tile-achievements">
                    <div className="flex items-center justify-between mb-1" id="hdr-bento-achievements">
                      <div>
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold tracking-widest uppercase mb-1 block">Carreira e Troféus</span>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white leading-none">
                          Suas Conquistas Destravadas
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100/40 dark:bg-indigo-950/30 px-3 py-1 rounded-full">
                        {profile.achievements.filter(a => a.isUnlocked).length} / {profile.achievements.length} Completas
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="achievements-bento-grid">
                      {profile.achievements.map(ach => (
                        <div
                          key={ach.id}
                          onClick={() => setSelectedAchievement(ach)}
                          className={`p-3.5 rounded-2xl border flex items-start space-x-3 transition cursor-pointer hover:scale-[1.01] ${ach.isUnlocked ? 'bg-white border-slate-200 dark:bg-slate-900 hover:border-indigo-400' : 'bg-slate-50/55 border-slate-100 dark:bg-slate-850/40 dark:border-slate-800 opacity-60'}`}
                        >
                          <div className={`p-2.5 rounded-xl flex-shrink-0 ${ach.isUnlocked ? 'bg-amber-400 text-amber-950 shadow-sm shadow-amber-200/20' : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600'}`}>
                            <Award className="w-4.5 h-4.5" />
                          </div>
                          <div className="text-left overflow-hidden">
                            <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 line-clamp-1">{ach.title}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-medium">{ach.description}</p>
                            {ach.isUnlocked ? (
                              <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 block mt-1 uppercase tracking-wider font-mono">Concluída • {ach.unlockedAt}</span>
                            ) : (
                              <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-wider font-mono">Progresso Bloqueado</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TILE 6: Quick Interactive Help & Tour (Dark Callout Card) */}
                  <div className="col-span-12 md:col-span-4 bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-between relative overflow-hidden h-full min-h-[220px]" id="bento-tile-help">
                    <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                    
                    <div>
                      <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 text-xl">
                        💡
                      </div>
                      <h3 className="font-extrabold mb-1.5 uppercase text-[10px] tracking-widest text-indigo-400 font-mono">Ajuda Prática</h3>
                      <p className="text-slate-200 text-xs leading-relaxed font-medium">
                        Novo por aqui? Inicie o nosso tour guiado interativo e aprenda como obter a aprovação máxima no exame do DETRAN.
                      </p>
                    </div>

                    <button 
                      onClick={() => setIsTutorialOpen(true)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-wider text-center transition-colors"
                      id="bento-btn-interactive-tour"
                    >
                      Tutorial Interativo
                    </button>
                  </div>

                </div>

                {/* BOTTOM COMPANION FOOTER FROM DESIGN HTML */}
                <footer className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 gap-3 px-2">
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 
                      Sincronizado dinamicamente com DETRAN.gov
                    </span>
                    <span>Versão 4.2.0-stable</span>
                  </div>
                  <div className="flex gap-4">
                     <button className="uppercase tracking-wide hover:text-indigo-600 transition" onClick={() => setIsTutorialOpen(true)}>Manual do Estudante</button>
                     <span className="text-slate-300">•</span>
                     <button className="uppercase tracking-wide hover:text-indigo-600 transition" onClick={openEditProfileModal}>Suporte Técnico</button>
                  </div>
                </footer>

              </div>
            )}

            {/* --- 2. ACTIVE EXAM SIMULATOR WINDOW --- */}
            {activeTab === 'simulator' && (
              <ExamSimulator 
                isOffline={profile.isOffline}
                onExamCompleted={handleExamCompleted} 
              />
            )}

            {/* --- 3. MEMORIZATION GAME RUNTIME --- */}
            {activeTab === 'game' && (
              <MemorizationGame 
                currentUserHighScore={profile.highScoreGame}
                onScoreEarned={handleGameScoreCompleted} 
              />
            )}

            {/* --- 4. STUDY REFERENCE MANUALS --- */}
            {activeTab === 'reference' && (
              <StudyReference 
                onSignReviewed={handleSignReviewed} 
              />
            )}

            {/* --- 5. DETAILED RANKING LOBBIES --- */}
            {activeTab === 'ranking' && (
              <RankingBoard 
                userName={profile.name}
                userXp={profile.xp}
                userLevel={profile.level}
                userCategory={profile.category}
              />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- POPUP MODAL: DETAILED DESCRIPTION REVIEW OF ACHIVENENT --- */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" id="achievement-view-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative text-center"
              id="achievement-view-modal"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400"
                id="btn-close-achievement-detail"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black ${selectedAchievement.isUnlocked ? 'bg-yellow-400 text-yellow-950' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'}`} id="view-achievement-badge">
                <Award className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none">
                {selectedAchievement.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-350 text-xs sm:text-sm mt-3 leading-relaxed">
                {selectedAchievement.description}
              </p>

              <div className="my-5 bg-slate-50 dark:bg-slate-800/45 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-500" id="view-achievement-rewards">
                <span>Recompensa de Evolução:</span>
                <span className="text-indigo-600 dark:text-indigo-400">+{selectedAchievement.xpReward} XP</span>
              </div>

              {selectedAchievement.isUnlocked ? (
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1" id="achievement-unlocked-at-label">
                  <Check className="w-4 h-4" />
                  <span>Desbloqueada em {selectedAchievement.unlockedAt}</span>
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400 flex items-center justify-center space-x-1" id="achievement-locked-label">
                  <AlertCircle className="w-4 h-4" />
                  <span>Em progresso para aprovação</span>
                </div>
              )}

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm rounded-xl mt-6 transition"
                id="btn-confirm-achievement-details"
              >
                Confirmar e Voltar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- POPUP MODAL: MODIFY STUDENT PROFILE (NAME AND CATEGORY ACTION) --- */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" id="edit-profile-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative"
              id="edit-profile-modal"
            >
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="absolute top-4 right-4 p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400"
                id="btn-close-edit-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6">
                Configuração do Seu Perfil
              </h3>

              <div className="space-y-4" id="edit-profile-inputs">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Seu Nome / Apelido</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="Digite seu nome real..."
                    maxLength={28}
                    id="input-profile-name"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Categoria Desejada (CNH)</label>
                  <select
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value as UserProfile['category'])}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm rounded-xl py-2.5 px-4 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    id="select-profile-category"
                  >
                    <option value="Primeira Habilitação (A)">Primeira Habilitação (A - Moto)</option>
                    <option value="Primeira Habilitação (B)">Primeira Habilitação (B - Carro)</option>
                    <option value="Primeira Habilitação (A+B)">Primeira Habilitação (A+B - Moto e Carro)</option>
                    <option value="Mudança C para D">Mudança de Categoria C para D (Transporte de Passageiros)</option>
                    <option value="Mudança D para E">Mudança de Categoria D para E (Carga Pesada Articulada)</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 mt-8" id="edit-profile-actions">
                <button
                  onClick={handleSaveProfileChanges}
                  className="flex-grow py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition shadow-md"
                  id="btn-save-profile-modal"
                >
                  Salvar Perfil
                </button>
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-5 py-2.5 border border-slate-250 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-350"
                  id="btn-cancel-profile-modal"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- INTERACTIVE ONBOARDING TUTORIAL WIZARD MODAL POPUP --- */}
      <Tutorial 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
      />

      {/* --- SUPABASE AUTHENTICATION MODAL POPUP --- */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(userId, email, name, category) => {
          setCongratulationsNotification(`Bem-vindo, ${name}! Seu progresso foi sincronizado com o Supabase.`);
        }}
      />

    </div>
  );
}

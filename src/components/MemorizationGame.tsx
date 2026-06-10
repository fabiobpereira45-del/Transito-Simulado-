import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Heart, 
  Flame, 
  Zap, 
  Sparkles, 
  RefreshCw, 
  Play, 
  X, 
  CheckCircle,
  Clock,
  Volume2,
  VolumeX,
  Trophy
} from 'lucide-react';
import { trafficSigns } from '../data/trafficSigns';
import { SignRenderer } from './SignRenderer';
import { TrafficSign } from '../types';

interface MemorizationGameProps {
  onScoreEarned: (points: number, xp: number) => void;
  currentUserHighScore: number;
}

export const MemorizationGame: React.FC<MemorizationGameProps> = ({ onScoreEarned, currentUserHighScore }) => {
  // Game states: 'idle' | 'playing' | 'gameover' | 'victory'
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [currentSign, setCurrentSign] = useState<TrafficSign | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [roundNumber, setRoundNumber] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timerProgress, setTimerProgress] = useState(100);

  // Constants
  const TOTAL_ROUNDS = 15;
  const SECONDS_PER_ROUND = 8;
  const TIMER_STEP_MS = 50;

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const roundActiveRef = useRef<boolean>(false);

  // WEB AUDIO SYNTHESIZERS (Arcade-like offline sounds)
  const playSoundEffect = (type: 'correct' | 'wrong' | 'victory' | 'gameover' | 'tick') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'correct') {
        // Double tone up
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        setTimeout(() => osc.stop(), 250);
      } else if (type === 'wrong') {
        // Low buzzing sliding down
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        setTimeout(() => osc.stop(), 400);
      } else if (type === 'victory') {
        // Fun fanfare
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.1);
          osc.start();
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.1 + 0.3);
          setTimeout(() => osc.stop(), (idx * 100) + 400);
        });
      } else if (type === 'gameover') {
        // Gloomy sliding tones
        const notes = [300, 200, 150];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.2);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.2);
          osc.start();
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.2 + 0.4);
          setTimeout(() => osc.stop(), (idx * 200) + 500);
        });
      }
    } catch (e) {
      console.warn("Navegador impediu execução do Web Audio de fundo ativo", e);
    }
  };

  // Start a fresh game
  const handleStartGame = () => {
    setScore(0);
    setLives(3);
    setCombo(0);
    setRoundNumber(1);
    setSelectedAnswer(null);
    setGameState('playing');
    loadNextRound(true);
  };

  // Load a round with randomized signs and answers choices
  const loadNextRound = (initial: boolean = false) => {
    setSelectedAnswer(null);
    setTimerProgress(100);
    roundActiveRef.current = true;

    // Filter signs that have clean codes or defined images for best game preview
    const gameSignsPool = trafficSigns.filter(s => s.category === 'regulamentacao' || s.category === 'advertencia' || s.category === 'gestos');
    
    // Choose a random correct sign
    const correctIdx = Math.floor(Math.random() * gameSignsPool.length);
    const correctSign = gameSignsPool[correctIdx];
    setCurrentSign(correctSign);

    // Create a pool of incorrect answers
    const wrongPool = gameSignsPool
      .filter(s => s.id !== correctSign.id)
      .map(s => s.name);
    
    // Shuffle wrong pool and pick 3
    const shuffledWrong = wrongPool.sort(() => Math.random() - 0.5);
    const wrongChoices = shuffledWrong.slice(0, 3);

    // Combine correct meaning + 3 wrong meanings, then shuffle
    const combinedOptions = [correctSign.name, ...wrongChoices].sort(() => Math.random() - 0.5);
    setOptions(combinedOptions);

    if (!initial) {
      setRoundNumber(prev => prev + 1);
    }

    // Launch countdown timer
    launchTimer();
  };

  // Setup active round ticking bar
  const launchTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const totalSteps = (SECONDS_PER_ROUND * 1000) / TIMER_STEP_MS;
    let currentStep = totalSteps;

    timerRef.current = setInterval(() => {
      if (!roundActiveRef.current) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }

      currentStep -= 1;
      const progress = (currentStep / totalSteps) * 100;
      setTimerProgress(progress);

      // Trigger warning tick sound briefly if very low
      if (progress < 25 && progress % 10 === 0) {
        playSoundEffect('tick');
      }

      if (currentStep <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleTimeout();
      }
    }, TIMER_STEP_MS);
  };

  // Handle choice selection
  const handleAnswerClick = (selectedName: string) => {
    if (selectedAnswer !== null || !currentSign) return; // Answer locked
    roundActiveRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(selectedName);

    const isCorrect = selectedName === currentSign.name;

    if (isCorrect) {
      playSoundEffect('correct');
      const gainedCombo = combo + 1;
      setCombo(gainedCombo);
      
      // Points math: 100 points base + combo bonus
      const pointsBase = 100;
      const comboMultiplier = Math.min(gainedCombo, 5); // caps combo at 5x multiplier
      const pointsGained = pointsBase * comboMultiplier;
      setScore(prev => prev + pointsGained);

      // Check for round win or progress
      setTimeout(() => {
        if (roundNumber >= TOTAL_ROUNDS) {
          endGame('victory');
        } else {
          loadNextRound();
        }
      }, 1400);

    } else {
      playSoundEffect('wrong');
      setCombo(0);
      const remainingLives = lives - 1;
      setLives(remainingLives);

      setTimeout(() => {
        if (remainingLives <= 0) {
          endGame('gameover');
        } else {
          if (roundNumber >= TOTAL_ROUNDS) {
            endGame('victory');
          } else {
            loadNextRound();
          }
        }
      }, 1400);
    }
  };

  // Handle timeout event
  const handleTimeout = () => {
    if (selectedAnswer !== null) return;
    roundActiveRef.current = false;
    setSelectedAnswer(""); // triggers wrong state layout
    playSoundEffect('wrong');
    setCombo(0);
    const remainingLives = lives - 1;
    setLives(remainingLives);

    setTimeout(() => {
      if (remainingLives <= 0) {
        endGame('gameover');
      } else {
        if (roundNumber >= TOTAL_ROUNDS) {
          endGame('victory');
        } else {
          loadNextRound();
        }
      }
    }, 1400);
  };

  // Clear ticking loops and process final highscores
  const endGame = (endState: 'victory' | 'gameover') => {
    roundActiveRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(endState);
    playSoundEffect(endState);

    // Calculate dynamic XP reward for profile progression
    // 2 XP point per 10 points scored in the game, with a victory bonus
    const xpReward = Math.round(score * 0.1) + (endState === 'victory' ? 150 : 30);
    onScoreEarned(score, xpReward);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col relative overflow-hidden" id="memorization-game-wrapper">
      {/* Sound Toggle Floating Widget */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-5 right-5 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
        title={soundEnabled ? "Desativar Sons" : "Ativar Sons"}
        id="btn-toggle-game-sounds"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* --- IDLE SCREEN (START GAME) --- */}
      {gameState === 'idle' && (
        <div className="text-center py-6 flex flex-col items-center" id="game-idle-screen">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl text-amber-500 mb-4 animate-bounce">
            <Gamepad2 className="w-12 h-12" />
          </div>

          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Jogo da Memorização de Placas
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 max-w-sm leading-relaxed mx-auto">
            Seja rápido! Teste seus reflexos mecânicos respondendo aos significados das placas expostas. Mantenha combos para obter pontuações surreais e subir no ranking teológico de motoristas prestigiados.
          </p>

          {/* Stats quick card */}
          {currentUserHighScore > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-5 py-2.5 mt-5 border border-slate-100 dark:border-slate-800 inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-350" id="game-highscore-indicator">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Recorde Atual: <strong className="text-slate-900 dark:text-white font-mono">{currentUserHighScore} pts</strong></span>
            </div>
          )}

          {/* Rules grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-6 mb-8 text-center" id="game-rules-grid">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl">
              <Clock className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
              <div className="font-extrabold text-[#111] dark:text-white text-xs">8s</div>
              <div className="text-[10px] text-slate-400">Por Placa</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl">
              <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1 animate-pulse" />
              <div className="font-extrabold text-[#111] dark:text-white text-xs">Até 5x</div>
              <div className="text-[10px] text-slate-400">Multiplicadores</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl">
              <Heart className="w-4 h-4 text-rose-500 mx-auto mb-1 fill-rose-500" />
              <div className="font-extrabold text-[#111] dark:text-white text-xs">3 Corações</div>
              <div className="text-[10px] text-slate-400">Limite de Erros</div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full sm:w-auto px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:-translate-y-0.5 transition flex items-center justify-center space-x-2"
            id="btn-launch-game-play"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Iniciar Desafio</span>
          </button>
        </div>
      )}

      {/* --- PLAYING GAME SCREEN --- */}
      {gameState === 'playing' && currentSign && (
        <div className="space-y-6 flex flex-col" id="game-active-playing-screen">
          {/* Top Panel stats */}
          <div className="flex items-center justify-between" id="game-playing-telemetry">
            {/* Lives and hearts gauge */}
            <div className="flex items-center space-x-1.5" id="game-playing-lives">
              {[1, 2, 3].map(h => (
                <Heart 
                  key={h} 
                  className={`w-5 h-5 transition-transform duration-300 ${h <= lives ? 'text-red-500 fill-red-500 scale-100' : 'text-slate-200 scale-95 dark:text-slate-800'}`}
                />
              ))}
            </div>

            {/* Score HUD */}
            <div className="text-right" id="game-playing-hud">
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">Pontos obtidos</div>
              <div className="text-xl font-extrabold text-slate-800 dark:text-white font-mono">{score}</div>
            </div>
          </div>

          {/* Combo and Round Indicators */}
          <div className="flex items-center justify-between" id="game-playing-indicators">
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-850 px-2.5 py-1 rounded-lg">
              Placa {roundNumber} / {TOTAL_ROUNDS}
            </span>

            {/* Combos fire animations */}
            <AnimatePresence mode="wait">
              {combo > 0 && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center space-x-1 font-extrabold text-orange-500 text-xs px-2.5 py-0.5 bg-orange-50 dark:bg-orange-950/20 rounded-full"
                  id={`combo-badge-${combo}`}
                >
                  <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
                  <span>COMBO {combo}x (x{Math.min(combo, 5)})</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* VISUAL TIMER BAR - REQUERIMENTO DO USUÁRIO */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden" id="game-duration-timer">
            <div 
              className={`h-full transition-all duration-75 ${timerProgress > 50 ? 'bg-indigo-600' : timerProgress > 25 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${timerProgress}%` }}
              id="game-timer-fill"
            />
          </div>

          {/* Sign visual box drawer */}
          <div className="bg-slate-50 dark:bg-slate-950/20 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-center items-center h-48 relative" id="game-current-sign-box">
            <SignRenderer type={currentSign.svgType} extraData={currentSign.extraData} size={144} />

            {/* Lock indicator feedback overlay */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 rounded-2xl flex items-center justify-center backdrop-blur-[1px] ${selectedAnswer === currentSign.name ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}
                  id="game-feedback-lock"
                >
                  {selectedAnswer === currentSign.name ? (
                    <div className="transform scale-125 bg-emerald-500 text-white rounded-full p-2 shadow-lg" id="game-correct-check">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                  ) : (
                    <div className="transform scale-125 bg-rose-500 text-white rounded-full p-2 shadow-lg" id="game-wrong-cross">
                      <X className="w-8 h-8" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Multiple Choice Fields */}
          <div className="space-y-2.5 pb-2" id="game-interactive-choices">
            {options.map((opt, idx) => {
              const isLocked = selectedAnswer !== null;
              const isSelected = selectedAnswer === opt;
              const isCorrectMeaning = opt === currentSign.name;

              let btnStyle = "bg-white border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 hover:border-slate-350 dark:hover:border-slate-700";
              if (isLocked) {
                if (isCorrectMeaning) {
                  // highlight truth green
                  btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-850 dark:text-emerald-300";
                } else if (isSelected) {
                  // highlight incorrect selected red
                  btnStyle = "bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/30 dark:border-rose-850 dark:text-rose-300";
                } else {
                  // mute standard options
                  btnStyle = "opacity-40 bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-900/40 dark:border-slate-850/40";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isLocked}
                  onClick={() => handleAnswerClick(opt)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all leading-relaxed ${btnStyle}`}
                  id={`btn-game-opt-${idx}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* --- GAMEOVER OR VICTORY END SCREENS --- */}
      {(gameState === 'gameover' || gameState === 'victory') && (
        <div className="text-center py-6 flex flex-col items-center" id="game-finished-report">
          {gameState === 'victory' ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl text-emerald-500 mb-4 animate-bounce" id="gamewin-anim">
              <Sparkles className="w-12 h-12" />
            </div>
          ) : (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl text-rose-500 mb-4 animate-pulse" id="gameloss-anim">
              <Zap className="w-12 h-12" />
            </div>
          )}

          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            {gameState === 'victory' ? "Vitória! Desafio Concluído" : "Fim de Jogo!"}
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-sm">
            {gameState === 'victory' 
              ? "Excelente capacidade visual e intelectual! Você conseguiu analisar as 15 placas seguidas mantendo sua habilitação intacta!"
              : "Suas 3 vidas se esgotaram devido a falhas mecânicas. Continuar estudando na aba de referências para consolidar seu tempo de resposta!"
            }
          </p>

          <div className="my-6 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 w-full" id="gameover-scores-metrics">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider font-mono">Pontos Conquistados</span>
                <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">{score}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider font-mono">Experiência Ganha</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center">
                  <Flame className="w-4 h-4 mr-1 text-amber-500 fill-current animate-pulse" />
                  <span>+{Math.round(score * 0.1) + (gameState === 'victory' ? 150 : 30)} XP</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full" id="gameover-actions">
            <button
              onClick={handleStartGame}
              className="flex-grow py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none transition flex items-center justify-center space-x-1.5"
              id="btn-retry-game"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </button>
            <button
              onClick={() => setGameState('idle')}
              className="px-6 py-3.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-350 dark:hover:bg-slate-800"
              id="btn-esc-game"
            >
              <span>Voltar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

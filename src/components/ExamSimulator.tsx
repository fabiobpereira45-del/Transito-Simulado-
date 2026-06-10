import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  Award,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Question, ExamHistory } from '../types';
import { questions as allQuestions } from '../data/questions';

interface ExamSimulatorProps {
  onExamCompleted: (result: ExamHistory, xpEarned: number) => void;
  isOffline: boolean;
  answeredQuestionIds: number[];
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({ onExamCompleted, isOffline, answeredQuestionIds }) => {
  // Config state
  const [questionCount, setQuestionCount] = useState<number>(30);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectionMode, setSelectionMode] = useState<'all' | 'unanswered'>('all');
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [backfillWarning, setBackfillWarning] = useState<boolean>(false);

  // Active exam state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> selectedOptionIndex
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({}); // questionId -> flagged status
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter available categories in pool
  const categories = ['all', 'Legislação', 'Direção Defensiva', 'Sinalização', 'Primeiros Socorros', 'Meio Ambiente & Cidadania', 'Mecânica Básica'];

  // Start the exam
  const handleStartExam = () => {
    // Filter questions by category if applicable
    let filtered = [...allQuestions];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    let finalSet: Question[] = [];
    
    if (selectionMode === 'unanswered') {
      // Filter out already answered questions
      const unanswered = filtered.filter(q => !answeredQuestionIds.includes(q.id));
      
      if (unanswered.length < questionCount) {
        // We don't have enough unanswered questions. Let's backfill!
        setBackfillWarning(true);
        const answered = filtered.filter(q => answeredQuestionIds.includes(q.id));
        // Shuffle both sets
        const shuffledUnanswered = [...unanswered].sort(() => Math.random() - 0.5);
        const shuffledAnswered = [...answered].sort(() => Math.random() - 0.5);
        
        const needed = questionCount - unanswered.length;
        // Take all unanswered + slice of answered to fill the slot
        const combined = [
          ...shuffledUnanswered,
          ...shuffledAnswered.slice(0, Math.min(needed, shuffledAnswered.length))
        ];
        // Shuffle them together so they are mixed
        finalSet = combined.sort(() => Math.random() - 0.5);
      } else {
        setBackfillWarning(false);
        finalSet = unanswered.sort(() => Math.random() - 0.5).slice(0, questionCount);
      }
    } else {
      setBackfillWarning(false);
      finalSet = filtered.sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, filtered.length));
    }
    
    setQuestions(finalSet);
    setAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setExamStarted(true);
    setExamFinished(false);
    
    const timeNow = Date.now();
    setStartTime(timeNow);
    setElapsedTime(0);

    // Initialise timer ticking every second
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - timeNow) / 1000));
    }, 1000);
  };

  // Keep track of real duration if startTime updates later
  useEffect(() => {
    if (examStarted && !examFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted, examFinished, startTime]);

  // Handle answering option
  const handleSelectAnswer = (optionIdx: number) => {
    const currentQuestion = questions[currentIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIdx
    }));
  };

  // Toggle flagging current question
  const toggleFlag = () => {
    const currentQuestion = questions[currentIndex];
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  // Navigation functions
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleJumpTo = (index: number) => {
    setCurrentIndex(index);
  };

  // End and process results
  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setExamFinished(true);

    const finalElapsedTime = elapsedTime;
    let correctCount = 0;

    questions.forEach(q => {
      const selected = answers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercentage >= 70; // 70% threshold in Brazil (21 out of 30)

    // XP Math
    // 10 XP points per correct answer, with a bonus +100 XP if passed!
    const baseXp = correctCount * 15;
    const bonusXp = passed ? 100 : 25;
    const totalXpEarned = baseXp + bonusXp;

    const summaryResult: ExamHistory = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('pt-BR'),
      correctCount,
      totalQuestions: questions.length,
      scorePercentage,
      durationSeconds: finalElapsedTime,
      passed,
      questionIds: questions.map(q => q.id)
    };

    onExamCompleted(summaryResult, totalXpEarned);
  };

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const totalAnsweredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? (totalAnsweredCount / questions.length) * 100 : 0;

  // Render Setup Options screen if not running
  if (!examStarted) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm" id="exam-dashboard-config">
        <div className="text-center max-w-xl mx-auto mb-8" id="exam-config-intro">
          <div className="inline-flex p-3 bg-indigo-50 dark:bg-slate-800 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-4 animate-pulse">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Simulador de Exame CNH
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
            Configure o simulador da sua prova teórica oficial com nosso acervo atualizado regulamentar de perguntas de primeira habilitação e adição de categorias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" id="exam-setup-grid">
          {/* Quantity Selector */}
          <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 flex flex-col justify-between" id="card-qty-selector">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                Quantidade de Questões
              </label>
              <div className="grid grid-cols-2 gap-2" id="grid-qty-buttons">
                {[10, 20, 30, allQuestions.length].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2.5 px-2.5 rounded-xl font-bold text-xs transition-all ${questionCount === num ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'}`}
                    id={`btn-select-qty-${num}`}
                  >
                    {num === allQuestions.length ? `Todas (${allQuestions.length})` : `${num} Questões`}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium">
              Nota: O exame oficial do DETRAN contém 30 questões.
            </p>
          </div>

          {/* Theme/Category Selector */}
          <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 flex flex-col justify-between" id="card-category-selector">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                Filtro Temático
              </label>
              <div className="relative" id="wrapper-select-cat">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium appearance-none cursor-pointer"
                  id="select-exam-category"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Simulado Geral (Todas as Áreas)' : cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium">
              Foco estratégico para reforçar as áreas onde você possui mais dificuldades.
            </p>
          </div>

          {/* Strategy/Selection Mode Selector */}
          <div className="bg-slate-50 p-5 rounded-2xl dark:bg-slate-800/40 border border-slate-100/80 dark:border-slate-800/40 flex flex-col justify-between" id="card-strategy-selector">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                <RotateCcw className="w-4 h-4 mr-2 text-emerald-500" />
                Método de Seleção
              </label>
              <div className="space-y-2" id="grid-strategy-options">
                <button
                  type="button"
                  onClick={() => setSelectionMode('all')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all text-left flex items-center justify-between border ${selectionMode === 'all' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'}`}
                >
                  <span>Misturar Tudo (Geral)</span>
                  {selectionMode === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectionMode('unanswered')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all text-left flex items-center justify-between border ${selectionMode === 'unanswered' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'}`}
                >
                  <span>Apenas Não Respondidas</span>
                  {selectionMode === 'unanswered' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 font-medium">
              Escolha priorizar questões inéditas ou randomizar todo o acervo histórico.
            </p>
          </div>
        </div>

        {/* Offline notice inside simulator */}
        <div className="max-w-2xl mx-auto mt-6" id="offline-sim-notice">
          <div className="p-4 rounded-xl border border-dashed border-sky-200 bg-sky-50/50 dark:bg-slate-800/20 dark:border-sky-900/30 text-xs text-sky-700 dark:text-sky-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Especialista de Trânsito Informa: </span>
              {isOffline ? (
                <span>O Simulador está rodando no <strong className="font-bold text-indigo-600 dark:text-indigo-400">Modo Offline</strong>. Todo o acervo conceitual de regras está gravado no aplicativo. Treine sem gastar sua banda de internet!</span>
              ) : (
                <span>Você está conectado à rede central de treinamento. Caso sua conexão oscile, o Simulador auto-salva os dados offline para evitar perda de respostas.</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8" id="start-exam-action">
          <button
            onClick={handleStartExam}
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all text-center flex items-center"
            id="btn-trigger-start-exam"
          >
            <span>Iniciar Simulado</span>
          </button>
        </div>
      </div>
    );
  }

  // Render active exam stage
  if (examStarted && !examFinished) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto" id="exam-live-stage">
        {/* Main interactive panel */}
        <div className="flex-grow bg-white rounded-3xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm p-6 sm:p-8 flex flex-col" id="exam-live-main">
          {/* Top Bar with Timer and Progress Meter */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6" id="exam-top-bar">
            {/* Left side info */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg mr-2 font-mono">
                Questão {currentIndex + 1} de {questions.length}
              </span>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg mr-2 font-mono" id="live-cat-badge">
                {currentQuestion.category}
              </span>
            </div>

            {/* Right side live stats */}
            <div className="flex items-center space-x-4" id="exam-live-timers">
              <button
                onClick={toggleFlag}
                className={`p-2 rounded-xl border flex items-center space-x-1.5 transition-all ${flaggedQuestions[currentQuestion.id] ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-50 border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'}`}
                title="Sinalizar questão para revisar depois"
                id="btn-flag-status"
              >
                <Flag className={`w-4 h-4 ${flaggedQuestions[currentQuestion.id] ? 'fill-current' : ''}`} />
                <span className="text-xs font-bold hidden sm:inline">
                  {flaggedQuestions[currentQuestion.id] ? "Sinalizada" : "Sinalizar"}
                </span>
              </button>

              <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 font-mono text-sm font-bold shadow-inner" id="live-timer-widget">
                <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>

          {/* PROGRESS BAR - REQUERIMENTO DO USUÁRIO */}
          <div className="mb-6" id="exam-progress-bar-container">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-1.5" id="val-progress-text">
              <span>Progresso de Respostas</span>
              <span>{totalAnsweredCount} de {questions.length} respondidas ({Math.round(progressPercent)}%)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden" id="progressbar-outer">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
                id="progressbar-fill"
              />
            </div>
          </div>

          {backfillWarning && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2.5 animate-pulse" id="backfill-warning-alert">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
              <div>
                <span className="font-bold">Aviso de Simulado: </span>
                Não havia perguntas inéditas suficientes na categoria escolhida para cobrir as {questionCount} selecionadas. O simulador preencheu as vagas restantes com questões já feitas.
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="mb-6 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800" id="live-question-header">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answers Options Selection */}
          <div className="space-y-3 flex-grow" id="live-options-list">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border font-semibold text-sm leading-relaxed transition-all flex items-start space-x-3 group ${isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-800' : 'bg-white border-slate-200/80 hover:bg-slate-50/80 dark:bg-slate-900 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'}`}
                  id={`btn-live-option-${idx}`}
                >
                  <span className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-xs uppercase ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-750'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="pt-0.5">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-8" id="live-navigation-actions">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed border-slate-100 text-slate-300 dark:border-slate-850 dark:text-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              id="btn-navigate-prev-exam"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                id="btn-navigate-next-exam"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                id="btn-finish-exam"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalizar Simulado</span>
              </button>
            )}
          </div>
        </div>

        {/* Right sidebar navigation grid */}
        <div className="w-full lg:w-72 bg-slate-50 rounded-3xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900 p-5 flex flex-col" id="exam-sidebar-widget">
          <div className="mb-4" id="side-grid-header">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">
              Gabarito Rápido
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Clique nos números para saltar entre questões.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2 max-h-[280px] overflow-y-auto pr-1 pb-3 scrollbar-thin scrollbar-thumb-slate-200" id="grid-rapid-questions">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];
              const isActive = currentIndex === idx;

              let cellStyle = "bg-white border-slate-200 hover:border-slate-400 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400";
              if (isAnswered) cellStyle = "bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900";
              if (isFlagged) cellStyle = "bg-amber-400 hover:bg-amber-500 text-white border-amber-400";
              if (isActive) cellStyle += " ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900";

              return (
                <button
                  key={idx}
                  onClick={() => handleJumpTo(idx)}
                  className={`aspect-square w-10 flex-shrink-0 rounded-lg border font-bold text-xs flex items-center justify-center transition-all ${cellStyle}`}
                  id={`btn-jump-index-${idx}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-auto border-t border-slate-200/60 dark:border-slate-800 pt-4 text-xs space-y-2 text-slate-400 font-semibold" id="grid-caption">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-solid" />
              <span>Não respondida</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 border-solid" />
              <span>Respondida</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-400 border-solid" />
              <span>Sinalizada p/ Revisar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render scorecard results page (EXAME CONCLUÍDO)
  if (examFinished) {
    let correctCount = 0;
    questions.forEach(q => {
      const selected = answers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        correctCount++;
      }
    });
    const totalCount = questions.length;
    const pct = Math.round((correctCount / totalCount) * 100);
    const passed = pct >= 70;

    return (
      <div className="max-w-4xl mx-auto space-y-8" id="exam-scorecard-section">
        {/* Main scorecard banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden bg-gradient-to-br ${passed ? 'from-emerald-50 to-teal-100 border-emerald-100 dark:from-slate-900/40 dark:to-emerald-950/20 dark:border-emerald-900/40' : 'from-rose-50 to-pink-100 border-rose-100 dark:from-slate-900/40 dark:to-rose-950/20 dark:border-rose-900/40'}`} id="card-scorecard-banner">
          {passed && (
            <div className="absolute top-0 right-0 p-10 rotate-12 opacity-10">
              <Award className="w-48 h-48" />
            </div>
          )}

          <div className="max-w-xl mx-auto flex flex-col items-center" id="scorecard-elements">
            {passed ? (
              <div className="p-3 bg-emerald-500 text-white rounded-full mb-4 shadow-lg shadow-emerald-200 dark:shadow-none animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            ) : (
              <div className="p-3 bg-rose-500 text-white rounded-full mb-4 shadow-lg shadow-rose-200 dark:shadow-none animate-bounce">
                <XCircle className="w-12 h-12" />
              </div>
            )}

            <h2 className={`text-2xl sm:text-3xl font-black ${passed ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
              {passed ? "Aprovado no Simulado!" : "Reprovado no Simulado"}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              {passed 
                ? "Parabéns! Você alcançou a pontuação exigida pelo DETRAN e possui sólidos conhecimentos das diretrizes do CTB."
                : "Não desanime. O objetivo do simulador é diagnosticar onde corrigir suas falhas para garantir aprovação real na banca."
              }
            </p>

            {/* Huge dynamic percentage display */}
            <div className="my-6 relative flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm" id="score-block-pct">
              <span className={`text-5xl font-black ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {pct}%
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest font-mono">
                Aproveitamento Técnico
              </span>
            </div>

            {/* Horizontal stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full" id="score-stats-grid">
              <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-slate-400 text-xs font-semibold">Respostas Corretas</div>
                <div className="text-slate-800 dark:text-white font-black text-lg font-mono">
                  {correctCount} / {totalCount}
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-slate-400 text-xs font-semibold">Tempo Decorrido</div>
                <div className="text-slate-800 dark:text-white font-black text-lg font-mono">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-slate-400 text-xs font-semibold">Experiência Adquirida</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-black text-lg font-mono flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-1 text-amber-500 fill-current" />
                  <span>+{correctCount * 15 + (passed ? 100 : 25)} XP</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3" id="score-finish-actions">
              <button
                onClick={() => setExamStarted(false)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-extrabold rounded-xl transition flex items-center space-x-1.5"
                id="btn-return-config"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Iniciar Outro Simulado</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- REVIEW SYSTEM: APRESENTAR RESULTADOS E EXPLICATIVOS APÓS CONCLUIR --- */}
        <div className="space-y-4" id="exam-expert-review-container">
          <div className="border-b border-indigo-100 dark:border-slate-800 pb-2 flex items-center space-x-2" id="expert-header-text">
            <HelpCircle className="text-indigo-600 w-5 h-5" />
            <h3 className="text-lg font-black text-slate-800 dark:text-white">
              Análise do Especialista (Revisão da Prova)
            </h3>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            Leia as justificativas técnicas baseadas no Código de Trânsito Brasileiro para consolidar o aprendizado e não errar mais!
          </p>

          <div className="space-y-6" id="review-questions-feed">
            {questions.map((q, idx) => {
              const selectedIdx = answers[q.id];
              const isCorrect = selectedIdx === q.correctAnswer;

              return (
                <div 
                  key={idx}
                  className={`bg-white rounded-2xl border p-5 dark:bg-slate-900 transition-all ${isCorrect ? 'border-emerald-100 hover:border-emerald-200 dark:border-emerald-900/20' : 'border-rose-100 hover:border-rose-200 dark:border-rose-900/20'}`}
                  id={`review-question-card-${q.id}`}
                >
                  {/* Title block with Correct/Wrong pill */}
                  <div className="flex items-start justify-between gap-3 mb-3" id={`review-title-sec-${idx}`}>
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-500">
                      Questão {idx + 1}
                    </span>
                    
                    {isCorrect ? (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs font-bold font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acertou</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 text-xs font-bold font-sans">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Errou</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-4">
                    {q.question}
                  </h4>

                  {/* Displays options and points out which is correct */}
                  <div className="space-y-2 mb-4" id={`review-options-sec-${idx}`}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isOptionCorrect = optIdx === q.correctAnswer;

                      let optBorderClass = "border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50";
                      if (isOptionCorrect) {
                        optBorderClass = "border-emerald-300 text-emerald-800 bg-emerald-50/60 dark:border-emerald-900 dark:text-emerald-300 dark:bg-emerald-950/20";
                      } else if (isOptionSelected && !isCorrect) {
                        optBorderClass = "border-rose-200 text-rose-800 bg-rose-50/60 dark:border-rose-900/30 dark:text-rose-300 dark:bg-rose-950/10";
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-start space-x-2.5 ${optBorderClass}`}
                          id={`review-item-opt-${optIdx}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] uppercase flex-shrink-0 ${isOptionCorrect ? 'bg-emerald-600 text-white' : isOptionSelected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* SPECIALIST RECONCILIATION EXPLANATION COMMENT */}
                  <div className="bg-slate-50 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 p-4 rounded-xl text-xs text-slate-600 dark:text-slate-350 leading-relaxed" id={`expert-exp-block-${q.id}`}>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 fill-current text-indigo-500" />
                      <span>Explicação Detalhada do Especialista:</span>
                    </div>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

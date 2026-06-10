import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  Gamepad2, 
  Trophy, 
  Zap, 
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  WifiOff
} from 'lucide-react';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  featureDescription: string;
}

export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: "Boas-vindas, Futuro Motorista!",
      description: "Olá! Eu sou o seu Especialista Virtual em Trânsito. Preparei um ambiente interativo completo baseado no Código de Trânsito Brasileiro (CTB) para você passar de primeira na prova do DETRAN ou mudar sua categoria com total confiança.",
      icon: <CheckCircle className="w-12 h-12 text-blue-600" id="tut-icon-1" />,
      colorClass: "from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Experiência de aprendizado gamificada e de altíssima qualidade técnica."
    },
    {
      title: "Simulados Personalizados e Sem Spoiler",
      description: "Pratique com simulados reais do CTB. Escolha o número exato de questões desejado (10, 20, 30 ou 40). A barra de progresso no topo guia seu avanço, mas o resultado final e as explicações detalhadas de cada erro são mostrados apenas ao concluir a prova!",
      icon: <BookOpen className="w-12 h-12 text-emerald-600" id="tut-icon-2" />,
      colorClass: "from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Simula o estresse real do teste, otimizando o seu foco cognitivo."
    },
    {
      title: "Memorização Dinâmica (Mini-Game)",
      description: "Memorizar placas não precisa ser decoreba chata! Criamos um mini-game de agilidade visual onde você corre contra o tempo para identificar o significado das placas. Acerte combos rápidos para multiplicar seus pontos e subir nos níveis!",
      icon: <Gamepad2 className="w-12 h-12 text-amber-500" id="tut-icon-3" />,
      colorClass: "from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Fixação visual acelerada de placas de regulamentação, advertência e gestos!"
    },
    {
      title: "Manual Técnico Completo e Interativo",
      description: "Consulte todas as placas de regulamentação e advertência, semáforos interativos para motoristas/pedestres, sinais horizontais pintados, gestos dadas pelos agentes de trânsito e condutores, e até mesmo toques reais de buzina com sintetizações de áudio sonoro e conselhos técnicos do especialista.",
      icon: <Zap className="w-12 h-12 text-purple-600" id="tut-icon-4" />,
      colorClass: "from-purple-50 to-pink-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Uma enciclopédia rápida para tirar qualquer dúvida instantaneamente."
    },
    {
      title: "Sistema de Níveis, Conquistas e Rankings",
      description: "Tudo o que você realiza no app gera pontos de Experiência (XP). Suba de nível, desbloqueie conquistas exclusivas baseadas em seu desempenho e dispute o topo do Ranking Mensal contra outros concorrentes simulados ativos da autoescola!",
      icon: <Trophy className="w-12 h-12 text-rose-500" id="tut-icon-5" />,
      colorClass: "from-rose-50 to-red-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Estude se divertindo e acompanhando sua evolução de forma clara."
    },
    {
      title: "Modo 100% Offline Garantido",
      description: "Ficou sem internet no ônibus ou metrô a caminho do trabalho? Não tem problema! Ative o interruptor de 'Modo Offline' na barra superior para simular a prática sem rede. Todo o progresso, questões e conquistas continuam salvos com segurança no seu dispositivo.",
      icon: <WifiOff className="w-12 h-12 text-cyan-600" id="tut-icon-6" />,
      colorClass: "from-cyan-50 to-blue-100 dark:from-slate-800 dark:to-slate-900",
      featureDescription: "Liberdade para estudar onde e quando você quiser."
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="tutorial-overlay">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl overflow-hidden bg-white rounded-3xl shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
          id="tutorial-modal"
        >
          {/* Header */}
          <div className="absolute top-4 right-4 z-10" id="tutorial-close-header">
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Pular Tutorial"
              id="btn-skip-tutorial-top"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col h-full" id="tutorial-content-wrapper">
            {/* Ambient illustration header banner based on current step */}
            <div className={`p-8 bg-gradient-to-br ${steps[currentStep].colorClass} transition-all duration-300 flex flex-col items-center text-center`} id="tutorial-illustration-banner">
              <div className="p-4 bg-white/90 rounded-2xl shadow-md dark:bg-slate-900/90 mb-4 scale-110">
                {steps[currentStep].icon}
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-1">
                {steps[currentStep].title}
              </h2>
            </div>

            {/* Step Content */}
            <div className="p-8 flex-grow" id="tutorial-text-body">
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed text-center mb-6 min-h-[96px]">
                {steps[currentStep].description}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center space-x-3 justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400" id="tutorial-feature-tag">
                <Award className="w-5 h-5 flex-shrink-0" />
                <span>{steps[currentStep].featureDescription}</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 pb-8 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-auto" id="tutorial-footer">
              {/* Progress Bullets */}
              <div className="flex space-x-2" id="tutorial-bullets">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentStep ? 'bg-indigo-600 w-6' : 'bg-slate-200 dark:bg-slate-700'}`}
                    title={`Etapa ${idx + 1}`}
                    id={`btn-bullet-step-${idx}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex space-x-3" id="tutorial-nav-buttons">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    id="btn-tut-prev"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-200 dark:shadow-none transition"
                  id="btn-tut-next"
                >
                  <span>
                    {currentStep === steps.length - 1 ? "Entendido, Começar!" : "Avançar"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  ShieldAlert, 
  TrafficCone, 
  Volume2, 
  Milestone, 
  Flame, 
  Navigation,
  Accessibility,
  Eye,
  CheckCircle,
  HelpCircle,
  Play,
  FileText,
  X
} from 'lucide-react';
import { trafficSigns } from '../data/trafficSigns';
import { SignRenderer } from './SignRenderer';
import { TrafficSign, SignCategory } from '../types';

interface StudyReferenceProps {
  onSignReviewed: () => void; // XP rewards indicator hook
}

export const StudyReference: React.FC<StudyReferenceProps> = ({ onSignReviewed }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<SignCategory | 'all'>('all');
  const [selectedSign, setSelectedSign] = useState<TrafficSign | null>(null);

  // List of active categories for cataloging tabs
  const categoriesList: { value: SignCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'Todos', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'regulamentacao', label: 'Regulamentação', icon: <Milestone className="w-4 h-4 text-rose-500" /> },
    { value: 'advertencia', label: 'Advertência', icon: <ShieldAlert className="w-4 h-4 text-amber-500" /> },
    { value: 'luminosos', label: 'Luminosos', icon: <TrafficCone className="w-4 h-4 text-emerald-500" /> },
    { value: 'horizontais', label: 'Horizontais (Asfalto)', icon: <Navigation className="w-4 h-4 text-sky-500" /> },
    { value: 'buzinas', label: 'Buzinas & Apitos', icon: <Volume2 className="w-4 h-4 text-indigo-500" /> },
    { value: 'gestos', label: 'Gestos', icon: <Accessibility className="w-4 h-4 text-purple-500" /> }
  ];

  // Synthesize Horn & Whistle sounds directly in the browser via Web Audio API (100% offline-compatible)
  const playSignalSound = (type: string) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'horn_short') {
        // Flat digital car horn (short beep)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(400, ctx.currentTime);
        osc2.frequency.setValueAtTime(420, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        
        osc1.start();
        osc2.start();
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
        }, 220);
      } else if (type === 'horn_long') {
        // Flat digital loud continuous car horn
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(390, ctx.currentTime);
        osc2.frequency.setValueAtTime(410, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc1.start();
        osc2.start();
        
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
        
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
        }, 1500);
      } else if (type === 'whistle_short') {
        // High pitched police whistle blast (short)
        const osc = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const gain = ctx.createGain();

        modulator.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2000, ctx.currentTime); // high freq
        modulator.frequency.setValueAtTime(30, ctx.currentTime); // frequency of whistle trill
        modGain.gain.setValueAtTime(150, ctx.currentTime); // strength of trill

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        modulator.start();

        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

        setTimeout(() => {
          osc.stop();
          modulator.stop();
        }, 280);
      } else if (type === 'whistle_long') {
        // High pitched police whistle blast (long sliding down)
        const osc = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        const modGain = ctx.createGain();
        const gain = ctx.createGain();

        modulator.connect(modGain);
        modGain.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, ctx.currentTime);
        modulator.frequency.setValueAtTime(35, ctx.currentTime);
        modGain.gain.setValueAtTime(180, ctx.currentTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        modulator.start();

        osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.4);

        setTimeout(() => {
          osc.stop();
          modulator.stop();
        }, 1450);
      }
    } catch (e) {
      console.warn("Audio trigger interceptado offline", e);
    }
  };

  // Filter signage array based on search and selected active category tab
  const filteredSigns = trafficSigns.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (sign.code && sign.code.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || sign.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenDetailModal = (sign: TrafficSign) => {
    setSelectedSign(sign);
    onSignReviewed(); // triggers small incremental XP bump if applicable
  };

  return (
    <div className="space-y-6" id="study-reference-dashboard">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm" id="study-header">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="study-row-header">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
              Central de Estudos & Sinais CTB
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Explore o catálogo completo de placas, semáforos, marcações viárias, regras de áudio e gestos de agentes.
            </p>
          </div>

          {/* Search box built in header */}
          <div className="relative w-full md:w-80" id="study-search-bar">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Pesquisar p/ código, placa ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
              id="input-signage-search"
            />
          </div>
        </div>

        {/* Dynamic Navigation Category Selection Badges */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-50 dark:border-slate-800 pt-5 pr-1" id="study-tabs-strip">
          {categoriesList.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition border ${activeCategory === cat.value ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 dark:border-slate-800'}`}
              id={`btn-tab-study-${cat.value}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Signs Cards Feed Grid */}
      {filteredSigns.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="signs-cards-catalog-grid">
          {filteredSigns.map(sign => (
            <div
              key={sign.id}
              onClick={() => handleOpenDetailModal(sign)}
              className="bg-white rounded-2xl border border-slate-100/80 hover:border-indigo-400 hover:shadow-md dark:bg-slate-900 dark:border-slate-800 p-4 flex flex-col items-center justify-between group cursor-pointer transition-all hover:-translate-y-0.5 text-center"
              id={`card-sign-item-${sign.id}`}
            >
              <div className="mb-4" id={`wrapper-sign-render-${sign.id}`}>
                <SignRenderer type={sign.svgType} extraData={sign.extraData} size={84} />
              </div>

              <div id={`wrapper-sign-info-${sign.id}`}>
                {sign.code && (
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md" id={`sign-lbl-code-${sign.id}`}>
                    {sign.code}
                  </span>
                )}
                <h4 className="text-xs font-bold text-slate-700 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400 mt-2 line-clamp-1">
                  {sign.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-900/60 p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-md mx-auto" id="signs-empty-feed">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-white">Nenhum sinal encontrado</h4>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs mx-auto">
            Não encontramos resultados correspondentes aos termos buscados ou filtros ativos. Altere a busca e tente novamente!
          </p>
        </div>
      )}

      {/* --- REUSABLE AUDIO INTERACTIVE PLAYGROUND WIDGET FOR APITOS / BUZINAS --- */}
      {activeCategory === 'buzinas' && (
        <div className="bg-indigo-50 border border-indigo-100 dark:bg-slate-800/40 dark:border-slate-800/70 rounded-3xl p-5 sm:p-6" id="whistles-soundboard">
          <h3 className="text-sm sm:text-base font-bold text-indigo-900 dark:text-indigo-300 flex items-center">
            <Volume2 className="w-4 h-4 mr-2" />
            Mesa de Toques Sonoros Completa
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Simulador de áudio mecânico oficial e apitos de agentes ativos baseados nas diretrizes do CTB. Toque nos botões para aprender o ritmo sonoro exigido legalmente!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4" id="soundboard-grid">
            <button
              onClick={() => playSignalSound('horn_short')}
              className="p-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-indigo-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              id="btn-soundboard-horn-short"
            >
              <span>🚗 Buzina: 1 Toque Curto</span>
              <Play className="w-3.5 h-3.5 fill-current text-indigo-500" />
            </button>
            <button
              onClick={() => playSignalSound('horn_long')}
              className="p-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-indigo-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              id="btn-soundboard-horn-long"
            >
              <span>🚨 Buzina: Toque Prolongado</span>
              <Play className="w-3.5 h-3.5 fill-current text-red-500" />
            </button>
            <button
              onClick={() => playSignalSound('whistle_short')}
              className="p-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-indigo-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              id="btn-soundboard-whistle-short"
            >
              <span>👮 Agente: 1 Silvo Breve (Siga)</span>
              <Play className="w-3.5 h-3.5 fill-current text-emerald-500" />
            </button>
            <button
              onClick={() => playSignalSound('whistle_long')}
              className="p-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-indigo-100 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 transition"
              id="btn-soundboard-whistle-long"
            >
              <span>👮 Agente: 1 Silvo Longo (Diminua)</span>
              <Play className="w-3.5 h-3.5 fill-current text-amber-500" />
            </button>
          </div>
        </div>
      )}

      {/* --- COMPREHENSIVE DETAIL MODAL POPUP --- */}
      <AnimatePresence>
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" id="sign-detail-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative shadow-2xl"
              id="sign-detail-modal"
            >
              {/* Close action */}
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-4 right-4 p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-slate-600"
                id="btn-close-signage-detail"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center space-y-4" id="sign-detail-structure">
                {/* Visual sign preview */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 mb-2">
                  <SignRenderer type={selectedSign.svgType} extraData={selectedSign.extraData} size={112} />
                </div>

                {/* Tags */}
                <div className="flex items-center space-x-2" id="detail-lbl-row">
                  {selectedSign.code && (
                    <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 px-3 py-1 rounded-md">
                      Código: {selectedSign.code}
                    </span>
                  )}
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {selectedSign.category === 'regulamentacao' ? 'Regulamentação' 
                      : selectedSign.category === 'advertencia' ? 'Advertência'
                      : selectedSign.category === 'luminosos' ? 'Sinal Luminoso'
                      : selectedSign.category === 'horizontais' ? 'Sinalização Horizontal'
                      : selectedSign.category === 'buzinas' ? 'Buzinas & Audio'
                      : selectedSign.category === 'gestos' ? 'Gestos'
                      : 'Indicação'
                    }
                  </span>
                </div>

                {/* Text credentials */}
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-white leading-snug">
                  {selectedSign.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-350 leading-relaxed text-justify">
                  {selectedSign.description}
                </p>

                {/* Synthesizer triggers if are buzzers/horns */}
                {selectedSign.category === 'buzinas' && (
                  <div className="w-full pt-2" id="audio-detail-actions">
                    <button
                      onClick={() => playSignalSound(selectedSign.svgType)}
                      className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 hover:text-indigo-900 border border-indigo-100 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition dark:bg-slate-800 dark:border-slate-700 dark:text-indigo-300"
                      id="btn-play-sound-detail"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Simular Toque Sonoro Regulamentar</span>
                    </button>
                  </div>
                )}

                {/* specialist tip box */}
                <div className="w-full bg-slate-50 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 p-4 rounded-2xl flex items-start space-x-2 text-left" id="detail-specialist-box">
                  <Flame className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black text-slate-800 dark:text-white block">Conselho Prático do Especialista:</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {selectedSign.category === 'regulamentacao' 
                        ? "Desobedecer as placas redondas de regulamentação gera infração punível diretamente com multas regulamentadas pelo CTB!" 
                        : selectedSign.category === 'advertencia' 
                        ? "Placas de advertência alertam sobre condições à frente. Reduza preventivamente a velocidade nas proximidades dessas placas!"
                        : "Lembre-se: no exame e nas ruas, a sinalização emitida pelo Agente de Trânsito prevalece sobre qualquer sinalização ou luz semafórica!"
                      }
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSign(null)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm rounded-xl transition"
                  id="btn-finish-signage-detail"
                >
                  Confirmar e Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Search, 
  ArrowUp, 
  User, 
  Crown, 
  Target, 
  TrendingUp, 
  Sparkles,
  HelpCircle,
  Clock,
  Car
} from 'lucide-react';
import { RankingItem } from '../types';

interface RankingBoardProps {
  userXp: number;
  userName: string;
  userLevel: number;
  userCategory: string;
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ userXp, userName, userLevel, userCategory }) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [liveRankings, setLiveRankings] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ground-truth simulated peers which study in parallel with the user
  const baseSimulatedRankings: RankingItem[] = [
    { name: "Thiago Mendes (Mato Grosso)", xp: 3200, level: 5, category: "Primeira Habilitação (A)" },
    { name: "Isabela Lima (DETRAN SP)", xp: 2850, level: 4, category: "Primeira Habilitação (B)" },
    { name: "Guilherme Santos (Minas)", xp: 2400, level: 4, category: "Primeira Habilitação (A+B)" },
    { name: "Renata CNH-A (Rio de Janeiro)", xp: 1980, level: 3, category: "Primeira Habilitação (A)" },
    { name: "Clara Gomes (Bahia)", xp: 1550, level: 3, category: "Primeira Habilitação (B)" },
    { name: "Alessandro Cruz", xp: 1200, level: 2, category: "Mudança C para D" },
    { name: "Bruno Souza", xp: 950, level: 2, category: "Primeira Habilitação (B)" },
    { name: "Mariana Alencar", xp: 500, level: 1, category: "Mudança D para E" },
  ];

  // Fetch live profiles from Supabase
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('name, xp, level, category')
          .order('xp', { ascending: false })
          .limit(20);

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted: RankingItem[] = data.map(profile => ({
            name: profile.name,
            xp: profile.xp,
            level: profile.level,
            category: profile.category
          }));
          setLiveRankings(formatted);
        }
      } catch (err) {
        console.error('Erro ao buscar rankings do Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  // Merge logic
  const currentStudent: RankingItem = {
    name: `${userName || 'Você'} (Condutor Estudante)`,
    xp: userXp,
    level: userLevel,
    category: userCategory,
    isCurrentUser: true
  };

  // Map live rankings to detect if they contain current user
  const mappedLive = liveRankings.map(item => {
    const isMe = item.name === userName || item.name === `${userName} (Condutor Estudante)`;
    return {
      ...item,
      name: isMe ? `${userName} (Condutor Estudante)` : item.name,
      isCurrentUser: isMe
    };
  });

  const isUserInLive = mappedLive.some(item => item.isCurrentUser);

  let combinedList = [...mappedLive];
  if (!isUserInLive) {
    combinedList.push(currentStudent);
  }

  // If combinedList is small, backfill with simulated students
  if (combinedList.length < 8) {
    const liveNames = new Set(liveRankings.map(item => item.name));
    const additionalSimulated = baseSimulatedRankings.filter(
      item => !liveNames.has(item.name) && item.name !== userName
    );
    combinedList = [...combinedList, ...additionalSimulated];
  }

  // Sort by XP descending to compute rank
  const sortedRankings = combinedList.sort((a, b) => b.xp - a.xp);

  // Apply optional category filters
  const filteredRankings = sortedRankings.filter(item => {
    if (selectedCategoryFilter === 'all') return true;
    if (selectedCategoryFilter === 'A') return item.category.includes('(A)') || item.category.includes('A+B');
    if (selectedCategoryFilter === 'B') return item.category.includes('(B)') || item.category.includes('A+B');
    if (selectedCategoryFilter === 'mudanca') return item.category.includes('Mudança');
    return true;
  });

  // Find user rank index
  const userRankPosition = sortedRankings.findIndex(item => item.isCurrentUser) + 1;
  const peerInFront = userRankPosition > 1 ? sortedRankings[userRankPosition - 2] : null;
  const xpDifference = peerInFront ? (peerInFront.xp - userXp) : 0;

  // Split top 3 podium entries
  const topThree = filteredRankings.slice(0, 3);
  const remainingList = filteredRankings.slice(3);

  // Styling helpers for rank positions
  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "from-yellow-400 to-amber-500 text-amber-900"; // Gold
      case 1: return "from-slate-300 to-slate-400 text-slate-800"; // Silver
      case 2: return "from-amber-600 to-orange-700 text-orange-100"; // Bronze
      default: return "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6" id="ranking-dashboard-wrapper">
      {/* Top Banner stats indicator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 dark:bg-slate-900 shadow-sm" id="ranking-banner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6" id="ranking-info-block">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-500 animate-bounce" />
              Ranking Mensal de Alunos CNH
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Fomente a competição saudável estudando diariamente. Acumule XP nos simulados e jogos para liderar o pelotão!
            </p>
          </div>

          {/* Quick HUD indicator */}
          <div className="flex items-center space-x-3 bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100/40 dark:border-slate-800 p-4 rounded-2xl" id="ranking-hud-panel">
            <div className="bg-indigo-600 text-white rounded-xl p-2.5 shadow-md shadow-indigo-100 dark:shadow-none" id="ranking-rank-badge">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block tracking-wider font-mono">Sua Posição Geral</span>
              <span className="text-lg font-black text-slate-800 dark:text-white font-mono">
                #{userRankPosition} Lugar
              </span>
              {peerInFront && (
                <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold block mt-0.5" id="xp-to-climb-info">
                  Faltam {xpDifference} XP para passar {peerInFront.name.split(' ')[0]}!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Categories togglers to view different category subsets */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-50 dark:border-slate-800 pt-5" id="ranking-filters">
          <span className="text-slate-400 text-xs px-2.5 py-1.5 flex items-center font-bold">
            Filtrar Habilitação:
          </span>
          <button
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter === 'all' ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-50 text-slate-500 dark:bg-slate-850 dark:text-slate-400 hover:bg-slate-100'}`}
            id="btn-rank-filter-all"
          >
            Todos os Estudantes
          </button>
          <button
            onClick={() => setSelectedCategoryFilter('B')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center space-x-1 ${selectedCategoryFilter === 'B' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 dark:bg-slate-850 dark:text-slate-400 hover:bg-slate-100'}`}
            id="btn-rank-filter-catb"
          >
            <Car className="w-3.5 h-3.5" />
            <span>Categoria B (Carro)</span>
          </button>
          <button
            onClick={() => setSelectedCategoryFilter('A')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center space-x-1 ${selectedCategoryFilter === 'A' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 dark:bg-slate-850 dark:text-slate-400 hover:bg-slate-100'}`}
            id="btn-rank-filter-cata"
          >
            <span>🏍️ Categoria A (Moto)</span>
          </button>
          <button
            onClick={() => setSelectedCategoryFilter('mudanca')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${selectedCategoryFilter === 'mudanca' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500 dark:bg-slate-850 dark:text-slate-400 hover:bg-slate-100'}`}
            id="btn-rank-filter-catchange"
          >
            Mudança de Categoria (D/E)
          </button>
        </div>
      </div>

      {/* --- PREMIUM TOP 3 PODIUM GRID --- */}
      {topThree.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="podium-grid">
          {topThree.map((item, idx) => {
            // Re-map index for order representation: 2nd place left, 1st place center, 3rd place right (or direct order)
            // Let's render them with explicit rank indicators to look ultra clean
            const place = idx + 1;
            const cardBg = item.isCurrentUser 
              ? 'bg-indigo-50/50 border-indigo-200 shadow-indigo-50 dark:bg-indigo-950/20 dark:border-indigo-900/60' 
              : 'bg-white border-slate-150/80 dark:bg-slate-900 dark:border-slate-800';

            return (
              <div
                key={item.name}
                className={`rounded-2xl border p-5 flex flex-col items-center text-center relative overflow-hidden transition-all hover:-translate-y-0.5 ${cardBg}`}
                id={`podium-card-place-${place}`}
              >
                {/* Crown/Trophy graphic */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(idx)} flex items-center justify-center font-black text-lg shadow-md mb-3`} id={`placement-glowing-sphere-${place}`}>
                  {place === 1 ? <Crown className="w-5 h-5" /> : <span>{place}</span>}
                </div>

                <div id={`placement-name-holder-${place}`}>
                  <h4 className="text-sm font-black text-slate-800 dark:text-white line-clamp-1">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mt-1">
                    {item.category}
                  </span>
                </div>

                <div className="mt-4 bg-slate-50 dark:bg-slate-850/80 rounded-xl px-4 py-1.5 border border-slate-100/55 dark:border-slate-800" id={`placement-xp-hud-${place}`}>
                  <span className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400 block pb-0.5">
                    {item.xp} XP
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                    Nível {item.level}
                  </span>
                </div>

                {item.isCurrentUser && (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-[8px] font-mono font-bold tracking-wider uppercase">
                    Você
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* --- LOWER RANKING LIST TABLE --- */}
      {remainingList.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100/60 dark:bg-slate-900 dark:border-slate-800 overflow-hidden shadow-sm" id="leaderboard-remaining-table">
          <div className="px-5 py-3.5 bg-slate-50/50 border-b border-slate-100 dark:bg-slate-900/60 dark:border-slate-800 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest" id="remaining-row-header">
            <span>Classificação aluno</span>
            <span>Experiência / Carreira</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-850" id="remaining-list-feed">
            {remainingList.map((item, idx) => {
              const place = idx + 4; // since slice offset is 3
              const rowBg = item.isCurrentUser 
                ? 'bg-indigo-50/20 dark:bg-indigo-950/10' 
                : 'hover:bg-slate-50/30';

              return (
                <div
                  key={item.name}
                  className={`px-5 py-3 flex items-center justify-between transition-colors ${rowBg}`}
                  id={`remaining-entry-place-${place}`}
                >
                  {/* Left block */}
                  <div className="flex items-center space-x-3" id={`remaining-left-${place}`}>
                    <span className="font-mono font-black text-xs text-slate-400 w-6">
                      #{place}
                    </span>

                    <div id={`remaining-identity-${place}`}>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                        {item.name}
                      </h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Right block */}
                  <div className="text-right flex items-center space-x-4" id={`remaining-right-${place}`}>
                    <div id={`remaining-scores-${place}`}>
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white block">
                        {item.xp} <strong className="text-[10px] text-slate-400 font-bold font-sans">XP</strong>
                      </span>
                      <span className="text-[9px] font-bold text-slate-450 block uppercase tracking-wider">
                        Nível {item.level}
                      </span>
                    </div>

                    {item.isCurrentUser && (
                      <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-400 font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                        Você
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

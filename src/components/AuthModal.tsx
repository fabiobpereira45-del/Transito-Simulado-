import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Key, Eye, EyeOff, Car, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userId: string, email: string, name: string, category: UserProfile['category']) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<UserProfile['category']>('Primeira Habilitação (A+B)');
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const categories: UserProfile['category'][] = [
    'Primeira Habilitação (A)',
    'Primeira Habilitação (B)',
    'Primeira Habilitação (A+B)',
    'Mudança C para D',
    'Mudança D para E',
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isRegister) {
        // Sign Up
        if (!name.trim()) {
          throw new Error('Por favor, informe seu nome completo.');
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim(),
              category: category,
            },
          },
        });

        if (error) throw error;
        
        if (data.user) {
          // Check if session exists (auto-signin depends on supabase setup)
          if (data.session) {
            setSuccessMsg('Cadastro realizado com sucesso!');
            onAuthSuccess(data.user.id, email, name.trim(), category);
            setTimeout(() => {
              onClose();
            }, 1500);
          } else {
            setSuccessMsg('Conta criada! Por favor, verifique sua caixa de e-mail para confirmar o cadastro.');
            // Clear inputs
            setEmail('');
            setPassword('');
            setName('');
          }
        }
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const userMetaName = data.user.user_metadata?.name || 'Condutor Estudante';
          const userMetaCat = data.user.user_metadata?.category || 'Primeira Habilitação (A+B)';
          
          setSuccessMsg('Login realizado com sucesso! Sincronizando dados...');
          onAuthSuccess(data.user.id, email, userMetaName, userMetaCat as UserProfile['category']);
          
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    } catch (err: any) {
      console.error('Erro na autenticação:', err);
      // Translate common error messages
      let msg = err.message || 'Ocorreu um erro inesperado.';
      if (msg === 'Invalid login credentials') {
        msg = 'E-mail ou senha incorretos.';
      } else if (msg.includes('Email already in use') || msg.includes('User already registered')) {
        msg = 'Este e-mail já está cadastrado.';
      } else if (msg.includes('Password should be at least')) {
        msg = 'A senha precisa ter pelo menos 6 caracteres.';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" id="auth-modal-overlay">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative"
        id="auth-modal-content"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-xl transition"
          id="btn-close-auth-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white relative overflow-hidden" id="auth-banner">
          <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
            <Key className="w-32 h-32" />
          </div>
          
          <div className="flex items-center space-x-2 text-indigo-200 font-bold uppercase tracking-widest text-[10px] font-mono">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse fill-current" />
            <span>Área da Carreira CNH</span>
          </div>
          
          <h3 className="text-2xl font-black mt-2 tracking-tight">
            {isRegister ? 'Crie sua Conta' : 'Acesse seu Painel'}
          </h3>
          <p className="text-xs text-indigo-150 mt-1 font-medium max-w-[280px]">
            {isRegister 
              ? 'Salve seu progresso de estudos e dispute vagas reais no ranking nacional.'
              : 'Conecte-se para sincronizar seus XP, conquistas e simulados realizados.'}
          </p>
        </div>

        {/* Form area */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4" id="auth-form">
          
          {/* Notification Messages */}
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 bg-rose-50 border border-rose-100 rounded-2xl dark:bg-rose-950/20 dark:border-rose-900/30 text-xs text-rose-700 dark:text-rose-450 flex items-start space-x-2"
                id="auth-error-alert"
              >
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="font-bold">{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl dark:bg-emerald-950/20 dark:border-emerald-900/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-start space-x-2"
                id="auth-success-alert"
              >
                <span className="font-bold">{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Registration Extra Fields */}
          {isRegister && (
            <div className="space-y-4 animate-fadeIn" id="register-fields-group">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Nome de Estudante</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-450" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200/80 dark:bg-slate-850 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                    id="auth-input-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Categoria da CNH</label>
                <div className="relative">
                  <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-450" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as UserProfile['category'])}
                    className="w-full bg-slate-50 focus:bg-white border border-slate-200/80 dark:bg-slate-850 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-xl py-3 pl-10 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none font-medium appearance-none cursor-pointer transition"
                    id="auth-select-category"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Standard Fields */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-450" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full bg-slate-50 focus:bg-white border border-slate-200/80 dark:bg-slate-850 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                id="auth-input-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-450" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 focus:bg-white border border-slate-200/80 dark:bg-slate-850 dark:border-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-xl py-3 pl-10 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition"
                id="auth-input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-350"
                id="btn-toggle-show-password"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl transition shadow-md shadow-indigo-100 dark:shadow-none hover:-translate-y-0.5 duration-250 flex items-center justify-center space-x-2 cursor-pointer mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            id="btn-auth-submit"
          >
            <span>{loading ? 'Processando...' : isRegister ? 'Confirmar Cadastro' : 'Entrar no Sistema'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>

          {/* Form switcher link */}
          <div className="text-center mt-5" id="auth-footer-link">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs text-indigo-650 hover:text-indigo-800 dark:text-indigo-400 font-bold hover:underline bg-transparent border-none cursor-pointer"
              id="btn-toggle-auth-mode"
            >
              {isRegister 
                ? 'Já possui uma conta? Acesse o painel' 
                : 'Não tem cadastro? Crie uma conta gratuita'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

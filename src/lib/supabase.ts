import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Atenção: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não estão configurados. Verifique seu arquivo .env.'
  );
}

const isConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        }),
        signUp: async () => ({ data: { user: null, session: null }, error: new Error('Supabase não configurado') }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase não configurado') }),
        signOut: async () => ({ error: null })
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: { code: 'PGRST116', message: 'Not found' } }),
            then: (cb: any) => cb({ data: [], error: null })
          }),
          order: () => ({
            limit: async () => ({ data: [], error: null })
          })
        }),
        upsert: async () => ({ error: null })
      })
    } as any);

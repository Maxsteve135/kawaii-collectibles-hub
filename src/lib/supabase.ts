import { createClient } from '@supabase/supabase-js';

// For development, use placeholder values if environment variables aren't set
// In production, these should be set in your environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Error was happening here - now we're providing fallback values instead of empty strings
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth?reset=true`,
  });
  return { data, error };
};

// Types for the database tables
export type CartItem = {
  id: string;
  user_id: string;
  product_id: number;
  quantity: number;
  created_at?: string;
};

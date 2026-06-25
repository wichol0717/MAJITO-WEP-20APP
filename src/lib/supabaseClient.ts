import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jntrxjvntiwrmjzsxona.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudHJ4anZudGl3cm1qenN4b25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MDc4MDYsImV4cCI6MjA5NzM4MzgwNn0.Q4IfYwFur9sOU3GPM88bOdlHNOMSygrtxdvei8ZUiQg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
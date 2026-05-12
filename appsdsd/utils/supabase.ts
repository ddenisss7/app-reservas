import { createBrowserClient } from '@supabase/ssr'

// ¡IMPORTANTE EL "export"!
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
import { createClient } from '@supabase/supabase-js'

// Get your Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Save a new cognitive profile to Supabase
 * @param traits - An object containing the user's cognitive trait values
 * @returns The inserted profile data or null if there's an error
 */
export async function saveCognitiveProfile(traits: Record<string, number>) {
  const { data, error } = await supabase
    .from('cognitive_profiles')
    .insert([{ traits, shared: false }])
    .select() // Needed to return the inserted record

  if (error) {
    console.error('Error saving profile:', error.message)
    return null
  }

  return data[0] // Contains profile_id, user_id, etc.
}

'use client'

import { createClient } from '@/utils/supabase/client'

/**
 * Service for handling Supabase authentication and database operations
 */
export const supabaseService = {
  /**
   * Sign in with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Authentication response
   */
  signInWithPassword: async (email, password) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  /**
   * Sign in with Google OAuth
   * @returns {Promise<void>}
   */
  signInWithGoogle: async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) throw error
  },

  /**
   * Sign up with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - Authentication response
   */
  signUp: async (email, password) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) throw error
    return data
  },

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  signOut: async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Get the current user session
   * @returns {Promise<Object|null>} - User session or null if not authenticated
   */
  getSession: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  /**
   * Get the current user
   * @returns {Promise<Object|null>} - User data or null if not authenticated
   */
  getUser: async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },

  /**
   * Save a generated image to the user's collection
   * @param {Object} imageData - Image data to save
   * @param {string} imageData.imageUrl - URL of the generated image
   * @param {string} imageData.prompt - Prompt used to generate the image
   * @param {string} imageData.style - Style used for the image
   * @param {string} imageData.aspectRatio - Aspect ratio of the image
   * @returns {Promise<Object>} - Saved image data
   */
  saveGeneratedImage: async (imageData) => {
    const supabase = createClient()
    const user = await supabaseService.getUser()
    
    if (!user) throw new Error('User not authenticated')
    
    const { data, error } = await supabase
      .from('images')
      .insert({
        user_id: user.id,
        img_url: imageData.imageUrl,
        prompt: imageData.prompt,
        negative_prompt: imageData.negativePrompt,
        style: imageData.style,
        ratio: imageData.aspectRatio,
        color: imageData.color,
        created_at: new Date().toISOString(),
      })
      .select()
    
    if (error) throw error
    return data[0]
  },

  /**
   * Get user's generated images
   * @returns {Promise<Array>} - List of user's generated images
   */
  getUserImages: async () => {
    const supabase = createClient()
    const user = await supabaseService.getUser()
    
    if (!user) throw new Error('User not authenticated')
    
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

'use client'

import { useState, useEffect } from 'react'
import { supabaseService } from '@/service/supabase.service'
import { Loader2, User, ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [userImages, setUserImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true)
        const userData = await supabaseService.getUser()
        setUser(userData)

        if (userData) {
          // Fetch user's saved images
          const images = await supabaseService.getUserImages()
          setUserImages(images)
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load profile data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121316] px-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#f2330d]" />
        <p className="mt-4 text-white">Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121316] px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Sign In Required</h1>
          <p className="text-[#6C727F] mt-2">Please sign in to view your profile</p>
        </div>
        <Link
          href="/auth"
          className="px-6 py-3 bg-[#f2330d] text-white rounded-lg hover:bg-[#f2200d] transition-colors"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col pt-[52px] px-[32px] pb-[32px] bg-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-8">Your Profile</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-[#1E1F25] rounded-xl p-6 mb-8 border border-[#394150]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#f2330d] text-white text-2xl font-bold">
              {user.email?.charAt(0).toUpperCase() || <User size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{user.email}</h2>
              <p className="text-[#6C727F]">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Your Generated Images</h2>
        
        {userImages.length === 0 ? (
          <div className="bg-[#1E1F25] rounded-xl p-8 border border-[#394150] text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-[#6C727F]" />
            <p className="mt-4 text-[#E4E4E7] text-lg">No images yet</p>
            <p className="mt-2 text-[#6C727F]">Generate your first image to see it here</p>
            <Link
              href="/generate"
              className="mt-6 inline-block px-6 py-3 bg-[#f2330d] text-white rounded-lg hover:bg-[#f2200d] transition-colors"
            >
              Generate Images
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userImages.map((image) => (
              <div key={image.id} className="bg-[#1E1F25] rounded-xl overflow-hidden border border-[#394150]">
                <img
                  src={image.image_url}
                  alt={image.prompt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-white text-sm line-clamp-2">{image.prompt}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#6C727F] text-xs">{image.style}</span>
                    <span className="text-[#6C727F] text-xs">{image.aspect_ratio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

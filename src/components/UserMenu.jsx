'use client'

import { useState, useEffect, useRef } from 'react'
import { supabaseService } from '@/service/supabase.service'
import { User, LogOut } from 'lucide-react'

export function UserMenu() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await supabaseService.getUser()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    // Handle clicks outside the menu to close it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await supabaseService.signOut()
      window.location.href = '/auth'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="h-8 w-8 rounded-full bg-[#1E1F25] animate-pulse"></div>
    )
  }

  if (!user) {
    return (
      <a 
        href="/auth" 
        className="flex items-center gap-2 px-4 py-2 bg-[#1E1F25] hover:bg-[#2a2b33] text-white rounded-lg transition-colors"
      >
        <User size={16} />
        <span>Sign In</span>
      </a>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f2330d] text-white hover:bg-[#f2200d] transition-colors"
      >
        {user.email?.charAt(0).toUpperCase() || <User size={18} />}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1E1F25] border border-[#394150] rounded-lg shadow-lg overflow-hidden z-10">
          <div className="px-4 py-3 border-b border-[#394150]">
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <a 
              href="/profile" 
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#E4E4E7] hover:bg-[#2a2b33]"
            >
              <User size={16} />
              Profile
            </a>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#E4E4E7] hover:bg-[#2a2b33]"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { AuthForm } from '@/components/AuthForm'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121316] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">AI Image Generator</h1>
          <p className="text-[#6C727F] mt-2">Sign in to save and manage your generated images</p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  )
}

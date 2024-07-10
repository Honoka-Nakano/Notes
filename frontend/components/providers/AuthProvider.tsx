'use client'

import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
    children: React.ReactNode
}

// 認証プロバイダ
const AuthProvider = ({ children }: AuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider

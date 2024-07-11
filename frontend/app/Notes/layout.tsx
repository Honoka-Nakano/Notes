import Navigation from '@/components/auth/Navigation'
import AuthProvider from '@/components/providers/AuthProvider'
import ToastProvidere from '@/components/providers/ToastProvider'
import { getAuthSession } from '@/lib/nextauth'

interface NotesLayoutProps {
    children: React.ReactNode
}

// レイアウト
const NotesLayout = async ({ children }: NotesLayoutProps) => {
    const user = await getAuthSession()
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default NotesLayout

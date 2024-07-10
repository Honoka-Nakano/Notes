import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import Profile from '@/components/settings/Profile'

// プロフィールページ
const ProfilePage = async () => {
    // 認証情報
    const user = await getAuthSession()

    if (!user) {
        redirect('/Auth/Login')
    }

    return <Profile user={user} />
}

export default ProfilePage

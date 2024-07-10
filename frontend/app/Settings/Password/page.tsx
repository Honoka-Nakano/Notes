import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import Password from '@/components/settings/Password'

// パスワード変更ページ
const PasswordPage = async () => {
    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect('/Auth/Login')
    }

    return <Password user={user} />
}

export default PasswordPage

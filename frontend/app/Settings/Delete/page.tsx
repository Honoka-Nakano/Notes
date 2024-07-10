import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import Delete from '@/components/settings/Delete'

// アカウント削除ページ
const DeletePage = async () => {
    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect('/Auth/Login')
    }

    return <Delete user={user} />
}

export default DeletePage

import { getUserDetail } from '@/actions/user'
import UserDetail from '@/components/user/UserDetail'

interface UserDetailPageProps {
    params: {
        userId: string
    }
}

// ユーザ詳細ページ
const UserDetailPage = async ({ params }: UserDetailPageProps) => {
    const { userId } = params

    // ユーザ投稿詳細取得
    const { success, user } = await getUserDetail({ userId })

    if (!success) {
        return (
            <div className='text-center text-sm text-gray-500'>
                ユーザの取得に失敗しました
            </div>
        )
    }

    if (!user) {
        return (
            <div className='text-center text-sm text-gray-500'>
                ユーザは存在しません
            </div>
        )
    }

    return <UserDetail user={user} />
}

export default UserDetailPage

import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import AllNotes from '@/components/notes/AllNotes'

// 全てのメモを表示するページ
const AllNotesPage = async () => {
    // 認証情報
    const user = await getAuthSession()

    if (!user) {
        redirect('/Auth/Login')
    }

    return <AllNotes user={user} />
}

export default AllNotesPage

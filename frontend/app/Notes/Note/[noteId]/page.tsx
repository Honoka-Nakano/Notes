import { getAuthSession } from "@/lib/nextauth"
import { getNoteDetail } from '@/actions/note'
import NoteDetail from "@/components/notes/NoteDetail"
import { redirect } from "next/navigation"

interface NoteDetailProps {
    params: {
        noteId: string
    }
}

// 投稿詳細ページ
const NoteDetailPage = async ({ params }: NoteDetailProps) => {
    const { noteId } = params

    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect('Auth/Login/')
    }

    // 投稿詳細取得
    const { success, note } = await getNoteDetail({ noteId: noteId, accessToken: user.accessToken })

    if (!success) {
        return (
            <div className="text-center text-sm text-gray-500">
                投稿の取得に失敗しました
            </div>
        )
    }

    if (!note) {
        return (
            <div className="text-center text-sm text-gray-500">投稿はありません</div>
        )
    }

    return <NoteDetail note={note} user={user} />
}

export default NoteDetailPage

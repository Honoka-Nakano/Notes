import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import { getNoteDetail } from '@/actions/note'
import NoteEdit from '@/components/notes/NoteEdit'

interface NoteEditProps {
    params: {
        noteId: string
    }
}

// 投稿編集ページ
const NoteEditPage = async ({ params }: NoteEditProps) => {
    const { noteId } = params

    // 認証情報取得
    const user = await getAuthSession()

    if (!user) {
        redirect('/Auth/Login')
    }

    // 投稿詳細取得
    const { success, note } = await getNoteDetail({ noteId: noteId, accessToken: user.accessToken })

    if (!success) {
        return (
            <div className='text-center text-sm text-gray-500'>
                投稿の取得に失敗しました
            </div>
        )
    }

    if (!note) {
        return (
            <div className='text-center text-sm text-gray-500'>投稿はありません</div>
        )
    }

    if (note.user.uid !== user.uid) {
        return <div className='text-center'>編集できません</div>
    }

    return <NoteEdit user={user} note={note} />
}

export default NoteEditPage

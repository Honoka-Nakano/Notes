import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/nextauth'
import { getAllNotes } from '@/actions/note'
import Notes from '@/components/notes/Notes'
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from '@/components/ui/resizable'

interface NotesLayoutProps {
    children: React.ReactNode
}

// レイアウト
const NotesLayout = async ({ children }: NotesLayoutProps) => {
    const user = await getAuthSession()

    if (!user) {
        redirect('Auth/Login')
    }

    const { success, notes } = await getAllNotes({ accessToken: user.accessToken })

    if (!success) {
        return (
            <div className='text-center text-sm text-gray-500'>
                投稿の取得に失敗しました
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className='text-center text-sm text-gray-500'>投稿がありません</div>
        )
    }

    return (
        <div className='h-full'>
            <ResizablePanelGroup direction='horizontal'>
                <ResizablePanel defaultSize={70}>
                    <div className='p-2 grid grid-cols-1 gap-5 md:grid-cols-3'>
                        {notes.map((note) => (
                            <Notes user={user} key={note.uid} note={note} />
                        ))}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30}>
                    <div className='px-4'>
                        {children}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default NotesLayout

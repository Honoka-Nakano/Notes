'use client'

import { UserType } from '@/lib/nextauth'
import { NoteType } from '@/actions/note'
import { formatDistance } from 'date-fns'
import { ja } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

interface NotesProps {
    user: UserType
    note: NoteType
}

// 投稿一覧のアイテム
const Notes = ({ user, note }: NotesProps) => {
    // 日付
    const updatedAt = new Date(note.updated_at ?? 0)
    const now = new Date()
    const date = formatDistance(updatedAt, now, { addSuffix: true, locale: ja })

    return (
        <div className='border rounded-md flex flex-col'>
            <Link href={`/Notes/Note/${note.uid}`}>
                <div className='aspect-[16/9] relative overflow-hidden rounded-t-md'>
                    <Image
                        fill
                        src={note.image || '/noImage.png'}
                        alt='thumbnail'
                        className='object-cover rounded-t-md transition-all hover:scale-105'
                    />
                </div>
            </Link>

            <div className='flex flex-col h-full p-3'>
                <div className='flex-1 mb-3'>
                    <div className='font-bold hover:underline break-words'>
                        <Link href={`/Notes/Note/${note.uid}`}>{note.title}</Link>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <Link href={`/User/${note.user.uid}`}>
                        <div className='relative w-6 h-6 flex-shrink-0'>
                            <Image
                                src={note.user.avatar || '/defaultIcon.png'}
                                className='rounded-full object-cover'
                                alt={note.user.name || 'avatar'}
                                fill
                            />
                        </div>
                    </Link>

                    <div className='text-xs'>
                        <div className='hover:underline break-words'>
                            <Link href={`/User/${note.user.uid}`}>{note.user.name}</Link>
                        </div>
                        <div className='text-gray-400'>{date}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes

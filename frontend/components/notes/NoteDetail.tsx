'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { NoteType } from '@/actions/note'
import { UserType } from '@/lib/nextauth'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface NoteDetailProps {
    note: NoteType
    user: UserType | null
}

// 投稿詳細
const NoteDetail = ({ note, user }: NoteDetailProps) => {
    return (
        <div className='space-y-8'>
            <div className='aspect-[16/9] relative'>
                <Image
                    fill
                    src={note.image || '/noImage.png'}
                    alt='thumbnail'
                    className='object-cover rounded-md'
                />
            </div>

            <div className='font-bold text-2xl break-words'>{note.title}</div>

            <div>
                <div className='flex items-center space-x-2'>
                    <Link href={`/User/${note.user.uid}`}>
                        <div className='relative w-9 h-9 flex-shrink-0'>
                            <Image
                                src={note.user.avatar || '/defaultIcon.png'}
                                className='rounded-full object-cover'
                                alt={note.user.name || 'avatar'}
                                fill
                            />
                        </div>
                    </Link>

                    <div>
                        <div className='text-sm hover:underline break-words'>
                            <Link href={`/User/${note.user.uid}`}>{note.user.name}</Link>
                        </div>
                        <div className='text-xs text-gray-400'>
                            {format(new Date(note.updated_at), 'yyyy/MM/dd HH:mm')}
                        </div>
                    </div>
                </div>
            </div>

            <div className='leading-relaxed break-words whitespace-pre-wrap'>
                {note.content}
            </div>

            {note.user.uid === user?.uid && (
                <div className='flex items-center justify-end space-x-1'>
                    <Link href={`/Notes/Note/${note.uid}/Edit`}>
                        <div className='hover:bg-gray-100 p-2 rounded-full'>
                            <Pencil className='w-5 h-5' />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default NoteDetail

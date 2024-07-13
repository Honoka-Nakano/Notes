'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserType } from '@/lib/nextauth'
import UserNavigation from '@/components/auth/UserNavigation'
import NewNote from '@/components/notes/NewNote'

interface NavigationProps {
    user: UserType | null
}

// Navigation
const Navigation = ({ user }: NavigationProps) => {
    return (
        <header className='shadow-lg shadow-gray-100 mb-10'>
            <div className='px-8 mx-auto flex items-center justify-between py-3'>
                <Link href='/' className='cursor-pointer text-xl font-bold'>
                    Notes
                </Link>

                {user ? (
                    <div className='flex items-center space-x-6'>
                        {/*
                        <Button asChild variant='default' className='font-bold'>
                            <Link href='/Notes/New'>新規投稿</Link>
                            <NewNote />
                        </Button>
                        */}
                        <NewNote user={user} />
                        <UserNavigation user={user} />
                    </div>
                ) : (
                    <div className='flex items-center space-x-1'>
                        <Button asChild variant='ghost' className='font-bold'>
                            <Link href='/Auth/Login'>ログイン</Link>
                        </Button>
                        <Button asChild variant='default' className='font-bold'>
                            <Link href='/Auth/Signup'>新規登録</Link>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navigation

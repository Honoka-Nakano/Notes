// メインページ
import Image from 'next/image'
import { UserType } from '@/lib/nextauth'
import UserHome from '@/components/home/UserHome'
import { getAuthSession } from '@/lib/nextauth'

interface HomeProps {
  user: UserType | null
}

const Home = ({ user }: HomeProps) => {
  return (
    <div>
      {user ?(
        <div className='w-full'>
          <UserHome />
        </div>
      ) : (
        <div className='w-11/12 h-full mx-auto'>
          <div className='h-[300px] flex items-center'>
            <p className='w-full font-bold text-5xl text-center'>Let&apos;s Share All Notes easily.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

// import SidebarNav from '@/components/notes/SidevarNav'
import AllNotes from '@/components/notes/AllNotes'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'

// メインページ
const Home = async () => {
  const user = await getAuthSession()

  if (user) {
    redirect('/Notes/All')
  }

  return (
    <div>
      <div>
        <div className='w-11/12 h-full mx-auto'>
          <div className='h-[300px] flex items-center'>
            <p className='w-full font-bold text-5xl text-center'>Let&apos;s Share All Notes easily.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

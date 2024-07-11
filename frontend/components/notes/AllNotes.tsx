'use client'

import { UserType } from '@/lib/nextauth'

interface AllNotesProps {
    user: UserType
}

const AllNotes = ({ user }: AllNotesProps) => {
    return (
        <div>All Notes</div>
    )
}

export default AllNotes

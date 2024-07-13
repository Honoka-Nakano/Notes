'use server'

import { UserType } from '@/lib/nextauth'
import { headers } from 'next/headers'

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = process.env.API_URL

    if (!apiUrl) {
        return { success: false, error: 'API URLが設定されていません' }
    }

    try {
        const response = await fetch(`${apiUrl}${url}`, options)

        if (!response.ok) {
            const errorData = await response.json()
            // return { success: false, error: 'APIでエラーが発生しました' }
            return { success: false, error: errorData}
        }

        // Content-Type ヘッダーが application/json の場合のみ，JSON を解析する
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            return { success: true, data }
        }

        // データなしで成功を返す
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'ネットワークエラーが発生しました' }
    }
}

// 投稿一覧取得
export interface NoteType {
    uid: string
    user: UserType
    image: string | undefined
    title: string
    content: string
    tags: string
    updated_at: string
    created_at: string
}

export const getAllNotes = async ({ accessToken }: { accessToken: string }) => {

    const options = {
        method: 'GET',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }

    // 投稿一覧取得
    const result = await fetchAPI('/api/all-notes/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, notes: [] }
    }

    const notes: NoteType[] = result.data

    return { success: true, notes }
}

// 投稿詳細取得
interface UserNoteType {
    noteId: string
    accessToken: string
}

export const getNoteDetail = async ({ noteId, accessToken }: UserNoteType) => {

//    const options: RequestInit = {
//        method: 'GET',
//        cache: 'no-store',
//    }

    const options = {
        method: 'GET',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }

    // 投稿詳細取得
    const result = await fetchAPI(`/api/note-detail/${noteId}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, note: null }
    }

    const note: NoteType = result.data

    return { success: true, note}
}

// 新規投稿
interface CreateNoteType {
    accessToken: string
    title: string
    content: string
    image: string | undefined
    tags?: string[]
}

export const createNote = async ({
    accessToken,
    title,
    content,
    image,
    tags = [],
}: CreateNoteType) => {
    const body = JSON.stringify({
        title: title,
        content: content,
        image: image,
        tags: tags,
    })

    const options = {
        method: 'POST',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body,
    }

    // 新規投稿を送信
    const result = await fetchAPI('/api/notes/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, note: null}
    }

    const note: NoteType = await result.data

    return { success: true, note}
}

interface UpdateNoteType {
    accessToken: string
    noteId: string
    title: string
    content: string
    image: string | undefined
    tags?: string[]
}

// 投稿編集
export const updateNote = async ({
    accessToken,
    noteId,
    title,
    content,
    image,
    tags = [],
}: UpdateNoteType) => {
    const body = JSON.stringify({
        title: title,
        content: content,
        image: image,
        tags: tags,
    })

    const options = {
        method: 'PATCH',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body,
    }

    // 投稿編集を送信
    const result = await fetchAPI(`/api/notes/${noteId}`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

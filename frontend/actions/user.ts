'use server'

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = process.env.API_URL

    if (!apiUrl) {
        return { success: false, error: 'API URLが設定されていません' }
    }

    try {
        const response = await fetch(`${apiUrl}${url}`, options)

        if (!response.ok) {
            return { success: false, error: 'APIでエラーが発生しました' }
        }

        // Content-Type ヘッダーが application/json の場合のみ JSON を解析する
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

// アカウント仮登録
interface TemporarrySignupProps {
    name: string
    email: string
    password: string
    rePassword: string
}

export const temporarrySignup = async ({
    name,
    email,
    password,
    rePassword,
}: TemporarrySignupProps) => {
//    try {
//        const body = JSON.stringify({
//            name,
//            email,
//            password,
//            re_password: rePassword
//        })

        // アカウント仮登録を送信
//        const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/`, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body,
//        })

        // APIレスポンスが正常でない場合、失敗を返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//            }
//        }

        // 成功を返す
//        return {
//            success: true,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時に失敗を返す
//        return {
//            success: false,
//        }
//    }
    const body = JSON.stringify({
        name,
        email,
        password,
        re_password: rePassword,
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }

    // アカウント仮登録を送信
    const result = await fetchAPI('/api/auth/users/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

// アカウント本登録
interface CompleteSignupProps {
    uid: string
    token: string
}

export const completeSignup = async ({ uid, token }: CompleteSignupProps) => {
//    try {
//       const body = JSON.stringify({
//            uid,
//            token,
//        })

        // アカウント本登録を送信
//       const apiRes = await fetch(
//           `${process.env.API_URL}/api/auth/users/activation/`,
//            {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body,
//            }
//        )

//        if (!apiRes.ok) {
//           return {
//                success: false,
//            }
//        }

        // 成功を返す
//        return {
//            success: true,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時に失敗を返す
//        return {
//            success: false,
//        }
//    }
    const body = JSON.stringify({
        uid,
        token,
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }

    // アカウント本登録を送信
    const result = await fetchAPI('/api/auth/users/activation/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

// パスワード再設定
interface ForgotPasswordProps {
    email: string
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
//    try {
//        const body = JSON.stringify({
//            email,
//        })

        // パスワード再設定を送信
//        const apiRes = await fetch(
//            `${process.env.API_URL}/api/auth/users/reset_password/`,
//            {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body,
//            }
//        )

        // APIレスポンスが正常出ない場合、失敗を返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//            }
//        }

        // 成功を返す
//        return {
//            success: true,
//        }
//    } catch (error) {
//        console.error(error)
//        // エラー発生時に失敗を返す
//        return {
//            success: false,
//        }
//    }
    const body = JSON.stringify({
        email,
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }

    // パスワード再設定を送信
    const result = await fetchAPI('/api/auth/users/reset_password/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

// パスワード再設定確認
interface ResetPasswordProps {
    uid: string
    token: string
    newPassword: string
    reNewPassword: string
}

export const resetPassword = async ({
    uid,
    token,
    newPassword,
    reNewPassword,
}: ResetPasswordProps) => {
//    try {
//        const body = JSON.stringify({
//            uid,
//            token,
//            new_password: newPassword,
//            re_new_password: reNewPassword,
//        })

        // パスワード再設定確認を送信
//        const apiRes = await fetch(
//            `${process.env.API_URL}/api/auth/users/reset_password_confirm/`,
//            {
//                method: 'POST',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body,
//            }
//        )

        // APIレスポンスが正常でない場合失敗を返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//            }
//        }

        // 成功を返す
//        return {
//            success: true,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時に失敗を返す
//        return {
//            success: false,
//        }
//    }
    const body = JSON.stringify({
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
    })

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }

    // パスワード再設定確認を送信
    const result = await fetchAPI(
        '/api/auth/users/reset_password_confirm/',
        options
    )

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

// ユーザ情報取得
export interface UserDetailType {
    uid: string
    name: string
    email: string
    avatar: string | undefined
    introduction: string
    created_at: string
}

interface GetUserDetailProps {
    userId: string
}

export const getUserDetail = async ({ userId }: GetUserDetailProps) => {
//    try {
        // APIからユーザ情報を取得
//        const apiRes = await fetch(`${process.env.API_URL}/api/users/${userId}/`, {
//            method: 'GET',
//            cache: 'no-store',
//        })

        // APIレスポンスが正常でない場合は失敗とnullを返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//                user: null,
//            }
//        }

        // レスポンスをJSONとして解析しユーザ詳細を取得
//        const user: UserDetailType = await apiRes.json()

        // 成功と取得したユーザ詳細を返す
//        return {
//            success: true,
//            user,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時
//        return {
//            success: false,
//            user: null,
//        }
//    }
    const options: RequestInit = {
        method: 'GET',
        cache: 'no-store',
    }

    // APIからユーザ詳細を取得
    const result = await fetchAPI(`/api/users/${userId}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, user: null }
    }

    const user: UserDetailType = result.data

    return { success: true, user }
}

// プロフィール編集
interface UpdateUserProps {
    accessToken: string
    name: string
    introduction: string | undefined
    avatar: string | undefined
}

export const updateUser = async ({
    accessToken,
    name,
    introduction,
    avatar,
}: UpdateUserProps) => {
//    try {
//        const body = JSON.stringify({
//            name,
//            introduction,
//            avatar,
//        })

        // プロフィール編集を送信
//        const apiRes = await fetch(`${process.env.API_URL}/api/auth/users/me/`, {
//            method: 'PATCH',
//            headers: {
//                Authorization: `JWT ${accessToken}`,
//                'Content-Type': 'application/json',
//            },
//            body,
//        })

        // APIレスポンスが正常でない場合失敗とnullを返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//                user: null,
//            }
//        }

        // レスポンスをJSONとして解析しユーザ詳細を取得
//        const user: UserDetailType = await apiRes.json()

        // 成功と取得したユーザ詳細を返す
//        return {
//            success: true,
//            user,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時に失敗とnullを返す
//        return {
//            success: false,
//            user: null,
//        }
//    }
    const body = JSON.stringify({
        name,
        introduction,
        avatar,
    })

    const options = {
        method: 'PATCH',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body,
    }

    // プロフィール編集を送信
    const result = await fetchAPI('/api/auth/users/me/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, user: null }
    }

    const user: UserDetailType = result.data

    return { success: true, user }
}

// パスワード変更
interface UpdatePasswordProps {
    accessToken: string
    currentPassword: string
    newPassword: string
    reNewPassword: string
}

export const updatePassword = async ({
    accessToken,
    currentPassword,
    newPassword,
    reNewPassword,
}: UpdatePasswordProps) => {
//    try {
//        const body = JSON.stringify({
//            current_password: currentPassword,
//            new_password: newPassword,
//            re_new_password: reNewPassword,
//        })

        // パスワード変更
//        const apiRes = await fetch(
//            `${process.env.API_URL}/api/auth/users/set_password/`,
//            {
//                method: 'POST',
//                headers: {
//                    Authorization: `JWT ${accessToken}`,
//                    'Content-Type': 'application/json',
//                },
//                body,
//            }
//        )

        // APIレスポンスが正常でない場合は失敗を返す
//        if (!apiRes.ok) {
//            return {
//                success: false,
//            }
//        }

        // 成功を返す
//        return {
//            success: true,
//        }
//    } catch (error) {
//        console.error(error)
        // エラー発生時に失敗を返す
//        return {
//            success: false,
//        }
//    }
    const body = JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        re_new_password: reNewPassword,
    })

    const options = {
        method: 'POST',
        headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body,
    }

    // パスワード変更を送信
    const result = await fetchAPI('/api/auth/users/set_password/', options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

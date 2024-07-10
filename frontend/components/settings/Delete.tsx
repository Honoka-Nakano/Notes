'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { deleteAccount } from '@/actions/user'
import { UserType } from '@/lib/nextauth'
import toast from 'react-hot-toast'

// 入力データの検証ルールを定義
const schema = z
    .object({
        currentPassword: z
            .string()
            .min(3, { message: '確認のためにパスワードを入力してください' }),
        repeatedPassword: z
            .string()
            .min(3, { message: '確認のためにパスワードを入力してください' }),
    })
    .refine((data) => data.currentPassword === data.repeatedPassword, {
        message: 'パスワードが一致しません',
        path: ['repeatedPassword'],
    })

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface DeleteProps {
    user: UserType
}

const Delete = ({ user }: DeleteProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<InputType>({
        // 入力値の検証
        resolver: zodResolver(schema),
        // 初期値
        defaultValues: {
            currentPassword: '',
            repeatedPassword: '',
        },
    })

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        setIsLoading(true)

        try {
            // アカウント削除
            const res = await deleteAccount({
                accessToken: user.accessToken,
                currentPassword: data.currentPassword,
            })

            if (!res.success) {
                toast.error('アカウントの削除に失敗しました')
                return
            }

            toast.success('アカウントの削除に成功しました')
            signOut({ callbackUrl: '/' })
        } catch (error) {
            toast.error('アカウントの削除に失敗しました')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className='text-xl font-bold text-center mb-10'>アカウント削除</div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className='w-full bg-red-500 hover:bg-red-700'>
                        削除
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            アカウント削除
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            アカウント削除のためにパスワードを入力してください。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                            <FormField
                                control={form.control}
                                name='currentPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>現在のパスワード</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='repeatedPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>現在のパスワード（確認用）</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={isLoading} type='submit' className='w-full bg-red-500 hover:bg-red-700'>
                                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                                削除
                            </Button>
                        </form>
                    </Form>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            キャンセル
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Delete

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuthSession } from '@/lib/nextauth'
import "./globals.css";
import Navigation from '@/components/auth/Navigation'
import AuthProvider from "@/components/providers/AuthProvider"
import ToastProvider from "@/components/providers/ToastProvider"
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes",
  description: "Let's share all notes easily",
};

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {

// 変更（2024-07-07）
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

  // 認証情報取得
  const user = await getAuthSession()

  return (
    <html lang="ja" className="h-[100svh]">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation user={user} />
            <ToastProvider />

            <main className="container h-full mx-auto max-w-screen-md flex-1 px-2">
              {children}
            </main>

            {/* フッター */}
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright &copy; All rights reserved |{' '}
                <a
                  href="https://github.com/Honoka-Nakano/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Keisuke Nakano
                </a>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout

import { ReposPostsProvider } from '@/app/context/repos-posts-provider'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Github Blog',
  description: 'Transform your github into a blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      className={nunito.className}
      suppressHydrationWarning={true}
    >
      <body>
        <ReposPostsProvider>
          <main className="flex flex-col items-center justify-center pb-4">
            <header className="flex min-h-72 w-full before:w-full before:bg-logo before:bg-cover before:bg-center before:bg-no-repeat" />
            {children}
          </main>
        </ReposPostsProvider>
      </body>
    </html>
  )
}

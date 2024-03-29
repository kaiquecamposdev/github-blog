import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { IssuesPostsProvider } from './context/issues-posts-provider'
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
      <IssuesPostsProvider>
        <body>
          <header className="flex min-h-[296px] w-full before:w-full before:bg-logo before:bg-cover before:bg-center before:bg-no-repeat" />
          {children}
        </body>
      </IssuesPostsProvider>
    </html>
  )
}

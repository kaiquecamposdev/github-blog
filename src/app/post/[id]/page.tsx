import { ContentPost } from '@/components/content-post'
import { Header } from '@/components/header-post'

export default function Post() {
  return (
    <div className="flex w-full max-w-main-content flex-col">
      <section className="z-10 flex w-full">
        <Header />
      </section>
      <section className="px-10 py-8">
        <ContentPost />
      </section>
    </div>
  )
}

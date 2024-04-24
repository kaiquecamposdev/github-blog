import { CountPosts } from '@/components/count-posts'
import { Header } from '@/components/header-home'
import { PaginationContainer } from '@/components/pagination-home'
import { ReposPosts } from '@/components/repos-posts'
import { SearchRepos } from '@/components/search-repos'

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="z-10 flex w-full max-w-main-content flex-col">
        <Header />
        <section className="flex flex-col gap-12 pt-[58px]">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between">
              <strong className="text-lg font-bold text-base-subtitle">
                Publicações
              </strong>
              <CountPosts />
            </div>
            <div>
              <SearchRepos />
            </div>
          </div>
          {<ReposPosts /> || (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold text-base-title">
                Não há publicações
              </h1>
              <p className="text-base-text">
                Não há publicações no momento. Volte mais tarde.
              </p>
            </div>
          )}
        </section>
        <PaginationContainer />
      </div>
    </section>
  )
}

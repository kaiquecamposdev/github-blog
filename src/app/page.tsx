'use client'

import { useState } from 'react'
import { HasNoIssuePost } from './components/has-no-issue-post'
import { Header } from './components/header'
import { IssuesPosts } from './components/issues-posts'

export default function Home() {
  const [search, setSearch] = useState<string>('')

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="z-10 flex w-full max-w-main-content flex-col">
        <Header />
        <div className="flex flex-col gap-12 pt-[58px]">
          <section className="flex w-full flex-col gap-2">
            <div className="flex w-full justify-between">
              <strong className="text-lg font-bold text-base-subtitle">
                Publicações
              </strong>
              <span className="text-sm text-base-span">
                {0 + ' '}
                Publicações
              </span>
            </div>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Buscar conteúdo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border-[1px] border-base-border bg-base-input px-4 py-3 text-base text-white placeholder:text-base-label"
              />
            </div>
          </section>
          {<IssuesPosts /> || <HasNoIssuePost />}
        </div>
      </section>
    </main>
  )
}

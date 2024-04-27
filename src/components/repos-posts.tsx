'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { CreatePagination } from '@/utils/create-pagination'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useContext } from 'react'
import Markdown from 'react-markdown'

export function ReposPosts() {
  const { reposPosts, search, indexThePage } = useContext(ReposPostsContext)

  const paginatedRepos = CreatePagination(reposPosts)

  const formattedReposPost = paginatedRepos[indexThePage].filter((repo) => {
    if (!repo.name || !repo.description) {
      return repo
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <ul className="grid grid-cols-2 gap-8">
      {formattedReposPost.map(({ id, name, created_at, description }) => {
        return (
          <li
            key={id}
            className="h-[260px] w-full max-w-[416px] cursor-pointer rounded-[10px] bg-base-post p-8 transition-shadow hover:ring-2 hover:ring-slate-500"
          >
            <Link
              className="flex h-full flex-col gap-5"
              href={`post/${id}` || '#'}
            >
              <span className="flex gap-4">
                <h1 className="w-full text-xl font-bold text-base-title">
                  {name || 'Não há título'}
                </h1>
                <time className="text-nowrap text-sm text-base-span">
                  {formatDistance(created_at, new Date(), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </span>
              <Markdown className="overflow-hidden text-base-text">
                {description || 'Não há descrição'}
              </Markdown>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

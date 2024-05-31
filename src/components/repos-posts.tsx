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

  const formattedReposPost = reposPosts.filter((repo) => {
    if (!repo.name || !repo.description) {
      return []
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) &&
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  const paginatedRepos = CreatePagination(formattedReposPost)

  return (
    <ul className="grid grid-cols-posts gap-8">
      {paginatedRepos[indexThePage].map(
        ({ id, name, created_at, description }) => {
          return (
            <li key={id} className="h-64 w-[416px]">
              <Link
                className="flex h-full w-full flex-col gap-5 rounded-md bg-card p-8 transition-shadow hover:ring-2 hover:ring-muted"
                href={`post/${id}` || '#'}
              >
                <span className="flex gap-4">
                  <h1 className="w-full text-xl font-bold text-title">
                    {name}
                  </h1>
                  <time className="text-nowrap text-sm text-muted">
                    {formatDistance(created_at, new Date(), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </time>
                </span>
                <Markdown className="overflow-hidden text-primary">
                  {description}
                </Markdown>
              </Link>
            </li>
          )
        },
      )}
    </ul>
  )
}

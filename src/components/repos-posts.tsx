'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { CreatePagination } from '@/utils/create-pagination'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { Skeleton } from './ui/skeleton'

export function ReposPosts() {
  const { reposPosts, search, indexThePage } = useContext(ReposPostsContext)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }
  }, [])

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
                href={`post/${id}` || '#'}
                className="flex h-full w-full flex-1 flex-col gap-5 rounded-md bg-card p-8 transition-shadow hover:ring-2 hover:ring-muted"
              >
                <div className="flex flex-shrink-0 justify-between">
                  {loading ? (
                    <span className="flex flex-col gap-3">
                      <Skeleton className="h-5 w-52 bg-muted" />
                      <Skeleton className="h-5 w-32 bg-muted" />
                    </span>
                  ) : (
                    <h1 className="w-full text-xl font-bold text-title">
                      {name || 'Sem título'}
                    </h1>
                  )}

                  {loading ? (
                    <Skeleton className="h-4 w-20 bg-muted" />
                  ) : (
                    <time className="text-nowrap text-sm text-muted">
                      {formatDistance(created_at, new Date(), {
                        addSuffix: true,
                        locale: ptBR,
                      }) || 'Sem data'}
                    </time>
                  )}
                </div>

                <div className="flex-auto">
                  {loading ? (
                    <span className="flex flex-col gap-3">
                      <Skeleton className="h-4 w-80 bg-muted" />
                      <Skeleton className="h-4 w-72 bg-muted" />
                      <Skeleton className="h-4 w-full bg-muted" />
                      <Skeleton className="h-4 w-56 bg-muted" />
                    </span>
                  ) : (
                    <Markdown className="overflow-hidden text-left text-primary">
                      {description?.length >= 250
                        ? description?.slice(0, 250) + '...'
                        : description || 'Sem conteúdo'}
                    </Markdown>
                  )}
                </div>
              </Link>
            </li>
          )
        },
      )}
    </ul>
  )
}

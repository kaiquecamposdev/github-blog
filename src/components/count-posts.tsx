'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

export function CountPosts() {
  const [loading, setLoading] = useState(true)
  const { reposPosts, search } = useContext(ReposPostsContext)

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }
  })

  const formattedReposPost = reposPosts.filter((repo) => {
    if (!repo.name || !repo.description) {
      return []
    }

    return (
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  return loading ? (
    <>
      <Skeleton className="h-6 w-36 bg-muted" />
      <Skeleton className="h-4 w-28 bg-muted" />
    </>
  ) : (
    <>
      <strong className="text-lg font-bold text-subtitle">Publicações</strong>
      <span className="text-sm text-muted">
        {formattedReposPost.length + ' ' || 0 + ' '} Publicações
      </span>
    </>
  )
}

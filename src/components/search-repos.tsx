'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

export function SearchRepos() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { reposPosts, handleSearch } = useContext(ReposPostsContext)

  useEffect(() => {
    if (reposPosts) {
      setLoading(false)
    }

    handleSearch(search)
  }, [])

  return loading ? (
    <Skeleton className="h-10 w-full bg-muted" />
  ) : (
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Buscar conteúdo"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-md border-[1px] border-border bg-input px-4 py-3 text-base text-muted placeholder:text-label"
    />
  )
}

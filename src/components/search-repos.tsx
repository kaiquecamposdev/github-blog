'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext, useEffect, useState } from 'react'

export function SearchRepos() {
  const { handleSearch } = useContext(ReposPostsContext)
  const [search, setSearch] = useState('')

  useEffect(() => {
    handleSearch(search)
  }, [])

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Buscar conteúdo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-base-border bg-base-input placeholder:text-base-label w-full rounded-md border-[1px] px-4 py-3 text-base text-white"
      />
    </div>
  )
}

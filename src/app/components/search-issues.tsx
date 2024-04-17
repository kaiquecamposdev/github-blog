'use client'

import { useContext, useEffect, useState } from 'react'
import { IssuesPostsContext } from '../context/issues-posts-provider'

export function SearchIssues() {
  const { handleSearch } = useContext(IssuesPostsContext)
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
        className="w-full rounded-md border-[1px] border-base-border bg-base-input px-4 py-3 text-base text-white placeholder:text-base-label"
      />
    </div>
  )
}

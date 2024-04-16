'use client'

import { useState } from 'react'

export function SearchIssues() {
  const [search, setSearch] = useState('')

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

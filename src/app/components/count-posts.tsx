'use client'

import { useContext } from 'react'
import { ReposPostsContext } from '../context/repos-posts-provider'

export function CountPosts() {
  const { reposPosts } = useContext(ReposPostsContext)

  if (!reposPosts) return null

  return (
    <span className="text-sm text-base-span">
      {reposPosts.length + ' ' ?? 0 + ' '} Publicações
    </span>
  )
}

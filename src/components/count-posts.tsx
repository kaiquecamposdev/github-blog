'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext } from 'react'

export function CountPosts() {
  const { reposPosts } = useContext(ReposPostsContext)

  if (!reposPosts) return null

  return (
    <span className="text-base-span text-sm">
      {reposPosts.length + ' ' || 0 + ' '} Publicações
    </span>
  )
}

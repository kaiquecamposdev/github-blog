'use client'

import { ReposPostsContext } from '@/app/context/repos-posts-provider'
import { useContext } from 'react'

export function CountPosts() {
  const { reposPosts } = useContext(ReposPostsContext)

  return (
    <span className="text-sm text-base-span">
      {reposPosts.length + ' ' || 0 + ' '} Publicações
    </span>
  )
}
